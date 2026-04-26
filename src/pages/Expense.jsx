import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import { downloadBlobFile, getFilenameFromDisposition } from "../util/report";

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [isDownloadingReport, setIsDownloadingReport] = useState(false);
  const [isEmailingReport, setIsEmailingReport] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense categories.",
      );
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddExpenseModel(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    if (isDownloadingReport) return;

    setIsDownloadingReport(true);
    try {
      const response = await axiosConfig.post(
        API_ENDPOINTS.EXPENSE_REPORT_EXCEL,
        {},
        {
          responseType: "blob",
          headers: {
            Accept:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        },
      );

      const contentDisposition = response.headers?.["content-disposition"];
      const filename = getFilenameFromDisposition(
        contentDisposition,
        `expense-report-${new Date().toISOString().split("T")[0]}.xlsx`,
      );
      downloadBlobFile(response.data, filename);
      toast.success("Expense report downloaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download expense report",
      );
    } finally {
      setIsDownloadingReport(false);
    }
  };

  const handleEmailExpenseDetails = async () => {
    if (isEmailingReport) return;

    setIsEmailingReport(true);
    try {
      await axiosConfig.post(API_ENDPOINTS.EXPENSE_REPORT_EMAIL, {});
      toast.success("Expense report email sent successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send expense report email",
      );
    } finally {
      setIsEmailingReport(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
            isDownloading={isDownloadingReport}
            isEmailing={isEmailingReport}
          />

          <Model
            isOpen={openAddExpenseModel}
            onClose={() => setOpenAddExpenseModel(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Model>

          <Model
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
