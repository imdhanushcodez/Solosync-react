//export const BASE_URL = "//solosync.us-east-1.elasticbeanstalk.com/api/v1.0";
export const BASE_URL = "https://solosync-backend.onrender.com/api/v1.0";
//export const BASE_URL = "http://localhost:5000/api/v1.0";


export const API_ENDPOINTS = {
    LOGIN:"/login",
    REGISTER:"/register",
    GET_USER_INFO:"/getProfile",
    GET_ALL_CATEGORIES:"/categories",
    UPDATE_CATEGORIES:(categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOME:"/incomes",
    CATEGORY_BY_TYPE:(type) => `/categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME:(id) => `/incomes/${id}`,
    INCOME_EXCEL_DOWNLOAD:"/Excel/download/income",
    GET_ALL_EXPENSE:"/expenses",
    ADD_EXPENSE:"/expenses",
    DELETE_EXPENSE:(id) => `/expenses/${id}`,
    EXPENSE_EXCEL_DOWNLOAD:"/Excel/download/expense",
    APPLY_FILTER:"/filter",
    DASHBOARD_REQUEST:"/dashboard"

}