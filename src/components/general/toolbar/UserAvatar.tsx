import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserAvatar = () => {
  return (
    <DropdownMenu>
      {/* ✅ Using a div instead of Button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          tabIndex={0}
          className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground outline-none focus:ring-0"
        >
          {/* Avatar */}
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex flex-col items-start">
            <h2 className="text-sm font-medium">John Doe</h2>
            <span className="text-xs text-muted-foreground truncate max-w-15">
              john.doe@gmail.com
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
