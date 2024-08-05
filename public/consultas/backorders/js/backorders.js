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

if (document.getElementById('filtroLaboratorio')) {
  $('#filtroLaboratorio').select2({
    placeholder: 'Selecciona un laboratorio',
    theme: 'bootstrap-5',
  });
  $('#filtroLaboratorio').on('change', (e) => {
    if (e.currentTarget.value == '') {
      location.href = '/consultas/backorders';
      return;
    }
    location.href = '/consultas/backorders/' + e.currentTarget.value + '/pendientes';
  });
}

$('table').DataTable({
  language: {
    deferRender: true,
    decimal: ',',
    thousands: '.',
    lengthMenu: 'Mostrando _MENU_ registros por página',
    info: 'Mostrando página _PAGE_ de _PAGES_',
    sProcessing: 'Procesando...',
    sZeroRecords: 'No se encontraron resultados',
    sEmptyTable: '¡Sin backorders pendientes!',
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
  scrollY: '45vh',
  scrollCollapse: true,
  ordering: false,
  searching: false,
  pageLength: 5,
  pagingType: 'full_numbers',
  Responsive: true,
  bLengthChange: false,
});
