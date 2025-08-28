import type { Transaction } from "models/Transaction";
import ApiService from "./ApiService";
import type { ChartFilterResponse } from "@models";

const baseUrl = "https://localhost:7287/";
export const GetAllTransactions = async (): Promise<Transaction[]> => {
  return ApiService.get(`${baseUrl}transactions/`);
};

export const AddTransaction = async (
  transaction: Transaction
): Promise<Transaction[]> => {
  return ApiService.post(`${baseUrl}transactions/`, transaction);
};

export const GetFilteredTransactions = async (
  transaction: Transaction
): Promise<ChartFilterResponse[]> => {
  return ApiService.post(
    `${baseUrl}transactions/filteredTransactions`,
    transaction
  );
};
