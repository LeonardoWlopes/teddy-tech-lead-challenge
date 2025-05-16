import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import '~/i18n/config';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router />
	</StrictMode>,
);
