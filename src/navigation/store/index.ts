import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateWorkStatus } from "./userSlice";
import { createStateSyncMiddleware } from "../../shared/middleware/stateSyncMiddleware";
import { STORE_SOURCES } from "../../shared/constants";

export const navStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createStateSyncMiddleware({
        source: STORE_SOURCES.NAVIGATION,
        actionCreator: updateWorkStatus
      })
    ),
});

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;
