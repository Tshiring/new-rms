import { z } from "zod"

// Validation schemas for each step
export const step1Schema = z.object({
  fssaiLicense: z.string().min(1, "FSSAI License Number is required"),
  panNumber: z
    .string()
    .min(10, "PAN Number must be at least 10 characters")
    .max(10, "PAN Number must be exactly 10 characters"),
  bankAccount: z.string().min(1, "Bank Account Number is required"),
  businessContact: z.string().min(10, "Business Contact Number must be at least 10 digits"),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

export const step2Schema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be at least 6 digits"),
  country: z.string().min(1, "Country is required"),
})

// Combined schema for final validation
export const completeSchema = step1Schema.merge(step2Schema)