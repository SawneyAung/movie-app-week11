// Live Search
const searchInput = document.getElementById('searchInput');
const movieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    movieCards.forEach(card => {
        const title = card.getAttribute('data-title');
        card.style.display = title.includes(searchText) ? 'block' : 'none';
    });
});

// Scroll To Top

// Show/hide back to top button
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top smoothly
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Review Sort

document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', () => {
        const sortType = sortSelect.value;

        document.querySelectorAll('.review-list').forEach(list => {
        const items = Array.from(list.querySelectorAll('.review-item'));

        let sorted;
        if (sortType === 'high') {
            sorted = items.sort((a, b) => b.dataset.rating - a.dataset.rating);
        } else if (sortType === 'low') {
            sorted = items.sort((a, b) => a.dataset.rating - b.dataset.rating);
        } else {
            sorted = items;
        }

        list.innerHTML = '';
        sorted.forEach(item => list.appendChild(item));
        });
    });
});

// Review Submit

document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.querySelector('input[name="name"]');
    const rating = document.querySelector('select[name="rating"]');
    const comment = document.querySelector('textarea[name="comment"]');

    // Trim input values
    const nameVal = name.value.trim();
    const commentVal = comment.value.trim();

    if (!rating.value || !commentVal || commentVal.length < 10) {
        e.preventDefault(); // Stop form submit

        let alertMsg = '';
        if (!rating.value) alertMsg += 'Please select a rating.\n';
        if (!commentVal) alertMsg += 'Comment cannot be empty.\n';
        if (commentVal.length < 10) alertMsg += 'Comment must be at least 10 characters.\n';

        alert(alertMsg);
        }
    });