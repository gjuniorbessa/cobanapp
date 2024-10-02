(function () {

    angular
        .module('app')
        .constant('menu', [
            {
                nome: "Comissões",
                icone: "ci ci--credit",
                papeis: ["ADMIN"],
                filhos: [
                    {
                        nome: "Incluir Relatório",
                        url: "fopag"
                    }
                ]
            },
            {
                nome: "Parâmetros",
                icone: "mi mi--settings",
                papeis: ["ADMIN"],
                filhos: [
                    {
                        nome: "Agentes de Crédito",
                        url: "agentes"
                    }
                ]
            }
        ]);

})()