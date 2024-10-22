import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
      {/* uncomment below line during development */}

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const QueryCover = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //cache stays fresh for 3min
        staleTime: 180000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* uncomment below line during development */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default QueryCover;
