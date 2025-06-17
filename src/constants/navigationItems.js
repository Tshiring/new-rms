import {
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  UserCheck,
  Users,
  Utensils,
  FolderPlus,
  Book,
  Projector,
  ShieldCheck
} from "lucide-react";
import useRole from "../store/useRole";

const navigationItems = [
    {
    title: "Add Services",
    icon: FolderPlus,
    href: "/superadmindash/addservices",
    roles: ['SUPER_ADMIN', 'ADMIN']

  },
  {
      title: "Manage Services",
    icon: Book,
    href: "/superadmindash/manageservices",
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
    {
      title: "Add plans",
    icon:  Projector ,
    href: "/superadmindash/addplans",
 roles: ['SUPER_ADMIN']

  }, 
    {
    title: "Verify admins",
    icon: ShieldCheck,
    href: "/superadmindash/verifyadmins",
   roles: ['SUPER_ADMIN']
  },

  {
    title: "Menu Management",
    icon: Utensils,
    href: "/dashboard/menu",
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  {
    title: "Order Management",
    icon: ShoppingCart,
    href: "/dashboard/orders",
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  {
    title: "Table Reservation",
    icon: Calendar,
    href: "/dashboard/reservations",
   roles: ['SUPER_ADMIN','ADMIN']
  },
  {
    title: "Staff Management",
    icon: Users,
    href: "/dashboard/staff",
    roles:['ADMIN']
  },
  {
    title: "Track Inventory",
    icon: Package,
    href: "/dashboard/inventory",
      roles:['ADMIN']
  },
  {
    title: "Sales Report",
    icon: DollarSign,
    href: "/dashboard/sales",
    roles: ['ADMIN']
  },
  {
    title: "Customers",
    icon: UserCheck,
    href: "/dashboard/customers",
    roles:['ADMIN']
  },
];


const role = useRole.getState().role;
console.log(role);
export const filteredItems= navigationItems.filter(item=> !item.roles || item.roles.includes(role));