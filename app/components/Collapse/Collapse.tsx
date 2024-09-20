import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type CollapseComponentProps = {
    title: string, 
    children: ReactNode,
    styleClass?:string,
    defaultOpen?:boolean
}
const CollapseComponent = (props: CollapseComponentProps) => {
    const {title, children, defaultOpen=false} = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 group"
        onClick={toggleCollapse}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <ChevronDownIcon
          className={`h-6 w-6 transform transition-transform duration-300 group-hover:rotate-180 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 bg-gray-100">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default CollapseComponent;
