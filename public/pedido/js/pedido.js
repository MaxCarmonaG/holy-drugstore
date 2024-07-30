// Llama búsqueda al detectar tecla Enter en campo de búsqueda
function EnterBusqueda(e) {
  if (e.keyCode === 13) {
    BuscaItems();
  }
}

// Llama a servicio de búsqueda de producto
var BuscaItems = function () {
  var cliente = $('#ClienteId').length ? $('#ClienteId').text() : '0';
  var referencia = $('#busquedaDescripcion').val();
  var tabla = $('#tablaBusqueda');

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/pedido/busquedaitems',
    data: {
      valor: referencia,
      idCliente: cliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        updateTable().destroy();
        tabla.html(data);
        updateTable().draw();
        $('[data-bs-toggle="tooltip"]').tooltip();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Llama a servicio de búsqueda por últimas entradas
var BuscaEntradas = function () {
  var cliente = $('#ClienteId').length ? $('#ClienteId').text() : '0';
  var tabla = $('#tablaBusqueda');

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/pedido/ultimasentradas',
    data: {
      idCliente: cliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        updateTable().destroy();
        tabla.html(data);
        updateTable().draw();
        $('[data-bs-toggle="tooltip"]').tooltip();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Lista los laboratorios para carga de ítems
var ListaLaboratorios = function () {
  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/pedido/listarlaboratorios',
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#listaLaboratorios');
        tabla.html('');
        tabla.html(data);
        tabla.find('#tablaLaboratorios').each(function () {
          updateTable($(this), {
            searching: true,
            paging: true,
            pageLength: 6,
            layout: { top: 'search', topEnd: null },
          });
        });
        $('#modalLaboratorio').modal('show');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Llama a servicio de búsqueda por ítems en oferta
var ListaOfertas = function () {
  var cliente = $('#ClienteId').length ? $('#ClienteId').text() : '0';
  var tabla = $('#tablaBusqueda');

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/pedido/listaritemsenofertas',
    data: {
      idCliente: cliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        updateTable().destroy();
        tabla.html(data);
        updateTable().draw();
        $('[data-bs-toggle="tooltip"]').tooltip();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Establece el foco en el campo de búsqueda
$('#modalLaboratorio').on('shown.bs.modal', function () {
  $('#tablaLaboratorios').DataTable().columns.adjust();
});

var ReplicaCantidades = function () {
  var lista = document.getElementsByName('seleccionValue');

  lista.forEach(EstableceCantidad);
};

function EstableceCantidad(item) {
  if (item.id != 'seleccionValue') {
    item.value = document.getElementById('seleccionValue').value;
  }
}

// Llama a servicio de carga por laboratorio
var CargaLaboratorio = function (id) {
  var cliente = $('#ClienteId').length ? $('#ClienteId').text() : '0';

  $.ajax({
    cache: false,
    async: true,
    type: 'GET',
    url: '/pedido/itemslaboratorio/',
    data: {
      idLaboratorio: id,
      idCliente: cliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#tablaBusqueda');

        updateTable().destroy();
        tabla.html(data);
        updateTable().draw();
        $('[data-toggle="tooltip"]').tooltip();
        $('#modalLaboratorio').modal('hide');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Llama a vista modal para agregar producto a cesta de pedidos
var AgregaItem = function (idItem) {
  var cliente = $('#ClienteId').length ? $('#ClienteId').text() : '0';

  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/pedido/agregaitem',
    data: {
      idArticulo: idItem,
      idCliente: cliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#agregaItem');

        tabla.html('');
        tabla.html(data);
        $('#modalAgrega').modal('show');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Llama a servicio que agregará producto a cesta de pedidos
var EnviaItem = function () {
  var formulario = $('#formEnviaItem');
  var datos = formulario.serialize();

  $.ajax({
    cache: false,
    type: 'POST',
    async: true,
    url: '/pedido/agregaitem',
    data: datos,
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var resumen = $('#resumenDiv');

        resumen.html('');
        resumen.html(data);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Establece el foco y captura submit en modal de agregar producto a cesta
// dependiendo del botón que origine la llamada
$('#modalAgrega').on('shown.bs.modal', function () {
  $('#formEnviaItem button').click(function (event) {
    event.preventDefault();
    var target = $(this).attr('id');

    if (target === 'addAndContinueButton') {
      EnviaItem();
      $('#LocalidadId').focus();
    } else if (target === 'addItemButton') {
      EnviaItem();
      $('#modalAgrega').modal('hide');
      $('#busquedaDescripcion').select();
    }
  });
  $('#Cantidad').select();
});

// Waiting for modalBusquedaCliente to init table
$('#modalBusquedaCliente').on('shown.bs.modal', function () {
  updateTable($('#tablaClientes')).columns.adjust();
});

// Configuración visual de datatable de productos
const updateTable = function ($table = null, options = {}) {
  const baseOptions = {
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
    searching: false,
    pageLength: 5,
    responsive: true,
    bLengthChange: false,
  };

  const targetTable = $table ?? $('#tablaProductos');
  return targetTable.DataTable({ ...baseOptions, ...options });
};

$(document).ready(function () {
  updateTable();
});
