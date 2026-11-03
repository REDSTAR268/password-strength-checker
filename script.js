
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

// Show or hide the password button
passwordInput.addEventListener("input", function() {
    togglePassword.hidden = passwordInput.value === "";
});

// Show or hide the password
togglePassword.addEventListener("click", function() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.setAttribute("aria-label", "Hide password");
    } else {
        passwordInput.type = "password";
        togglePassword.setAttribute("aria-label", "Show password");
    }

    togglePassword.classList.remove("shake");
    void togglePassword.offsetWidth;
    togglePassword.classList.add("shake");
});

// Check password requirements
function checkRequirements() {
    const password = passwordInput.value;

    reqLength.classList.toggle("is-met", password.length >= 10);
    reqNumber.classList.toggle("is-met", /[0-9]/.test(password));
    reqLetter.classList.toggle("is-met", /[a-zA-Z]/.test(password));
    reqSymbol.classList.toggle("is-met", /[^a-zA-Z0-9\s]/.test(password));
    reqUppercase.classList.toggle("is-met", /[A-Z]/.test(password));
}

passwordInput.addEventListener("input", checkRequirements);

// Check password strength
passwordForm.addEventListener("submit", function(event) {
    event.preventDefault();

    result.classList.remove("weak", "medium", "strong");

    const password = passwordInput.value;

    if (password === "") {
        result.textContent = "Password cannot be empty!";
        result.classList.add("weak");
        return;
    }

    const requirementsMet = [
        password.length >= 10,
        /[0-9]/.test(password),
        /[a-zA-Z]/.test(password),
        /[^a-zA-Z0-9\s]/.test(password),
        /[A-Z]/.test(password)
    ];

    const score = requirementsMet.filter(Boolean).length;

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

// Background slideshow
const backgroundLayers = document.querySelectorAll(".background-image");

// Light Mode: five beach images
const lightImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1920&q=80"
];

// Dark Mode: five space images
const darkImages = [
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1920&q=75",
    "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1920&q=80"
];

let currentImageIndex = 0;
let activeLayerIndex = 0;

// Change background image
function changeBackground() {
    if (backgroundLayers.length < 2) {
        console.error("Two background layers are required.");
        return;
    }

    const isDarkMode = document.body.classList.contains("dark-mode");
    const images = isDarkMode ? darkImages : lightImages;

    const nextLayerIndex = 1 - activeLayerIndex;

    backgroundLayers[nextLayerIndex].style.backgroundImage =
        `url("${images[currentImageIndex]}")`;

    backgroundLayers[nextLayerIndex].classList.add("active");
    backgroundLayers[activeLayerIndex].classList.remove("active");

    activeLayerIndex = nextLayerIndex;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Display the first image
changeBackground();

// Change image every five seconds
setInterval(changeBackground, 5000);

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

    currentImageIndex = 0;
    changeBackground();
});
