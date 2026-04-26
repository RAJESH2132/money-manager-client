import { Download, Mail } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({
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
        <h5 className="text-lg">Income Sources</h5>
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
          transactions.map((income) => (
            <TransactionInfoCard
              key={income.id}
              title={income.name}
              icon={income.icon}
              date={moment(income.date).format("DD MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income.id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No income transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
