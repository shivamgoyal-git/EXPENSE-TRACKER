document.addEventListener("DOMContentLoaded", () => {

  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name-input");
  const expenseAmountInput = document.getElementById("expense-amount-input");
  const addExpenseBtn = document.getElementById("add-expense-btn");
  const expenseList = document.getElementById("expense-list");
  const totalExpensesValue = document.getElementById("total-expenses-value");
  const expenseContainer = document.getElementById("expense-container");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmmount = calclulateTotal();
  expenses.forEach(expense => {renderExpense()
    updateTotal()
    
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim()
    const amount = parseFloat(expenseAmountInput.value.trim())

    if(name !== "" && !isNaN(amount) && amount>0){
        const newExpense = {
            id: Date.now(),
            name: name,
            amount:amount
        }
        
        expenses.push(newExpense)
        saveExpense()
        updateTotal()
        renderExpense()
        // console.log(calclulateTotal)
        // console.log(expenses)

        // clear input
        expenseNameInput.value = ""
        expenseAmountInput.value = ""

    }
  });


function renderExpense(){
    expenseList.innerHTML = ""
    if(expenses.length)
    {
        expenseContainer.classList.remove("hidden")
        expenses.forEach(expense => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id = "${expense.id}">Remove</button>`
    
            expenseList.appendChild(li)
    
            li.querySelector("button").addEventListener('click',(e)=>{
    
                // let buttonId = parseInt(e.target.id)
                e.stopPropagation()
                expenses = expenses.filter(e => e.id !== expense.id)
             
             
                li.remove()
                saveExpense()
                updateTotal()
                renderExpense()
            })
        });
    }
    else
    {
        expenseContainer.classList.add("hidden")    
    }
 

}

   function calclulateTotal() {
    return expenses.reduce((sum,expense)=> sum + expense.amount,0) ;
   }
   function updateTotal(){
    totalAmmount = calclulateTotal()
    console.log(totalAmmount)
    totalExpensesValue.textContent = totalAmmount.toFixed(2)
   }
   
function saveExpense()
   {
       localStorage.setItem("expenses", JSON.stringify(expenses))
    }


});
