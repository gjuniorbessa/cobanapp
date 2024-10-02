(function (angular) {
    'use strict';

    angular
        .module('app')
        .filter('lpad', lpad)
        .filter('fileSize', fileSize)
        .filter('mci', mci)
        .filter('matricula', matricula)
        .filter('chave', chave)
        .filter('cnpj', cnpj)
        .filter('cpf', cpf)
        .filter('cpfCnpj', cpfCnpj)
        .filter('boleto', boleto)
        .filter('gt', gt)
        .filter('ge', ge)
        .filter('lt', lt)
        .filter('le', le)
        .filter('valorAbreviado', valorAbreviado)
        .filter('total', total);

    function total() {
        return function (input) {
            var num = parseInt(input, 10);

            if (isNaN(num) || num < 1000) {
                return input;
            }
            num = num / 1000
            return (num.toFixed(1) + 'k').replace('.', ',');
        };
    }

    function lpad() {
        return function (input, n) {
            var num = parseInt(input, 10);
            var len = parseInt(n, 10);

            if (isNaN(num) || isNaN(len)) {
                return input;
            }

            num = '' + num;

            while (num.length < len) {
                num = '0' + num;
            }
            return num;
        };
    }

    function fileSize() {
        return function (input, precision) {
            var size = parseInt(input, 10);
            var precision = parseInt(precision, 10) || 2;

            if (isNaN(size)) {
                return input;
            }

            var value;
            var und = '';

            if (size > 1024 * 1024 * 1024) {
                value = size / 1024 / 1024 / 1024;
                und = 'Gb';
            } else if (size > 1024 * 1024) {
                value = size / 1024 / 1024;
                und = 'Mb';
            } else if (size > 1024) {
                value = size / 1024;
                und = 'Kb';
            } else {
                value = size;
                und = 'bytes';
            }

            return value.toFixed(precision).replace('.', ',') + ' ' + und;
        };
    }

    function mci() {
        return function (input, prefix) {
            input = parseInt(input, 10);
            prefix = prefix || '';

            if (isNaN(input)) {
                return input;
            }

            var mci = lpad()(input, 9) + '';
            return prefix + mci.match(/.{1,3}/g).join('.');
        };
    }

    function matricula() {
        return function (input, prefix) {
            input = parseInt(input, 10);
            prefix = prefix || '';

            if (isNaN(input)) {
                return input;
            }

            var matricula = lpad()(input, 7) + '';
            return prefix + matricula.replace(/(\d)(\d{3})(\d{3})/g, '$1.$2.$3');
        };
    }

    function chave() {
        return function (input) {
            input = parseInt(input, 10);
            var prefix = 'F';

            if (isNaN(input)) {
                return input;
            }

            var matricula = lpad()(input, 7) + '';
            return prefix + matricula;
        };
    }

    function gt() {
        return function (input, prop, val) {
            if (!input || !input instanceof Array)
                return [];

            var result = [];
            input.forEach(function (item) {
                if (item[prop] > val) {
                    result.push(item);
                }
            });
            return result;
        }
    }

    function ge() {
        return function (input, prop, val) {
            if (!input || !input instanceof Array)
                return [];

            var result = [];
            input.forEach(function (item) {
                if (item[prop] >= val) {
                    result.push(item);
                }
            });
            return result;
        }
    }

    function lt() {
        return function (input, prop, val) {
            if (!input || !input instanceof Array)
                return [];

            var result = [];
            input.forEach(function (item) {
                if (item[prop] < val) {
                    result.push(item);
                }
            });
            return result;
        }
    }

    function le() {
        return function (input, prop, val) {
            if (!input || !input instanceof Array)
                return [];

            var result = [];
            input.forEach(function (item) {
                if (item[prop] <= val) {
                    result.push(item);
                }
            });
            return result;
        }
    }

    function cnpj() {
        return function (input) {
            var str = lpad()(input, 14) + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d)/, '$1.$2');
            str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
            str = str.replace(/(\d{4})(\d)/, '$1-$2');
            return str;
        };
    }

    function cpf() {
        return function (input) {
            var str = lpad()(input, 11) + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            return str;
        };
    }

    function cpfCnpj() {
        return function (input, tipo) {
            if (tipo == 1)
                return cpf()(input);
            else if (tipo == 2)
                return cnpj()(input);
            else
                return input;
        };
    }

    function boleto() {
        return function (input) {

            var len = 47;
            var str = input + '';

            str = str.replace(/\D/g, '');

            while (input.length < len) {
                input = '0' + input;
            }

            str = str.replace(/(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})/g, '$1.$2 $3.$4 $5.$6 $7 $8');
            return str;
        };
    }

    /**
     * @param double valor - o valor a ser formatado
     * @param int qtdDigitosPosVirgula - quantidade de digitos a serem apresentados após a vírgula
     *                                   caso não seja informado, serão apresentados sempre 04 números ao TOTAL
     * @returns o número de entrada truncado e formatado com sufixo (mil, mi, bi, tri)
     * 
     * */
    function valorAbreviado() {

        return function (valor, qtdDigitosPosVirgula) {

            if (!valor || isNaN(valor) || valor === 0 || valor === "0") {

                var dgtZeros = "0,";

                if (!qtdDigitosPosVirgula) {
                    qtdDigitosPosVirgula = 2;
                }

                for (var i = 0; i < qtdDigitosPosVirgula; i++) {

                    dgtZeros = dgtZeros + "0";
                }

                return dgtZeros;
            }

            var valorStr = valor.toString();

            var isNumeroNegativo = (valorStr.indexOf("-") > -1);

            if (isNumeroNegativo) {
                valorStr = valorStr.replace("-", "");
            }

            var valorFormatado = "";
            var valorSemCentavos = valorStr.indexOf(".") === -1 ? valorStr : valorStr.substring(0, valorStr.indexOf("."));
            var digitosAposVirgula = valorStr.indexOf(".") === -1 ? "" : valorStr.substring(valorStr.indexOf(".") + 1, valorStr.length);

            var TOTAL_DIGITOS_APRESENTADOS_DEFAULT = 4;
            var MIL = "mil";
            var MI = "mi";
            var BI = "bi";
            var TRI = "tri";

            var tam = valorSemCentavos.length;
            var classe = Math.ceil(tam / 3);
            var ordem = tam % 3 == 0 ? 3 : tam % 3;
            var qDigitosAposVirgula;
            var qtdDigitosPosVirgulaValida = !isNaN(qtdDigitosPosVirgula);

            if (qtdDigitosPosVirgulaValida) {

                qDigitosAposVirgula = qtdDigitosPosVirgula;

            } else {

                qDigitosAposVirgula = TOTAL_DIGITOS_APRESENTADOS_DEFAULT - ordem;
            }

            var sufixo;

            switch (classe) {

                case 1:
                    sufixo = "";
                    break;
                case 2:
                    sufixo = MIL;
                    break;
                case 3:
                    sufixo = MI;
                    break;
                case 4:
                    sufixo = BI;
                    break;
                case 5:
                    sufixo = TRI;
                    break;
            }

            if (classe == 1) {

                var tamOriginal = digitosAposVirgula.length;

                if (qtdDigitosPosVirgulaValida) {

                    if (digitosAposVirgula.length < qtdDigitosPosVirgula) {

                        for (var idx = 0; idx < qtdDigitosPosVirgula - tamOriginal; idx++) {
                            digitosAposVirgula = [digitosAposVirgula, "0"].join('');
                        }
                    }

                    valorFormatado = [valorSemCentavos, ",", digitosAposVirgula.substring(0, qtdDigitosPosVirgula)].join('');

                } else {

                    if (TOTAL_DIGITOS_APRESENTADOS_DEFAULT > (valorSemCentavos.length + digitosAposVirgula.length)) {

                        for (var idx1 = 0; idx1 < (TOTAL_DIGITOS_APRESENTADOS_DEFAULT - (valorSemCentavos.length + tamOriginal)); idx1++) {
                            digitosAposVirgula = [digitosAposVirgula, "0"].join('');
                        }
                    }

                    valorFormatado = [valorSemCentavos, ",", digitosAposVirgula].join('');
                }

            } else {

                valorFormatado = [valorSemCentavos.slice(0, ordem), ",", valorSemCentavos.slice(ordem, ordem + qDigitosAposVirgula)].join('');
            }

            if (isNumeroNegativo) {
                if (sufixo === "") {
                    return "-" + valorFormatado;
                } else {
                    return "-" + valorFormatado + " " + sufixo;
                }
            }

            if (sufixo === "") {
                return valorFormatado;
            } else {
                return valorFormatado + " " + sufixo;
            }
        };
    }


})(angular)