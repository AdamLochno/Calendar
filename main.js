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


const form = document.getElementById('inputTask');
const listOfTask = document.getElementById('listOfTask');
const input = document.querySelector('input');
const listaZadan = document.getElementById('listaZadan')
var toDoList = [];


//metoda usuwająca zadania
const removeTask = (e) => {
    const index = e.target.parentNode.dataset.key;
    console.log(index);
    toDoList.splice(index, 1);
    renderList();
}

//metoda dodająca zadanie
function addTask(e) {
    e.preventDefault();
    //pobranie wybranej daty
    const taskOfDay = document.getElementById('taskDay');
    const taskOfMonth = document.getElementById('taskMonth');
    const taskOfYear = document.getElementById('taskYear');

    //przypisanie pobranych wartości daty zadania do zmiennych
    let dayOfDoingTask = taskOfDay.value;
    let monthOfDoingTask = taskOfMonth.value;
    let yearOfDoingTask = taskOfYear.value;


    //console.log(input.value);
    const titleTask = input.value;
    //zabezpieczenie przed dodawaniem pustych zadań
    if (titleTask === "") {
        return;
    }

    // //stworzenie zadania i dodanie do listy
    const task = document.createElement('li');
    const task01 = document.createElement('li');
    task.className = 'task';
    task01.className = 'task';

    task.innerHTML = titleTask + "<button id='deleteButton'>Usuń</button>";
    task01.innerHTML = titleTask;
    //dodanie taska do tablicy

    toDoList.push(titleTask);

    listOfTask.appendChild(task);

    //dodanie zadania do kalendarza
    listaZadan.appendChild(task01);


    //czyszczenie pola do wpisywania zadań

    input.value = "";


    //Wysłanie zadania do Local Storage

    // Zabawa z Local Storage
    // localStorage.setItem('date', currentDay);
    // console.log(localStorage.getItem('date'));

    //localStorage
    // let day = new Date();
    let example = {
        zadania: toDoList,

        date: dayOfDoingTask + '.' + monthOfDoingTask + '.' + yearOfDoingTask,
    };
    localStorage.setItem('date', JSON.stringify(example));
    console.log(JSON.parse(localStorage.getItem('date')));
    task.querySelector('button').addEventListener('click', removeTask);
}
// Metoda do odświeżania widoku tablicy po usunięciu
// const renderList = () => {
//     listOfTask.textContent = "";
//     toDoList.forEach((toDoElement, key) => {
//         toDoElement.dataset.key = key;
//         listOfTask.appendChild(toDoElement);
//     })
// }
form.addEventListener('submit', addTask);
























































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
            console.log(numb);
            console.log(currentMonth);
            console.log(currentYear);
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

// let today = new Date();
// let example = {
//     title: 'nowy',
//     date: today.getDate()
// };
// localStorage.setItem('object', JSON.stringify(example));
// console.log(JSON.parse(localStorage.getItem('object')));