// filtro de laboratorios
if (document.getElementById('filtroLaboratorio')) {
  const selectOpts = { language: 'es', theme: 'bootstrap-5', placeholder: 'Filtrar por laboratorio' };
  $('#filtroLaboratorio').select2(selectOpts);
  if (document.getElementById('facturaLaboratorio')) {
    $('#facturaLaboratorio').select2(selectOpts);
  }
  if (document.getElementById('facturaUsuario')) {
    $('#facturaUsuario').select2(selectOpts);
  }
}

// Inicializa datatable
$('#modalCrearOrden').on('show.bs.modal', () => {
  setTimeout(() => {
    $('#tablaLaboratorio').DataTable({
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
      Responsive: true,
      bLengthChange: false,
      retrieve: true,
    });
  }, 160);
});

$('#tabla-centro-pedido').DataTable({
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

const descuentoMaximo = +document.getElementById('descuento-maximo')?.value;

// reinicia modales al cerrarlos
$('#modalCrearOrden').on('hidden.bs.modal', resetCrearOrden);
$('#modalDescuentos').on('hidden.bs.modal', resetModalDescuentos);

// Busca cliente al pulsar Enter
if (document.getElementById('busquedaCliente')) {
  document.getElementById('busquedaCliente').addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      buscaCliente();
    }
  });
}

// Controlador para campos de descuento
document.querySelectorAll('.descuento, .descuento-input').forEach(inputConLimitesHandler);
document.querySelectorAll('.diasCredito').forEach(inputConLimitesHandler);

// Controlador formulario de facturas
document.querySelectorAll('#formFacturas').forEach((x) => x.addEventListener('submit', facturasSubmitHandler));
document.querySelectorAll('[name="UsuarioId"]').forEach((x) => x.addEventListener('change', usuarioFacturasHandler));
document.querySelectorAll('#facturaDesde, #facturaHasta').forEach((x) => x.addEventListener('change', validarFechas));

function setLaboratorio(id, descripcion) {
  const formulario = document.getElementById('crearOrdenForm');
  const input = formulario.querySelector('input[name="LaboratorioId"]');
  input.value = id;
  input.dataset.descripcion = descripcion;
  document.getElementById('resumenLaboratorio').textContent = descripcion;

  document.getElementById('eligeLaboratorio').classList.add('d-none');
  document.getElementById('eligeCliente').classList.remove('d-none');

  $('#eligeCliente table').DataTable({
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
    responsive: true,
    bLengthChange: false,
    retrieve: true,
  });
}

function SetCliente(id, descripcion) {
  const formulario = document.getElementById('crearOrdenForm');
  const input = formulario.querySelector('input[name="ClienteId"]');
  input.value = id;
  input.dataset.descripcion = descripcion;
  document.getElementById('resumenCliente').textContent = descripcion;

  document.getElementById('eligeCliente').classList.add('d-none');
  document.getElementById('resumenOrden').classList.remove('d-none');
  document.getElementById('btnCrearOrden').classList.remove('d-none');
}

// Recibe la llamada de la vista para realizar bÃºsqueda
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

// Llama a vista modal para agregar producto a la orden
function agregarItem(idOrden, idItem, idCliente) {
  $.ajax({
    cache: false,
    type: 'GET',
    url: '/centropedidos/agregaitem',
    data: {
      idOrden: idOrden,
      idArticulo: idItem,
      idCliente: idCliente,
    },
    success: function (data) {
      if (data.includes('alert-danger')) {
        var errorDiv = $('#errorAjaxCall');

        errorDiv.html(data);
      } else {
        var modal = $('#modalAgregarItem');

        modal.html('');
        modal.html(data);

        let inputDescuentos = document.getElementById('modalAgregarItem').querySelectorAll('.form-descuento');
        inputDescuentos.forEach(inputConLimitesHandler);

        modal.modal('show');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status == 403) {
        console.error(xhr.responseText, thrownError);
        document.getElementById('errorAjaxCall').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        ${xhr.responseText}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
      }
    },
  });
}

function resetCrearOrden() {
  document.querySelector('#crearOrdenForm input[name="LaboratorioId"]').value = '';
  document.querySelector('#crearOrdenForm input[name="ClienteId"]').value = '';
  document.getElementById('busquedaCliente').value = '';
  document.getElementById('eligeLaboratorio').classList.remove('d-none');
  document.getElementById('eligeCliente').classList.add('d-none');
  document.getElementById('btnCrearOrden').classList.add('d-none');
  document.getElementById('resumenOrden').classList.add('d-none');
  document.getElementById('tablaBusquedaCliente').innerHTML = `
        <tr> <td class="text-center" colspan="3">Â¡Sin informaciÃ³n a mostrar!</td> </tr>`;
}

function resetModalDescuentos() {
  let descuentosEnModal = document.querySelectorAll('.descuento');

  descuentosEnModal.forEach((d, index) => {
    document.querySelectorAll('.descuento-input')[index].value = d.value;
  });
}

function inputConLimitesHandler(input) {
  let maximo = +input.max;
  let minimo = +input.min;

  input.addEventListener('input', (e) => {
    if (+input.value > maximo) {
      input.value = maximo;

      $(input).tooltip('enable');
      $(input).tooltip('show');
      $(input).tooltip('disable');
    } else if (+input.value < minimo) {
      input.value = minimo;
    }
  });
}

function ReplicaCantidades() {
  var lista = document.getElementsByName('seleccionValue');

  lista.forEach((item) => {
    if (item.id != 'seleccionValue') {
      item.value = document.getElementById('seleccionValue').value;
    }
  });
}

function establecerProximosDescuentos() {
  const modalEl = document.getElementById('modalDescuentos');
  let descuentosEnModal = modalEl.querySelectorAll('.descuento-input');

  descuentosEnModal.forEach((d, index) => {
    document.querySelectorAll('.descuento')[index].value = d.value;
  });
  $(modalEl).modal('hide');
}

async function laboratorioFacturasHandler(idLaboratorio) {
  if (idLaboratorio == '') return;
  document.getElementById('laboratorioHelp').textContent = '';
  document.getElementById('usuarioHelp').textContent = '';

  var res = await fetch('/laboratorios/' + idLaboratorio + '/usuarios');
  if (!res.ok) {
    console.error(await res.text());
    return;
  }
  var usuarios = await res.json();
  $('#facturaUsuario').empty();

  for (const id in usuarios) {
    const nombre = usuarios[id];
    var option = new Option(nombre, id, false, false);
    $('#facturaUsuario').append(option);
  }
}

function usuarioFacturasHandler() {
  document.getElementById('usuarioHelp').textContent = '';
}

function validarFechas() {
  const desdeInput = document.querySelector('[name="FechaInicio"]');
  const hastaInput = document.querySelector('[name="FechaFin"]');
  const fechaHelper = document.querySelector('#fechaHelp');
  fechaHelper.textContent = '';

  const desde = new Date(desdeInput.value);
  const hasta = new Date(hastaInput.value);

  const diferenciaMilisegundos = hasta - desde;
  const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

  if (hasta < desde) {
    fechaHelper.textContent = 'Rango de fechas invalido';
    return false;
  }
  if (diferenciaDias > 31) {
    fechaHelper.textContent = 'El rango de fechas no puede ser mayor a 31 dias';
    return false;
  }

  return true;
}

/** @param {SubmitEvent} e */
function facturasSubmitHandler(e) {
  const formulario = e.target;
  const laboratorioInput = formulario.querySelector('[name="LaboratorioId"]');
  const usuarioInput = formulario.querySelector('[name="UsuarioId"]');
  const laboratorioHelper = formulario.querySelector('#laboratorioHelp');
  const usuarioHelper = formulario.querySelector('#usuarioHelp');

  let error = false;

  if (laboratorioInput.value == '' || laboratorioInput.value == 0) {
    laboratorioHelper.textContent = 'Debes seleccionar un laboratorio';
    error = true;
  }
  if (usuarioInput.value == '') {
    usuarioHelper.textContent = 'Debes seleccionar un usuario';
    error = true;
  }
  if (!validarFechas()) {
    error = true;
  }

  if (error == true) {
    e.preventDefault();
  } else {
    $('#modalExportarFacturas').modal('hide');
    mostrarAlertaDescarga();
  }
}

function mostrarAlertaDescarga() {
  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-info', 'alert-dismissible', 'fade', 'show');
  alerta.setAttribute('role', 'alert');
  alerta.setAttribute('align', 'center');
  alerta.innerHTML = `
    La descarga con la relaciÃ³n de las facturas iniciarÃ¡ en breve.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

  const mainEl = document.querySelector('main');
  mainEl.prepend(alerta);
}
