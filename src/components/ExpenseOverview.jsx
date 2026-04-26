import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { prepareExpenseLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const result = prepareExpenseLineChartData(transactions);
      setChartData(result);
      return;
    }

    setChartData([]);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and analyze trends.
          </p>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <Plus size={15} className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10 h-75">
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <p className="text-sm text-gray-500">No expense data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
