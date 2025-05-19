import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { useAuthStore } from '~/stores/auth';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useAuthStore', () => {
	beforeEach(() => {
		const { result } = renderHook(() => useAuthStore());
		act(() => {
			result.current.reset();
		});
	});

	it('should initialize with default state', () => {
		const { result } = renderHook(() => useAuthStore());
		expect(result.current.userName).toBeNull();
	});

	it('should set userName', () => {
		const { result } = renderHook(() => useAuthStore());
		const userName = 'John Doe';

		act(() => {
			result.current.set({ userName });
		});

		expect(result.current.userName).toEqual(userName);
	});
});

it('should reset to default state', () => {
	const { result } = renderHook(() => useAuthStore());
	const userName = 'John Doe';

	act(() => {
		result.current.set({ userName });
	});

	act(() => {
		result.current.reset();
	});

	expect(result.current.userName).toBeNull();
});
