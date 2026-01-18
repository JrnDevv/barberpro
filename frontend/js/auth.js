import { setSession } from "./storage.js";
// import { apiRequest } from "./api.js"; // quando ligar no backend

function showToast(el, msg, type = "error") {
  el.textContent = msg;
  el.className = `toast show ${type}`;
}

export function bindLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  const toast = document.querySelector("[data-toast]");
  const roleEl = document.querySelector("input[name='role']:checked");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role = (form.querySelector("input[name='role']:checked")?.value) || "CLIENT";

    if (!email || !password) {
      showToast(toast, "Preencha e-mail e senha.");
      return;
    }

    // ===== MOCK LOGIN =====
    // Depois você troca isso por:
    // const data = await apiRequest("/auth/login", { method:"POST", body: JSON.stringify({ email, password })});
    // setSession(data.token, data.user);

    const user = {
      id: 1,
      name: role === "ADMIN" ? "Admin BarberPro" : "Cliente BarberPro",
      email,
      role,
    };
    setSession("token_mock", user);

    showToast(toast, "Login realizado! Redirecionando...", "ok");

    setTimeout(() => {
      if (role === "ADMIN") {
        window.location.href = "./admin-dashboard.html";
      } else {
        window.location.href = "./client-dashboard.html";
      }
    }, 600);
  });
}

export function bindRegister() {
  const form = document.querySelector("[data-register-form]");
  if (!form) return;

  const toast = document.querySelector("[data-toast]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value.trim();
    const role = (form.querySelector("input[name='role']:checked")?.value) || "CLIENT";

    if (!name || !email || !password) {
      showToast(toast, "Preencha nome, e-mail e senha.");
      return;
    }

    // ===== MOCK REGISTER =====
    // Depois vira:
    // await apiRequest("/auth/register", { method:"POST", body: JSON.stringify({ name, email, phone, password, role })});

    showToast(toast, "Conta criada (mock)! Agora faça login.", "ok");
    setTimeout(() => (window.location.href = "./login.html"), 900);
  });
}
