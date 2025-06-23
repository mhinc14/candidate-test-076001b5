import { configureStore } from '@reduxjs/toolkit';
import userReducer, { updateWorkStatus } from './userSlice';
import { createStateSyncMiddleware } from '../../shared/middleware/stateSyncMiddleware';
import { STORE_SOURCES } from '../../shared/constants';

export const dashboardStore = configureStore({
	reducer: {
		user: userReducer
	},
	devTools:
		process.env.NODE_ENV !== 'production' &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			createStateSyncMiddleware({
				source: STORE_SOURCES.DASHBOARD,
				actionCreator: updateWorkStatus
			})
		)
});

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
