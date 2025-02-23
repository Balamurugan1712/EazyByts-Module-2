// Simulate a user database for login/signup
const users = [
    { email: 'user@example.com', password: 'password123' }
];

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate checking credentials
    const user = users.find(u => u.email === email && u.password === password);
    const loginResponse = document.getElementById('login-response');

    if (user) {
        loginResponse.innerHTML = 'Login successful!';
        setTimeout(() => window.location.href = 'index.html', 1000); // Redirect to dashboard
    } else {
        loginResponse.innerHTML = 'Invalid email or password.';
    }
});

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const signupResponse = document.getElementById('signup-response');

    // Basic validation
    if (password !== confirmPassword) {
        signupResponse.innerHTML = 'Passwords do not match.';
        return;
    }

    // Simulate user creation
    users.push({ email, password });
    signupResponse.innerHTML = 'Signup successful!';
    setTimeout(() => window.location.href = 'login.html', 1000); // Redirect to login page
});

// Handle logout action on dashboard
document.getElementById('logout')?.addEventListener('click', function(event) {
    event.preventDefault();
    // Simply redirect to login page for this example
    window.location.href = 'login.html';
});
