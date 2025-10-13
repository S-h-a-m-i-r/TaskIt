import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { message } from "antd";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  onUpload: (file: File) => Promise<string>;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImage,
  onImageChange,
  onUpload,
  className = "",
  size = "md",
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImage prop changes
  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  // Use currentImage as the display image, fallback to preview during upload
  const displayImage = currentImage || preview;

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      message.error("Please select a PNG, JPG, or JPEG image file.");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error("File size must be less than 5MB.");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      console.log("ProfileImageUpload: Starting upload...", {
        file: file.name,
        size: file.size,
      });
      const imageUrl = await onUpload(file);
      console.log("ProfileImageUpload: Upload successful:", imageUrl);
      onImageChange(imageUrl);
      message.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("ProfileImageUpload: Upload error:", error);
      message.error("Failed to upload image. Please try again.");
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          relative rounded-full border-2 border-dashed border-gray-300 
          flex items-center justify-center cursor-pointer
          hover:border-primary-200 hover:bg-gray-50
          transition-colors duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${isUploading ? "opacity-50" : ""}
        `}
        onClick={handleClick}
      >
        {displayImage ? (
          <div className="relative w-full h-full">
            <img
              src={displayImage}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
              onLoad={() =>
                console.log(
                  "ProfileImageUpload: Image loaded successfully:",
                  displayImage
                )
              }
              onError={(e) =>
                console.error(
                  "ProfileImageUpload: Image failed to load:",
                  displayImage,
                  e
                )
              }
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <User className={`${iconSizes[size]} mb-1`} />
            <span className="text-xs">Upload</span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-200"></div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
