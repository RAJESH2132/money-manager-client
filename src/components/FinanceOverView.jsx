import React from "react";
import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"];
  const balanceData = [
    { name: "Total Balance", value: totalBalance },
    { name: "Total Expenses", value: totalExpense },
    { name: "Total Income", value: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Finance Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverView;
