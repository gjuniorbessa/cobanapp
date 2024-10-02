(function () {

    angular
        .module('app')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('agentes', {
                    url: '/agentes',
                    templateUrl: 'src/app/agentes/agentes.tpl.html',
                    papeis: ['ADMIN']
                })
        }])
        .controller('agentesController', agentesController);

    agentesController.$inject = ['$scope', '$q', 'agentesServices', '$firebaseStorage', 'FileSaver', 'Blob'];
    function agentesController($scope, $q, agentesServices, $firebaseStorage, FileSaver, Blob) {

        var vm = this;

        vm.funcoes = [
            { id: 'Administrador', valor: 'Administrador' },
            { id: 'Operador', valor: 'Operador' },
            { id: 'Supervisor', valor: 'Supervisor' },
        ]

        vm.ufs = [
            { id: 'DF', valor: 'DF' },
            { id: 'GO', valor: 'GO' },
        ]

        vm.init = () => {

            console.info('[INIT] - Agentes de Crédito...');

            vm.agente = null;

            agentesServices.getAgentes().then((dados) => {
                vm.db = dados;

                vm.agentes = vm.db.filter(it => it.empresa == 514691448);
                console.info(vm.agentes)
            })
        }

        vm.edit = (it) => {
            vm.agente = it;
            vm.activeTab = 1;
            loadAnexos();
        }

        function loadAnexos() {

            vm.anexos = [];

            let storage = firebase.storage();
            let storageRef = storage.ref().child("dossies");

            let refDossie = storageRef.child(vm.agente.chave);

            refDossie.list().then(result => {
                vm.anexos = [];

                result.items.forEach(it => {
                    it.getDownloadURL().then(resp => {
                        console.info(resp);

                        let anexo = {
                            nome: it.name,
                            link: resp
                        }

                        it.getMetadata().then(resp => {
                            console.info(resp)

                            anexo.tamanho = resp.size / 1024 / 1024;
                            anexo.data = resp.timeCreated;

                            vm.anexos.push(anexo)
                        })
                    })
                })

            })
        }

        vm.incluir = () => {
            vm.agente = {};
        }

        vm.cancelar = () => {
            vm.agente = null;
        }

        vm.salvar = () => {

            console.info(vm.agente);

            vm.agente.chave = vm.agente.chave.toUpperCase();
            vm.agente.empresa = 514691448;

            let novo = !vm.agente.$id;

            if (novo) {
                let found = vm.db.find((a) => a.chave == vm.agente.chave)
                if (found) {
                    swal.fire({
                        icon: 'error',
                        title: 'Agente já cadastrado!',
                        text: `Nome: ${found.nome}`
                    })
                    vm.agente = null;
                    return;
                }

                vm.db.$add(vm.agente).then(() => {

                    swal.fire({
                        icon: 'success',
                        title: 'Agente cadastrado com sucesso!'
                    });

                    vm.init()
                });

            }
            else {
                vm.db.$save(vm.agente).then(() => {

                    swal.fire({
                        icon: 'success',
                        title: 'Dados salvo com sucesso!'
                    });

                    vm.init();
                });
            }
        }

        vm.excluir = (it) => {

            swal.fire({
                icon: 'question',
                text: 'Deseja realmente excluir esse agente?',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then(result => {

                if (result.value) {
                    console.info('excluindo', it)
                    vm.db.$remove(it);

                    vm.init();

                    swal.fire({
                        icon: 'success',
                        title: 'Agente excluído com sucesso!'
                    });
                }

            })
        }

        vm.upload = () => {
            console.info(vm.anexo);

            let storageRef = firebase.storage().ref(`dossies/${vm.agente.chave}/${vm.anexo.name}`);
            let storage = $firebaseStorage(storageRef);

            storage.$put(vm.anexo);
            loadAnexos();
        }

    }
})()