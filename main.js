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
                //stworzenie pola na zadania
                let note = document.createElement("div");

                note.setAttribute("class", "note");
                //wrzucenie danych(cellText) do rodzica (cell)
                cell.appendChild(cellText);
                //wrzucenie obiektu(note) do rodzica (cell)
                cell.appendChild(note);
                //komórka note zawierać będzie teraz w sobie div + ul
                note.innerHTML = "<div id='taskField'></div>" + "<ul id='listaZadan'></ul>";
                //zdarzenie gdy następuje dwuklik
                cell.addEventListener("dblclick", test);
                //wrzucenie komórki(cell) do rodzica(row)
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

//const note = document.getElementById("task");

//Metoda zmiany widoku
function changeView() {
    let chooseView = document.getElementById('view1').value;
    console.log(chooseView);
    if (chooseView == 1) {
        //gdy widok WEEK
    } else if (chooseView == 2) {
        //gdy widok MONTH
    } else if (chooseView == 3) {
        //gdy widok YEAR
    } else {
        //gdy widok DAY
    }
}

//wywołanie funkcji monthCalendar z danymi currentMonth i currentYear
monthCalendar(currentMonth, currentYear);


















































//OBSŁUGA ZADAŃ
const toDoList = [];
const form = document.getElementById('inputTask');
const ul = document.getElementById('listOfTask');
const taskNumber = document.querySelector('h1 span');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');
const ListForLocalStorage = [];

//renderowanie Listy


//usuwanie zadania
const removeTask = (e) => {
    //bo chcemy usunąć element listy, który jest rodzicem przycisku
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    // console.log(index);
    //usuwanie jednego elmenetu z tablicy
    toDoList.splice(index, 1);
    ListForLocalStorage.splice(index, 1);
    taskNumber.textContent = listItems.length;
    renderList();



}

//edytowanie zadania
const editTask = (e) => {
    console.log(`działam`);
    const taskName = e.target.parentNode.textContent;
    const newStr = taskName.slice(0, taskName.length - 10);
    //console.log(taskName);
    console.log(newStr);
    input.value = newStr;
    removeTask(e);
}

//Dodawanie zadań
const addTask = (e) => {
    e.preventDefault();
    const titleTask = input.value;
    //console.log(titleTask);

    //jak będzie pusty formularz to zakonczy działąnie funkcji
    if (titleTask == "") {
        return;
    }
    //stworzenie elementu task i nadanie mu klasy task
    const task = document.createElement('li');
    task.className = 'task';
    //task ma teraz wartość zadania do zrobienia oraz przycisków
    task.innerHTML = titleTask + "<button class='deleteButton'>Delete</button>" + "<button class='editButton'>Edit</button>";
    //dodanie taska do tablicy
    toDoList.push(task);
    ListForLocalStorage.push(titleTask);
    console.log(ListForLocalStorage);
    //lista za każdym razem czyszczona i od nowa generowana
    renderList();

    //dodanie taska do listy na stronie
    ul.appendChild(task);
    input.value = "";
    // const liItems = document.querySelectorAll('li.task').length;
    taskNumber.textContent = listItems.length;

    //szukamy w naszym konkretnym tasku przycisku
    task.querySelector('.deleteButton').addEventListener('click', removeTask);
    //szukamy w naszym konkretnym tasku przycisku
    task.querySelector('.editButton').addEventListener('click', editTask);







}
let i = 0;
const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        //wartość key będzie taka sama jak dataset.key(id)id elementu tablicy
        toDoElement.dataset.key = key;
        //dodajemy wszystkie elementy z tablicy do ul-unordered list
        ul.appendChild(toDoElement);
    })


    //wysłanie do Local Storage
    //stworzenie obiektu do wysyłki do Local Storage
    let example = {
        zadania: ListForLocalStorage, //zadania to tablica z zadaniami do zrobienia
        date: taskDay.value + "." + taskMonth.value + "." + taskYear.value,
    }
    // console.log(example.zadania.length);
    //wysłanie do Local Storage

    localStorage.setItem('date[i]', JSON.stringify(example));
    console.log(example);
    i++;
}
form.addEventListener('submit', addTask)



// let example = {
//     zadania: toDoList,

//     date: dayOfDoingTask + '.' + monthOfDoingTask + '.' + yearOfDoingTask,
// };
// localStorage.setItem('date', JSON.stringify(example));
// console.log(JSON.parse(localStorage.getItem('date')));
// task.querySelector('button').addEventListener('click', removeTask);

































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



}
firstLoad();





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
})


















//Zabawa z Local Storage
// localStorage.setItem('date', '23.05.1994');
// console.log(localStorage.getItem('date'));

// let day = new Date();
// let obiektProbny = {
//     title: 'nowy',
//     date: today.getDate(),
//     zadania: [1, 2, 3, 4, 5],
// };
// localStorage.setItem('Proba', JSON.stringify(obiektProbny));
// console.log(JSON.parse(localStorage.getItem('Proba')));
// console.log(obiektProbny.zadania[0]);
// console.log(obiektProbny.zadania.length);
// let k = 0;
// for (k = 0; k < obiektProbny.zadania.length; k++) {

//     console.log(obiektProbny.zadania[k]);
// }