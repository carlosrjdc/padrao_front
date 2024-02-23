"use client";
import { createIDBPersister } from "@/providers/persistQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactNode } from "react";


export const queryClient = new QueryClient()


const persister = createIDBPersister();

export default function ProviderUseQuery({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <PersistQueryClientProvider persistOptions={{persister}}  client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
