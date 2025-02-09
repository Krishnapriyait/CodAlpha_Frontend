document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const themeBtn = document.getElementById("theme-btn");
    let darkMode = false;

    // Button click event
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("clear")) {
                display.value = "";
            } else if (button.classList.contains("del")) {
                display.value = display.value.slice(0, -1);
            } else if (button.classList.contains("equal")) {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = "Error";
                }
            } else {
                display.value += button.textContent;
            }
        });
    });

    // Dark Mode Toggle
    themeBtn.addEventListener("click", () => {
        darkMode = !darkMode;
        document.body.classList.toggle("dark", darkMode);
        themeBtn.textContent = darkMode ? "☀" : "🌙";
    });

    // Keyboard Support
    document.addEventListener("keydown", (event) => {
        if ("0123456789+-*/.".includes(event.key)) {
            display.value += event.key;
        } else if (event.key === "Enter") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        } else if (event.key === "Backspace") {
            display.value = display.value.slice(0, -1);
        } else if (event.key === "Escape") {
            display.value = "";
        }
    });
});