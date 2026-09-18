// script.js for available_loan.html

let allotmentSalary = 0;
let monthsOfContract = 0;
let peso = 0;

function calculateTotalLoanToAvail() {
    // Get input values
    allotmentSalary = parseFloat(document.getElementById('allotmentSalary').value);
    monthsOfContract = parseInt(document.getElementById('monthsOfContract').value);
    peso = parseInt(document.getElementById('peso').value);

    // Check if inputs are valid
    if (isNaN(allotmentSalary) || isNaN(monthsOfContract) || isNaN(peso) || allotmentSalary <= 0 || monthsOfContract <= 0 || peso <= 0) {
        alert('Please enter valid allotment salary, months of contract, and peso value.');
        return;
    }

    // Calculate Total Salary
    const totalSalary = allotmentSalary * monthsOfContract;

    // Calculate Total in Peso
    const totalInPeso = totalSalary * peso;

    // Calculate Total Loan to Avail
    const totalLoanToAvail = (totalInPeso * 0.7) - ((totalInPeso * 0.7) * 0.0125 * monthsOfContract);

    // Apply CEILING function to round up to the nearest hundred
    const roundedTotalLoanToAvail = CEILING(totalLoanToAvail, 100);

    // Display result
    document.getElementById('totalLoanToAvail').innerText = `${formatNumber(roundedTotalLoanToAvail)}`;
}

function formatNumber(value) {
    if (isNaN(value)) return '-';

    const formattedValue = parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formattedValue;
}

// Custom CEILING function
function CEILING(number, significance) {
    return Math.ceil(number / significance) * significance;
}
