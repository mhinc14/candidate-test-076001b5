import { WorkStatus } from "../types";
import { StoreSource } from "../constants";

const EVENT_NAME = "workStatusUpdate";
const EVENT_TYPE = "WORK_STATUS_UPDATE";
export interface SyncMessage {
  type: typeof EVENT_TYPE;
  payload: { workStatus: WorkStatus };
  source: StoreSource;
}

export const broadcastWorkStatusUpdate = (
  workStatus: WorkStatus,
  source: StoreSource
) => {
  const message: SyncMessage = {
    type: EVENT_TYPE,
    payload: { workStatus },
    source,
  };
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: message }));
};

export const listenForWorkStatusUpdates = (
  callback: (message: SyncMessage) => void
) => {
  const handleMessage = (event: CustomEvent<SyncMessage>) => {
    callback(event.detail);
  };

  window.addEventListener(EVENT_NAME, handleMessage as EventListener);

  return () =>
    window.removeEventListener(EVENT_NAME, handleMessage as EventListener);
};
