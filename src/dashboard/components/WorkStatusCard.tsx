import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import { STATUS_LABELS, WORK_STATUS_OPTIONS } from "../../shared/constants";
import { CustomSelect } from "./CustomSelect";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const handleStatusChange = (status: WorkStatus) => {
    dispatch(updateWorkStatus(status));
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <p>Update your availability for new opportunities:</p>

        <CustomSelect
          value={profile.workStatus}
          options={WORK_STATUS_OPTIONS}
          onChange={handleStatusChange}
          className="my-4"
        />

        <p className="mt-4 text-gray-500">
          Your current status:{" "}
          <strong>{STATUS_LABELS[profile.workStatus]}</strong>
        </p>
      </div>
    </div>
  );
};
