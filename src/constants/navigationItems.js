import {
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Menu Management",
    icon: Utensils,
    href: "/dashboard/menu",
  },
  {
    title: "Order Management",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
  {
    title: "Table Reservation",
    icon: Calendar,
    href: "/dashboard/reservations",
  },
  {
    title: "Staff Management",
    icon: Users,
    href: "/dashboard/staff",
  },
  {
    title: "Track Inventory",
    icon: Package,
    href: "/dashboard/inventory",
  },
  {
    title: "Sales Report",
    icon: DollarSign,
    href: "/dashboard/sales",
  },
  {
    title: "Customers",
    icon: UserCheck,
    href: "/dashboard/customers",
  },
];
