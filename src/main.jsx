import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '@radix-ui/themes/styles.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Component/AuthProvider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme grayColor="mauve">
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <HelmetProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </HelmetProvider>
      </ChakraProvider>
    </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);
