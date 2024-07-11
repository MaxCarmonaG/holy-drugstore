// Llama a vista modal para editar producto en cesta de pedidos
var EditaItem = function (idDetalle) {
  $.ajax({
    cache: false,
    type: 'GET',
    async: true,
    url: '/pedido/editaitem',
    data: {
      idItem: idDetalle,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var tabla = $('#editaItem');

        tabla.html('');
        tabla.html(data);
        $('#modalEdita').modal('show');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    },
  });
};

// Establece el foco y captura submit en modal de editar producto en cesta
$('#modalEdita').on('shown.bs.modal', function () {
  $('#Cantidad').select();
});

// Procesa la orden y deshabilita boton para procesar
var ProcesarOrden = function (botonConfirmar) {
  botonConfirmar.setAttribute('disabled', '');
  document.getElementById('buttonClosePedidoModal').setAttribute('disabled', '');

  location.href = '/pedido/procesarorden';
};

// Configuración visual de datatable de productos
var ActualizaTabla = function () {
  let table = new DataTable('table.table-hover.table-striped', {
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
    scrollY: '71vh',
    scrollCollapse: true,
    ordering: false,
    searching: false,
    pageLength: 5,
    pagingType: 'full_numbers',
    Responsive: true,
    bLengthChange: false,
  });
};
