import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchOnReconnect: true,
		},
	},
});

export function QueryProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
