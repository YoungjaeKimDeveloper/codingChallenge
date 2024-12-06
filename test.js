const fs = require("fs");

// Read the Data
const data = JSON.parse(fs.readFileSync("data.json"));
// Tester for checking data file
console.log(data);
