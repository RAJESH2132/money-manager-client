import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverView from "../components/FinanceOverView";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {}
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance ?? 0)}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome ?? 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense ?? 0)}
              color="bg-red-800"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <RecentTransactions transactions={dashboardData?.recentTransactions ?? []} onMore={() => navigate("/expense")} />
            <FinanceOverView totalBalance={dashboardData?.totalBalance ?? 0} totalIncome={dashboardData?.totalIncome ?? 0} totalExpense={dashboardData?.totalExpense ?? 0} />
            <Transactions transactions={dashboardData?.recent5Expenses ?? []} onMore={() => navigate("/expense")} type="expensee" title="Recent Expenses" />
            <Transactions transactions={dashboardData?.recent5Incomes ?? []} onMore={() => navigate("/income")} type="income" title="Recent Incomes" />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
