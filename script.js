// 🌙 Alternar modo escuro/claro
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  const setTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    setTheme(newTheme);
  });
}

// 📱 Menu responsivo
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// 🔝 Botão voltar ao topo
const backToTop = document.createElement("button");
backToTop.classList.add("back-to-top");
backToTop.innerHTML = "↑";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ✨ Revelar seções ao rolar
const elements = document.querySelectorAll("section, .card");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top; // ✅ CORRIGIDO!
    if (top < triggerBottom) el.classList.add("show");
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// 📬 CÓDIGO DO FORMULÁRIO REMOVIDO
/*
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form && status) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Enviando...";
    setTimeout(() => {
      status.textContent = "Mensagem enviada com sucesso! ✅";
      form.reset();
    }, 1500);
  });
}
*/