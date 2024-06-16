document
  .getElementById("calculateBtn")
  .addEventListener("click", calculateLoan);

function calculateLoan() {
  const loanAmount = parseFloat(
    document.getElementById("loanAmountInput").value
  );
  const interestRate = parseFloat(
    document.getElementById("interestRateInput").value
  );
  const loanTerm = parseFloat(document.getElementById("loanTermInput").value);

  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
    alert("Please enter valid numbers for all fields.");
    return; // Exit the function early if any input is invalid
  }

  // Perform the loan calculation
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm;
  const numerator =
    monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
  const monthlyPayment = loanAmount * (numerator / denominator);

  // Display the result on the screen
  const resultElement = document.querySelector(".result");
  resultElement.textContent = "Monthly Payment: $" + monthlyPayment.toFixed(2);
}
