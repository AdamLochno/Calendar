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
monthCalendar(currentMonth, currentYear);



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
                let cellText = document.createTextNode(date);
                //stworzenie pola na zadania
                let note = document.createElement("div");

                //wrzucenie danych(cellText) do rodzica (cell)
                cell.appendChild(cellText);
                //wrzucenie danych(note) do rodzica (cell)
                cell.appendChild(note);
                //wrzucenie komórki(cell) do rodzica(row)
                row.appendChild(cell);
                date++;
            }

        }
        //wrzucenie rzędu(row) do rodzica (tbl)
        tbl.appendChild(row); // appending each row into calendar body.
    }
}

next.addEventListener("click", nextMonth);
previous.addEventListener("click", previousMonth);

chooseMonth.addEventListener("change", goTo);
chooseYear.addEventListener("change", goTo);