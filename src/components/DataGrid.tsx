import { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Transaction } from "models/Transaction";
import { GetAllTransactions } from "services/TransactionService";

// Register the module
ModuleRegistry.registerModules([
  AllCommunityModule, // or AllEnterpriseModule
]);

export const DataGrid = () => {
  const [rowData, setRowData] = useState<Transaction[]>([]);
  const gridRef = useRef<GridApi | null>(null);

  const columnDefs = useMemo<ColDef<Transaction>[]>(
    () => [
      { headerName: "Date", field: "date", sortable: true, filter: true },
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
      { headerName: "Amount", field: "amount", sortable: true, filter: true },
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

  useEffect(() => {
    GetAllTransactions()
      .then((response) => setRowData(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={(params) => (gridRef.current = params.api)}
      />
    </div>
  );
};
