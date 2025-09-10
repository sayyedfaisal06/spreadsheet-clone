import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const TableSheetSelect = () => {
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const tabs = ["All Orders", "Pending", "Received", "Arrived"];

  return (
    <div className="z-50 w-full h-12 pl-9 bg-white fixed bottom-0 left-0 border-t border-muted-color flex items-center">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <Button
            className={cn(
              "hover:no-underline border-t-2 border-white rounded-none",
              {
                "border-t-2 border-green-800 bg-brand-color/15 ":
                  selectedTab === tab,
              }
            )}
            variant={"link"}
            key={tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
      <Button size={"icon"} variant={"ghost"} className="rounded-full ml-4">
        <PlusIcon />
      </Button>
    </div>
  );
};

export default TableSheetSelect;
