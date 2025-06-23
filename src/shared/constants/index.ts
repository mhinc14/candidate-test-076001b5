import { WorkStatus } from '../types';

export const STATUS_LABELS: Record<WorkStatus, string> = {
	looking: 'Currently looking for work',
	passive: 'Passively looking for work',
	not_looking: "Don't want to hear about work"
};

export const STORE_SOURCES = {
	NAVIGATION: 'navigation',
	DASHBOARD: 'dashboard'
} as const;

export type StoreSource = (typeof STORE_SOURCES)[keyof typeof STORE_SOURCES];
