const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income-tracker");
const expenseEl = document.querySelector("#expense-tracker");
const list = document.querySelector("#all");
const incomeList = document.querySelector("#income-tracker .list");
const expenseList = document.querySelector("#expense-tracker .list");
const allList = document.querySelector("#all .list");
const lists = document.querySelectorAll(".list");

//tabs
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//input btns
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector("#expense-title-input");
const expenseAmount = document.querySelector("#expense-amount-input");
const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector("#income-title-input");
const incomeAmount = document.querySelector("#income-amount-input");

//necessary variables
let ENTRY_LIST = [];
let [balance, income, outcome] = [0, 0, 0];
let [deleteIcon, editIcon] = ["fas fa-trash", "far fa-edit"];

//expenseBtn event listenrer
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allList]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

//incomeBtn event listenrer
incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allList]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

//allBtn event listenrer
allBtn.addEventListener("click", function () {
  show(allList);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

//addExpense event listener
addExpense.addEventListener("click", budgetOut);

//add Income event listener
addIncome.addEventListener("click", budgetIn);

//addExpense addIncome EnterKey event listenrer
document.addEventListener("keypress", function (e) {
  if (e.key !== "Enter") return;
  budgetOut(e);
  budgetIn(e);
});

//bugdetOut function
function budgetOut(e) {
  e.preventDefault();
  if (!expenseTitle.value || !expenseAmount.value) return;
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseInt(expenseAmount.value),
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
}

//budgetIn function
function budgetIn(e) {
  e.preventDefault();
  if (!incomeTitle.value || !incomeAmount.value) return;

  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value),
  };
  ENTRY_LIST.push(income);

  clearInput([incomeTitle, incomeAmount]);
  updateUI();
}

//updateUI
function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("expense", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));
  let sign = income >= outcome ? "$" : "-$";

  // Updating the UI

  incomeTotalEl.innerHTML = `<p>$</p><p>${income}</p>`;
  outcomeTotalEl.innerHTML = `<p>$</p><p>${outcome}</p>`;
  balanceEl.innerHTML = `<p>${sign}</p><p>${balance}</p>`;

  clearElement([expenseList, incomeList, allList]);
}
//clearinput function
function clearInput(inputs) {
  inputs.forEach(function (input) {
    input.value = "";
  });
}

//calculateTotal function
function calculateTotal(type, list) {
  let sum = 0;
  list.forEach(function (entry) {
    if (entry.type === type) {
      sum += entry.amount;
    }
  });
  return sum;
}

//calculate balance function
function calculateBalance(income, outcome) {
  return income - outcome;
}

//show function
function show(element) {
  element.classList.remove("hide");
}

//hide function
function hide(elements) {
  elements.forEach(function (element) {
    element.classList.add("hide");
  });
}

//active function
function active(element) {
  element.classList.add("active");
}

//inactive function
function inactive(elements) {
  elements.forEach(function (element) {
    element.classList.remove("active");
  });
}
