import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/shallow';
import { useAuthStore } from '~/stores/auth';

export function useHeaderContainer() {
	const { resetAuthStore, userName } = useAuthStore(
		useShallow((state) => ({
			resetAuthStore: state.reset,
			userName: state.userName,
		})),
	);

	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		resetAuthStore();

		navigate(0);
	}, []);

	const firstName = useMemo(() => {
		return userName?.split(' ')[0];
	}, [userName]);

	return { handleLogout, firstName };
}
