$(window).on('load', function () {
  $('#imagemodal').modal('show');
});

$(document).ready(function () {
  $('table.table-hover').DataTable({
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
    paging: false,
    scrollY: '42vh',
    scrollCollapse: true,
    ordering: false,
    searching: false,
    pageLength: 5,
    pagingType: 'full_numbers',
    responsive: true,
    bLengthChange: false,
  });
});

// Inicializa tooltips
$(document).ready(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
});

// Actuliza modal de descuentos adicionales
$('#modalAdicionales').on('show.bs.modal', (e) => {
  let button = $(e.relatedTarget);

  $('#adicionales-descripcion').text(button.data('descripcion'));
  $('#dto1').text(button.data('dto1') + '%');
  $('#dto2').text(button.data('dto2') + '%');
  $('#dto3').text(button.data('dto3') + '%');
  $('#dto4').text(button.data('dto4') + '%');
  $('#dto5').text(button.data('dto5') + '%');
  $('#dto6').text(button.data('dto6') + '%');
});
