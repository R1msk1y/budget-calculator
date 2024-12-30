//DOM
const form = document.querySelector('form');
const title = document.querySelector('#title');
const cost = document.querySelector('#value');
const type = document.querySelector('#type');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');

const budget = [];


function renderDemoData() {
    const demoData = [
        {title: 'Аренда квартиры', cost: 20000, type: 'exp'},
        {title: 'Бензин', cost: 10000, type: 'exp'},
        {title: 'Праздники', cost: 12000, type: 'exp'},
        {title: 'Зарплата', cost: 60000, type: 'inc'},
        {title: 'Фриланс', cost: 7000, type: 'inc'},
        {title: 'Авито', cost: 20000, type: 'inc'},
        {title: 'Наследство', cost: 100000, type: 'inc'},
        {title: 'Пиратский сундук', cost: 500000, type: 'inc'},
        {title: 'Дань золотой орде', cost: 10, type: 'exp'},

    ]
    let randomNum = Math.floor(Math.random() * demoData.length);
    let randomDemoObj = demoData[randomNum];
    title.value = randomDemoObj.title;
    cost.value = randomDemoObj.cost
    type.value = randomDemoObj.type;
}

renderDemoData()
calcBudget()

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
    if (totalIncome > 0) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome)
    }

}

function resetForm() {
    form.reset();
}

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
        title: title.value,
        cost: +cost.value,
        type: type.value,
    };
    //Пушим объект в массив
    budget.push(note);
    //Шаблон для записи с доходами
    const incomeTemplate = ` <li data-id="${note.id}" class="budget-list__item item item--income">
            <div class="item__title">${note.title}</div>
            <div class="item__right">
              <div class="item__amount">+ ${note.cost}</div>
              <button class="item__remove">
                <img src="./img/circle-green.svg" alt="delete" />
              </button>
            </div>
          </li>`;
    const expTemplate = ` <li data-id="${note.id}" class="budget-list__item item item--expense">
            <div class="item__title">${note.title}</div>
            <div class="item__right">
              <div class="item__amount">- ${note.cost}</div>
              <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
            </div>
          </li>`

    //Проверяем велью инпута, в какую колонку вносить запись - в расход, или доход
    if (title.value === '') {
        title.classList.add('form__input--error');
        return
    } else {
        title.classList.remove('form__input--error');
    }
    if (cost.value === '') {
        cost.classList.add('form__input--error');
        return
    } else {
        cost.classList.remove('form__input--error');
    }


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
        const curNote = budget.findIndex((el) => {
            if (el.id === id) {
                return true
            }
        })

        budget.splice(id, 1);
        parentEl.remove()
        calcBudget()


    }
})