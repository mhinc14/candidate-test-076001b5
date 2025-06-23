import { useState, useRef, useEffect } from 'react';
import { getDropdownOptionClasses } from '../../shared/utils/stylingUtils';

interface Option<T> {
	value: T;
	label: string;
}

interface CustomSelectProps<T> {
	value: T;
	options: Option<T>[];
	onChange: (value: T) => void;
	placeholder?: string;
	className?: string;
}

export const CustomSelect = <T extends string>({
	value,
	options,
	onChange,
	placeholder = 'Select an option',
	className = ''
}: CustomSelectProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find((option) => option.value === value);

	const handleOptionClick = (optionValue: T) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			<div
				role="button"
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer w-full p-3 border border-solid border-gray-300 rounded-md text-base text-left hover:border-gray-400 transition-colors"
			>
				<div className="flex items-center min-w-0">
					<span
						className={`flex-1 truncate pr-2 ${
							selectedOption ? 'text-gray-900' : 'text-gray-400'
						}`}
					>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<div className="flex items-center flex-shrink-0">
						<div className="h-6 w-px bg-gray-300 mr-3"></div>
						<svg
							className={`w-5 h-5 text-gray-500 transition-transform duration-150 flex-shrink-0 ${
								isOpen ? 'transform rotate-180' : ''
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
					<ul>
						{options.map((option, index) => (
							<li
								key={option.value}
								onClick={() => handleOptionClick(option.value)}
								className={getDropdownOptionClasses(
									value === option.value,
									index,
									options.length
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
