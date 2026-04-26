export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split('.'); // Split into integer and fractional parts

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Indian numbering system formatting
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== '') {
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    integerPart = formattedOtherNumbers + ',' + lastThree;
  } else {
    integerPart = lastThree;
  }

  // Combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

// src/utils/chartUtils.js

const formatMonthLabel = (dateStr) => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}`;
};

const groupTransactionsByDate = (data = []) => {
  const map = {};

  data.forEach((item) => {
    const dateKey = item.date; // already in "YYYY-MM-DD"

    if (!map[dateKey]) {
      map[dateKey] = {
        date: dateKey,
        totalAmount: 0,
        items: [],
        month: formatMonthLabel(dateKey),
      };
    }

    map[dateKey].totalAmount += Number(item.amount);
    map[dateKey].items.push(item);
  });

  return Object.values(map).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};

// Income
export const prepareIncomeLineChartData = (transactions = []) => {
  return groupTransactionsByDate(transactions);
};

// Expense
export const prepareExpenseLineChartData = (transactions = []) => {
  return groupTransactionsByDate(transactions);
};