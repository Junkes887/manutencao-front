(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('ListarUsuariosController', ListarUsuariosController);

    ListarUsuariosController.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function ListarUsuariosController($uibModal,Restangular, toastr) {
        var vm = this;

        vm.listarUsuarios = function () {
            var usuarios = Restangular.all("usuario/listar-usuarios");
            usuarios.post().then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalCriarUsuario = function () {
            $uibModal.open({
                ariaLabelledBy: 'Usuario',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/usuario/criar-usuario/criar-usuario.html',
                controller: 'CriarUsuarioController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    usuario: function () {
                        return  ;
                    }
                }
            }).result.then(function () {
                vm.listarUsuarios();
            });
        }

        vm.abrirModalEditarUsuario = function(usuario) {
            $uibModal.open({
                ariaLabelledBy: 'Usuario',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/usuario/editar-usuario/editar-usuario.html',
                controller: 'EditarUsuarioController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    usuario: function() {
                        return usuario;
                    }
                }
            }).result.then(function() {
                vm.listarUsuarios();
            });
        }

        vm.gridOptions = {
            data: vm.listarUsuarios(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{
                name: 'Edit',
                width: '5%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalEditarUsuario(row.entity)" ng-class="\'btn btn-xs label label-warning\'">\
                                    Editar </div>\
                                </button>\
                            </div>'
            }, {
                width: '10%',
                name: 'Código',
                field: 'id',
                type: 'number'
            }, {
                width: '25%',
                name: 'Nome',
                field: 'nome',
                type: 'string'
            }, {
                width: '25%',
                name: 'senha',
                field: 'senha',
                type: 'string'
            }, {
                width: '25%',
                name: 'Email',
                field: 'email',
                type: 'string'
            }, {
                width: '17%',
                name: 'Permissão',
                field: 'permissao',
                type: 'string'
            }]
        }
    }
})();
