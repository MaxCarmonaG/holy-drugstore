// TODO: Validate functionality
$(window).on('load', function () {
  $('#imagemodal').modal('show');
});

$(document).ready(function () {
  // Busca cliente al pulsar Enter
  if (document.getElementById('busquedaCliente')) {
    document.getElementById('busquedaCliente').addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        buscaCliente();
      }
    });
  }

  if (document.getElementById('eligeCliente')) {
    $('#modalListaPrecios').on('hidden.bs.modal', () => {
      document.getElementById('eligeLaboratorio').classList.remove('d-none');
      document.getElementById('eligeCliente').classList.add('d-none');
    });
  }
});

function getListaPrecios() {
  var tabla = $('#tablaLaboratorios tbody');

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/listarPrecios',
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        tabla.html(data);
        ActualizaTabla();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
}

function ActualizaTabla() {
  $('#tablaLaboratorios').DataTable({
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
    searching: true,
    pageLength: 5,
    pagingType: 'full_numbers',
    responsive: true,
    bLengthChange: false,
    retrieve: true,
  });
}

// Inicializa tabla
$('#modalListaPrecios').on('show.bs.modal', () => {
  getListaPrecios();
});

$('#modalListaPrecios').on('shown.bs.modal', () => {
  $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
});

var idLaboratorio = 0;
var exportarAgrupacion = false;
var ListarPedidos = function () {
  var fechaInicial = $('#desde').val();
  var fechaFinal = $('#hasta').val();
  var tabla = $('#detallePedidos');

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/pedidos/fechas',
    data: {
      desde: fechaInicial,
      hasta: fechaFinal,
    },
    success: function (data) {
      tabla.html(data);
      ActualizarTabla();
    },
  });
};

function buscaCliente() {
  var valorBusqueda = $('#busquedaCliente').val();

  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/cliente/busquedacliente',
    data: {
      descripcion: valorBusqueda,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#tablaBusquedaCliente');

        tabla.html(data);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
      console.error(xhr);
    },
  });
}

function descargarListaCliente(idLaboratorio) {
  $('#modalListaPrecios').modal('hide');
  mostrarAlertaDescarga();

  location.href = '/clientes/listadeprecios/laboratorio/' + idLaboratorio;
}

function mostrarAlertaDescarga() {
  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-info', 'alert-dismissible', 'fade', 'show');
  alerta.setAttribute('role', 'alert');
  alerta.setAttribute('align', 'center');
  alerta.innerHTML = `
  El listado de precios se descargará en breve.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

  const mainEl = document.querySelector('main');
  mainEl.prepend(alerta);
}

function setLaboratorio(id, descargaAgrupacion = false) {
  idLaboratorio = id;
  exportarAgrupacion = descargaAgrupacion;

  document.getElementById('eligeLaboratorio').classList.add('d-none');
  document.getElementById('eligeCliente').classList.remove('d-none');
}

function SetCliente(id, descripcion) {
  $('#modalListaPrecios').modal('hide');
  mostrarAlertaDescarga();

  location.href = '/clientes/' + id + '/listadeprecios/laboratorio/' + idLaboratorio + '?exportarAgrupacion=' + exportarAgrupacion;
}

var dateInputs = document.getElementsByClassName('input-group date');

Array.prototype.forEach.call(dateInputs, function (dateInput) {
  $(dateInput).datepicker({
    autoclose: true,
    format: 'd/m/yyyy',
    language: 'es',
    todayBtn: true,
    todayHighlight: true,
  });
});
