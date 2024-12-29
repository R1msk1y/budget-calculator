// DATA
const budget = [];

// DOM
const form = document.querySelector('#form');
const type = document.querySelector('#type');
const title = document.querySelector('#title');
const value = document.querySelector('#value');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');

// Functions
function insertTestData() {
    const testData = [
        {type: 'inc', title: 'Фриланс', value: 20000},
        {type: 'inc', title: 'Квартира', value: 10000},
        {type: 'inc', title: 'Вклады', value: 5000},
        {type: 'exp', title: 'Продукты', value: 1000},
        {type: 'exp', title: 'Такси', value: 3000},
        {type: 'exp', title: 'Досуг', value: 7000},
        {type: 'exp', title: 'Праздники', value: 3000},
    ];

    // Get random index from 0 to array.length - 1
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const randomIndex = getRandomInt(testData.length);

    const randomData = testData[randomIndex];

    type.value = randomData.type;
    title.value = randomData.title;
    value.value = randomData.value;
}

function clearForm (){
    form.reset();
}

// Actions
insertTestData()
form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Проверка формы на заполненность


    if (title.value.trim() === '') {
        title.classList.add('form__input--error');
        return
    } else {
        title.classList.remove('form__input--error');
    }

    if (value.value.trim() === '' || +value.value <= 0) {
        value.classList.add('form__input--error');
        return
    } else {
        value.classList.remove('form__input--error');
    }


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
        title: title.value.trim(),
        value: value.value,
    }

    // Добавляем запись в данные(пушим в массив)
    budget.push(record)
    // Отображаем доход на странице
    if (record.type === 'inc') {
        const html = `  <li data-id="${record.id}" class="budget-list__item item item--income">
            <div class="item__title">${record.title}</div>
            <div class="item__right">
              <div class="item__amount">+ ${record.value}</div>
              <button class="item__remove">
                <img src="./img/circle-green.svg" alt="delete" />
              </button>
            </div>
          </li>`
        incomesList.insertAdjacentHTML('afterbegin', html);

    }
    // Отображаем расход на странице
    if (record.type === 'exp') {
        const html = `<li data-id="${record.id}" class="budget-list__item item item--expense">
            <div class="item__title">${record.title}</div>
            <div class="item__right">
              <div class="item__amount">- ${record.value}</div>
              <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
            </div>
          </li>`;
        expensesList.insertAdjacentHTML('afterbegin', html);

    }
    clearForm();
    insertTestData();
})