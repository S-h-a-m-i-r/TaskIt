import { useState, useEffect } from "react";
import InputField from "../../generalComponents/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../generalComponents/ButtonComponent";
import { Select, Radio, RadioChangeEvent, message } from "antd";
import useUserStore from "../../../stores/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isVerified: boolean;
};

const AddTeam = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      role: "MANAGER",
      isVerified: true,
    },
  });

  const [role, setRole] = useState("MANAGER");
  const [isVerified, setIsVerified] = useState(true);
  // Add this state at the top with your other useState hooks
  const [showPassword, setShowPassword] = useState(false);
  const {
    addTeamMember,
    getTeamMember,
    updateTeamMember,
    deleteTeamMember,
    selectedTeamMember,
    loading,
  } = useUserStore();
  const navigate = useNavigate();

  // Fetch team member data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      getTeamMember(id);
    }
  }, [isEditMode, id, getTeamMember]);

  // Populate form when team member data is loaded
  useEffect(() => {
    if (selectedTeamMember && isEditMode) {
      reset({
        firstName: selectedTeamMember.firstName,
        lastName: selectedTeamMember.lastName,
        userName: selectedTeamMember.userName,
        email: selectedTeamMember.email,
        phone: selectedTeamMember.phone,
        password: "", // Don't populate password for security
        role: selectedTeamMember.role,
        isVerified: selectedTeamMember.isVerified,
      });
      setRole(selectedTeamMember.role);
      setIsVerified(selectedTeamMember.isVerified);
    }
  }, [selectedTeamMember, isEditMode, reset]);

  const onSubmit = async (data: FormData) => {
    if (loading) return; // Prevent multiple submissions

    try {
      let response;

      if (isEditMode && id) {
        // Update existing team member
        response = await updateTeamMember(id, data);
      } else {
        // Add new team member
        response = await addTeamMember(data);
      }

      if (response.success) {
        navigate("/admin/TeamManagement");
      }
      // You can add success notification here
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'An error occurred while saving the team member. Please try again.');
      } else {
        message.error('An error occurred while saving the team member. Please try again.');
      }
      // You can add error notification here
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    setValue("role", value);
  };

  const handleVerificationChange = (e: RadioChangeEvent) => {
    const value = e.target.value === "true";
    setIsVerified(value);
    setValue("isVerified", value);
  };

  const handleDelete = async () => {
    if (!isEditMode || !id || loading) return;

    try {
      const response = await deleteTeamMember(id);
      if (response.success) {
        navigate("/admin/teamManagement");
      }
      // You can add success notification here
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || 'An error occurred');
      } else {
        message.error('An error occurred ');
      }
      // You can add error notification here
    }
  };

  return (
    <div>
      <h2 className="text-[32px] text-left font-bold text-gray-900">
        {isEditMode ? "Edit Team Member" : "Add Team Member"}
      </h2>

      {/* Show loading state while fetching team member data */}
      {isEditMode && loading && !selectedTeamMember && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading team member data...</div>
        </div>
      )}

      {/* Show form only when not loading or when data is loaded */}
      {(!isEditMode || !loading || selectedTeamMember) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Name */}
            <InputField<FormData>
              id="firstName"
              label="First Name"
              register={register}
              errors={errors}
              placeHolder="Enter first name"
              type="text"
              className="border border-gray-300 rounded-md p-2 text-black focus:text-black !bg-[#E8EDF2]"
              validation={{
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z\s]{2,50}$/,
                  message:
                    "First name must be 2-50 characters and contain only letters",
                },
              }}
            />

            {/* Last Name */}
            <InputField<FormData>
              id="lastName"
              label="Last Name"
              register={register}
              errors={errors}
              placeHolder="Enter last name"
              type="text"
              className="border border-gray-300 rounded-md p-2 text-black focus:text-black !bg-[#E8EDF2]"
              validation={{
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z\s]{2,50}$/,
                  message:
                    "Last name must be 2-50 characters and contain only letters",
                },
              }}
            />

            {/* Username */}
            <InputField<FormData>
              id="userName"
              label="Username"
              register={register}
              errors={errors}
              placeHolder="Enter username"
              type="text"
              className="border border-gray-300 rounded-md p-2 text-black focus:text-black !bg-[#E8EDF2]"
              validation={{
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,20}$/,
                  message:
                    "Username must be 3-20 characters and contain only letters, numbers, and underscores",
                },
              }}
            />

            {/* Email */}
            <InputField<FormData>
              id="email"
              label="Email"
              register={register}
              errors={errors}
              placeHolder="Enter email address"
              type="email"
              className="border border-gray-300 rounded-md p-2 text-black focus:text-black !bg-[#E8EDF2]"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
            />

            {/* Phone */}
            <InputField<FormData>
              id="phone"
              label="Phone"
              register={register}
              errors={errors}
              placeHolder="Enter phone number"
              type="tel"
              className="border border-gray-300 rounded-md p-2 text-black focus:text-black !bg-[#E8EDF2]"
              validation={{
                required: "Phone number is required",
                pattern: {
                  value: /^[+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
              }}
            />

            {/* Password */}
            <div className="relative">
              <InputField<FormData>
                id="password"
                label="Password"
                register={register}
                errors={errors}
                placeHolder="Enter password"
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 rounded-md p-2 pr-12 text-black focus:text-black !bg-[#E8EDF2]"
                validation={{
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters with uppercase, lowercase, number and special character",
                  },
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[52px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Role Dropdown */}
            <div className="w-full flex flex-col gap-2">
              <label className="block text-sm font-semibold mb-2 text-left">
                Role
              </label>
              <Select
                value={role}
                onChange={handleRoleChange}
                options={[
                  { value: "BASIC", label: "BASIC" },
                  { value: "MANAGER", label: "MANAGER" },
                ]}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label className="block text-sm font-semibold mb-2 text-left">
              Is Verified
            </label>
            <Radio.Group
              value={isVerified?.toString()}
              onChange={handleVerificationChange}
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </div>

          <div className="flex w-full justify-center gap-4">
            <ButtonComponent
              onClick={handleSubmit(onSubmit)}
              title={
                loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update Team Member"
                  : "Add To Team"
              }
              className={`w-full py-3 mt rounded-full flex justify-center self-center max-w-[250px] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-50 hover:bg-primary-200 text-white"
              }`}
            />
            {isEditMode && (
              <ButtonComponent
                onClick={handleDelete}
                title={loading ? "Deleting..." : "Delete Team Member"}
                className={`w-full py-3 mt rounded-full flex justify-center self-center max-w-[250px] ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTeam;
