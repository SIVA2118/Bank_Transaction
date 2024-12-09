// Select the required elements
const transactionBody = document.getElementById('transaction-body');

// Function to load transactions from localStorage
function loadTransactions() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  renderTransactions(transactions);
}

// Function to render transactions in the table
function renderTransactions(transactions) {
  // Clear the table before repopulating
  transactionBody.innerHTML = '';

  if (transactions.length === 0) {
    const noTransactionRow = document.createElement('tr');
    noTransactionRow.innerHTML = `
      <td colspan="3" style="text-align: center; color: gray;">No transactions found.</td>
    `;
    transactionBody.appendChild(noTransactionRow);
  } else {
    transactions.forEach(transaction => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.type}</td>
        <td>$${transaction.amount.toFixed(2)}</td>
      `;
      transactionBody.appendChild(row);
    });
  }
}

// Function to handle navigation back to the dashboard
function goBack() {
  window.location.href = 'bank.html';
}

// Load and render transactions on page load
document.addEventListener('DOMContentLoaded', loadTransactions);
