class Selector {
    constructor(name) {
        this.name = name;
        this.styles = [];
    }

    addProperty(name, value) {
        this.styles.push({ name, value });
    }

    removeProperty(name) {
        this.styles = this.styles.filter(prop => prop.name !== name);
    }

    getCSS() {
        let result = `.${this.name} {\n`;
        this.styles.forEach(prop => {
            result += `  ${prop.name}: ${prop.value};\n`;
        });
        result += `}`;
        return result;
    }
}

const mySelector = new Selector("myClass");
mySelector.addProperty("color", "red");
mySelector.addProperty("font-size", "16px");
mySelector.removeProperty("color");
console.log(mySelector.getCSS());


class Button {
    constructor(width, height, text) {
        this.width = width;
        this.height = height;
        this.text = text;
    }

    showBtn() {
        document.write(`<button style="width:${this.width}px; height:${this.height}px;">${this.text}</button>`);
    }
}

class BootstrapButton extends Button {
    constructor(width, height, text, color) {
        super(width, height, text);
        this.color = color;
    }

    showBtn() {
        document.write(`<button style="width:${this.width}px; height:${this.height}px; background-color:${this.color}; color: white;">${this.text}</button>`);
    }
}

const btn1 = new Button(100, 40, "Звичайна кнопка");
btn1.showBtn();

const btn2 = new BootstrapButton(120, 50, "Bootstrap кнопка", "blue");
btn2.showBtn();


class ExtendedDate extends Date {
    constructor(year, month, day) {
        super(year, month, day);
    }

    getTextDate() {
        const months = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ];
        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    isFutureOrToday() {
        const now = new Date();
        return this >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    getNextDate() {
        const next = new Date(this);
        next.setDate(this.getDate() + 1);
        return next.toDateString();
    }
}

const myDate = new ExtendedDate(2025, 1, 28);

function outputLine(text) {
    const p = document.createElement('p');
    p.textContent = text;
    document.body.appendChild(p);
}

outputLine("Дата текстом: " + myDate.getTextDate());
outputLine("Майбутнє або сьогодні: " + myDate.isFutureOrToday());
outputLine("Високосний рік: " + myDate.isLeapYear());
outputLine("Наступна дата: " + myDate.getNextDate());
