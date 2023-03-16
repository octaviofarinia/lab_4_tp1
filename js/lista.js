window.onload = async function() {
  await cargarUsuarios();
}

let buscarForm = document.getElementById("findUsersByUsernameForm");
buscarForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await cargarUsuarios();
});

bloquearUsuario = async (id) => {
  console.log("Bloquear usuario: " + id);
  const response = await fetch(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=Y`);
  const bloquearResult = await response.json();

  console.log("Bloquear Usuario Result ", bloquearResult);

  await cargarUsuarios(); 
};

desbloquearUsuario = async (id) => {
  console.log("Desbloquear usuario: " + id);
  const response = await fetch(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=N`);
  const desbloquearResult = await response.json();

  console.log("Desbloquear Usuario Result ", desbloquearResult);

  await cargarUsuarios(); 
};

cargarUsuarios = async () => {
  let usuarioBusquedaInput = document.getElementById("usuarioBusquedaInput");

  let response;
  
  if(usuarioBusquedaInput.value !== "") {
    response = await fetch(`http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${usuarioBusquedaInput.value}`)
  } else {
    response = await fetch("http://168.194.207.98:8081/tp/lista.php?action=BUSCAR")
  }
  
  let usuarios = await response.json();

  let html = "";
  usuarios.forEach(usuario => {
    html += `
      <tr class="${(usuario.bloqueado === 'Y' ? 'BannedUsuarioTableRow' : 'ActiveUsuarioTableRow')}">
        <th scope="row">${usuario.id}</th>
        <td>${usuario.usuario}</td>
        <td>${usuario.bloqueado}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.nombre}</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger" onclick="bloquearUsuario(${usuario.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-slash" viewBox="0 0 16 16">
              <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
            </svg>
          </button>
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-success" onclick="desbloquearUsuario(${usuario.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
            </svg>
          </button>
        </td>
      </tr>
    `
  });

  let tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = `
    <table class="table table-bordered border-dark">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Usuario</th>
        <th scope="col">Bloqueado</th>
        <th scope="col">Apellido</th>
        <th scope="col">Nombre</th>
        <th scope="col">Bloquear</th>
        <th scope="col">Desbloquear</th>
      </tr>
    </thead>
    <tbody id="usuariosTableBody">
      ${html}
    </tbody>
    </table>
  `
}
