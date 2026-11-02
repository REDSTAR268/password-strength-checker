const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password");
const result = document.getElementById("result");
const togglePassword = document.getElementById("toggle-password");
const reqLength = document.getElementById("req-length");
const reqNumber = document.getElementById("req-number");
const reqLetter = document.getElementById("req-letter");
const reqSymbol = document.getElementById("req-symbol");
const reqUppercase = document.getElementById("req-uppercase");
const themeToggle = document.getElementById("theme-toggle");
const themeTitle = document.getElementById("theme-title");
const themeDescription = document.getElementById("theme-description");

passwordInput.addEventListener("input", function() {
    togglePassword.hidden = passwordInput.value === "";
});

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

    togglePassword.classList.remove("shake");
    void togglePassword.offsetWidth;
    togglePassword.classList.add("shake");

});

function checkRequirements() {
    const password = passwordInput.value;

    // First requirement: At least 10 characters
    if (password.length >= 10) {
        reqLength.classList.add("is-met");
    } else {
        reqLength.classList.remove("is-met");
    }

    // Second requirement: Contains a number
    if (/[0-9]/.test(password)) {
        reqNumber.classList.add("is-met");
    } else {
        reqNumber.classList.remove("is-met");
    }

    // Third requirement: Contains a letter
    if (/[a-zA-Z]/.test(password)) {
        reqLetter.classList.add("is-met");
    } else {
        reqLetter.classList.remove("is-met");
    }

    // Fourth requirement: Contains a special symbol
    if (/[^a-zA-Z0-9\s]/.test(password)) {
        reqSymbol.classList.add("is-met");
    } else {
        reqSymbol.classList.remove("is-met");
    }

    // Fifth requirement: Contains an uppercase letter
    if (/[A-Z]/.test(password)) {
        reqUppercase.classList.add("is-met");
    } else {
        reqUppercase.classList.remove("is-met");
    }

}

passwordInput.addEventListener("input", checkRequirements);

passwordForm.addEventListener("submit", function(event) {
    event.preventDefault();

    result.classList.remove("weak", "medium", "strong");

    if (passwordInput.value === "") {
        result.textContent = "Password cannot be empty!";
        result.classList.add("weak");
        return;
    }

    const requirementsMet = [
        passwordInput.value.length >= 10,
        /[0-9]/.test(passwordInput.value),
        /[a-zA-Z]/.test(passwordInput.value),
        /[^a-zA-Z0-9\s]/.test(passwordInput.value),
        /[A-Z]/.test(passwordInput.value)
    ];

    const score = requirementsMet.filter(Boolean).length;

    // Remove the previous strength colour
    result.classList.remove("weak", "medium", "strong");

    if (score <= 2) {
        result.textContent = "Weak password!";
        result.classList.add("weak");

    } else if (score <= 4) {
        result.textContent = "Medium password!";
        result.classList.add("medium");

    } else {
        result.textContent = "Strong password!";
        result.classList.add("strong");
    }
});

// Light and Dark Mode
themeToggle.addEventListener("change", function() {
    const isDarkMode = themeToggle.checked;

    document.body.classList.toggle("dark-mode", isDarkMode);

    if (isDarkMode) {
        themeTitle.textContent = "Dark Mode";
        themeDescription.textContent = "Easy on the eyes";
    } else {
        themeTitle.textContent = "Light Mode";
        themeDescription.textContent = "Clean and bright";
    }
});