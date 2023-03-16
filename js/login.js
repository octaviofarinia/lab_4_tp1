let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let usuarioInput = document.getElementById("usuarioInput");
  let claveInput = document.getElementById("claveInput");

  let usuarioLogin = {
    usuario: usuarioInput.value,
    clave: claveInput.value,
  };

  const response = await fetch(`http://168.194.207.98:8081/tp/login.php?user=${usuarioLogin.usuario}&pass=${usuarioLogin.clave}`)
  const loginResult = await response.json();

  console.log(usuarioLogin);
  console.log(loginResult);

  if (loginResult.respuesta === "OK") {
    window.open('http://localhost:5500/lista.html',"_self");
  } else {
    alert(loginResult.mje);
    claveInput.value = "";
  }
});