let today = new Date();
let currentDay = today.getDay();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let chooseYear = document.getElementById("chooseYear");
let chooseMonth = document.getElementById("chooseMonth");


//pobranie DOM gdzie będą dni wyświetlane
const tbl = document.getElementById("calendar-body");
//pobranie przycisków
const previous = document.getElementById("previous");
const next = document.getElementById("next");



//Funkcje testowania
function test() {
    console.log(`działa`);
}


//Funkcja pójścia do wybranej daty
function goTo() {
    currentYear = parseInt(chooseYear.value);
    currentMonth = parseInt(chooseMonth.value);
    monthCalendar(currentMonth, currentYear);
}
//Funkcja pójścia do następnego miesiąca
function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    monthCalendar(currentMonth, currentYear);
}
//Funkcja pójścia do poprzedniego miesiąca
function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    monthCalendar(currentMonth, currentYear);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");


function monthCalendar(month, year) {
    //sprawdzenie jaki dzień miesiąca jest pierwszy
    let firstDay = (new Date(year, month)).getDay();
    //sprawdzenie liczby dni w miesiącu
    let daysInMonth = new Date(year, month, 0).getDate();

    // wyczyszczenie tablicy
    tbl.innerHTML = "";

    //wrzucenie informacji o aktualnym przeglądanym miesiącu do nagłówka
    monthAndYear.innerHTML = months[month] + " " + year;

    //Tworzenie komórek
    let date = 1;
    // Stworzenie wierszy
    for (let i = 0; i < 6; i++) {

        let row = document.createElement("tr");

        //Stworzenie komórek i uzupełnienie ich o odpowiadający dzień tygodnia
        for (let j = 0; j < 7; j++) {
            //jeśli dzień będzie mniejszy niż dzień poczatkowy to zostawi program pustą komórkę
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                //wrzucenie danych(cellText) do rodzica (cell)
                cell.appendChild(cellText);
                //wrzucenie komórki(cell) do rodzica (row)
                row.appendChild(cell);
            }
            //jeśli iterowana data będzie większa niż liczba dni w miesiącu to pętla zostanie przerwana
            else if (date > daysInMonth) {
                break;
            }
            //wstawienie komórek z dniami miesiąca do kalendarza
            else {
                let cell = document.createElement("td");
                cell.setAttribute("class", "cell")
                let cellText = document.createTextNode(date);

                cell.appendChild(cellText);

                row.appendChild(cell);
                date++;
            }

        }
        //wrzucenie rzędu(row) do rodzica (tbl)
        tbl.appendChild(row);
    }
}
//obsługa przycisków
next.addEventListener("click", nextMonth);
previous.addEventListener("click", previousMonth);
chooseMonth.addEventListener("change", goTo);
chooseYear.addEventListener("change", goTo);

//Metoda zmiany widoku
// function changeView() {
//     let chooseView = document.getElementById('view1').value;
//     console.log(chooseView);
//     if (chooseView == 1) {
//         //gdy widok WEEK
//     } else if (chooseView == 2) {
//         //gdy widok MONTH
//     } else if (chooseView == 3) {
//         //gdy widok YEAR
//     } else {
//         //gdy widok DAY
//     }
// }

//wywołanie funkcji monthCalendar z danymi currentMonth i currentYear
monthCalendar(currentMonth, currentYear);

















































//OBSŁUGA ZADAŃ
var toDoList = [];
var arrayWithTasks = [];
const form = document.getElementById('inputTask');
const listOfTask = document.getElementById('listOfTask');
let taskNumber = document.querySelector('h1 span');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');


//Pobranie daty
const getChosenDateIdentifier = () => {
    const taskOfDay = document.getElementById('taskDay');
    const taskOfMonth = document.getElementById('taskMonth');
    const taskOfYear = document.getElementById('taskYear');

    let dayOfDoingTask = taskOfDay.value;
    let monthOfDoingTask = taskOfMonth.value;
    let yearOfDoingTask = taskOfYear.value;

    return JSON.stringify(dayOfDoingTask + '.' + monthOfDoingTask + '.' + yearOfDoingTask);
}


//Dodawanie zadań
const addTask = (e) => {
    e.preventDefault();
    console.log(toDoList.length);
    const titleTask = input.value;
    //console.log(titleTask);
    //jak będzie pusty formularz to zakonczy działanie funkcji
    if (titleTask == "") {
        return;
    }
    //stworzenie elementu task i nadanie mu klasy task
    const task = document.createElement('li');
    task.className = 'task';
    //task ma teraz wartość zadania do zrobienia oraz przycisków
    task.innerHTML = titleTask + `<button class='deleteButton'>Delete</button><button class='editButton'>Edit</button>`;

    toDoList.push(task);
    arrayWithTasks.push(titleTask)

    //dodanie taska do listy na stronie
    listOfTask.appendChild(task);

    input.value = "";
    // const liItems = document.querySelectorAll('li.task').length;
    taskNumber.textContent = listItems.length;

    // task.querySelector('button').addEventListener('click', removeTask);

    //szukamy w naszym konkretnym tasku przycisku
    task.querySelector('.deleteButton').addEventListener('click', removeTask);
    //szukamy w naszym konkretnym tasku przycisku
    task.querySelector('.editButton').addEventListener('click', editTask);
    //lista za każdym razem czyszczona i od nowa generowana
    renderList();
}
//edytowanie zadania
const editTask = (e) => {
    //console.log(`działam`);
    const taskName = e.target.parentNode.textContent;
    const newStr = taskName.slice(0, taskName.length - 10);
    //console.log(taskName);
    console.log(newStr);
    input.value = newStr;
    removeTask(e);
}
//usuwanie zadania
const removeTask = (e) => {
    //bo chcemy usunąć element listy, który jest rodzicem przycisku
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    // console.log(index);
    //usuwanie jednego elmenetu z tablicy
    toDoList.splice(index, 1);
    arrayWithTasks.splice(index, 1)
    taskNumber.textContent = listItems.length;
    renderList();

}
// Renderowanie nowej listy
const renderList = () => {
    listOfTask.textContent = "";

    toDoList.forEach((toDoElement, id) => {
        //wartość key będzie taka sama jak dataset.key(id)id elementu tablicy
        toDoElement.dataset.key = id;
        //dodajemy wszystkie elementy z tablicy do listOfTask
        listOfTask.appendChild(toDoElement);
    })
    //wysłanie do Local Storage
    //stworzenie obiektu do wysyłki do Local Storage
    let dateIdentifier = getChosenDateIdentifier();
    localStorage.setItem(dateIdentifier, JSON.stringify(arrayWithTasks));
}


//Załadowanie zadań z Local Storage
const loadElementsFromLocalStorage = () => {
    listOfTask.textContent = "";

    let dateIdentifier = getChosenDateIdentifier();
    let arrayFromLocalStorage = JSON.parse(localStorage.getItem(dateIdentifier));
    console.log(arrayFromLocalStorage);
    //return arrayFromLocalStorage;
    //dodanie zadań z arrayFromLocalStorage do tablicy
    if (arrayFromLocalStorage == null) {
        console.log(`brak zadań`);
    } else {
        for (i = 0; i < arrayFromLocalStorage.length; i++) {
            const task = document.createElement('li');
            task.className = 'task';
            task.innerHTML = arrayFromLocalStorage[i] + `<button class='deleteButton'>Delete</button><button class='editButton'>Edit</button>`;
            // Dodanie elementu do listy
            listOfTask.appendChild(task);

            //szukamy w naszym konkretnym tasku przycisku
            task.querySelector('button').addEventListener('click', removeTask);
            task.querySelector('.editButton').addEventListener('click', editTask);
            taskNumber.textContent = arrayFromLocalStorage.length
            toDoList.push(task);

        }
    }


}





























//ustawienie kalendarza na dane przy pierwszym włączeniu
const firstLoad = () => {
    // console.log(`Pierwsze załadowanie`);
    const taskDay = document.getElementById('taskDay');
    taskDay.value = today.getDate();

    const taskMonth = document.getElementById('taskMonth');
    taskMonth.value = today.getMonth();

    document.getElementById('taskYear');
    taskYear.value = today.getFullYear();

    document.getElementById('chooseMonth').value = today.getMonth();
    document.getElementById('chooseYear').value = today.getFullYear();
    loadElementsFromLocalStorage();

}


//metoda uruchamiana po kliknięciu na komórkę z datą
window.onload = function () {

    document.getElementById('calendar-body').onclick = function (e) {

        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() == "td") {
            target.classList.toggle('mystyle');
            let txt = target.innerHTML;
            var numb = txt.match(/\d/g);
            numb = numb.join("");

            const taskOfDay = document.getElementById('taskDay');
            taskOfDay.value = numb;

            const taskOfMonth = document.getElementById('taskMonth');
            taskOfMonth.value = currentMonth;

            const taskOfYear = document.getElementById('taskYear');
            taskOfYear.value = currentYear;
            console.log(taskDay.value + "." + taskMonth.value + "." + taskYear.value);
        }
    };

};

//metoda zmieniająca klasę po kliknięciu
var table = document.querySelector('#calendar-body')
var selectedCells = table.getElementsByClassName('selected')

table.addEventListener('click', function (e) {
        var td = e.target

        if (td.tagName !== 'TD') {
            return
        }

        if (selectedCells.length) {
            selectedCells[0].className = ''
        }

        td.className = 'selected'
    }

)

goToToday = () => {
    // console.log(`dzisiaj`);
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    monthCalendar(currentMonth, currentYear);
}
firstLoad();
form.addEventListener('submit', addTask)