import { useMemo, useRef } from "react";
import { AgGridReact, type CustomCellRendererProps } from "ag-grid-react";
import type { ColDef, GridApi, ValueFormatterParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import {
  chartFilterInitialState,
  TransactionType,
  type Transaction,
} from "@models";
import { useTransactionsContext } from "context/TransactionsContext";
import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { expenseDark, incomeDark, savingsDark } from "utils/Colors";

// Register the module
ModuleRegistry.registerModules([AllCommunityModule]);

export const DataGrid = () => {
  const { transactions, onDeleteTransaction, fetchFilteredTransactions } =
    useTransactionsContext();
  const gridRef = useRef<GridApi | null>(null);

  const getColumnColor = (type: TransactionType | undefined): string => {
    switch (type) {
      case TransactionType.Expense:
        return expenseDark;
      case TransactionType.Income:
        return incomeDark;
      case TransactionType.Savings:
        return savingsDark;
      default:
        return "";
    }
  };

  const columnDefs = useMemo<ColDef<Transaction>[]>(
    () => [
      {
        headerName: "Date",
        field: "date",
        valueFormatter: (params: ValueFormatterParams) => {
          const date = new Date(params.data.date);
          return date.toLocaleDateString("es-CR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Amount",
        field: "amount",
        cellRenderer: (params: CustomCellRendererProps<Transaction>) => {
          const type = params.data?.type;
          const isExpense = TransactionType.Expense == type;
          return (
            <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
              <Typography variant="body2" color={getColumnColor(type)}>
                {isExpense ? "-" : "+"}₡{params.data?.amount}
              </Typography>
            </Stack>
          );
        },
        sortable: true,
        filter: true,
      },
      {
        colId: "actions",
        maxWidth: 80,
        resizable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) => {
          return (
            <IconButton
              size="small"
              onClick={async () => {
                if (data?.transactionId) {
                  await onDeleteTransaction(data?.transactionId);
                  await fetchFilteredTransactions(chartFilterInitialState);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={transactions}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={(params) => (gridRef.current = params.api)}
        //loading={loading}
      />
    </div>
  );
};
