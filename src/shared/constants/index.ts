import { WorkStatus } from '../types';

export const STATUS_LABELS: Record<WorkStatus, string> = {
	looking: 'Currently looking for work',
	passive: 'Passively looking for work',
	not_looking: "Don't want to hear about work"
};

export const WORK_STATUS_OPTIONS = [
	{ value: 'looking' as WorkStatus, label: STATUS_LABELS.looking },
	{ value: 'passive' as WorkStatus, label: STATUS_LABELS.passive },
	{ value: 'not_looking' as WorkStatus, label: STATUS_LABELS.not_looking }
];

export const STORE_SOURCES = {
	NAVIGATION: 'navigation',
	DASHBOARD: 'dashboard'
} as const;

export type StoreSource = (typeof STORE_SOURCES)[keyof typeof STORE_SOURCES];
