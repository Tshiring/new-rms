import React, { useState } from "react";
import { useBuildProfileMutation } from "../../../hooks/RestaurantApi/useBuildProfileMutation";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DASHBOARD } from "../../../router/path";
import { validateStep1, validateStep2 } from "./validation";

const BuildProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };
  const handlePrevious = () => {
    if (currentStep === 2 && validateStep2()) {
      setCurrentStep(1);
    }
  };

  const [formData, setFormData] = useState({
    fssaiLicenseNumber: "",
    panNumber: "",
    businessAddress: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    bankAccountNumber: "",
    businessContactNumber: "",
    websiteUrl: "",
    image: null, // Store the file object
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
      return;
    }
    if (name.startsWith("businessAddress.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        businessAddress: {
          ...prev.businessAddress,
          [key]: value,
        },
      }));
      if (errors.businessAddress && errors.businessAddress[key]) {
        setErrors((prev) => ({
          ...prev,
          businessAddress: {
            ...prev.businessAddress,
            [key]: "",
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const { mutateAsync } = useBuildProfileMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const data = new FormData();
      data.append("fssaiLicenseNumber", formData.fssaiLicenseNumber);
      data.append("panNumber", formData.panNumber);
      data.append("bankAccountNumber", formData.bankAccountNumber);
      data.append("businessContactNumber", formData.businessContactNumber);
      data.append("websiteUrl", formData.websiteUrl);
      if (formData.image) data.append("image", formData.image);
      // Append business address fields
      Object.entries(formData.businessAddress).forEach(([key, value]) => {
        data.append(`businessAddress[${key}]`, value);
      });
      toast.promise(mutateAsync(data), {
        loading: "Submitting your profile...",
        success: () => {
          navigate(DASHBOARD);
          return "Profile submitted successfully!";
        },
        error: (error) => {
          return error.message || "Something went wrong. Please try again.";
        },
      });
    }
  };

  const progressPercentage = (currentStep / 2) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h4 className="text-2xl font-bold text-primary mb-6">
          Build Your Profile
        </h4>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full flex items-center justify-center w-8 h-8 text-sm font-bold ${
                currentStep >= 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <span
              className={`ml-2 ${
                currentStep >= 1
                  ? "text-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Company Info
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full flex items-center justify-center w-8 h-8 text-sm font-bold ${
                currentStep >= 2
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span
              className={`ml-2 ${
                currentStep >= 2
                  ? "text-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Address Info
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-primary mb-2">
                Business Information
              </h5>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Image
                </label>
                <Input type="file" name="image" onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  FSSAI License Number *
                </label>
                <Input
                  type="text"
                  name="fssaiLicenseNumber"
                  value={formData.fssaiLicenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter FSSAI License Number"
                  className={errors.fssaiLicenseNumber ? "border-red-500" : ""}
                />
                {errors.fssaiLicenseNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fssaiLicenseNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  PAN Number *
                </label>
                <Input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="Enter PAN Number"
                  className={errors.panNumber ? "border-red-500" : ""}
                />
                {errors.panNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.panNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Account Number *
                </label>
                <Input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Bank Account Number"
                  className={errors.bankAccountNumber ? "border-red-500" : ""}
                />
                {errors.bankAccountNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bankAccountNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Contact Number *
                </label>
                <Input
                  type="text"
                  name="businessContactNumber"
                  value={formData.businessContactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Business Contact Number"
                  className={
                    errors.businessContactNumber ? "border-red-500" : ""
                  }
                />
                {errors.businessContactNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.businessContactNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Website URL
                </label>
                <Input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                  className={errors.websiteUrl ? "border-red-500" : ""}
                />
              </div>
            </div>
          )}

          {/* Step 2: Business Address */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-primary mb-2">
                Business Address
              </h5>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Street *
                </label>
                <Input
                  type="text"
                  name="businessAddress.street"
                  value={formData.businessAddress.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Suite 100"
                  className={
                    errors.businessAddress?.street ? "border-red-500" : ""
                  }
                />
                {errors.businessAddress?.street && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.businessAddress.street}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    City *
                  </label>
                  <Input
                    type="text"
                    name="businessAddress.city"
                    value={formData.businessAddress.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={
                      errors.businessAddress?.city ? "border-red-500" : ""
                    }
                  />
                  {errors.businessAddress?.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessAddress.city}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    State *
                  </label>
                  <Input
                    type="text"
                    name="businessAddress.state"
                    value={formData.businessAddress.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className={
                      errors.businessAddress?.state ? "border-red-500" : ""
                    }
                  />
                  {errors.businessAddress?.state && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessAddress.state}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Pincode *
                  </label>
                  <Input
                    type="text"
                    name="businessAddress.pincode"
                    value={formData.businessAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    className={
                      errors.businessAddress?.pincode ? "border-red-500" : ""
                    }
                  />
                  {errors.businessAddress?.pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessAddress.pincode}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Country *
                  </label>
                  <Input
                    type="text"
                    name="businessAddress.country"
                    value={formData.businessAddress.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    className={
                      errors.businessAddress?.country ? "border-red-500" : ""
                    }
                  />
                  {errors.businessAddress?.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessAddress.country}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
              >
                ← Previous
              </Button>
            ) : (
              <span />
            )}
            {currentStep < 2 ? (
              <Button type="button" onClick={handleNext}>
                Next →
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Submit Registration
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildProfile;
