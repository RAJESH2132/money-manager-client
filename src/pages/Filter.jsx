import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Type
              </label>
              <select
                id="type"
                className="w-full border rounded px-3 py-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="w-full border rounded px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="w-full border rounded px-3 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sortField"
                className="block text-sm font-medium mb-1"
              >
                Sort Field
              </label>
              <select
                id="sortField"
                className="w-full border rounded px-3 py-2"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortOrder"
                className="block text-sm font-medium mb-1"
              >
                Sort Order
              </label>
              <select
                id="sortOrder"
                className="w-full border rounded px-3 py-2"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="keyword"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button
                className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded flex items-center justify-center cursor-pointer"
                onClick={handleSearch}
                disabled={loading}
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">Transactions</h5>
          </div>
          {transactions.length === 0 && !loading ? (
            <p className="text-sm text-gray-500">Select the filters to see the transactions.</p>
          ) : (
            ""
          )}
          {loading ? (
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-500">Loading transactions...</p>
            </div>
          ) : (
            ""
          )}
          {transactions.map((transaction) => (
            <TransactionInfoCard key={transaction.id} transaction={transaction.name}
            icon={transaction.icon} date={moment(transaction.date).format("DD MMM YYYY")} amount={transaction.amount} type={transaction.type}hideDeleteBtn={true}/>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
