(() => {
  "use strict";

  const otherButton = document.getElementById("otherAmountButton");
  const panel = document.getElementById("otherAmountPanel");
  const form = document.getElementById("donationForm");
  const submitButton = document.getElementById("submitButton");
  const status = document.getElementById("formStatus");

  if (!otherButton || !panel || !form || !submitButton || !status) return;

  const fields = {
    fullName: document.getElementById("fullName"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    amount: document.getElementById("amount")
  };

  const errorFor = (id) => document.querySelector(`[data-error-for="${id}"]`);

  function setFieldError(field, message) {
    field.setAttribute("aria-invalid", message ? "true" : "false");
    const error = errorFor(field.id);
    if (error) error.textContent = message;
  }

  function cleanText(value, maxLength) {
    return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  }

  function validate() {
    let valid = true;

    const name = cleanText(fields.fullName.value, 120);
    const phone = cleanText(fields.phone.value, 30);
    const email = fields.email.value.trim().slice(0, 160);
    const amount = fields.amount.value.trim();

    fields.fullName.value = name;
    fields.phone.value = phone;
    fields.email.value = email;

    if (!name) {
      setFieldError(fields.fullName, "Ingresa tu nombre completo.");
      valid = false;
    } else {
      setFieldError(fields.fullName, "");
    }

    if (!phone) {
      setFieldError(fields.phone, "Ingresa tu número de celular.");
      valid = false;
    } else if (!/^[0-9+()\s.-]{7,30}$/.test(phone)) {
      setFieldError(fields.phone, "Ingresa un número de celular válido.");
      valid = false;
    } else {
      setFieldError(fields.phone, "");
    }

    if (!email) {
      setFieldError(fields.email, "Ingresa tu correo electrónico.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setFieldError(fields.email, "Ingresa un correo electrónico válido.");
      valid = false;
    } else {
      setFieldError(fields.email, "");
    }

    const numericAmount = Number(amount);
    if (!amount) {
      setFieldError(fields.amount, "Ingresa el valor que deseas donar.");
      valid = false;
    } else if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFieldError(fields.amount, "El valor debe ser numérico y mayor que cero.");
      valid = false;
    } else {
      setFieldError(fields.amount, "");
    }

    return valid;
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `form-status ${type}`;
  }

  otherButton.addEventListener("click", () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    otherButton.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen) {
      window.setTimeout(() => {
        fields.fullName.focus({ preventScroll: true });
      }, 0);
    }
  });

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showStatus("", "");

    if (!validate()) {
      showStatus("Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    // Honeypot: if a bot fills this hidden field, stop without sending data.
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== "") {
      showStatus("No pudimos enviar la solicitud. Por favor intenta nuevamente.", "error");
      return;
    }

    const endpoint = form.action;
    if (endpoint.includes("REEMPLAZAR_CON_TU_ID")) {
      showStatus("El formulario aún no está conectado a Formspree. Configura el ID indicado en README.md.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando…";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      Object.values(fields).forEach((field) => setFieldError(field, ""));
      showStatus(
        "Gracias por tu interés en apoyar esta causa. Hemos recibido tu solicitud y te enviaremos el enlace de pago.",
        "success"
      );
    } catch (error) {
      showStatus("No pudimos enviar la solicitud. Por favor intenta nuevamente.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Solicitar enlace de pago";
    }
  });
})();
