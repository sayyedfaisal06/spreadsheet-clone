import Toolbar from "@/components/general/toolbar/Toolbar";
import TableToolbar from "./components/general/table/TableToolbar";
import TableSheetSelect from "./components/general/table/TableSheetSelect";
import Table from "./components/general/table/Table";

const App = () => {
  return (
    <div className="w-full h-screen overflow-y-hidden flex flex-col">
      <Toolbar />
      <TableToolbar />
      <Table />
      <TableSheetSelect />
    </div>
  );
};

export default App;
