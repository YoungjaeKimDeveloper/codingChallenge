const fs = require("fs");

// Read the Data
const items = JSON.parse(fs.readFileSync("data.json"));
// Tester for the data
console.log(items);

// Currency foramt function
function formatCurrency(targetValue) {
  try {
    if (typeof targetValue !== "number") {
      return "INVALID VALUE. PROVIDE NUMBER PLEASE";
    }
    return `$${targetValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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
    return `ERROR in formatiing Percentage: ${error.message}`;
  }
}
// Calculation Functions
function calculateRevenue(items) {
  try {
    if (items === null || items === undefined) {
      return "ITEMS IS NULL";
    }
    return items
      .filter((item) => item.account_category === "revenue")
      .reduce((sum, item) => sum + item.total_value, 0);
  } catch (error) {
    return `ERROR in Calculating Revenue: ${error.message}`;
  }
}

function calculateExpense(items) {
  try {
    if (items === null || items === undefined) {
      return "ITEMS IS NULL";
    }
    return items
      .filter((item) => item.account_category === "expense")
      .reduce((sum, item) => sum + item.total_value, 0);
  } catch (error) {
    return `ERROR in Calculating Expense: ${error.message}`;
  }
}

function calculateGrossProfitMargin(items, revenue) {
  try {
    if (items === null || items === undefined) {
      return "ITEMS IS NULL";
    }
    const sales = items
      .filter(
        (item) =>
          item.account_category === "sales" && item.value_type === "debit"
      )
      .reduce((sum, item) => sum + item.total_value, 0);

    return revenue === 0 ? 0 : sales / revenue;
  } catch (error) {
    return `ERROR in Calculating Expense: ${error.message}`;
  }
}

function calculateNetProfitMargin(expenses, revenue) {
  try {
    if (
      expenses === undefined ||
      expenses === null ||
      revenue === undefined ||
      revenue === null
    ) {
      return "ERROR IN calculateNetProfitMargin function";
    }
    return (revenue - expenses) / revenue;
  } catch (error) {
    return `ERROR in calculateNetProfitMargin function: ${error.message}`;
  }
}

function calculateCapitalRatio(items) {
  const assetsAdding = items
    .filter(
      (item) =>
        item.account_category === "assets" &&
        item.value_type === "debit" &&
        (item.account_type === "current" ||
          item.account_type === "bank" ||
          item.account_type === "current_accounts_receivable")
    )
    .reduce((sum, item) => sum + item.total_value, 0);
  const assetsSubtracting = items
    .filter(
      (item) =>
        item.account_category === "assets" &&
        item.value_type === "credit" &&
        (item.account_type === "current" ||
          item.account_type === "bank" ||
          item.account_type === "current_accounts_receivable")
    )
    .reduce((sum, item) => sum + item.total_value, 0);
  const assets = assetsAdding - assetsSubtracting;
  const liabilitiesAdding = items
    .filter(
      (item) =>
        item.account_category === "liability" &&
        item.value_type === "credit" &&
        (item.account_type === "current" ||
          item.account_type === "current_accounts_payable")
    )
    .reduce((sum, item) => sum + item.total_value, 0);
  const liabilitiesSubtracting = items
    .filter(
      (item) =>
        item.account_category === "liability" &&
        item.value_type === "debit" &&
        (item.account_type === "current" ||
          item.account_type === "current_accounts_payable")
    )
    .reduce((sum, item) => sum + item.total_value, 0);
  const liabilities = liabilitiesAdding - liabilitiesSubtracting;
  const capitalRatio = liabilities === 0 ? 0 : assets / liabilities;
  return capitalRatio;
}
