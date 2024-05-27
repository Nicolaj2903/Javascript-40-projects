
class Counter {
    constructor(element, value) {
        this.counter = element;
        this.value = value;

        this.valueText = element.querySelector('.value');
        this.valueText.textContent = this.value;

        this.decreaseButton = element.querySelector('.decrease');
        this.resetButton = element.querySelector('.reset');
        this.increaseButton = element.querySelector('.increase');

        this.decrease = this.decrease.bind(this);
        this.reset = this.reset.bind(this);
        this.increase = this.increase.bind(this);

        this.decreaseButton.addEventListener('click', this.decrease);
        this.resetButton.addEventListener('click', this.reset);
        this.increaseButton.addEventListener('click', this.increase);
    };

    decrease() {
        this.value--;
        this.valueText.textContent = this.value;
    };

    reset() {
        this.value = 0;
        this.valueText.textContent = this.value;
    };

    increase() {
        this.value++;
        this.valueText.textContent = this.value;
    };
};

function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    }
    else {
        throw new Error(`${element} doesn't exist`);
    };
};

const firstCounter = new Counter(getElement('.first-counter'), 100);
const secondCounter = new Counter(getElement('.second-counter'), 200);