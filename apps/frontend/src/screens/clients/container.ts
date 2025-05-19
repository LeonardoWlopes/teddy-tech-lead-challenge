import { FormEvent, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuthStore } from '~/stores/auth';
import { useNavigate } from 'react-router';

export function useClientsContainer() {
	const { t } = useTranslation('clients');

	const inputRef = useRef<HTMLInputElement>(null);

	const setAuthStore = useAuthStore((state) => state.set);

	const navigate = useNavigate();

	const handleLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const userName = inputRef.current?.value;

		if (!userName) {
			toast.warning(t('error'));
			return;
		}

		setAuthStore({ userName });
		navigate(0);
	}, []);

	return {
		inputRef,
		handleLogin,
	};
}
