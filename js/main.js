//DOM
const form = document.querySelector('form');
const title = document.querySelector('#title');
const cost = document.querySelector('#value');
const type = document.querySelector('#type');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');

const budget = [];

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
        cost: cost.value,
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

    resetForm()
})
