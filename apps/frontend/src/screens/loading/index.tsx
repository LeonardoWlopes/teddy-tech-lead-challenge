import logo from '~/assets/images/logo.png';

export function LoadingScreen() {
	return (
		<div className="flex h-screen items-center justify-center">
			<img
				className="w-30 animate-bounce"
				style={{
					animationDuration: '3s',
				}}
				src={logo}
				alt="logo"
			/>
		</div>
	);
}
