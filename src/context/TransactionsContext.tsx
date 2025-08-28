import type { ChartFilterRequest, ChartFilterResponse } from "@models";
import type { Transaction } from "models/Transaction";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AddTransaction,
  GetAllTransactions,
  GetFilteredTransactions,
} from "services/TransactionService";

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addTransaction: (data: Omit<Transaction, "id">) => Promise<void>;
  fetchFilteredTransactions: (
    filter: ChartFilterRequest
  ) => Promise<ChartFilterResponse[] | undefined>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      GetAllTransactions().then((data) => {
        setTransactions(data);
        setError(null);
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredTransactions = async (filter: ChartFilterRequest) => {
    setLoading(true);
    try {
      return await GetFilteredTransactions(filter);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (data: Omit<Transaction, "id">) => {
    const transactions = await AddTransaction(data);
    setTransactions([...transactions]);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
        error,
        refresh: fetchTransactions,
        addTransaction,
        fetchFilteredTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (!context)
    throw new Error(
      "useTransactionsContext must be used within TransactionsProvider"
    );
  return context;
};
