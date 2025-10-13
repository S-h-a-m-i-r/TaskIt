import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import profile from "../../assets/person.webp";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import InputField from "../../components/generalComponents/InputField";
import { useForm } from "react-hook-form";
import authStore from "../../stores/authStore";
import ProfileImageUpload from "../../components/generalComponents/ProfileImageUpload";
import { getProfilePictureDownloadUrl } from "../../services/authService";
import { useProfilePictureUpload } from "../../hooks/useProfilePictureUpload";
import { message } from "antd";

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirm_password: string;
  profilePicture: string;
}

const ProfilePage = () => {
  const { user, updateUserProfile } = authStore();

  // Profile picture upload hook
  const { uploadProfilePicture, uploading: profileUploading } =
    useProfilePictureUpload();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userName: user?.userName || "",
      email: user?.email || "",
      profilePicture: user?.profilePicture || "",
      password: "",
      confirm_password: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm_password: false,
  });
  const pageTitle = location.pathname.split("/").pop() || "Tasks";
  const capitalizedPageTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  const handleGoBack = () => {
    navigate(-1);
  };

  const togglePasswordVisibility = (field: "password" | "confirm_password") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      console.log("Updating profile...");

      // Get form values
      const formValues = getValues();
      const userData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        userName: formValues.userName,
        email: formValues.email,
        profilePicture: imageUrl || user?.profilePicture,
      };

      // Remove empty fields
      const filteredUserData = Object.fromEntries(
        Object.entries(userData).filter(
          ([, value]) => value && value.trim() !== ""
        )
      );

      if (Object.keys(filteredUserData).length === 0) {
        console.log("No changes to update");
        return;
      }

      console.log("Updating profile with data:", filteredUserData);
      await updateUserProfile(filteredUserData);
      console.log("Profile updated successfully!");

      // You can add a success message here
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      console.log("Starting image upload...", {
        file: file.name,
        size: file.size,
        type: file.type,
      });

      const s3Key = await uploadProfilePicture(file);
      console.log("Image upload successful, S3 key:", s3Key);

      // Update the user object in the store with the new S3 key
      if (s3Key && user) {
        const updatedUser = { ...user, profilePicture: s3Key };
        authStore.setState({ user: updatedUser });
      }

      return s3Key || "";
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    // The auth store will handle updating the user data
    console.log("Profile picture updated:", imageUrl);
  };

  // State for profile image URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Effect to get presigned URL when profile picture changes
  useEffect(() => {
    const loadProfileImage = async () => {
      if (!user?.profilePicture) {
        console.log("ProfilePage: No profile picture, using default");
        setImageUrl(profile);
        return;
      }

      // If it's already a full URL, try to get presigned URL for it
      if (user.profilePicture.startsWith("http")) {
        console.log(
          "ProfilePage: Found full URL, getting presigned URL for:",
          user.profilePicture
        );
        try {
          const response = await getProfilePictureDownloadUrl();
          if (response.success && response.data?.downloadUrl) {
            console.log(
              "ProfilePage: Got presigned URL:",
              response.data.downloadUrl
            );
            setImageUrl(response.data.downloadUrl);
          } else {
            console.log(
              "ProfilePage: No presigned URL available, using default"
            );
            setImageUrl(profile);
          }
        } catch (error) {
          console.error("ProfilePage: Error getting presigned URL:", error);
          setImageUrl(profile);
        }
        return;
      }

      // If it's an S3 key, get presigned URL
      try {
        const response = await getProfilePictureDownloadUrl();
        if (response.success && response.data?.downloadUrl) {
          setImageUrl(response.data.downloadUrl);
        } else {
          console.log("ProfilePage: No presigned URL available, using default");
          setImageUrl(profile);
        }
      } catch (error) {
        console.error("ProfilePage: Error getting presigned URL:", error);
        setImageUrl(profile);
      }
    };

    loadProfileImage();
  }, [user?.profilePicture]);
  return (
    <div className="p-9 w-full flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <div
          className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex"
          onClick={handleGoBack}
        >
          <img src={backIcon} alt="back" />
        </div>
        <span className="font-semibold text-2xl"> {capitalizedPageTitle}</span>
      </div>
      <div className="flex items-start gap-12">
        <div className="relative max-md:hidden">
          <ProfileImageUpload
            currentImage={imageUrl || user?.profilePicture}
            onImageChange={handleImageChange}
            onUpload={handleImageUpload}
            size="lg"
            className="max-w-[300px]"
            disabled={profileUploading}
          />
        </div>
        {/* Mobile Profile Image */}
        <div className="md:hidden mb-6 flex justify-center">
          <ProfileImageUpload
            currentImage={imageUrl || profile}
            onImageChange={handleImageChange}
            onUpload={handleImageUpload}
            size="md"
            disabled={profileUploading}
          />
        </div>

        {/* Container */}
        <div className="max-w-96 w-full">
          <div className="mb-4">
            <InputField<FormData>
              id="firstName"
              label="First Name"
              className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 text-black focus:text-black active:border-primary-200"
              register={register}
              errors={errors}
              placeHolder="Zain"
              type="text"
            />
          </div>
          <div className="mb-4">
            <InputField<FormData>
              id="lastName"
              label="Last Name"
              className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 text-black focus:text-black active:border-primary-200"
              register={register}
              errors={errors}
              placeHolder="Zain"
              type="text"
            />
          </div>
          <div className="mb-4">
            <InputField<FormData>
              id="userName"
              label="User Name"
              className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 text-black focus:text-black active:border-primary-200"
              register={register}
              errors={errors}
              placeHolder="Zain"
              type="text"
            />
          </div>

          <div className="mb-4">
            <InputField<FormData>
              id="email"
              label="Email"
              register={register}
              errors={errors}
              placeHolder="Zainworkspace@xyz.com"
              type="text"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              className="border border-gray-300 bg-[#f6f6f9]  rounded-md p-2 text-black focus:text-black"
            />
          </div>

          <div className="mb-4 relative">
            <InputField<FormData>
              id="password"
              label="Password"
              className="border border-gray-300 bg-[#f6f6f9]  rounded-md p-2 !text-black active:border-primary-200"
              register={register}
              errors={errors}
              placeHolder="***********"
              type={showPasswords.password ? "text" : "password"}
              validation={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters with letters and numbers",
                },
              }}
            />
            <div
              className="absolute top-9 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPasswords.password ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>

          <div className="mb-6 relative">
            <InputField<FormData>
              id="confirm_password"
              label="Confirm Password"
              className="border border-gray-300 bg-[#f6f6f9] rounded-md p-2 !text-black focus:text-black active:border-primary-200"
              register={register}
              errors={errors}
              placeHolder="***********"
              type={showPasswords.confirm_password ? "text" : "password"}
              validation={{}}
            />
            <div
              className="absolute top-9 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => togglePasswordVisibility("confirm_password")}
            >
              {showPasswords.confirm_password ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
            </div>
          </div>

          <button
            className="w-full bg-primary-50 hover:bg-primary-200 text-white font-thin py-2 px-4 rounded-full"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
