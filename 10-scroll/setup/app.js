// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener('click', function () {
    // linksContainer.classList.toggle('show-links');
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    if (containerHeight === 0) { // 0 by default (because of css)
        linksContainer.style.height = `${linksHeight}px`
    }
    else {
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const navBar = document.getElementById('nav');
const topLink = document.querySelector(".top-link");

window.addEventListener('scroll', function () {
    const scrollHeight = this.window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navBar.classList.add('fixed-nav');
    }
    else {
        navBar.classList.remove('fixed-nav');
    }

    // Arbitrary number
    if (scrollHeight > 500) {
        topLink.classList.add('show-link');
    }
    else {
        topLink.classList.remove('show-link');
    }
});

// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Navigate to specific spot
        const id = event.currentTarget.getAttribute('href').slice(1); // slice() extracts a section of a string without modifying original string.
        // In this example slice() simply removes the '#' from the href.  

        const element = document.getElementById(id);

        // Calculate the height
        const fixedNav = navBar.classList.contains('fixed-nav');
        const navHeight = navBar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        let position = element.offsetTop - navHeight;

        // !fixedNav --> on a small screen
        if (!fixedNav) {
            position = position - navHeight;
        }

        // Why 82?
        if (navHeight > 82) {
            position = position + containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position
        });

        // Will close the nav bar upon clicking a link, for SMALL screens
        linksContainer.style.height = 0;
    });
});


