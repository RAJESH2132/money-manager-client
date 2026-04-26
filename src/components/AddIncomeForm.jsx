import EmojiPickerPopup from "./EmojiPickerPopup";
import React, { useState } from "react";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { value: "", label: "Select Category" },
    ...(categories || []).map((category) => ({
    value: category.id,
    label: category.name,
    })),
  ];

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.name}
        label="Income Source"
        placeholder="e.g., Salary, Freelance, Bonus"
        type="text"
        onChange={({ target }) => handleChange("name", target.value)}
      />
      <Input
        value={income.categoryId}
        label="Category"
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.0"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAddIncome}
          className="add-btn add-btn-fill"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" /> Adding...
            </>
          ) : (
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
