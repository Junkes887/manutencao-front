(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('EditarServicoController', EditarServicoController);

    EditarServicoController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr',
        'servico'
    ];

    function EditarServicoController($uibModal, $uibModalInstance, $location, Restangular, toastr, servico) {
        var vm = this;
        if (servico) {
            vm.servico = {
                id: servico.id,
                data_ini: servico.data_ini,
                data_fim: servico.data_fim,
                descricao: servico.descricao,
                cliente: {
                    id: servico.id_cliente,
                    nome: servico.cliente
                },
                status: servico.status,
                valor: servico.valor,
                marca: servico.marca,
                tipo: servico.tipo,
                prioridade: servico.prioridade
            }
            vm.listaClientes = [];
        }

        console.log(vm.servico);

        vm.buscarTodosClientes = function () {
            var clientes = Restangular.all("cliente/listar-clientes");
            clientes.post().then(function (response) {
                if (response.sucesso) {
                    vm.listaClientes = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.editarServico = function () {
            if (!vm.servico.id_cliente) {
                toastr.error("Selecione um cliente!");
                return;
            }
            if (!vm.servico.prioridade) {
                toastr.error("Selecione uma prioridade!");
                return;
            }
            if (!vm.servico.marca) {
                toastr.error("O campo marca não pode ser nulo!");
                return;
            }
            if (!vm.servico.tipo) {
                toastr.error("O campo tipo não pode ser nulo!");
                return;
            }
            if (!vm.servico.descricao) {
                toastr.error("O campo descricao não pode ser nulo!");
                return;
            }

            vm.servico.id_cliente = vm.servico.cliente.id;
            vm.servico.cliente = vm.servico.cliente.nome;
            var editarServico = Restangular.all("servico/editar-servico");
            editarServico.post(vm.servico).then(function (retornoCadastro) {
                if (retornoCadastro.sucesso) {
                    toastr.success(retornoCadastro.mensagem);
                    $uibModalInstance.close(true);
                } else { toastr.error("Erro ao salvar"); }
            })
        }

        vm.buscarTodosClientes();
    }
})();
