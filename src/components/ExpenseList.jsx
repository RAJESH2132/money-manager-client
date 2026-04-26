import React from "react";
import moment from "moment";
import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";

const ExpenseList = ({
  transactions,
  onDelete,
  onDownload,
  onEmail,
  isDownloading,
  isEmailing,
}) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Transactions</h5>
        <div className="flex items-center justify-end gap-2">
          <button className="card-btn" onClick={onEmail} disabled={isEmailing}>
            <Mail size={15} className="text-base" />
            {isEmailing ? "Sending..." : "Email"}
          </button>
          <button
            className="card-btn"
            onClick={onDownload}
            disabled={isDownloading}
          >
            <Download size={15} className="text-base" />
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {transactions?.length ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No expense transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
