export const validateStep1 = () => {
  const newErrors = {};
  if (!formData.fssaiLicenseNumber.trim())
    newErrors.fssaiLicenseNumber = "FSSAI License Number is required";
  if (!formData.panNumber.trim())
    newErrors.panNumber = "PAN Number is required";
  if (!formData.bankAccountNumber.trim())
    newErrors.bankAccountNumber = "Bank Account Number is required";
  if (!formData.businessContactNumber.trim())
    newErrors.businessContactNumber = "Business Contact Number is required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateStep2 = () => {
  const newErrors = { businessAddress: {} };
  if (!formData.businessAddress.street.trim())
    newErrors.businessAddress.street = "Street is required";
  if (!formData.businessAddress.city.trim())
    newErrors.businessAddress.city = "City is required";
  if (!formData.businessAddress.state.trim())
    newErrors.businessAddress.state = "State is required";
  if (!formData.businessAddress.pincode.trim())
    newErrors.businessAddress.pincode = "Pincode is required";
  if (!formData.businessAddress.country.trim())
    newErrors.businessAddress.country = "Country is required";
  setErrors({ businessAddress: newErrors.businessAddress });
  return Object.keys(newErrors.businessAddress).length === 0;
};
