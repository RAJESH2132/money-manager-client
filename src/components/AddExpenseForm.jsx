import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
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
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.name}
        label="Expense Name"
        placeholder="e.g., Groceries, Rent, Fuel"
        type="text"
        onChange={({ target }) => handleChange("name", target.value)}
      />
      <Input
        value={expense.categoryId}
        label="Category"
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 1200"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAddExpense}
          className="add-btn add-btn-fill"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" /> Adding...
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
