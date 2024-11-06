(function () {

    angular
        .module('app')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('fopag', {
                    url: '/fopag',
                    templateUrl: 'src/app/fopag/fopag.tpl.html',
                    papeis: ['ADMIN']
                })
        }])
        .controller('fopagController', fopagController);

    fopagController.$inject = ['$rootScope', '$scope', '$q', 'FileSaver', 'Blob', 'fopagServices', 'estilos', 'utils', 'cfpLoadingBar'];
    function fopagController($rootScope, $scope, $q, FileSaver, Blob, fopagServices, estilos, utils, cfpLoadingBar) {

        var vm = this;

        vm.relatorio = null;

        const dateFormat = 'DD/MM/YYYY';

        const colunas = {
            convenio: 4,
            proposta: 5,
            valorBruto: 6,
            valorLiquido: 7,
            prazo: 8,
            agencia: 9,
            chave: 10,
            data: 11,
            linha: 12,
            taxa: 13,
            produto: 14,
            nmLinha: 15,
            tabela: 17,
            pcComissao: 22,
            comissao: 23,
            restricao: 24,
            seguro: 27,
        }

        $scope.$watch('vm["relatorio"]', function (value) {

            vm.dados = null;

            if (value) {

                cfpLoadingBar.start()

                value.arrayBuffer().then((r) => {

                    vm.workbook = new ExcelJS.Workbook();

                    vm.workbook.xlsx.load(r).then(() => {

                        let planilha = vm.workbook.worksheets[1];

                        // MCI da empresa do relatorio
                        var mci = planilha.getRow(2).getCell(1).value;
                        if (!mci) {
                            vm.relatorio = null;
                            return;
                        }

                        var datas = planilha.getColumn(colunas.data).values;
                        datas.splice(0, 2);
                        datas = datas.map((dt) => {
                            if (dt instanceof Date)
                                return moment(dt);
                            else
                                return moment(dt, dateFormat);
                        });

                        var periodo = moment.max(datas);

                        $scope.$apply(() => {

                            vm.operacoes = [];
                            vm.dados = {};
                            vm.dados.periodo = periodo.format('MMMM/YYYY');
                            vm.dados.empresa = vm.empresas.find((e) => e.mci == mci);
                            vm.dados.qtdBase = 0
                            vm.dados.qtdArq = planilha.actualRowCount - 1; // header

                            console.info('dados', vm.dados)

                            cfpLoadingBar.complete()
                        })
                    })
                })
            }
        })

        vm.init = () => {

            vm.estilos = estilos;

            fopagServices.getEmpresas().then((resp) => {
                vm.empresas = resp.data;
                console.info('Empresas', vm.empresas)
            })

            fopagServices.getAgentes().then((resp) => {
                vm.agentes = resp.data;
                console.info('Agentes', vm.agentes)
            })

            fopagServices.getTaxas().then((resp) => {
                vm.taxas = resp.data;
                Object.keys(vm.taxas).forEach(key => {
                    vm.taxas[key].forEach(it => {
                        it.comissao = parseFloat((it.comissao / 100).toFixed(4))
                    })
                })
                console.info('taxas', vm.taxas)
            })
        }

        vm.processar = () => {

            vm.registros = [];

            let planilha = vm.workbook.worksheets[1];

            planilha.eachRow({ includeEmpty: false }, (linha, nr) => {

                if (nr == 1) { return; } // header

                var opr = criarRegistroBd(linha);
                vm.operacoes.push(opr);
            });

            console.info('operacoes', vm.operacoes)

            let valorOriginal = 0;
            let valorNovo = 0;

            vm.operacoes = vm.operacoes.filter(op => op.restricao != 'Sim')
            vm.operacoes.forEach(op => {
                valorOriginal += op.comissao;
                valorNovo += op.comissao;

                let taxas = vm.taxas[op.produto]

                if (!taxas) { return; }

                let taxa = taxas.find(t => t.taxa_min <= op.taxa && t.taxa_max >= op.taxa && t.prazo_min <= op.prazo && t.prazo_max >= op.prazo)
                if (!taxa) { return; }

                let pcComissao = taxa.comissao;

                if (pcComissao < op.pcComissao) {
                    let comissaoOld = op.comissao;
                    let comissaoNova = calcularComissao(op.valorLiquido, pcComissao);

                    if (comissaoOld < comissaoNova) {
                        console.info(`[Não Alterou] OPR: ${op.proposta}: Comissao antiga ${comissaoOld}, nova comissão ${comissaoNova}`);
                        return;
                    }

                    op.comissao = comissaoNova;
                    op.pcComissao = pcComissao;

                    valorNovo -= comissaoOld;
                    valorNovo += comissaoNova;

                    console.info(`OPR: ${op.proposta}: Comissao antiga ${comissaoOld}, nova comissão ${comissaoNova}`);
                }
            });

            console.info(`Valor Antiga: ${valorOriginal}, novo valor ${valorNovo}`);
        }


        function calcularComissao(valor, pcComissao) {
            let resultado = valor * pcComissao;
            return parseFloat(resultado.toFixed(2));
        }

        vm.gerarPlanilhas = () => {

            var lista = vm.operacoes.map((it) => criarRegistroPlanilha(it));

            var chaves = lista
                .map(it => it.chave)
                .filter((value, index, self) => self.indexOf(value) === index);

            var promises = [];

            var zip = new JSZip();

            chaves.forEach((chv) => {
                promises.push(criarPlanilha(chv, lista));
            })

            promises.push(criarPlanilhaEmpresa(lista));

            $q.all(promises).then((resps) => {

                resps.forEach((resp) => {
                    zip.file(`${resp.filename}`, resp.blob);
                });

                zip.generateAsync({ type: "blob" }).then((blob) => {
                    FileSaver.saveAs(blob, `${vm.dados.empresa.nome}.zip`);
                });
            });
        }

        function criarPlanilha(chave, operacoes) {

            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('Comissões');


            let fAgente = vm.agentes.find((a) => a.chave == chave);
            let agente = fAgente ? fAgente.nome : `Não Cadastrado (${chave})`;

            var lista = operacoes.filter((r) => r.chave == chave);

            worksheet.mergeCells('A1', 'M1');
            worksheet.getCell('A1').value = `${vm.dados.periodo} - ${vm.dados.empresa.nome} - ${agente}`;

            var headers = [
                'Código',
                'Agência',
                'Data',
                'Convênio',
                'Linha',
                'Produto',
                'Prazo',
                'Taxa',
                'Vl. Bruto',
                'Vl. Líquido',
                'Seguro',
                '% Com.',
                'Comissão',
            ];

            worksheet.getRow(2).values = headers;

            var columns = [
                { key: 'proposta', width: 10 },
                { key: 'agencia', width: 9 },
                { key: 'data', width: 10 },
                { key: 'convenio', width: 9 },
                { key: 'linha', width: 50 },
                { key: 'produto', width: 50 },
                { key: 'prazo', width: 8 },
                { key: 'taxa', width: 8 },
                { key: 'valorBruto', width: 15 },
                { key: 'valorLiquido', width: 15 },
                { key: 'seguro', width: 15 },
                { key: 'pcComissao', width: 8 },
                { key: 'comissao', width: 15 }
            ];

            worksheet.columns = columns;

            var total = {
                valorBruto: 0,
                valorLiquido: 0,
                seguro: 0,
                comissao: 0,
                comissao1: 0,
                comissao2: 0,
                comissao3: 0,
                comissao4: 0,
                comissaoPagaBB: 0,
            };

            var lnTotal = 0;

            lista.forEach(function (it, index) {
                worksheet.addRow(it);

                total.valorBruto += it.valorBruto;
                total.valorLiquido += it.valorLiquido;
                total.comissao += it.comissao;
                total.seguro += it.seguro;

                if ((index + 1) == lista.length) {
                    lnTotal = index + 4;
                    worksheet.addRow(total);
                }
            });

            worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {

                if (rowNumber === 1) {
                    row.height = 20;
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.titleStyle);
                    });
                }
                else if (rowNumber === 2) {
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.headerStyle);
                    });
                }
                else if (rowNumber > 2 && rowNumber != lnTotal) {
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.rowStyle);
                    });
                }
                else if (rowNumber == lnTotal) {
                    row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.totalStyle);
                    });
                }
            });

            worksheet.getColumn(8).numFmt = '0.00%';
            worksheet.getColumn(9).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(10).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(11).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(12).numFmt = '0.00%';
            worksheet.getColumn(13).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';

            var defer = $q.defer();

            workbook.xlsx.writeBuffer().then((buffer) => {
                defer.resolve({ blob: new Blob([buffer]), filename: `${agente}.xlsx` });
            });

            return defer.promise;
        }

        function criarPlanilhaEmpresa(operacoes) {

            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('Resumo');

            var lista = [];

            operacoes.forEach((r) => {
                var total = lista.find((x) => x.chave == r.chave);
                if (total) {
                    total.valorEmprestimos += r.valorLiquido;
                    total.comissao += r.comissao;
                    total.seguro += r.seguro;
                    total.comissaoTotal += (r.comissao + r.seguro);
                }
                else {
                    total = {};
                    total.agente = getNomeAgente(r.chave);
                    total.chave = r.chave;
                    total.valorEmprestimos = r.valorLiquido;
                    total.comissao = r.comissao;
                    total.comissaoTotal = (r.comissao + r.seguro);
                    total.seguro = r.seguro;
                    lista.push(total);
                }
            });

            worksheet.mergeCells('A1', 'F1');
            worksheet.getCell('A1').value = `FOLHA DE PAGAMENTO - ${vm.dados.periodo} - ${vm.dados.empresa.nome}`;

            worksheet.getRow(2).values = [
                'Agente',
                'Chave',
                'Total Empréstimos',
                'Comissão Empréstimos',
                'Comissão Seguros',
                'Comissão Total'
            ];

            worksheet.columns = [
                { key: 'agente', width: 40 },
                { key: 'chave', width: 9 },
                { key: 'valorEmprestimos', width: 14 },
                { key: 'comissao', width: 14 },
                { key: 'seguro', width: 14 },
                { key: 'comissaoTotal', width: 14 }
            ];

            var total = {
                valorEmprestimos: 0,
                comissao: 0,
                seguro: 0,
                valorContas: 0,
                comissaoTotal: 0
            };

            var lnTotal = 0;

            lista.forEach(function (it, index) {
                worksheet.addRow(it);

                total.valorEmprestimos += it.valorEmprestimos;
                total.comissao += it.comissao;
                total.seguro += it.seguro;
                total.comissaoTotal += it.comissaoTotal;

                if ((index + 1) == lista.length) {
                    lnTotal = index + 4;
                    worksheet.addRow(total);
                }
            });

            worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {

                if (rowNumber === 1) {
                    row.height = 20;
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.titleStyle);
                    });
                }
                else if (rowNumber === 2) {
                    row.height = 23;
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.headerStyle);
                    });
                }
                else if (rowNumber > 2 && rowNumber != lnTotal) {
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.rowStyle);
                    });
                }
                else if (rowNumber == lnTotal) {
                    row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                        cell.style = utils.clone(vm.estilos.totalStyle);
                    });
                }
            });

            worksheet.getColumn(3).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(4).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(5).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';
            worksheet.getColumn(6).numFmt = '"R$ "#,##0.00;[Red]\-"R$ "#,##0.00';

            var defer = $q.defer();

            workbook.xlsx.writeBuffer().then((buffer) => {
                defer.resolve({ blob: new Blob([buffer]), filename: `${vm.dados.empresa.nome}.xlsx` });
            });

            return defer.promise;
        }

        function getNomeAgente(chave) {
            var ag = vm.agentes.find((a) => a.chave == chave);
            return ag ? ag.nome : `Não Cadastrado (${chave})`;
        }

        function criarRegistroBd(linha) {

            let reg = {};

            reg.convenio = linha.getCell(colunas.convenio).value;
            reg.proposta = linha.getCell(colunas.proposta).value;
            reg.valorBruto = linha.getCell(colunas.valorBruto).value;
            reg.valorLiquido = linha.getCell(colunas.valorLiquido).value;
            reg.prazo = linha.getCell(colunas.prazo).value;
            reg.agencia = linha.getCell(colunas.agencia).value;
            reg.chave = linha.getCell(colunas.chave).value;
            reg.data = moment(linha.getCell(colunas.data).value, dateFormat).format('DD/MM/YYYY');
            reg.linha = {}
            reg.linha.codigo = linha.getCell(colunas.linha).value;
            reg.linha.nome = linha.getCell(colunas.nmLinha).value;
            reg.comissao = linha.getCell(colunas.comissao).value;
            reg.taxa = linha.getCell(colunas.taxa).value;
            reg.seguro = linha.getCell(colunas.seguro).value;
            reg.tabela = linha.getCell(colunas.tabela).value;
            reg.pcComissao = linha.getCell(colunas.pcComissao).value;
            reg.pcComissao = linha.getCell(colunas.pcComissao).value;
            reg.produto = linha.getCell(colunas.produto).value;
            reg.restricao = linha.getCell(colunas.restricao).value;

            return reg;
        }

        function criarRegistroPlanilha(item) {

            let reg = {};

            let agente = vm.agentes.find((a) => a.chave == item.chave);

            reg.convenio = item.convenio;
            reg.proposta = item.proposta;
            reg.produto = item.produto;
            reg.valorBruto = item.valorBruto;
            reg.valorLiquido = item.valorLiquido;
            reg.prazo = item.prazo;
            reg.agencia = item.agencia;
            reg.chave = item.chave;
            reg.data = moment(item.data, 'DD/MM/YYYY').toDate();
            reg.linha = `${item.linha.nome} (${item.linha.codigo})`;
            reg.taxa = item.taxa / 100;

            if (agente && agente.comissao) {
                reg.pcComissao = (item.comissao * agente.comissao) / item.valorLiquido;
                reg.comissao = item.comissao * agente.comissao;
                reg.seguro = item.seguro * 0.5;
            }
            else {
                reg.pcComissao = (item.comissao * vm.dados.empresa.comissao) / item.valorLiquido;
                reg.comissao = item.comissao * vm.dados.empresa.comissao;
                reg.seguro = item.seguro * 0.5;
            }

            return reg;
        }
    }
})()