function BuscarFacturas() {
  var desde = $('#desdeFactura').val();
  var hasta = $('#hastaFactura').val();

  // window.location.href = '/consultas/facturas?desde=' + desde + '&hasta=' + hasta;

  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/consultas/facturas?desde=' + desde + '&hasta=' + hasta,
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#tablaFacturas tbody');

        tabla.html('');
        tabla.html(data);
        ActualizarTablas();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
}

function BuscarPedidos() {
  var desde = $('#desdePedido').val();
  var hasta = $('#hastaPedido').val();

  // window.location.href = '/consultas/pedidos?desde=' + desde + '&hasta=' + hasta;

  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/consultas/pedidos?desde=' + desde + '&hasta=' + hasta,
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#tablaPedidos tbody');
        tabla.html('');
        tabla.html(data);
        ActualizarTablas();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
}

var ActualizarTablas = function () {
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
    scrollY: '50vh',
    scrollCollapse: true,
    ordering: false,
    searching: true,
    pageLength: 5,
    pagingType: 'full_numbers',
    Responsive: true,
    bLengthChange: false,
  });
};

const validateActiveTab = (tab) => {
  const $tabLabelPedidos = $('[data-bs-target="#tabPedidos"]');
  const $tabContentPedidos = $('#tabPedidos');
  const $tabLabelFacturas = $('[data-bs-target="#tabFacturas"]');
  const $tabContentFacturas = $('#tabFacturas');

  if (/facturas/.test(tab)) {
    $tabLabelPedidos.removeClass('active');
    $tabLabelFacturas.addClass('active');

    $tabContentPedidos.removeClass(['active', 'show']);
    $tabContentFacturas.addClass(['active', 'show']);
  } else {
    $tabLabelPedidos.addClass('active');
    $tabLabelFacturas.removeClass('active');

    $tabContentPedidos.addClass(['active', 'show']);
    $tabContentFacturas.removeClass(['active', 'show']);
  }
};

$(document).ready(function () {
  $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const tab = urlParams.get('tab');

  validateActiveTab(tab);

  $('[aria-labelledby="navbarConsultas"] a').each(function () {
    const $link = $(this);
    $link.on('click', function (e) {
      e.preventDefault();
      validateActiveTab($link.attr('href'));
      $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });
  });

  ActualizarTablas();
});
