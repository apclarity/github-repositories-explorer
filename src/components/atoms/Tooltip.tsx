import {TooltipProps} from "../../types";

const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
  const positionClasses =
    position === 'top'
      ? 'absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap'
      : 'absolute top-1/2 left-auto right-full -translate-y-1/2 -mr-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap';

  return (
    <div className="relative group">
      {children}
      <div
        className={`${positionClasses} `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
