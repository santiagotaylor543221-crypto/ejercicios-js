// login.js
export function loginView() {
  const div = document.createElement("div");
  div.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p id="errorMsg" style="color:red;"></p>
  `;

  const form = div.querySelector("#loginForm");
  const emailInput = div.querySelector("#email");
  const passwordInput = div.querySelector("#password");
  const errorMsg = div.querySelector("#errorMsg");

  let attempts = 0;
  const maxAttempts = 3;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 🔹 Resetear estilos antes de validar
    emailInput.style.border = "";
    passwordInput.style.border = "";
    errorMsg.textContent = "";

    let emailValid = true;
    let passwordValid = true;

    // 🔹 Validación de email
    if (!email.includes("@") || !email.includes(".")) {
      emailValid = false;
      emailInput.style.border = "2px solid red";
    }

    // 🔹 Validación de password
    if (password.length < 6) {
      passwordValid = false;
      passwordInput.style.border = "2px solid red";
    }

    // 🔹 Mostrar mensajes según el error
    if (!emailValid && !passwordValid) {
      errorMsg.textContent = "Email and Password are invalid.";
      return;
    } else if (!emailValid) {
      errorMsg.textContent = "Invalid email format.";
      return;
    } else if (!passwordValid) {
      errorMsg.textContent = "Password must be at least 6 characters.";
      return;
    }

    try {
      // 🔹 Buscar usuario en JSON Server
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        // 🔹 Login correcto → guardar sesión
        const user = users[0];
        localStorage.setItem("session", JSON.stringify(user));
        window.location.hash = "#/dashboard"; // redirigir a dashboard
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          errorMsg.textContent = "Too many failed attempts. Try again later.";
          form.querySelector("button").disabled = true;
        } else {
          errorMsg.textContent = `Invalid credentials. Attempts left: ${maxAttempts - attempts}`;
        }
      }
    } catch (err) {
      errorMsg.textContent = "Server error. Please try again.";
      console.error(err);
    }
  });

  return div;
}
