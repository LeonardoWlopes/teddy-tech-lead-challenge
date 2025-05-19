import { useTranslation } from 'react-i18next';
import { useClientsContainer } from './container';

export default function ClientsScreen() {
	const { t } = useTranslation('clients');

	const { inputRef, handleLogin } = useClientsContainer();

	return (
		<div>
			<h1>Clients</h1>
		</div>
	);
}
