import { Middleware, ActionCreatorWithPayload, Action } from '@reduxjs/toolkit';
import {
	broadcastWorkStatusUpdate,
	listenForWorkStatusUpdates
} from '../services/stateSyncService';
import { WorkStatus } from '../types';
import { StoreSource } from '../constants';

interface ActionWithPayload extends Action {
	payload?: unknown;
}

interface SyncConfig {
	source: StoreSource;
	actionCreator: ActionCreatorWithPayload<WorkStatus>;
}

export const createStateSyncMiddleware = (config: SyncConfig): Middleware => {
	return ((store) => {
		listenForWorkStatusUpdates((message) => {
			if (message.source === config.source) return;
			store.dispatch(config.actionCreator(message.payload.workStatus));
		});

		return (next) => (action: ActionWithPayload) => {
			const result = next(action);

			// Check if this action is the specific work status update we want to sync
			if (action.type === config.actionCreator.type) {
				broadcastWorkStatusUpdate(
					action.payload as WorkStatus,
					config.source
				);
			}

			return result;
		};
	}) as Middleware;
};
