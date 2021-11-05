/**
 * Called everytime form-input HTML element generates an Submit event. 
 * It exatracts the values from the form then, it creates a new row, 
 * and append the row to the entry-table.
 * @param {event} event associated to the HTML element
 */
function handleSubmit(event) {
    event.preventDefault();

    // Get the elements value
    let desc = event.target.children[1].value;
    let cat = event.target.children[3].value;
    let day = event.target.children[5].value;
    let oneAmount = event.target.children[7].value;


    // Get the table division
    let table = document.getElementById("entry-table");

    // Create a new table row
    let table_row = document.createElement("tr");
    table_row.className = "entry-row";
 
    if (cat === "income") {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td class="income">${oneAmount}</td>
    `
    } else {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td>${oneAmount}</td>
    `
    }

    // Append the new row to the HTML table element
    table.children[0].children[1].appendChild(table_row);

    // event.target.reset();
    updateDashboard();
}

let form = document.getElementById('form-input');
form.addEventListener('submit', handleSubmit);

/**
 * Iterates through the rows and calcultates the current balance.
 */

function updateBalance() {

    let rows = document.getElementsByClassName("entry-row");

    let balance = 0;

    for (let row of rows) {

        balance += parseFloat(row.children[3].textContent);
    }

    let currentBalance = document.getElementById("balance").children[0];
    currentBalance.textContent = balance.toString();
}

/**
 * Updates the monthly balance with entrys that match the month and year.
 */

function updateMonthlyBalance() {

    let rows = document.getElementsByClassName("entry-row");

    let monthlyAmount = 0;
    let today = new Date();
    let month = today.getUTCMonth();
    let year = today.getUTCFullYear();

    for (let row of rows) {


        let rowDate = new Date(row.children[2].textContent);

        if (month === rowDate.getUTCMonth() && year === rowDate.getUTCFullYear()) {

            monthlyAmount += parseFloat(row.children[3].textContent);

        }

    }

    let currentMonthlyBalance = document.getElementById("monthly-amount");
    currentMonthlyBalance.textContent = monthlyAmount.toString();

}

/**
 * Updates balance, weekly and monthly amounts
 */

function updateDashboard() {
    updateBalance();
    updateMonthlyBalance();
    currentWeeklyBalance();
}

function currentWeeklyBalance() {

    let rows = document.getElementsByClassName("entry-row");

    let weeklyAmount = 0;
    let today = new Date();
    let firstJan = new Date(today.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((today - firstJan) / (24 * 60 * 60 * 1000));
    let weekNr = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);


    for (let row of rows) {

        let rowDate = new Date(row.children[2].textContent);
        let rowFirstJan = new Date(rowDate.getFullYear(), 0, 1);
        let rowNumberOfDays = Math.floor((rowDate - rowFirstJan) / (24 * 60 * 60 * 1000));
        let rowWeekNr = Math.ceil((rowDate.getDay() + 1 + rowNumberOfDays) / 7);
       



        if (weekNr === rowWeekNr && today.getFullYear() === rowDate.getFullYear() ) {
            weeklyAmount += parseFloat(row.children[3].textContent);
        }

    }
    let currentWeeklyBalance = document.getElementById("weekly-amount");
    currentWeeklyBalance.textContent = weeklyAmount.toString();

}