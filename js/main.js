//DOM
const form = document.querySelector('form');
const title = document.querySelector('#title');
const cost = document.querySelector('#value');
const type = document.querySelector('#type');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');

const incomeEl = document.querySelector('#total-income');
const expenseEl = document.querySelector('#total-expense');
const budgetEl = document.querySelector('#budget');

const percentageWrapper = document.querySelector('#expense-percents-wrapper');
const monthEl = document.querySelector('#month');
const yearEl = document.querySelector('#year');
const budget = [];

//Функции
const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
})
function renderDemoData() {
    const demoData = [
        {title: 'Аренда квартиры', cost: 1500, type: 'exp'},
        {title: 'Бензин', cost: 2000, type: 'exp'},
        {title: 'Праздники', cost: 2000, type: 'exp'},
        {title: 'Зарплата', cost: 1000, type: 'inc'},
        {title: 'Авито', cost: 200, type: 'inc'},
        {title: 'Должники', cost: 500, type: 'inc'},
        {title: 'Пиратский сундук', cost: 1000, type: 'inc'},
        {title: 'Дань золотой орде', cost: 10, type: 'exp'},

    ]
    let randomNum = Math.floor(Math.random() * demoData.length);
    let randomDemoObj = demoData[randomNum];
    title.value = randomDemoObj.title;
    cost.value = randomDemoObj.cost
    type.value = randomDemoObj.type;
}
function resetForm() {
    form.reset();
}
function calcBudget() {

    // Считаем общий доход

    let totalIncome = budget.reduce((total, element) => {
        if (element.type === 'inc') {

            return total + element.cost;

        } else {
            return total
        }

    }, 0)


    // Считаем общий расход

    let totalExpense = budget.reduce((total, element) => {
        if (element.type === 'exp') {
            return total + element.cost;
        } else {
            return total
        }
    }, 0)


    const totalBudget = totalIncome - totalExpense;


    let expensePercents = 0
    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome)
    }

    //Выводим данные на страницу
    incomeEl.innerHTML = '+ ' + priceFormatter.format(totalIncome);
    expenseEl.innerHTML = '- ' + priceFormatter.format(totalExpense)
    budgetEl.innerHTML = priceFormatter.format(totalBudget);

    let percentageDiv = `<div class="badge">${expensePercents}%</div>`;
    expensePercents > 0 ? percentageWrapper.innerHTML = percentageDiv : percentageWrapper.innerHTML = '';

}
function displayMonth (){
    const now = new Date();
    const year = now.getFullYear();

    const timeFormatter = new Intl.DateTimeFormat('re-RU', {
        month: 'long'
    })
    const month = timeFormatter.format(now)
    monthEl.innerHTML = month;
    yearEl.innerHTML = year;

}
//Actions
displayMonth()
renderDemoData()
calcBudget()
//Отправка формы, добавление записей
form.addEventListener('submit', (e) => {
// Остановили стандартное поведение при отправке формы
    e.preventDefault();

    //Определяем id
    let id = 1;
    if (budget.length > 0) {
        id = budget.length + 1
    }
    //Собираем данные из формы и записываем в объект
    const note = {
        id: id,
        title: title.value.trim(),
        cost: +cost.value,
        type: type.value,
    };
    //Пушим объект в массив
    budget.push(note);
    //Шаблон для записи с доходами
    const incomeTemplate = ` <li data-id="${note.id}" class="budget-list__item item item--income">
            <div class="item__title">${note.title}</div>
            <div class="item__right">
              <div class="item__amount">+ ${priceFormatter.format(note.cost)}</div>
              <button class="item__remove">
                <img src="./img/circle-green.svg" alt="delete" />
              </button>
            </div>
          </li>`;
    const expTemplate = ` <li data-id="${note.id}" class="budget-list__item item item--expense">
            <div class="item__title">${note.title}</div>
            <div class="item__right">
              <div class="item__amount">- ${priceFormatter.format(note.cost)}</div>
              <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
            </div>
          </li>`

    //Выводим ошибку, если поле одно из полей не заполнено
    if (title.value.trim() === '') {
        title.classList.add('form__input--error');
        return
    } else {
        title.classList.remove('form__input--error');
    }
    if (cost.value.trim() === '' || +cost.value <= 0) {
        cost.classList.add('form__input--error');
        return
    } else {
        cost.classList.remove('form__input--error');
    }

    //Проверяем велью инпута, в какую колонку вносить запись - в расход, или доход
    if (note.type === 'inc') {
        incomesList.insertAdjacentHTML('afterbegin', incomeTemplate);
    }
    //Проверяем велью инпута, в какую колонку вносить запись - в расход, или доход
    if (note.type === 'exp') {
        expensesList.insertAdjacentHTML('afterbegin', expTemplate);
    }

    calcBudget()
    resetForm()
    renderDemoData()

})

//Удаление записей
document.addEventListener('click', (e) => {
    //Проверяем что клик был сделан по кнопке у которой есть определенный родитель
    if (e.target.closest('.item__remove')) {
        const parentEl = e.target.closest('.budget-list__item');
        const id = +parentEl.dataset.id;
        const curNoteIndex = budget.findIndex((el) => {
            if (el.id === id) {
                return true
            }
        })

        //Удаляем из массива
        budget.splice(curNoteIndex, 1);
        //Удаляем запись со страницы
        parentEl.remove()
        //Считаем бюджет
        calcBudget()


    }
})