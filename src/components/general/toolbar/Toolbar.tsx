import ShapeImage from "@/assets/shape.svg";
import BreadCrumbs from "./BreadCrumbs";
import SearchInput from "./SearchInput";
import NotificationDropdown from "./NotificationDropdown";
import UserAvatar from "./UserAvatar";

const Toolbar = () => {
  return (
    <header className="h-14 w-full px-4 py-2 flex items-center justify-between border-b border-muted-color fixed top-0 left-0 bg-white">
      <div className="flex items-center gap-4">
        <img src={ShapeImage} alt="Sidebar Icon Shape" />
        <BreadCrumbs />
      </div>
      <div className="flex items-center gap-1">
        <SearchInput />
        <NotificationDropdown />
        <UserAvatar />
      </div>
    </header>
  );
};

export default Toolbar;
