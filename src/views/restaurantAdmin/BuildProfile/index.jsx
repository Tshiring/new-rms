import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CameraIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { step1Schema, step2Schema, completeSchema } from "./validation";
import { useNavigate } from "react-router";
import { useBuildProfileMutation } from "../../../hooks/RestaurantApi/useBuildProfileMutation";
import { toast } from "sonner";
import { DASHBOARD } from "../../../router/path";
import useImageUploadMutation from "../../../api/useImageUploadMutation";

const steps = [
  { id: 1, title: "Company Info", description: "Business Information" },
  { id: 2, title: "Address Info", description: "Business Address" },
  { id: 3, title: "Upload Image", description: "Upload your business image" },
];

function StepIndicator({ currentStep, steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step.id <= currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                step.id === currentStep ? "text-green-600" : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-1 rounded ${
                    step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <Progress value={(currentStep / steps.length) * 100} className="h-2" />
    </div>
  );
}

function Step1Form({ form, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("Step 1 Data:", data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fssaiLicense">
            FSSAI License Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fssaiLicense"
            placeholder="1324123"
            {...register("fssaiLicense")}
            className={errors.fssaiLicense ? "border-red-500" : ""}
          />
          {errors.fssaiLicense && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fssaiLicense.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="panNumber">
            PAN Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="panNumber"
            placeholder="1234123A"
            {...register("panNumber")}
            className={errors.panNumber ? "border-red-500" : ""}
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.panNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="bankAccount">
            Bank Account Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="bankAccount"
            placeholder="1234123A"
            {...register("bankAccount")}
            className={errors.bankAccount ? "border-red-500" : ""}
          />
          {errors.bankAccount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bankAccount.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="businessContact">
            Business Contact Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="businessContact"
            placeholder="12341234123"
            {...register("businessContact")}
            className={errors.businessContact ? "border-red-500" : ""}
          />
          {errors.businessContact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessContact.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            placeholder="https://www.example.com"
            {...register("websiteUrl")}
            className={errors.websiteUrl ? "border-red-500" : ""}
          />
          {errors.websiteUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.websiteUrl.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}

function Step2Form({ form, onPrevious, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleFormSubmit = (data) => {
    console.log("Step 2 Data:", data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="street">
            Street <span className="text-red-500">*</span>
          </Label>
          <Input
            id="street"
            placeholder="12341"
            {...register("street")}
            className={errors.street ? "border-red-500" : ""}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="asdfasd"
              {...register("city")}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              placeholder="asdfasdf"
              {...register("state")}
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pincode">
              Pincode <span className="text-red-500">*</span>
            </Label>
            <Input
              id="pincode"
              placeholder="5123412"
              {...register("pincode")}
              className={errors.pincode ? "border-red-500" : ""}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              placeholder="dsafasdfasd"
              {...register("country")}
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="border-gray-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Submit Registration
        </Button>
      </div>
    </form>
  );
}

function Step3Form({ form, onPrevious }) {
  const [logoPreview, setLogoPreview] = useState("");
  const uploadLogo = useRef(null);
  const { mutateAsync: uploadImage } = useImageUploadMutation();

  const handleLogo = () => {
    if (uploadLogo.current) {
      uploadLogo.current.click();
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    toast.promise(uploadImage(formData), {
      loading: "Uploading logo...",
      success: (data) => {
        if (data.fileUrl) {
          setLogoPreview(data.fileUrl);
        }
        return "Logo uploaded successfully!";
      },
      error: (error) => {
        console.log(error);
        
        return error.message || "Failed to upload logo.";
      },
    });
  };

  return (
    <>
      <div>
        <div
          className="relative w-min mx-auto cursor-pointer"
          onClick={handleLogo}
          role="button"
        >
          <div
            className={`size-34 rounded-full border-4 ${
              logoPreview ? "border-8 border-white" : "border-8 border-white"
            } bg-gray-300 overflow-hidden flex items-center justify-center`}
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div />
            )}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <CameraIcon />
            <span className="mt-2 text-xs text-gray-600 font-medium">
              {logoPreview ? "" : "Upload Photo"}
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            ref={uploadLogo}
            onChange={handleLogoChange}
          />
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="border-gray-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Submit Registration
          </Button>
        </div>
      </div>
    </>
  );
}

export default function BuildProfile() {
  const [currentStep, setCurrentStep] = useState(3);
  const [formData, setFormData] = useState({});

  // Form for step 1
  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fssaiLicense: "",
      panNumber: "",
      bankAccount: "",
      businessContact: "",
      websiteUrl: "",
    },
  });

  // Form for step 2
  const step2Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  // Form for step 2
  const step3Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      image: File,
    },
  });

  const handleStep1Next = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Previous = () => {
    setCurrentStep(1);
  };

  const handleStep3Previous = () => {
    setCurrentStep(2);
  };

  const { mutateAsync } = useBuildProfileMutation();
  const navigate = useNavigate();

  const handleFinalSubmit = (data) => {
    const completeData = { ...formData, ...data };

    // Validate complete data
    try {
      const validatedData = completeSchema.parse(completeData);
      toast.promise(mutateAsync(validatedData), {
        loading: "Submitting your profile...",
        success: (res) => {
          setCurrentStep(3);
          return res.message || "Profile submitted successfully!";
        },
        error: (error) => {
          return error.message || "Something went wrong. Please try again.";
        },
      });
    } catch (error) {
      console.error("❌ Validation Error:", error);
    }
  };

  const handleImageUpload = () => {
    navigate(DASHBOARD);
    step1Form.reset();
    step2Form.reset();
    setFormData({});
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-700">
            Build Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StepIndicator currentStep={currentStep} steps={steps} />

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {steps[currentStep - 1].description}
            </h3>
          </div>

          {currentStep === 1 && (
            <Step1Form form={step1Form} onNext={handleStep1Next} />
          )}

          {currentStep === 2 && (
            <Step2Form
              form={step2Form}
              onPrevious={handleStep2Previous}
              onSubmit={handleFinalSubmit}
            />
          )}

          {currentStep === 3 && (
            <Step3Form
              form={step3Form}
              onPrevious={handleStep3Previous}
              onSubmit={handleImageUpload}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
