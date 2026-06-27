
// transaction objects
const transaction_title = document.querySelector(".Transaction-title input")
const transaction_amount = document.querySelector(".Transaction-Amount input")
const transaction_type = document.querySelector(".Transaction-type #type")
const transaction_add = document.querySelector(".transaction")
const transaction_details = document.querySelector(".transactions-data-container")
// income and expneses card amount objects
const income = document.querySelector(".income")
const expense = document.querySelector(".expense")

const trans_date = (date) => {
    date = new Date(date)
    // get month date year
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" })
    const year = date.getFullYear()
    return `${month} ${day},${year}`
}
const delet_task = (trans, obj) => {
    let transaction = JSON.parse(localStorage.getItem("transactions"))
    transaction = transaction.filter(obj => obj.id != trans.id)
    localStorage.setItem("transactions", JSON.stringify(transaction))
    obj.remove()
}

const add_to_the_UI = (transactions) => {
    transaction_details.innerHTML = ""
    transactions.forEach(Element => {
        const transaction = document.createElement("div")
        transaction.classList.add("transaction-1")
        const details = document.createElement("div")
        details.classList.add("transaction-details")
        const icon = document.createElement("div")
        if (Element.type == "Income") {
            icon.classList.add("transaction-icon")
        }
        else {
            icon.classList.add("expenses-icon")
        }
        icon.innerHTML = `
            <i class="fa-solid fa-sack-dollar" style="color: rgb(99, 230, 190)"></i>
        `
        const data = document.createElement("div")
        data.classList.add("transaction-data")
        const date = trans_date(Element.id)
        const title = Element.title
        data.innerHTML = `${title}<br>${date}`
        details.appendChild(icon)
        details.appendChild(data)
        const trans_amount = document.createElement("div")
        trans_amount.classList.add("transaction-amount")
        const amount = Number(Element.amount).toLocaleString("en-IN")
        trans_amount.innerHTML = `
            <p>&#8377;${amount}</p>
        `
        const delet = document.createElement("button")
        delet.classList.add("delete-transaction")
        delet.innerHTML = `<i class="fa-solid fa-trash-can" style="color:red"></i>`
        trans_amount.appendChild(delet)
        transaction.appendChild(details)
        transaction.appendChild(trans_amount)
        transaction_details.appendChild(transaction)
        delet.addEventListener("click", () => {
            delet_task(Element, transaction)
        })
    })
}

const update_income = (amount) => {
    let incomes = Number(JSON.parse(localStorage.getItem("Income"))) || 0
    incomes += Number(amount)
    localStorage.setItem("Income", JSON.stringify(incomes))
    update_ui_to_income(incomes)
}
const update_expense = (amount) => {
    let expenses = Number(JSON.parse(localStorage.getItem("Expense"))) || 0
    expenses += Number(amount)
    localStorage.setItem("Expense", JSON.stringify(expenses))
    update_ui_to_expense(expenses)
}
const update_ui_to_income = (amount) => {
    income.innerHTML = `&#8377;${Number(amount).toLocaleString("en-IN")}`
}
const update_ui_to_expense = (amount) => {
    expense.innerHTML = `&#8377;${Number(amount).toLocaleString("en-IN")}`
}
// this methods used when page the relaods update income and expense card 
const refresh_income=()=>{
    let incomes=Number(JSON.parse(localStorage.getItem("Income"))) || 0
    income.innerHTML=`&#8377;${Number(incomes).toLocaleString("en-IN")}`
}
const refresh_expense=()=>{
    let expenses=Number(JSON.parse(localStorage.getItem("Expense"))) || 0
    expense.innerHTML=`&#8377;${Number(expenses).toLocaleString("en-IN")}`
}
const add_transaction = () => {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || []
    const title = transaction_title.value.trim()
    const amount = transaction_amount.value.trim()
    const type = transaction_type.value
    if (title === "" || amount === "" || isNaN(Number(amount))) {
        return
    }
    transactions.push({
        id: Date.now(),
        amount: amount,
        type: type,
        title: title
    })
    if (type == "Expense") {
        update_expense(amount)
    }
    else {
        update_income(amount)
    }
    add_to_the_UI(transactions)
    localStorage.setItem("transactions", JSON.stringify(transactions))
    transaction_title.value = ""
    transaction_amount.value = ""
}
window.addEventListener("load", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || []
    add_to_the_UI(transactions)
    refresh_income()
    refresh_expense()
    // refresh_balance
})
transaction_add.addEventListener("click", add_transaction)
