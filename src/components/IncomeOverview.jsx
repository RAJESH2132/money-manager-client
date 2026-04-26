import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const result = prepareIncomeLineChartData(transactions);
      setChartData(result);
      return;
    }

    setChartData([]);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze trends.
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <Plus size={15} className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10 h-75">
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <p className="text-sm text-gray-500">No income data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
