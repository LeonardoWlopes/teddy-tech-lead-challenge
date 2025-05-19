import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import '~/i18n/config';
import { Toaster } from 'sonner';
import { QueryProvider } from './providers/query-provider';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<Router />

			<Toaster />
		</QueryProvider>
	</StrictMode>,
);
