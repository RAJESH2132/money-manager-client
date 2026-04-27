import config from "./config";

export const BASE_URL = config.baseUrl;
const CLOUDINARY_CLOUD_NAME = config.cloudName;

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  GET_ALL_INCOMES: "/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME: "/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_REPORT_EXCEL: "/incomes/report/excel",
  INCOME_REPORT_EMAIL: "/incomes/report/email",
  GET_ALL_EXPENSES: "/expenses",
  ADD_EXPENSE: "/expenses",
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_REPORT_EXCEL: "/expenses/report/excel",
  EXPENSE_REPORT_EMAIL: "/expenses/report/email",
  APPLY_FILTER: "/filter",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
