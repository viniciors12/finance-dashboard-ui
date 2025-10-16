import { LoadingBackdrop } from "@components";
import { FinanceDashboard } from "@modules";
import { LoginPage } from "@modules/login/LoginPage";
import { AuthProvider, useAuthContext } from "context/AuthContext";
import { TransactionsProvider } from "context/TransactionsContext";
import { useMemo } from "react";

function AppContent() {
  const { user, loading } = useAuthContext();
  const loadingMessage = useMemo(() => {
    return loading ? "Loading" : undefined;
  }, [loading]);

  if (loading) {
    return <LoadingBackdrop backdropMessage={loadingMessage} />;
  }
  return <>{!!user ? <FinanceDashboard /> : <LoginPage />}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <TransactionsProvider>
        <AppContent />
      </TransactionsProvider>
    </AuthProvider>
  );
}
