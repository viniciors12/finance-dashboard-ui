import type { Transaction } from "models/Transaction";
import ApiService from "./ApiService";

const baseUrl = "https://localhost:7287/";
export const GetAllTransactions = async (): Promise<Transaction[]> => {
  return ApiService.get(`${baseUrl}transactions/`);
};
