import React, { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Link2, Network, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CellType = string | number;

const INITIAL_ROWS = 1000;
const INITIAL_COLS = 10;
const DEFAULT_CELL_WIDTH = 140;
const CELL_HEIGHT = 32;
const HEADER_HEIGHT = 28;
const ROW_HEADER_WIDTH = 50;

const sampleData = [
  [
    "Launch social media campaign for product launch",
    "15-11-2024",
    "In-progress",
    "Aisha Patel",
    "www.aishapatel.com",
    "Sophie Choudhury",
    "Medium",
    "20-11-2024",
    "6,200,000 ₹",
    "",
  ],
  [
    "Update press kit for company redesign",
    "28-10-2024",
    "Need to start",
    "Irfan Khan",
    "www.irfankhap.com",
    "Tejas Pandey",
    "High",
    "30-10-2024",
    "3,500,000 ₹",
    "",
  ],
  [
    "Finalize user testing feedback for app updates",
    "05-12-2024",
    "In-progress",
    "Mark Johnson",
    "www.markjohns.com",
    "Rachel Lee",
    "Medium",
    "10-12-2024",
    "4,750,000 ₹",
    "",
  ],
  [
    "Design new features for the website",
    "10-01-2025",
    "Complete",
    "Emily Green",
    "www.emilygreen.com",
    "Tom Wright",
    "Low",
    "15-01-2025",
    "5,900,000 ₹",
    "",
  ],
  [
    "Prepare financial report for Q4",
    "25-01-2025",
    "Blocked",
    "Jessica Brown",
    "www.jessicabro.com",
    "Kevin Smith",
    "Low",
    "30-01-2025",
    "2,800,000 ₹",
    "",
  ],
];

const getColumnLabel = (index: number) => {
  let label = "";
  let n = index;
  do {
    label = String.fromCharCode((n % 26) + 65) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
};

const generateRow = (cols: number, rowIndex: number): CellType[] => {
  if (rowIndex < sampleData.length) {
    return [
      ...sampleData[rowIndex],
      ...Array.from({
        length: Math.max(0, cols - sampleData[rowIndex].length),
      }).map(() => ""),
    ];
  }
  return Array.from({ length: cols }).map(() => "");
};

const ExcelClone: React.FC = () => {
  const [rows, setRows] = useState<CellType[][]>(() =>
    Array.from({ length: INITIAL_ROWS }).map((_, index) =>
      generateRow(INITIAL_COLS, index)
    )
  );

  const [columnWidths, setColumnWidths] = useState<number[]>(
    Array(INITIAL_COLS).fill(DEFAULT_CELL_WIDTH)
  );

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [mainHeaders, setMainHeaders] = useState([
    {
      title: "Q3 Financial Overview",
      span: 4,
      startCol: 0,
      bg: "#E2E2E2",
      icon: <Link2 className="w-3.5 h-3.5" />,
    },
    { title: "", span: 1, startCol: 4, bg: "" },
    {
      title: "ABC",
      span: 1,
      startCol: 5,
      bg: "#D2E0D4",
      icon: <Network className="w-3.5 h-3.5" />,
    },
    {
      title: "Assignment Details",
      span: 2,
      startCol: 6,
      bg: "#DCCFFC",
      icon: <Network className="w-3.5 h-3.5" />,
    },
    {
      title: "Timeline & Budget",
      span: 2,
      startCol: 8,
      bg: "#FAC2AF",
      icon: <Network className="w-3.5 h-3.5" />,
    },
  ]);

  const [subHeaders, setSubHeaders] = useState([
    "Job Request",
    "Submitted",
    "Status",
    "Submitter",
    "URL",
    "Assigned",
    "Priority",
    "Due Date",
    "Est. Value",
    "Notes",
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMainTitle, setNewMainTitle] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rowHeaderScrollRef = useRef<HTMLDivElement>(null);
  const colHeaderScrollRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => CELL_HEIGHT,
    overscan: 10,
  });

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnWidths.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: (index) => columnWidths[index],
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualCols = colVirtualizer.getVirtualItems();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (rowHeaderScrollRef.current)
      rowHeaderScrollRef.current.scrollTop = scrollTop;
    if (colHeaderScrollRef.current)
      colHeaderScrollRef.current.scrollLeft = scrollLeft;
  };

  const startResizing = (e: React.MouseEvent, colIndex: number) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colIndex];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      setColumnWidths((prev) => {
        const updated = [...prev];
        updated[colIndex] = Math.max(60, startWidth + delta);
        return updated;
      });

      colVirtualizer.measure();
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      colVirtualizer.scrollToIndex(colIndex);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const generatePriorityColor = (priority: string) => {
    let color = "";
    switch (priority) {
      case "Low":
        color = "text-blue-500";
        break;
      case "Medium":
        color = "text-amber-500";
        break;
      case "High":
        color = "text-red-500";
        break;

      default:
        break;
    }
    return color;
  };
  const generateStatusColor = (priority: string) => {
    let color = "";
    switch (priority) {
      case "In-progress":
        color = "text-amber-500 bg-amber-100 w-fit h-5 rounded-full";
        break;
      case "Need to start":
        color = "text-slate-500 bg-slate-100 w-fit h-5 rounded-full";
        break;
      case "Complete":
        color = "text-green-500 bg-green-100 w-fit h-5 rounded-full";
        break;
      case "Blocked":
        color = "text-red-500 bg-red-100 w-fit h-5 rounded-full";
        break;

      default:
        break;
    }
    return color;
  };

  const ADD_COLUMN_INDEX = columnWidths.length;
  const rowOffset = rowVirtualizer.scrollOffset ?? 0;
  const colOffset = colVirtualizer.scrollOffset ?? 0;

  return (
    <div className="w-full h-screen bg-white flex flex-col mt-[6.5rem]">
      {/* Headers */}
      <div className="flex-shrink-0">
        {/* Main headers row */}
        <div className="flex border-b border-gray-300 bg-gray-100">
          <div
            className="bg-gray-200 border-r-2 border-gray-300 flex items-center justify-center font-semibold text-xs flex-shrink-0"
            style={{ width: ROW_HEADER_WIDTH, height: HEADER_HEIGHT }}
          />

          <div className="flex-1 overflow-hidden">
            <div className="flex relative">
              {mainHeaders.map((header, index) => {
                const totalWidth = columnWidths
                  .slice(header.startCol, header.startCol + header.span)
                  .reduce((acc, w) => acc + w, 0);

                // ✅ Handle resizing for main headers
                const startResizingMain = (
                  e: React.MouseEvent,
                  headerIndex: number
                ) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const header = mainHeaders[headerIndex];
                  const startX = e.clientX;
                  const startWidths = columnWidths.slice(
                    header.startCol,
                    header.startCol + header.span
                  );
                  const startTotalWidth = startWidths.reduce(
                    (sum, w) => sum + w,
                    0
                  );

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const delta = moveEvent.clientX - startX;
                    const newTotalWidth = Math.max(
                      header.span * 60,
                      startTotalWidth + delta
                    );

                    // Calculate proportional resizing
                    const scaleFactor = newTotalWidth / startTotalWidth;

                    setColumnWidths((prev) => {
                      const updated = [...prev];
                      startWidths.forEach((w, i) => {
                        updated[header.startCol + i] = Math.max(
                          60,
                          w * scaleFactor
                        );
                      });
                      return updated;
                    });

                    colVirtualizer.measure();
                  };

                  const handleMouseUp = () => {
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mouseup", handleMouseUp);
                  };

                  window.addEventListener("mousemove", handleMouseMove);
                  window.addEventListener("mouseup", handleMouseUp);
                };

                return (
                  <div
                    key={index}
                    className="bg-gray-100 border-r border-gray-300 flex items-center justify-center font-semibold text-xs text-gray-700 relative group gap-2"
                    style={{
                      width: totalWidth,
                      height: HEADER_HEIGHT,
                      minWidth: totalWidth,
                      backgroundColor: header.bg,
                    }}
                  >
                    {header.icon}
                    {header.title}

                    {/* ✅ Resizer for main headers */}
                    <div
                      onMouseDown={(e) => startResizingMain(e, index)}
                      className="absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-gray-400"
                      style={{ zIndex: 60 }}
                    />
                  </div>
                );
              })}
              {/* ➕ Add Column Button */}
              <div
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 cursor-pointer font-bold text-lg"
                style={{
                  width: DEFAULT_CELL_WIDTH,
                  height: HEADER_HEIGHT,
                  minWidth: 40,
                }}
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Sub headers row */}
        <div className="flex border-b-2 border-gray-300 bg-white">
          <div
            className="bg-white border-r-2 border-gray-300 flex items-center justify-center font-semibold text-xs flex-shrink-0"
            style={{ width: ROW_HEADER_WIDTH, height: CELL_HEIGHT }}
          />

          <div ref={colHeaderScrollRef} className="flex-1 overflow-hidden">
            <div
              className="relative"
              style={{
                width: colVirtualizer.getTotalSize(),
                height: CELL_HEIGHT,
              }}
            >
              {virtualCols.map((virtualCol) => (
                <div
                  key={virtualCol.key}
                  className="absolute bg-gray-50 border-r border-gray-300 flex items-center px-3 font-semibold text-xs text-gray-700 group"
                  style={{
                    left: virtualCol.start,
                    width: columnWidths[virtualCol.index], // ✅ Use updated dynamic width
                    height: CELL_HEIGHT,
                    transform: `translateX(${colOffset}px)`,
                  }}
                >
                  {subHeaders[virtualCol.index] ||
                    getColumnLabel(virtualCol.index)}

                  {/* ✅ Always-visible resizer handle */}
                  <div
                    onMouseDown={(e) => startResizing(e, virtualCol.index)}
                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-gray-400"
                    style={{ zIndex: 50 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Row headers */}
        <div
          ref={rowHeaderScrollRef}
          className="bg-gray-50 border-r-2 border-gray-300 overflow-hidden flex-shrink-0"
          style={{
            width: ROW_HEADER_WIDTH,
          }}
        >
          <div
            className="relative"
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: ROW_HEADER_WIDTH,
            }}
          >
            {virtualRows.map((virtualRow) => (
              <div
                key={virtualRow.key}
                className="absolute bg-gray-50 border-b border-gray-300 flex items-center justify-center font-semibold text-xs text-gray-600"
                style={{
                  top: virtualRow.start,
                  height: virtualRow.size,
                  width: ROW_HEADER_WIDTH,
                  transform: `translateY(${-rowOffset}px)`,
                }}
              >
                {virtualRow.index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Data cells area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-auto bg-white"
          onScroll={handleScroll}
        >
          <div
            className="relative"
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: colVirtualizer.getTotalSize(),
            }}
          >
            {virtualRows.map((virtualRow) =>
              [
                ...virtualCols,
                {
                  index: ADD_COLUMN_INDEX,
                  start: colVirtualizer.getTotalSize(),
                },
              ] // add placeholder
                .map((virtualCol) => {
                  const isAddColumnPlaceholder =
                    virtualCol.index === ADD_COLUMN_INDEX;

                  return (
                    <div
                      key={`${virtualRow.key}-${virtualCol.index}`}
                      className={`absolute border-b border-r border-gray-200 bg-white hover:bg-gray-50 ${
                        selectedCell?.row === virtualRow.index &&
                        selectedCell?.col === virtualCol.index
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : ""
                      } ${
                        isAddColumnPlaceholder
                          ? "border-dashed border-blue-400 bg-blue-50"
                          : ""
                      }`}
                      style={{
                        top: virtualRow.start,
                        left: virtualCol.start,
                        width: isAddColumnPlaceholder
                          ? DEFAULT_CELL_WIDTH
                          : columnWidths[virtualCol.index],
                        height: virtualRow.size,
                      }}
                      onClick={() =>
                        setSelectedCell({
                          row: virtualRow.index,
                          col: virtualCol.index,
                        })
                      }
                    >
                      <div
                        className={cn(
                          "w-full h-full px-3 py-2 text-xs flex items-center outline-none font-medium",
                          generatePriorityColor(
                            String(rows[virtualRow.index]?.[virtualCol.index])
                          ),
                          generateStatusColor(
                            String(rows[virtualRow.index]?.[virtualCol.index])
                          )
                        )}
                        // contentEditable={!isAddColumnPlaceholder} // optional
                        suppressContentEditableWarning
                      >
                        {!isAddColumnPlaceholder
                          ? rows[virtualRow.index]?.[virtualCol.index]
                          : ""}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Main Column</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the name for the new main column. It will start with one
              sub-column.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-3">
            <Input
              placeholder="Enter main column name"
              value={newMainTitle}
              onChange={(e) => setNewMainTitle(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNewMainTitle("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!newMainTitle.trim()) return;

                // 1. Determine new column index
                const newColIndex = columnWidths.length;

                // 2. Add new column width
                setColumnWidths((prev) => [...prev, DEFAULT_CELL_WIDTH]);

                // 3. Add a new empty cell for every row
                setRows((prev) => prev.map((row) => [...row, ""]));

                // 4. Add main header
                setMainHeaders((prev) => [
                  ...prev,
                  {
                    title: newMainTitle,
                    span: 1,
                    startCol: newColIndex,
                    bg: "",
                  },
                ]);

                // 5. Add sub-header
                setSubHeaders((prev) => [...prev, `Col 1`]);

                // 6. Reset dialog
                setNewMainTitle("");
                setIsDialogOpen(false);
              }}
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExcelClone;
