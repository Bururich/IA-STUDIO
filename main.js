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

