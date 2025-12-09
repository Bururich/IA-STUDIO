// FAQ section toggle
const toggleBtn = document.querySelector('.faq-toggle');
const toggleIcon = toggleBtn.querySelector('.faq-icon');
const hiddenItems = document.querySelectorAll('.faq-item.hidden');
let expanded = false;

toggleBtn.addEventListener('click', () => {
  expanded = !expanded;

  hiddenItems.forEach(item => {
    if (expanded) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });

  toggleIcon.src = expanded
    ? '/assets/toggle-up-icon.png'
    : '/assets/toggle-icon.png';
});

document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const icon = btn.querySelector('.answer-icon');

    if (item.classList.contains('active')) {
      
      item.classList.remove('active');
      answer.style.maxHeight = '0px';
      icon.src = '/assets/plus-icon.png';
    } else {
      
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.src = '/assets/answer-icon.png';
    }
  });
});

// End of FAQ section toggle
// Projects horizontal scroll

const wrapper = document.querySelector('.projects-wrapper');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

leftBtn.addEventListener('click', () => {
  wrapper.scrollBy({ left: -300, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  wrapper.scrollBy({ left: 300, behavior: 'smooth' });
});

// End of projects horizontal scroll
// Telegram form submission

document.getElementById('tgForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

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
      parse_mode: "HTML"
    })
  })
  .then(res => res.json())
  .then(data => {
    const alertBox = document.getElementById('formAlert');

    if (data.ok) {
      this.reset();
      alertBox.textContent = " Повідомлення успішно надіслано!";
      alertBox.style.background = "#00c853";
    } else {
      alertBox.textContent = "❌ Помилка при відправці.";
      alertBox.style.background = "#d50000";
    }

    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 3000);
  })
  .catch(err => {
    console.error(err);
    const alertBox = document.getElementById('formAlert');
    alertBox.textContent = "⚠️ Помилка з'єднання.";
    alertBox.style.background = "#d50000";
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 3000);
  });
});

// End of Telegram form submission
//  Burger menu functionality

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');
const links = mobileMenu.querySelectorAll('a');


burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
});


links.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
  });
});

//end of burger menu functionality

// Projects cards toggle for mobile

const togggleBtn = document.getElementById('toggleCards');
const cards = document.querySelectorAll('.project-card');
const togggleBtnIcon =togggleBtn.querySelector('.faq-icon');


function initMobileCards() {
  if (window.innerWidth <= 768) {
    
    cards.forEach((card, index) => {
      if (index >= 2) {
        card.classList.add('hidden');
      }
    });

    togggleBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.project-card.hidden');
      const isHidden = hiddenCards.length > 0;

      if (isHidden) {
        cards.forEach(card => card.classList.remove('hidden'));
        togggleBtnIcon.src = '/assets/projects-toggle-up.png';
      } else {
        cards.forEach((card, index) => {
          if (index >= 2) {
            card.classList.add('hidden');
          }
        });
        togggleBtnIcon.src = '/assets/projects-toggle-down.png';
      }
    });
  } else {
    
    cards.forEach(card => card.classList.remove('hidden'));
    togggleBtn.style.display = "none";
  }
}


initMobileCards();


window.addEventListener('resize', initMobileCards);

// End of projects cards toggle for mobile