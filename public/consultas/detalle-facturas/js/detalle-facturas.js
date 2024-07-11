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
    Responsive: true,
    bLengthChange: false,
  });
});
