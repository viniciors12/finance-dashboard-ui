import type { ChartFilterRequest, ChartFilterResponse } from "@models";
import type { Transaction } from "models/Transaction";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AddTransaction,
  DeleteTransaction,
  GetAllTransactions,
  GetFilteredTransactions,
} from "services/TransactionService";

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onAddTransaction: (data: Omit<Transaction, "id">) => Promise<void>;
  fetchFilteredTransactions: (
    filter: ChartFilterRequest
  ) => Promise<ChartFilterResponse[] | undefined>;
  onDeleteTransaction: (transactionId: number) => Promise<void>;
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

  const onAddTransaction = async (data: Omit<Transaction, "id">) => {
    const transactions = await AddTransaction(data);
    setTransactions([...transactions]);
  };

  const onDeleteTransaction = async (transactionId: number) => {
    const transaction = await DeleteTransaction(transactionId);
    setTransactions([...transaction]);
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
        onAddTransaction,
        fetchFilteredTransactions,
        onDeleteTransaction,
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
