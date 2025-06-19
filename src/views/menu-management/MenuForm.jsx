import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAddMenuMutation } from "./hooks/useAddMenuMutation";

const menuSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  active: z.boolean().optional().default(true),
});

export default function MenuForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  });
  const { mutateAsync } = useAddMenuMutation();

  const onSubmit = async (data) => {
    toast.promise(mutateAsync(data), {
      loading: "Adding menu item...",
      success: (res) => {
        reset();
        return res.message;
      },
      error: "Error adding menu item.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Menu Item
          </CardTitle>
          <CardDescription>
            Fill out the form below to add a new item to your menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter item name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter item description (optional)"
                {...register("description")}
                className="min-h-[100px]"
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={watch("active")}
                onCheckedChange={(checked) => setValue("active", !!checked)}
              />
              <Label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Item is available
              </Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Menu Item"}
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
