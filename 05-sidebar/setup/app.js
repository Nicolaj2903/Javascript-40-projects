const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

toggleBtn.addEventListener('click', function() {
    // console.log(sidebar.classList);

    // Toggle:
    // If the class 'show-sidebar' doesn't exist on the element 'sidebar' add the class.
    // If the class does exists on the element 'sidebar', then remove the class 'show-sidebar'. 
    sidebar.classList.toggle('show-sidebar');
});

closeBtn.addEventListener('click', function() {
    // Removing the class 'show-sidebar' will hide the sidebar due to CSS magic
    sidebar.classList.remove('show-sidebar');
});