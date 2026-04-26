import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
import { downloadBlobFile, getFilenameFromDisposition } from "../util/report";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [isDownloadingReport, setIsDownloadingReport] = useState(false);
  const [isEmailingReport, setIsEmailingReport] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch income details",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income"),
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch income categories.",
      );
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    if (isDownloadingReport) return;

    setIsDownloadingReport(true);
    try {
      const response = await axiosConfig.post(
        API_ENDPOINTS.INCOME_REPORT_EXCEL,
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
        `income-report-${new Date().toISOString().split("T")[0]}.xlsx`,
      );
      downloadBlobFile(response.data, filename);
      toast.success("Income report downloaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download income report",
      );
    } finally {
      setIsDownloadingReport(false);
    }
  };

  const handleEmailIncomeDetails = async () => {
    if (isEmailingReport) return;

    setIsEmailingReport(true);
    try {
      await axiosConfig.post(API_ENDPOINTS.INCOME_REPORT_EMAIL, {});
      toast.success("Income report email sent successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send income report email",
      );
    } finally {
      setIsEmailingReport(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
            isDownloading={isDownloadingReport}
            isEmailing={isEmailingReport}
          />

          <Model
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Model>

          <Model
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income details?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
