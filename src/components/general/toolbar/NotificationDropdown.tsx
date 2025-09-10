import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NotificationIcon() {
  const count = 5;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell size={20} />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 border-2 border-white rounded-full flex items-center justify-center text-[10px] px-0 bg-brand-color">
              {count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>No Notifications yet</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
