import { useState } from "react";
import { ChefHat, Eye, EyeOff, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { SIGNIN } from "@/router/path";
import { useCreateRestaurantMutation } from "@/hooks/RestaurantApi/useCreateRestaurantMutation";
import { toast } from "sonner";
import { BUILD_PROFILE, DASHBOARD, OTP } from "../../../router/path";

const restaurantCategories = [
  "Fast Food",
  "Fine Dining",
  "Casual Dining",
  "Cafe",
  "Bakery",
  "Pizza",
  "Asian Cuisine",
  "Italian",
  "Mexican",
  "Seafood",
  "Steakhouse",
  "Vegetarian/Vegan",
  "Food Truck",
  "Bar & Grill",
  "Other",
];

export default function RestaurantSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    category: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      restaurantName: "",
      category: "",
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "This field is a must!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "This field is a must!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Restaurant name validation
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const { mutateAsync, isPending } = useCreateRestaurantMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("❌ Form validation failed:", errors);
      return;
    }

    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      retaurentName: formData.restaurantName.trim(),
      retaurentType: formData.category,
    }

    console.log("📊 Full Form Data:", formData);
    console.log("📊 Full Form Data:", payload);

    toast.promise(mutateAsync(payload), {
      loading: "Creating your restaurant account...",
      success: (response) => {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          restaurantName: "",
          category: "",
        });
        navigate(OTP, { state: { email: formData.email } });
        toast.success(response || "Registration successful!");
        return "Your restaurant account has been created successfully!";
      },
      error: (error) => {
        console.error("❌ Registration failed:", error);
        toast.error(error.message || "Something went wrong. Please try again.");
        return "Registration failed. Please try again.";
      },
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          {/* Chef Hat Icon */}
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <ChefHat className="w-8 h-8 text-purple-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            👨‍🍳 Register your Restaurant!
          </h1>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Restaurant Name Field */}
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                type="text"
                value={formData.restaurantName}
                onChange={(e) =>
                  handleInputChange("restaurantName", e.target.value)
                }
                placeholder="Restaurant Name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.restaurantName
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                }`}
              />
              {errors.restaurantName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.restaurantName}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full cursor-pointer px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-left flex items-center justify-between ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                >
                  <span
                    className={
                      formData.category ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {formData.category || "-- Select a category --"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {restaurantCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          handleInputChange("category", category);
                          setIsDropdownOpen(false);
                        }}
                        className="cursor-pointer w-full px-4 py-2 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "🏪 Signup as restaurant"
            )}
          </button>

          {/* Footer Links */}
          <div className="text-center">
            <Link
              to={SIGNIN}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
