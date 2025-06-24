export const getListItemRounding = (index: number, totalItems: number) => {
  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  if (isFirst && isLast) {
    return "rounded-md";
  }
  if (isFirst) {
    return "rounded-t-md";
  }
  if (isLast) {
    return "rounded-b-md";
  }
  return "rounded-none";
};

export const getDropdownOptionClasses = (
  isSelected: boolean,
  index: number,
  totalItems: number,
  overrideClasses?: string
) => {
  const baseClasses =
    "w-full px-3 py-2 text-left text-base hover:bg-gray-50 transition-colors cursor-pointer";
  const roundingClasses = getListItemRounding(index, totalItems);
  const stateClasses = isSelected
    ? "bg-blue-50 text-blue-700"
    : "bg-white text-gray-700";

  const allClasses = `${baseClasses} ${roundingClasses} ${stateClasses}`;

  return overrideClasses ? `${allClasses} ${overrideClasses}` : allClasses;
};
