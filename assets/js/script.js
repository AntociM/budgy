
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
    table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td>${oneAmount}</td>
    `

    // Append the new row to the HTML table element
    table.children[0].children[1] .appendChild(table_row);

    // event.target.reset();
    updateBalance();
}

let form = document.getElementById('form-input');
form.addEventListener('submit', handleSubmit);

/**
 * Iterates through the rows and calcultates the current balance.
 */

function updateBalance () {

    let rows = document.getElementsByClassName("entry-row");

    let balance = 0;
    
    for(let row of rows) {
       
        balance += parseFloat(row.children[3].textContent);
    }
    console.log(balance);

    let currentBalance = document.getElementById("balance").children[0];
    currentBalance.textContent = balance.toString();
}

/**
 * Updates balance, weekly and monthly amounts
 */
function updateDashboard() {
    updateBalance();
}

