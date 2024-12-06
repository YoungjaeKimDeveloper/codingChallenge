const fs = require("fs");

// Read the Data
const items = JSON.parse(fs.readFileSync("data.json"));
// Tester for the data
console.log(items);

// Currency foramt function
function formatCurrency(targetValue) {
  try {
    if (typeof targetValue !== "number") {
      throw new Error("INVALID VALUE. PROVIDE NUMBER PLEASE");
    }
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } catch (error) {
    return `Error in formatting Currency: ${error.message}`;
  }
}
// Percentage format function
function formatPercentage(targetValue) {
  try {
    if (typeof targetValue !== "number") {
      throw new Error("INVALID VALUE. PROVIDE NUMBER PLEASE");
    }
    return `${(targetValue * 100).toFixed(1)}%`;
  } catch (error) {
    return Error(`ERROR in formatiing Percentage: ${error.message}`);
  }
}
// Calculation Functions
function calculateRevenue(items) {
  try {
    if (items === null || items === undefined) {
      throw new Error("ITEMS IS NULL");
    }
    return items
      .filter((item) => item.account_category === "revenue")
      .reduce((sum, item) => sum + item.total_value, 0);
  } catch (error) {
    throw new Error(`ERROR in Calculating Revenue: ${error.message}`);
  }
}

function calculateExpense(items) {
  try {
    if (items === null || items === undefined) {
      throw new Error("ITEMS IS NULL");
    }
    return items
      .filter((item) => item.account_category === "expense")
      .reduce((sum, item) => sum + item.total_value, 0);
  } catch (error) {
    throw new Error(`ERROR in Calculating Expense: ${error.message}`);
  }
}
