// DATA
const budget = [];

// DOM
const form = document.querySelector('#form');

const type = document.querySelector('#type');
const title = document.querySelector('#title');
const value = document.querySelector('#value');

// Actions

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Расчет id
    let id = 1;
    if (budget.length > 0) {
        // Последний элемент в массиве
        const lastElement = budget[budget.length - 1];
        // Получить ID последнего
        const lastElId = lastElement.id;
        // Сформировать новый id = старый + 1
        id = lastElId + 1;

    }


    //Формируем запись
    const record = {
        id: 1,
        type: type.value,
        title: title.value,
        value: value.value,
    }

    budget.push(record)
})