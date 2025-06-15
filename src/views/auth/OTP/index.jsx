import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SIGNIN } from "@/router/path";
import { useOPTVerifyMutation } from "@/hooks/RestaurantApi/useOTPVerifyMutation";

const FormSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters" }),
});

export default function OTP() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutateAsync } = useOPTVerifyMutation();

  const navigate = useNavigate();
  const { email } = useLocation().state || {};

  const onSubmit = (data) => {
    
    const payload = {
      otp: data.otp,
      email: email,
    };
    toast.promise(mutateAsync(payload), {
      loading: "Verifying OTP...",
      success: (response) => {
        navigate(SIGNIN);
        return response.message || "OTP verified successfully";
      },
      error: (error) => {
        form.setError("otp", { type: "manual", message: "Invalid OTP" });
        return error.message || "An unexpected error occurred.";
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 ">
        <div className="max-w-[400px] h-min rounded-lg shadow-md p-6 text-center">
          <div className="text-center mb-10 flex flex-col items-center">
            <h5 className="mb-3 mt-6">Please check your email!</h5>
            <p className="text-sm">
              We've emailed a 6-digit confirmation code. Please enter the code
              in below box to verify your email.
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={form.watch("otp")}
                onChange={(val) =>
                  form.setValue("otp", val, { shouldValidate: true })
                }
              >
                <InputOTPGroup className="flex gap-2 items-center justify-between">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {form.formState.errors.otp?.message && (
                <p className="text-red-500 text-xs mt-2">
                  {form.formState.errors.otp?.message}
                </p>
              )}
              <Button type="submit" className="mt-6 w-full h-12">
                Verify
                {/* {isPending ? "Verifying..." : "Verify"} */}
              </Button>
            </form>
          </FormProvider>
          <p className="text-center my-6">
            Don’t have a code? &nbsp;
            <Button variant={"link"} className="text-icon p-0">
              Resend code
            </Button>
          </p>
        </div>
      </div>
    </>
  );
}
