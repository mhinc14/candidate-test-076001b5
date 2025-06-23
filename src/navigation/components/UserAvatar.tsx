import { useSelector, useDispatch } from 'react-redux';
import { NavRootState, NavDispatch } from '../store';
import { updateWorkStatus } from '../store/userSlice';
import { WorkStatus } from '../../shared/types';
import { useState } from 'react';
import { STATUS_LABELS, WORK_STATUS_OPTIONS } from '../../shared/constants';
import { getDropdownOptionClasses } from '../../shared/utils/stylingUtils';
import { useClickOutside } from '../../shared/hooks/useClickOutside';

export const UserAvatar = () => {
	const { profile } = useSelector((state: NavRootState) => state.user);
	const dispatch = useDispatch<NavDispatch>();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useClickOutside<HTMLDivElement>(() =>
		setDropdownOpen(false)
	);

	const handleStatusChange = (status: WorkStatus) => {
		dispatch(updateWorkStatus(status));
		setDropdownOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="flex items-center gap-3 cursor-pointer"
				onClick={() => setDropdownOpen(!dropdownOpen)}
			>
				<img
					src={profile.avatar}
					alt={profile.name}
					className="w-10 h-10 rounded-full"
				/>
				<div className="flex flex-col">
					<span className="font-medium text-sm">{profile.name}</span>
					<span className="text-xs text-gray-600 truncate max-w-40">
						{STATUS_LABELS[profile.workStatus]}
					</span>
				</div>
			</div>

			{dropdownOpen && (
				<div className="absolute bottom-full mb-5 -left-3 -right-3 bg-white shadow-lg rounded-md z-50 border border-gray-200">
					<div className="p-3 pb-1">
						<h4 className="text-xs font-medium text-gray-700 mb-2">
							Update your work status:
						</h4>
					</div>
					<div className="h-[1px] w-py bg-gray-200 mx-3"></div>
					<ul>
						{WORK_STATUS_OPTIONS.map((option, index) => (
							<li
								key={option.value}
								onClick={() => handleStatusChange(option.value)}
								className={getDropdownOptionClasses(
									profile.workStatus === option.value,
									index,
									WORK_STATUS_OPTIONS.length,
									'text-xs'
								)}
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
