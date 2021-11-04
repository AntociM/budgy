
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
    table_row.innerHTML = `
        <td>${desc}</td>
        <td>${cat}</td>
        <td>${day}</td>
        <td>${oneAmount}</td>
    `

    // Append the new row to the HTML table element
    table.children[0].appendChild(table_row);

    event.target.reset();
}

let form = document.getElementById('form-input');
form.addEventListener('submit', handleSubmit);
