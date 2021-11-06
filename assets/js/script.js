/**
 * Called everytime form-input HTML element generates an Submit event. 
 * It exatracts the values from the form then, it creates a new row, 
 * and append the row to the entry-table.
 * @param {event} event associated to the HTML element
 */
function handleSubmit(event) {
    event.preventDefault();

    // Get the elements value
    var desc = event.target.children[1].value;
    var cat = event.target.children[3].value;
    var day = event.target.children[5].value;
    var oneAmount = event.target.children[7].value;


    // Get the table division
    var table = document.getElementById("entry-table");

    // Create a new table row
    var table_row = document.createElement("tr");
    table_row.className = "entry-row";

    if (cat === "income") {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td class="income">${oneAmount}</td>
    `;
    } else {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td>${oneAmount}</td>
    `;
    }

    // Append the new row to the HTML table element
    table.children[0].children[1].appendChild(table_row);

    event.target.reset();
    updateDashboard();
}

/**
 * This function triggers on change event for weekly-limit HTML element
 * @param {*} event 
 */
function handleWeeklyLimit(event) {
    event.preventDefault();
    updateWeeklySpendingLimit();
}

/**
 * This function will compare the weekly-limit value set by the user with the curent weekly balance
 * If expenses are greater then the limit set, the amount will be styled with red color
 */
function updateWeeklySpendingLimit() {
    var weeklyLimit = document.getElementById("weekly-limit").value;
    var weeklyAmountElement = document.getElementById("weekly-expenses");
    if (parseFloat(weeklyAmountElement.textContent) > weeklyLimit && weeklyLimit != "") {
        weeklyAmountElement.className = "error";
    }
    else{
        weeklyAmountElement.classList.remove("error");
    }
}

/**
 * 
 * @param {*} event 
 */
function handleMonthlyLimit(event) {
    event.preventDefault();
    updateMonthlySpendingLimit();
}

/**
 * 
 */
 function updateMonthlySpendingLimit() {
    var monthlyLimit = document.getElementById("monthly-limit").value;
    var monthlyAmountElement =  document.getElementById("monthly-expenses");
    if (parseFloat(monthlyAmountElement.textContent) > monthlyLimit && monthlyLimit != "") {
        monthlyAmountElement.className = "error";
    }
    else {
        monthlyAmountElement.classList.remove("error");
    }
 }

 /**
  * This function will clear the data inputts fields, update the Dashboard area
  * and clear the weekly and monthly limits
  * @param {*} event 
  */
 function handleResetButton(event) {
     event.preventDefault();
     var clearTbody = document.getElementsByTagName("tbody")[0];
     clearTbody.innerHTML = "";
     document.getElementById("monthly-limit").value = "";
     document.getElementById("weekly-limit").value = "";
     document.getElementById('form-input').reset();
     updateDashboard();

 }

// Add event listners for HTML elements
var form = document.getElementById('form-input');
form.addEventListener('submit', handleSubmit);

var weeklyLimit = document.getElementById("weekly-limit");
weeklyLimit.addEventListener("change", handleWeeklyLimit);

var monthlyLimit = document.getElementById("monthly-limit");
monthlyLimit.addEventListener("change", handleMonthlyLimit);

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", handleResetButton);


/**
 * Iterates through the rows and calculates the current balance.
 * Makes a separation between incomes and outcomes.
 */

function updateBalance() {

    var rows = document.getElementsByClassName("entry-row");
    var balance = 0;
    for (var row of rows) {
        if (row.children[1].textContent === "income") {
            balance += parseFloat(row.children[3].textContent);
        } else {
            balance -= parseFloat(row.children[3].textContent);
        }
    }

    var currentBalance = document.getElementById("balance");
    currentBalance.textContent = balance.toString();
}

/**
 * Updates the monthly balance with inputs that match the month and year.
 */
function updateMonthlyBalance() {
    var rows = document.getElementsByClassName("entry-row");
    var monthlyAmount = 0;
    var today = new Date();
    var month = today.getUTCMonth();
    var year = today.getUTCFullYear();

    for (var row of rows) {
        var rowDate = new Date(row.children[2].textContent);

        if (month === rowDate.getUTCMonth() && year === rowDate.getUTCFullYear() && row.children[1].textContent !== "income") {
            monthlyAmount += parseFloat(row.children[3].textContent);
        }
    }

    var currentMonthlyBalance = document.getElementById("monthly-expenses");
    currentMonthlyBalance.textContent = monthlyAmount.toString();
}

/**
 * Updates balance, weekly and monthly amounts
 */
function updateDashboard() {
    updateBalance();
    updateMonthlyBalance();
    currentWeeklyBalance();
    updateWeeklySpendingLimit();
    updateMonthlySpendingLimit();
}

/**
 * This function iterates through entry-rows and extracts the inputs made in 
 * the same week of same year.  
 */
function currentWeeklyBalance() {
    var rows = document.getElementsByClassName("entry-row");
    var weeklyAmount = 0;
    var today = new Date();
    var firstJan = new Date(today.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((today - firstJan) / (24 * 60 * 60 * 1000));
    var weekNr = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);

    for (var row of rows) {
        var rowDate = new Date(row.children[2].textContent);
        var rowFirstJan = new Date(rowDate.getFullYear(), 0, 1);
        var rowNumberOfDays = Math.floor((rowDate - rowFirstJan) / (24 * 60 * 60 * 1000));
        var rowWeekNr = Math.ceil((rowDate.getDay() + 1 + rowNumberOfDays) / 7);
        if (weekNr === rowWeekNr && today.getFullYear() === rowDate.getFullYear() && row.children[1].textContent !== "income") {
            weeklyAmount += parseFloat(row.children[3].textContent);
        }
    }

    var currentWeeklyBalance = document.getElementById("weekly-expenses");
    currentWeeklyBalance.textContent = weeklyAmount.toString();
}
