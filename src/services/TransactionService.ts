import type { Transaction } from "models/Transaction";
import ApiService from "./ApiService";
import type { ChartFilterResponse } from "@models";

const baseUrl = "https://i8vvaycq2f.execute-api.us-east-2.amazonaws.com/";
export const GetAllTransactions = async (
  token?: string
): Promise<Transaction[]> => {
  return ApiService.get(`${baseUrl}transactions`, token);
};

export const AddTransaction = async (
  transaction: Transaction,
  token?: string
): Promise<Transaction[]> => {
  return ApiService.post(`${baseUrl}transactions`, transaction, token);
};

export const GetFilteredTransactions = async (
  transaction: Transaction,
  token?: string
): Promise<ChartFilterResponse[]> => {
  return ApiService.post(
    `${baseUrl}transactions/filteredTransactions`,
    transaction,
    token
  );
};

export const DeleteTransaction = async (
  transactionId: number,
  token?: string
): Promise<Transaction[]> => {
  return ApiService.delete(`${baseUrl}transactions/${transactionId}`, token);
};
