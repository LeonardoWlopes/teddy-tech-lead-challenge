import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	handler: Handler,
): void {
	function listener(event: MouseEvent | TouchEvent) {
		const el = ref?.current;

		if (!el || el.contains(event.target as Node)) {
			return;
		}

		handler(event);
	}

	function addListener() {
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}
	useEffect(addListener, [ref, handler]);
}
