import { SIGNUP } from "@/router/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useSigninMutation } from "./hooks/useSigninMutation";

//Using zustand
import useRole from "../../../store/useRole";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
// Zod schema for validation
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync, isPending } = useSigninMutation();
  const navigate = useNavigate();

  const {setRoles}= useRole.getState()  // accessing useRole
  
  const onSubmit = async (data) => {
    toast.promise(mutateAsync(data), {
      loading: "Signing in...",
      success: (response) => {
        localStorage.setItem("accessToken", response.AccessToken);
        localStorage.setItem("refreshToken", response.RefreshToken);

        const { roles, role } = response; // Assuming response contains roles and role
        const categoryRoles =[];
  if (Array.isArray(roles)) {
    categoryRoles.push(...roles);
  } else if (typeof role === "string") {
    categoryRoles.push(role);
  }
        setRoles(categoryRoles);
        console.log(roles)
        if (response.adminProfile === false) {
          navigate("/build-profile");
        } else if (response.role === "SUPER_ADMIN") {
          navigate("/superadmindash");
        } else {
          navigate("/dashboard");
        }
        // Handle successful login
        toast.success("Login successful!");
        reset();
      },
      error: (error) => {
        return error.message || "Something went wrong. Please try again.";
      },
    });
    console.log("📊 Full Form Data:", data);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    localStorage.setItem("googleAccessToken", credential);
    console.log("Google Credential:", jwtDecode(credential));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <ChefHat className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            👋 Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">👨‍🍳 Sign in with us!</p>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={(error) =>
            toast.error(error.message || "Google login failed")
          }
        />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
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
                  {...register("email")}
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
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
                  {...register("password")}
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              "🔐 Login"
            )}
          </button>
          <div className="text-center space-y-2">
            <Link
              to={SIGNUP}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
            >
              Don't have an account?
            </Link>
            <br />
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
