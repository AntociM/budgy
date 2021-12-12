import DateTime from './luxon/src/datetime.js'

var currencyValueGlobal = document.getElementById("currency").value;

//This function will bring tge entry form to the initial form.
function resetEntryForm() {
    document.getElementById("form-input").reset();
    document.getElementById("description").classList.remove("is-valid");
    document.getElementById("category").classList.remove("is-valid");
    document.getElementById("date").classList.remove("is-valid");
    document.getElementById("amount").classList.remove("is-valid");
    document.getElementById("description").classList.remove("is-invalid");
    document.getElementById("category").classList.remove("is-invalid");
    document.getElementById("date").classList.remove("is-invalid");
    document.getElementById("amount").classList.remove("is-invalid");
}

/**
 * Called everytime form-input HTML element generates an Submit event. 
 * It exatracts the values from the form then, it creates a new row, 
 * and append the row to the entry-table.
 * @param {event} event associated to the HTML element
 */
function handleSubmit(event) {
    event.preventDefault();

    // Get the elements value
    var desc = document.getElementById("description").value;
    var cat = document.getElementById("category").value;
    var day = document.getElementById("date").value;
    var oneAmount = document.getElementById("amount").value;


    // Get the table division
    var table = document.getElementById("entry-table");

    // Create a new table row
    var table_row = document.createElement("tr");
    table_row.className = "entry-row";

    if (cat === "Income") {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td class="income">${oneAmount} </td>
    `;
    } else {
        table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td>${oneAmount} ${currencyValueGlobal}</td>
    `;
    }

    // Append the new row to the HTML table element
    table.children[0].children[1].insertBefore(table_row, table.children[0].children[1].firstChild);

    resetEntryForm();
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
    } else {
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
    var monthlyAmountElement = document.getElementById("monthly-expenses");
    if (parseFloat(monthlyAmountElement.textContent) > monthlyLimit && monthlyLimit != "") {
        monthlyAmountElement.className = "error";
    } else {
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
    resetEntryForm();
    updateDashboard();

}

/**
 * This function validates the user's input in the description field.
 * Empty inputs are blocked, while alphanumeric and special characters 
 * are valid.
 * @param {*} event 
 */
function handleDescriptionValidation(event) {
    if (event.target.value == "") {
        event.target.classList.remove("is-valid");
        event.target.classList.remove("is-invalid");
    } else {
        if (/\d/.test(event.target.value) || /[a-zA-Z]/.test(event.target.value)) {
            event.target.classList.add("is-valid");
            event.target.classList.remove("is-invalid");
        } else {
            event.target.classList.add("is-invalid");
            event.target.classList.remove("is-valid");
        }
    }
}

/**
 * User's choice from the category's drop-down list will be validated 
 * as follow: when entries history is clean, the first category input have
 * to be "Income" after every choice is a valid one.
 * This will prevent a negative balance value. 
 */
function handleCategoryValidation(event) {
    if (event.target.value !== "") {
        if (event.target.value !== "Income" && document.getElementsByTagName("tbody")[0].children.length == 0) {
            event.target.classList.add("is-invalid");
            event.target.classList.remove("is-valid");
        } else {
            event.target.classList.add("is-valid");
            event.target.classList.remove("is-invalid");
        }
    }
}


/**
 * 
 * @param {*} event 
 */

function handleDateValidation(event) {
    if (event.target.value !== "") {
        var today = new Date();
        var entry_date = new Date(event.target.value);

        if (entry_date <= today) {
            event.target.classList.add("is-valid");
            event.target.classList.remove("is-invalid");
        } else {
            event.target.classList.add("is-invalid");
            event.target.classList.remove("is-valid");
        }
    }
}

//
function handleAmountValidation(event) {
    if (event.target.value !== "") {
        if (/^0[0-9].*$/.test(event.target.value)) {
            event.target.classList.add("is-invalid");
            event.target.classList.remove("is-valid");
        } else {
            event.target.classList.add("is-valid");
            event.target.classList.remove("is-invalid");
        }
    } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.remove("is-valid");
    }
}

/**
 * This function validates the currency input, prompting an error message when
 * user selects different currency types. 
 * @param {*} event 
 */
function handleCurrencyInput(event) {
    if (event.target.value != currencyValueGlobal && document.getElementsByTagName("tbody")[0].children.length != 0) {
        alert("You cannot change currency.");

        for (var option, i = 0; option = event.target.options[i]; i++) {
            if (option.value == currencyValueGlobal) {
                event.target.selectedIndex = i;
                break;
            }
        }
    }

    updateDashboard();
}

// Add event listners for HTML elements
document.getElementById('form-input').addEventListener('submit', handleSubmit);
document.getElementById("weekly-limit").addEventListener("change", handleWeeklyLimit);
document.getElementById("monthly-limit").addEventListener("change", handleMonthlyLimit);
document.getElementById("reset").addEventListener("click", handleResetButton);
window.addEventListener("load", updateDashboard);

document.getElementById("description").addEventListener("keyup", handleDescriptionValidation);
document.getElementById("description").addEventListener("change", handleDescriptionValidation);
document.getElementById("category").addEventListener("click", handleCategoryValidation);
document.getElementById("date").addEventListener("change", handleDateValidation);
document.getElementById("amount").addEventListener("keyup", handleAmountValidation);
document.getElementById("currency").addEventListener("change", handleCurrencyInput);

/**
 * Iterates through the rows and calculates the current balance.
 * Makes a separation between incomes and outcomes.
 */

function updateBalance() {

    var rows = document.getElementsByClassName("entry-row");
    var balance = 0;
    for (var row of rows) {
        if (row.children[1].textContent === "Income") {
            balance += parseFloat(row.children[3].textContent);
        } else {
            balance -= parseFloat(row.children[3].textContent);
        }
    }

    var currentBalance = document.getElementById("balance");
    currentBalance.textContent = balance.toFixed(2) + " " + document.getElementById("currency").value;
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

        if (month === rowDate.getUTCMonth() && year === rowDate.getUTCFullYear() && row.children[1].textContent !== "Income") {
            monthlyAmount += parseFloat(row.children[3].textContent);
        }
    }

    var currentMonthlyBalance = document.getElementById("monthly-expenses");
    currentMonthlyBalance.textContent = monthlyAmount.toString() + " " + document.getElementById("currency").value;
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
    var weekNr = DateTime.now().weekNumber;
    var weekYear = DateTime.now().weekYear;

    for (var row of rows) {
        var rowDate = DateTime.fromFormat(row.children[2].textContent, 'yyyy-MM-dd');
        if (weekNr === rowDate.weekNumber && weekYear === rowDate.weekYear && row.children[1].textContent !== "Income") {
            weeklyAmount += parseFloat(row.children[3].textContent);
        }
    }

    var currentWeeklyBalance = document.getElementById("weekly-expenses");
    currentWeeklyBalance.textContent = weeklyAmount.toString() + " " + document.getElementById("currency").value;
}

window.addEventListener("load", updateDashboard);

var today = DateTime.now();
document.getElementById("date").setAttribute("max", "".concat(today.year, "-", today.month, "-", today.day));


function openModal() {
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("instructionModal").style.display = "block";
    document.getElementById("instructionModal").classList.add("show");
}

function closeModal() {
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("instructionModal").style.display = "none";
    document.getElementById("instructionModal").classList.remove("show");
}
// Get the modal
var modal = document.getElementById('instructionModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

document.getElementById("instruction-button").addEventListener("click", openModal);
document.getElementById("instruction-button").addEventListener("click", openModal);
document.getElementById("close-button").addEventListener("click", closeModal);
document.getElementById("close-button").addEventListener("click", closeModal);