import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IClient } from '~/interfaces/client';

interface IClientState {
	clients: IClient[];
}

interface IClientActions {
	add: (client: IClient) => void;
	remove: (id: string) => void;
	set: (state: Partial<IClientState>) => void;
	update: (client: IClient) => void;
	reset: () => void;
}

type IClientStore = IClientState & IClientActions;

const DEFAULT_STATE: IClientState = {
	clients: [],
};

export const useClientStore = create<IClientStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
			add: (client) =>
				set((state) => {
					const exists = state.clients.some((client) => client.id === client.id);

					if (exists) return state;
					return { clients: [...state.clients, client] };
				}),
			update: (client) =>
				set((state) => ({
					clients: state.clients.map((oldClient) =>
						oldClient.id === client.id ? client : oldClient,
					),
				})),
			remove: (id) =>
				set((state) => ({ clients: state.clients.filter((client) => client.id !== id) })),
		}),
		{
			name: '@teddy/client-store',
		},
	),
);
