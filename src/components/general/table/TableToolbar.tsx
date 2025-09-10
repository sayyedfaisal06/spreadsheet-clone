import { Button } from "@/components/ui/button";
import { useState } from "react";
import ToolbarToggleImg from "@/assets/toolbar-toggle.svg";
import {
  ArrowDownToLine,
  ArrowDownUpIcon,
  ArrowUpToLine,
  ColumnsIcon,
  EyeOffIcon,
  ListFilterIcon,
  Network,
  Share2,
} from "lucide-react";

const toolbarItems = [
  { label: "Hide", icon: <EyeOffIcon size={14} /> },
  { label: "Sort", icon: <ArrowDownUpIcon size={14} /> },
  { label: "Filter", icon: <ListFilterIcon size={14} /> },
  { label: "Cell view", icon: <ColumnsIcon size={14} /> },
];

const actionItems = [
  { label: "Import", icon: <ArrowDownToLine size={14} /> },
  { label: "Export", icon: <ArrowUpToLine size={14} /> },
  { label: "Share", icon: <Share2 size={14} /> },
];

const TableToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full z-50 fixed top-14 left-0 right-0 bg-white border-b border-muted-color flex items-center justify-between px-2 py-1.5 shadow">
      {/* Left toolbar toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant="link"
          className="z-50 text-sm bg-white hover:no-underline font-normal flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          Tool bar
          <img src={ToolbarToggleImg} alt="Toggle" />
        </Button>

        <div
          className={`ml-2 flex gap-1 transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          {toolbarItems.map(({ label, icon }) => (
            <Button
              key={label}
              variant="ghost"
              className="font-normal flex items-center gap-1"
              onClick={() => console.log(label)}
            >
              {icon} {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Right-side action buttons */}
      <div className="flex items-center gap-1">
        {actionItems.map(({ label, icon }) => (
          <Button
            key={label}
            variant="outline"
            className="font-normal flex items-center gap-1"
            onClick={() => console.log(label)}
          >
            {icon} {label}
          </Button>
        ))}

        <Button
          className="bg-brand-color hover:bg-brand-color/90 font-normal w-36 flex items-center gap-1"
          onClick={() => console.log("New Action")}
        >
          <Network size={14} /> New Action
        </Button>
      </div>
    </div>
  );
};

export default TableToolbar;
