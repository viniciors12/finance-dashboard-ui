import {
  type ChartFilterRequest,
  type ChartFilterResponse,
  type Transaction,
} from "@models";
import { useAuthContext } from "context/AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AddTransaction,
  DeleteTransaction,
  GetAllTransactions,
  GetFilteredTransactions,
} from "services/TransactionService";

interface TransactionsContextType {
  transactions: Transaction[];
  chartData: ChartFilterResponse[] | undefined;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onAddTransaction: (data: Omit<Transaction, "id">) => Promise<void>;
  fetchFilteredTransactions: (filter: ChartFilterRequest) => void;
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
  const [chartData, setChartData] = useState<
    ChartFilterResponse[] | undefined
  >();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuthContext();

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      GetAllTransactions(token).then((data) => {
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
      const token = await getToken();
      const data = await GetFilteredTransactions(filter, token);
      setChartData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onAddTransaction = async (data: Omit<Transaction, "id">) => {
    setLoading(true);
    const token = await getToken();
    const transactions = await AddTransaction(data, token);
    setTransactions([...transactions]);
    setLoading(false);
  };

  const onDeleteTransaction = async (transactionId: number) => {
    setLoading(true);
    const token = await getToken();
    const transaction = await DeleteTransaction(transactionId, token);
    setTransactions([...transaction]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions();
    setLoading(false);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        chartData,
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
