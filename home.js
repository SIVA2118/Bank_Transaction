// Select the required elements
const loginButton = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');

// Sample user credentials (for demonstration)
const validCredentials = {
  username: "s",
  password: "123"
};

// Event listener for login button
loginButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if fields are empty
  if (!username || !password) {
    loginMessage.textContent = "Please enter both username and password.";
    loginMessage.style.color = "red";
    return;
  }

  // Validate user credentials
  if (username === validCredentials.username && password === validCredentials.password) {
    // Save logged-in user information in local storage
    localStorage.setItem('loggedInUser', username);

    // Redirect to the bank page
    window.location.href = 'bank.html';
  } else {
    // Show error message for invalid credentials
    loginMessage.textContent = "Invalid username or password. Please try again.";
    loginMessage.style.color = "red";
  }
});

// Clear login message when user starts typing
usernameInput.addEventListener('input', () => (loginMessage.textContent = ""));
passwordInput.addEventListener('input', () => (loginMessage.textContent = ""));
