import {
  Home,
  FileText,
  ClipboardList,
  UserCog
} from "lucide-react";

export const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/"
  },
  {
    label: "Order",
    icon: ClipboardList,
    path: "/order"
  },
  {
    label: "Offerte",
    icon: FileText,
    path: "/offerte"
  },
  {
    label: "Admin",
    icon: UserCog,
    path: "/admin"
  }
];