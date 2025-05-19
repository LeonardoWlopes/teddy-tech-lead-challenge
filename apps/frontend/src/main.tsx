import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import '~/i18n/config';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router />

		<Toaster />
	</StrictMode>,
);
