// FAQ section toggle
const toggleBtn = document.querySelector(".faq-toggle");
const toggleIcon = toggleBtn.querySelector(".faq-icon");
const hiddenItems = document.querySelectorAll(".faq-item.hidden");
let expanded = false;

toggleBtn.addEventListener("click", () => {
  expanded = !expanded;

  hiddenItems.forEach((item) => {
    if (expanded) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });

  toggleIcon.src = expanded
    ? "./assets/toggle-up-icon.png"
    : "./assets/toggle-icon.png";
});

document.querySelectorAll(".faq-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const icon = btn.querySelector(".answer-icon");

    if (item.classList.contains("active")) {
      item.classList.remove("active");
      answer.style.maxHeight = "0px";
      icon.src = "./assets/plus-icon.png";
    } else {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.src = "./assets/answer-icon.png";
    }
  });
});

// End of FAQ section toggle
// Projects horizontal scroll

const wrapper = document.querySelector(".projects-wrapper");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

const step = 600; 
const maxScroll = wrapper.scrollWidth - wrapper.clientWidth; 

rightBtn.addEventListener("click", () => {
  if (wrapper.scrollLeft + step >= maxScroll) {
    
    wrapper.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    wrapper.scrollBy({ left: step, behavior: "smooth" });
  }
});

leftBtn.addEventListener("click", () => {
  if (wrapper.scrollLeft - step <= 0) {
    
    wrapper.scrollTo({ left: maxScroll, behavior: "smooth" });
  } else {
    wrapper.scrollBy({ left: -step, behavior: "smooth" });
  }
});

// End of projects horizontal scroll
// Telegram form submission

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".tgForm");
  const alertBox = document.getElementById("formAlert");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const token = "Secret";
      const chatId = "Secret";

      const name = this.name.value;
      const phone = this.phone.value;
      const message = this.message.value;

      const text = `Нове повідомлення з сайту:\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n💬 Повідомлення: ${message}`;

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
            alertBox.style.background = "#ffffff";
          } else {
            alertBox.textContent = "❌ Помилка при відправці.";
            alertBox.style.background = "#d50000";
          }

          alertBox.classList.add("show");
          setTimeout(() => {
            alertBox.classList.remove("show");
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
          alertBox.textContent = "⚠️ Помилка з'єднання.";
          alertBox.style.background = "#d50000";
          alertBox.classList.add("show");
          setTimeout(() => {
            alertBox.classList.remove("show");
          }, 3000);
        });
    });
  });
});

// End of Telegram form submission
//  Burger menu functionality

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");
const links = mobileMenu.querySelectorAll("a");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});

//end of burger menu functionality

// Projects cards toggle for mobile

const togggleBtn = document.getElementById("toggleCards");
const cards = document.querySelectorAll(".project-card");
const togggleBtnIcon = togggleBtn.querySelector(".faq-icon");

function initMobileCards() {
  if (window.innerWidth <= 768) {
    cards.forEach((card, index) => {
      if (index >= 2) {
        card.classList.add("hidden");
      }
    });

    togggleBtn.addEventListener("click", () => {
      const hiddenCards = document.querySelectorAll(".project-card.hidden");
      const isHidden = hiddenCards.length > 0;

      if (isHidden) {
        cards.forEach((card) => card.classList.remove("hidden"));
        togggleBtnIcon.src = "./assets/projects-toggle-up.png";
      } else {
        cards.forEach((card, index) => {
          if (index >= 2) {
            card.classList.add("hidden");
          }
        });
        togggleBtnIcon.src = "./assets/projects-toggle-down.png";
      }
    });
  } else {
    cards.forEach((card) => card.classList.remove("hidden"));
    togggleBtn.style.display = "none";
  }
}

initMobileCards();

window.addEventListener("resize", initMobileCards);

// End of projects cards toggle for mobile
// Price details modal //

const openModalBtn = document.getElementById("detailsModal");
const detailsModal = document.getElementsByClassName("details-modal")[0];
const closeDetailsBtn = document.getElementsByClassName("close-details-btn")[0];

openModalBtn.addEventListener("click", () => {
  detailsModal.classList.add("show");
  document.getElementById("overlay").classList.add("show");
});

closeDetailsBtn.addEventListener("click", () => {
  detailsModal.classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
});

// End of price details modal //
// Disable submit button until form is filled //

const detailsModalCheck = document.getElementsByClassName("details-modal");
const inputs = detailsModalCheck[0].querySelectorAll("input, textarea");
const submitBtn = detailsModalCheck[0].querySelector(".details-submit");

function checkForm() {
  let allFilled = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      allFilled = false;
    }
  });

  submitBtn.disabled = !allFilled;
}

inputs.forEach((input) => {
  input.addEventListener("input", checkForm);
});

checkForm();
// end of disable submit button until form is filled //
//disable for contact form too//

const contactForm = document.getElementsByClassName("contact-form");
const contactInputs = contactForm[0].querySelectorAll(
  ".contact-textarea, .contact-input"
);
const contactSubmitBtn = contactForm[0].querySelector(".submit-btn");

function checkContactForm() {
  let allFilled = true;
  contactInputs.forEach((input) => {
    if (!input.value.trim()) {
      allFilled = false;
    }
  });

  contactSubmitBtn.disabled = !allFilled;
}

contactInputs.forEach((input) => {
  input.addEventListener("input", checkContactForm);
});

checkContactForm();
//end of disable for contact form too//
