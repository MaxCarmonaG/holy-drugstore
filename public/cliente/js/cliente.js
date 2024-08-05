$(window).on('load', function () {
  $('#imagemodal').modal('show');
});

$(document).ready(function () {
  $('table.table-hover.table-striped').DataTable({
    retrieve: true,
    language: {
      deferRender: true,
      decimal: ',',
      thousands: '.',
      lengthMenu: 'Mostrando _MENU_ registros por página',
      info: 'Mostrando página _PAGE_ de _PAGES_',
      sProcessing: 'Procesando...',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: '¡Sin información a mostrar!',
      sInfoEmpty: 'Sin registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar',
      sUrl: '',
      sLoadingRecords: 'Cargando...',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior',
      },
      oAria: {
        sSortAscending: ': Activar para ordenar la columna de manera ascendente',
        sSortDescending: ': Activar para ordenar la columna de manera descendente',
      },
    },
    info: false,
    paging: true,
    scrollCollapse: true,
    ordering: false,
    searching: true,
    pageLength: 5,
    Responsive: true,
    bLengthChange: false,
  });
});
$('#modalEliminaUsuario').on('show.bs.modal', function (e) {
  $(this).find('#buttonDeleteItem').attr('href', $(e.relatedTarget).data('href'));
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
var EditaLocalidad = function (cliente, localidad) {
  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/cliente/editalocalidad',
    data: {
      idCliente: cliente,
      idLocalidad: localidad,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCallLocalidades');

        errorDiv.html(data);
      } else {
        var tabla = $('#editaLocalidad');

        tabla.html('');
        tabla.html(data);
        $('#modalLocalidad').modal('show');
        $('#Codigo').focus();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};
var EditaUsuario = function (cliente, usuario) {
  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/cliente/editausuario',
    data: {
      idCliente: cliente,
      idUsuario: usuario,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCallUsuarios');

        errorDiv.html(data);
      } else {
        var tabla = $('#editaUsuario');

        tabla.html('');
        tabla.html(data);
        $('#modalUsuario').modal('show');
        $('#EMail').focus();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};
