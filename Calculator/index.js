// Get the display element
const display = document.getElementById("display");

// Get all the buttons
const buttons = document.querySelectorAll(".button");

// Add event listeners to the buttons
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the button value
    const value = event.target.textContent;

    // Handle different cases
    switch (value) {
      case "C":
        // Clear the display
        display.textContent = "";
        break;
      case "←":
        // Delete the last character
        display.textContent = display.textContent.slice(0, -1);
        break;
      case "=":
        // Evaluate the expression
        try {
          const result = eval(display.textContent);
          display.textContent = result;
        } catch (error) {
          display.textContent = "Error";
        }
        break;
      default:
        // Append the value to the display
        display.textContent += value;
    }
  });
});
