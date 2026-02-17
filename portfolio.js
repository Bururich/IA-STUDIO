// Smooth horizontal scrolling for project cards//
const wrapper = document.querySelector(".projects-wrapper");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

const step = 10;

rightBtn.onclick = () => {
  wrapper.scrollBy({ left: step, behavior: "smooth" });
};

leftBtn.onclick = () => {
  wrapper.scrollBy({ left: -step, behavior: "smooth" });
};

//end of horizontal scrolling code
// Modal functionality for project details

const openModalBtn = document.getElementById("openModal");
const detailsModal = document.getElementsByClassName("modal-connect")[0];
const closeDetailsBtn = document.getElementsByClassName("close-porttfolio-btn")[0];


openModalBtn.addEventListener("click", () => {
  detailsModal.classList.add("show");
  document.body.style.overflow = "hidden";
  document.querySelectorAll(".modal-container [required]") .forEach(el => el.dataset.wasRequired = "true");
});


function closeModal() {
  detailsModal.classList.remove("show");
  document.body.style.overflow = "";
  document.querySelectorAll(".modal-container [required]") .forEach(el => el.removeAttribute("required"));
}

closeDetailsBtn.addEventListener("click", closeModal);


detailsModal.addEventListener("click", (e) => {
  if (e.target === detailsModal) closeModal();
});


function showAlert(message, color = "#4caf50") {
  const alertBox = document.getElementById("formAlert");
  const alertText = alertBox.querySelector(".alert-text");
  const progress = alertBox.querySelector(".alert-progress");

  alertText.textContent = message;
  alertBox.style.background = color;

  
  progress.style.transition = "none";
  progress.style.transform = "scaleX(1)";

  
  alertBox.classList.add("show");
  alertBox.classList.remove("hide");

  
  setTimeout(() => {
    progress.style.transition = "transform 3s linear";
    progress.style.transform = "scaleX(0)";
  }, 50);

 
  setTimeout(() => {
    alertBox.classList.add("hide");
    alertBox.classList.remove("show");
  }, 3000);
}

//end of modal code
// Form submission handling with Telegram Bot API

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".portfolioForm");
  const alertBox = document.getElementById("formAlert");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const token = "8480703852:AAEq6x9ILmZgaYbFmojmSLXeJNWg8E-sUWg";
      const chatId = "780514846";

      const name = this.name.value;
      const email = this.email.value;
      const message = this.message.value;

      const text = `Нове повідомлення з сайту:\n👤 Ім'я: ${name}\n� Електронна пошта: ${email}\n💬 Повідомлення: ${message}`;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.reset();
            showAlert("✔️ Message sent successfully!", "#4caf50");

          } else {
            showAlert("❌ Error sending message.", "#d50000");
          }

          alertBox.classList.add("show");
          setTimeout(() => {
            alertBox.classList.remove("show");
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
          showAlert("⚠️ Connection error.", "#d50000");
          alertBox.style.background = "#d50000"; 
          alertBox.classList.add("show");
          setTimeout(() => {
            alertBox.classList.remove("show");
          }, 3000);
        });
    });
  });
});