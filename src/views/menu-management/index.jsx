import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ADD_MENU } from "@/router/path";
import {
  Edit,
  Eye,
  EyeOff,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

// Mock data for demonstration
const mockMenuItems = [
  {
    id: "1",
    name: "Classic Burger",
    description:
      "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
    availability: true,
  },
  {
    id: "2",
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing",
    availability: true,
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Traditional pizza with fresh mozzarella, tomatoes, and basil",
    availability: false,
  },
  {
    id: "4",
    name: "Chocolate Cake",
    description:
      "Rich chocolate cake with chocolate frosting and fresh berries",
    availability: true,
  },
  {
    id: "5",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon grilled to perfection with lemon herb seasoning",
    availability: true,
  },
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter menu items based on search and availability
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.menuId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAvailability =
      filterAvailability === "all" ||
      (filterAvailability === "available" && item.availability) ||
      (filterAvailability === "unavailable" && !item.availability);

    return matchesSearch && matchesAvailability;
  });

  const handleToggleAvailability = (id) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, availability: !item.availability } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setMenuItems((items) => items.filter((item) => item.id !== itemToDelete));
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleEditItem = (id) => {
    // This would typically navigate to an edit form
    console.log("Edit item:", id);
    alert(`Edit functionality for item ${id} would be implemented here`);
  };

  const getMenuStats = () => {
    const total = menuItems.length;
    const available = menuItems.filter((item) => item.availability).length;
    const unavailable = total - available;
    return { total, available, unavailable };
  };

  const stats = getMenuStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">
            Manage your restaurant menu items
          </p>
        </div>
        <Link to={ADD_MENU} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lgext-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lgont-semibold">
                  <Utensils className="h-4 w-4" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lgext-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.available}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unavailable</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.unavailable}
                </p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <EyeOff className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter:{" "}
              {filterAvailability === "all"
                ? "All"
                : filterAvailability === "available"
                ? "Available"
                : "Unavailable"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterAvailability("all")}>
              All Items
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterAvailability("available")}
            >
              Available Only
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterAvailability("unavailable")}
            >
              Unavailable Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditItem(item.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleAvailability(item.id)}
                    >
                      {item.availability ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Mark Available
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge
                  variant={item.availability ? "default" : "secondary"}
                  className={
                    item.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {item.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No menu items found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterAvailability !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first menu item"}
            </p>
            <Link to={ADD_MENU} className="flex items-center justify-center text-blue-600 hover:underline">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
