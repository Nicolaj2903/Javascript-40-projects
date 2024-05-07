
// (1. OPTION) using selectors inside the element
const questions = document.querySelectorAll(".question");

questions.forEach(function(question) {
    // console.log(question);
    const button = question.querySelector(".question-btn");
    // console.log(button);

    button.addEventListener('click', function() {

        questions.forEach(function(item) {
            // console.log(item);
            if (item !== question) 
                {
                    item.classList.remove("show-text");
                }
        });

        question.classList.toggle("show-text");
    });
});

//(2. OPTION) traversing the dom

// const questionBtns = document.querySelectorAll(".question-btn");

// questionBtns.forEach(function(button) {
//     button.addEventListener("click", function(event) {
//         const question = event.currentTarget.parentElement.parentElement;
//         question.classList.toggle("show-text");
//     });
// });