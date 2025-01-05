const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];

let output = "";

// Define function to calculate based on button clicked
const calculate = (btnValue) => {
  // Ensure the display element is focused (only if input or textarea)
  if (display instanceof HTMLInputElement || display instanceof HTMLTextAreaElement) {
    display.focus();
  }

  if (btnValue === "=") {
    // Skip evaluation if there's an error message
    if (output === "Error" || output === "Cannot divide by 0") return;

    if (output !== "") {
      try {
        // Replace '%' with '/100' and evaluate the result
        output = eval(output.replace("%", "/100")).toString();
      } catch (error) {
        output = "Error"; // Handle invalid expressions
      }
    }
  } else if (btnValue === "1/x") {
    // Handle 1/x functionality
    try {
      const num = eval(output);
      output = num === 0 ? "Cannot divide by 0" : (1 / num).toString();
    } catch {
      output = "Error"; // Handle invalid cases
    }
  } else if (btnValue === "AC") {
    // Clear the output
    output = "";
  } else if (btnValue === "DEL") {
    // Remove the last character
    output = output.slice(0, -1);
  } else {
    // Prevent adding a special char as the first character
    if (output === "" && specialChars.includes(btnValue)) return;
    // Append the button value
    output += btnValue;
  }

  // Update the display
  if (display instanceof HTMLInputElement || display instanceof HTMLTextAreaElement) {
    display.value = output;
  } else {
    display.textContent = output;
  }
};

// Add event listeners to buttons
buttons.forEach((button) => {
  if (button.dataset.value) {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
  }
});

