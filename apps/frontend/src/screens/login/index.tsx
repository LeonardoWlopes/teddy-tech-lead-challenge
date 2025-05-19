import { useTranslation } from 'react-i18next';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { useLoginContainer } from './container';

export default function LoginScreen() {
	const { t } = useTranslation('login');

	const { inputRef, handleLogin } = useLoginContainer();

	return (
		<main className="mx-auto flex h-screen w-screen max-w-xl items-center justify-center p-4">
			<form className="flex w-full flex-col gap-5" onSubmit={handleLogin}>
				<h1 className="text-4xl font-normal text-black">{t('welcome')}</h1>

				<Input ref={inputRef} className="w-full" placeholder={t('input')} />

				<Button className="w-full" type="submit">
					{t('button')}
				</Button>
			</form>
		</main>
	);
}
