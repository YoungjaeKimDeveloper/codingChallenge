const fs = require("fs");

// Read the Data
const data = JSON.parse(fs.readFileSync("data.json"));
// Tester for the data
console.log(data);

// foramt function
function formatCurrency(targetValue) {
  return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
