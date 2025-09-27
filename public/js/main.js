// Плавное появление всего сайта
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded'); // (анимация уже в CSS по умолчанию)
});

// ===== Client stories: 1-by-1 с “вниз/вверх” анимацией =====
const testimonials = [
  { text: '“Natalia made our priorities obvious. We rebuilt the offer and hit our best quarter.”', cap: '— Alex P.' },
  { text: '“Clear steps and real momentum. Best investment this year.”', cap: '— Dana K.' },
  { text: '“We cut meeting time in half and tripled lead response speed in 6 weeks.”', cap: '— Sergey M.' },
  { text: '“From chaos to checklist. Delivery is predictable, churn is down.”', cap: '— Lina V.' }
];

const quoteEl = document.getElementById('quote');
const INTERVAL = 5000;
let i = 0;

// безопасно выставляем первую цитату
function setQuote(index) {
  quoteEl.innerHTML = `
    <p class="quote-text">${testimonials[index].text}</p>
    <footer class="quote-cap">${testimonials[index].cap}</footer>
  `;
}

setQuote(i);

function nextQuote() {
  // уходит вниз (slide-up -> прозрачность 0 и translateY(40px))
  quoteEl.classList.remove('slide-in', 'slide-in-active');
  quoteEl.classList.add('slide-up');

  // после ухода — меняем контент и “роняем” сверху
  setTimeout(() => {
    i = (i + 1) % testimonials.length;
    setQuote(i);

    // “падает” сверху
    quoteEl.classList.remove('slide-up');
    quoteEl.classList.add('slide-in');

    requestAnimationFrame(() => {
      // активируем фазу видимости
      quoteEl.classList.add('slide-in-active');
    });
  }, 280); // совпадает с CSS transition .28s
}

// автопрокрутка
setInterval(nextQuote, INTERVAL);
