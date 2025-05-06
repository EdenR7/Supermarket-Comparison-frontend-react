import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./providers/auth-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

// import { ThemeProvider } from "./providers/theme-provider.tsx";

import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserCartProvider } from "./providers/user_cart-provider.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
      <AuthProvider>
        <UserCartProvider>
          <App />
          <Toaster />
        </UserCartProvider>
      </AuthProvider>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
