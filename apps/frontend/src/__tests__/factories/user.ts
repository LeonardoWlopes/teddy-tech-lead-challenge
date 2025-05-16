import { IUser } from '~/interfaces/auth';

export function makeUserSut(overrides?: Partial<IUser>): IUser {
	return {
		login: 'leonardowlopes',
		avatar_url: 'https://github.com/leonardowlopes.png',
		...overrides,
	};
}
