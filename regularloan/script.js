let requiredSharedCapital = 0;
let loanAmount = 0;
let monthlyInterest = 0;
let pnTotal = 0;
let serviceFee = 0;
let savings = 0;
let surcharge = 0;
let totalDeduction = 0;
let netToBeReceived = 0;
let monthlyPayment = 0;
let advanceInterest = 0;

function calculateLoan() {
    // Get input values
    const loanAmountInput = document.getElementById('loanAmount');
    const loanTermInput = document.getElementById('loanTerm');
    const existingMemberSharedCapitalInput = document.getElementById('existingMemberSharedCapital');
    const advanceInterestInput = document.getElementById('advanceInterest');

    // Check if input elements are available
    if (!loanAmountInput || !loanTermInput || !existingMemberSharedCapitalInput || !advanceInterestInput) {
        console.error('One or more input elements are missing.');
        return;
    }

    loanAmount = parseFloat(loanAmountInput.value);
    const loanTerm = parseInt(loanTermInput.value);
    const existingMemberSharedCapital = parseFloat(existingMemberSharedCapitalInput.value) || 0;
    advanceInterest = parseFloat(advanceInterestInput.value) || 0;

    // Calculate total deduction with additional deduction and advance interest surcharge
    totalDeduction = serviceFee + savings + requiredSharedCapital - existingMemberSharedCapital + advanceInterest * 0.0125 + surcharge;

    // Check if inputs are valid
    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(advanceInterest) || loanAmount <= 0 || loanTerm <= 0) {
        alert('Please enter valid loan amount, term, and advance interest.');
        return;
    }

    // Constants for interest rate and fees
    const monthlyInterestRate = 0.0125; // 1.25% monthly interest
    const sharedCapitalPercentage = 0.25; // 25% of the loan amount
    const savingsPercentage = 0.03; // 3% of the loan amount
    const serviceFeePercentage = 0.03; // 3% of the loan amount

    // Calculate monthly interest
    monthlyInterest = loanAmount * monthlyInterestRate;

    // Calculate Total Interest
    totalInterest = monthlyInterest * loanTerm;

    // Calculate PN TOTAL
    pnTotal = loanAmount + (monthlyInterest * loanTerm);

    // Calculate service fee
    serviceFee = loanAmount * serviceFeePercentage;

    // Calculate savings
    savings = loanAmount * savingsPercentage;

    // Calculate required Shared Capital
    requiredSharedCapital = loanAmount * sharedCapitalPercentage;

    // Deduct existing member shared capital
    requiredSharedCapital -= existingMemberSharedCapital;
    requiredSharedCapital = Math.max(0, requiredSharedCapital); // Ensure it's not negative

    // Calculate surcharge
    surcharge = loanAmount * advanceInterest * 0.0125;

    // Calculate total deduction
    totalDeduction = serviceFee + savings + requiredSharedCapital + surcharge;

    // Calculate net amount to be received
    netToBeReceived = loanAmount - totalDeduction;

    // Calculate monthly payment
    monthlyPayment = pnTotal / loanTerm;

    // Display results in HTML with .00 at the end
    displayResults();
}

function displayResults() {
    document.getElementById('loanAmountDisplay').innerText = `${formatNumber(loanAmount)}`;
    document.getElementById('pnTotal').innerText = `${formatNumber(pnTotal)}`;
    document.getElementById('serviceFee').innerText = `${formatNumber(serviceFee)}`;
    document.getElementById('savings').innerText = `${formatNumber(savings)}`;
    document.getElementById('totalInterest').innerText = `${formatNumber(totalInterest)}`;
    document.getElementById('sharedCapitalRequired').innerText = `${formatNumber(requiredSharedCapital)}`;
    document.getElementById('surcharge').innerText = `${formatNumber(surcharge)}`;
    document.getElementById('totalDeduction').innerText = `${formatNumber(totalDeduction)}`;
    document.getElementById('netToBeReceived').innerText = `${formatNumber(netToBeReceived)}`;
    document.getElementById('monthlyPayment').innerText = `${formatNumber(monthlyPayment)}`;
}

function formatNumber(value) {
    if (isNaN(value)) return '-';

    const formattedValue = parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formattedValue;
}
