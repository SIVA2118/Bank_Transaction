const userNameElement = document.getElementById('user-name');
const balanceElement = document.getElementById('balance');
const depositButton = document.getElementById('deposit-btn');
const withdrawButton = document.getElementById('withdraw-btn');
const logoutButton = document.getElementById('logout-btn');
const historyButton = document.getElementById('history-btn');
const amountInput = document.getElementById('amount');
const messageElement = document.getElementById('message');

let userBalance = 0;

// Load user details from localStorage
function initializeDashboard() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = 'index.html'; 
  } else {
    userNameElement.textContent = loggedInUser;
  }
}

// Handle Deposit
function handleDeposit() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    messageElement.textContent = "Please enter a valid deposit amount.";
    messageElement.style.color = "red";
  } else {
    userBalance += amount;
    saveTransaction('Deposit', amount);
    updateBalance();
    messageElement.textContent = `$${amount.toFixed(2)} deposited successfully!`;
    messageElement.style.color = "green";
    amountInput.value = '';
  }
}

// Handle Withdraw
function handleWithdraw() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    messageElement.textContent = "Please enter a valid withdrawal amount.";
    messageElement.style.color = "red";
  } else if (amount > userBalance) {
    messageElement.textContent = "Insufficient funds.";
    messageElement.style.color = "red";
  } else {
    userBalance -= amount;
    saveTransaction('Withdraw', amount);
    updateBalance();
    messageElement.textContent = `$${amount.toFixed(2)} withdrawn successfully!`;
    messageElement.style.color = "green";
    amountInput.value = '';
  }
}

// Update displayed balance
function updateBalance() {
  balanceElement.textContent = userBalance.toFixed(2);
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

// Redirect to Transaction History
function goToTransactionHistory() {
  window.location.href = 'Transaction History.html';
}

// Save transaction to localStorage
function saveTransaction(type, amount) {
  const transaction = {
    date: new Date().toLocaleString(),
    type,
    amount,
  };

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Attach event listeners
depositButton.addEventListener('click', handleDeposit);
withdrawButton.addEventListener('click', handleWithdraw);
logoutButton.addEventListener('click', handleLogout);
historyButton.addEventListener('click', goToTransactionHistory);

// Initialize the dashboard
initializeDashboard();
updateBalance();
