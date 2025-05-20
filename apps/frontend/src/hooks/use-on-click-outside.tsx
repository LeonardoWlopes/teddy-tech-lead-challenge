import type { RefObject } from 'react';
import { useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	handler: Handler,
	enabled = true,
): void {
	function listener(event: MouseEvent | TouchEvent) {
		if (!enabled) {
			return;
		}

		const el = ref?.current;

		if (!el || el.contains(event.target as Node)) {
			return;
		}

		handler(event);
	}

	function addListener() {
		if (!enabled) {
			return;
		}

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}

	useEffect(addListener, [ref, handler, enabled]);
}
