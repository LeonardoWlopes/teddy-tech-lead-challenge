import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '~/interfaces/auth';

interface IAuthState {
	user: IUser | null;
	accessToken: string | null;
}

interface IAuthActions {
	set: (state: Partial<IAuthState>) => void;
	reset: () => void;
}

type IAuthStore = IAuthState & IAuthActions;

const DEFAULT_STATE: IAuthState = {
	user: null,
	accessToken: null,
};

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
		}),
		{
			name: '@template/auth-store',
		},
	),
);
