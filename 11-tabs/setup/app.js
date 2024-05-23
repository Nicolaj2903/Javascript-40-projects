
const about = document.querySelector('.about');
const buttons = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function (event) {
    console.log(event.target.dataset.id);

    const id = event.target.dataset.id;

    if (id) {
        buttons.forEach(function (button) {
            button.classList.remove('active');
            event.target.classList.add('active');
        });

        articles.forEach(function (article) {
            article.classList.remove('active');
        });

        const element = document.getElementById(id);
        element.classList.add('active');
    }
});