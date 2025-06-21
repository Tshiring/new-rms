import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserSignupMutation } from "./hooks/useUserSignupMutation";
import { Link, useNavigate } from "react-router";
import { OTP, SIGNIN } from "@/router/path";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().min(10, "Contact number is required"),
  gender: z.string().min(1, "Gender is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  street: z.string().min(1, "Street is required"),
});

export default function UserSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactNumber: "",
      gender: "",
      city: "",
      district: "",
      street: "",
    },
  });

  const { mutateAsync, isPending } = useUserSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = data;
    payload.roleNames = ["CUSTOMER"];
    toast.promise(mutateAsync(payload), {
      loading: "Registering...",
      success: () => {
        navigate(OTP, { state: { email: data.email } });
        reset();
        return "Registration successful!";
      },
      error: (error) => {
        return error.message || "Registration failed. Please try again.";
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="text-2xl font-bold mb-4 text-center">
          User Registration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <Input {...register("firstName")} placeholder="First Name" />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <Input {...register("lastName")} placeholder="Last Name" />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Email</label>
            <Input type="email" {...register("email")} placeholder="Email" />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Password</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Contact Number</label>
            <Input
              {...register("contactNumber")}
              placeholder="Contact Number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select
              {...register("gender")}
              className="w-full border rounded px-3 py-2 border-gray-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">City</label>
            <Input {...register("city")} placeholder="City" />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">District</label>
            <Input {...register("district")} placeholder="District" />
            {errors.district && (
              <p className="text-red-500 text-xs mt-1">
                {errors.district.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Street</label>
            <Input {...register("street")} placeholder="Street" />
            {errors.street && (
              <p className="text-red-500 text-xs mt-1">
                {errors.street.message}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full mt-4"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className="text-center mt-4">
        <Link
          to={SIGNIN}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
