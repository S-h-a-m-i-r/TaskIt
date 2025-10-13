import { useState, useCallback } from "react";
import { message } from "antd";
import {
  getProfilePictureUploadUrl,
  updateProfilePicture,
  getProfilePictureDownloadUrl,
} from "../services/authService";

interface UseProfilePictureUploadReturn {
  uploadProfilePicture: (file: File) => Promise<string | null>;
  getDownloadUrl: () => Promise<string | null>;
  uploading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useProfilePictureUpload = (): UseProfilePictureUploadReturn => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadProfilePicture = useCallback(
    async (file: File): Promise<string | null> => {
      // Validate file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        const errorMessage =
          "Invalid file type. Only PNG, JPG, and JPEG are allowed.";
        setError(errorMessage);
        message.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        const errorMessage = "File size exceeds 5MB limit.";
        setError(errorMessage);
        message.error(errorMessage);
        throw new Error(errorMessage);
      }

      setUploading(true);
      setError(null);

      try {
        // Step 1: Get presigned upload URL
        const uploadUrlRes = await getProfilePictureUploadUrl({
          filename: file.name,
          contentType: file.type,
          fileSize: file.size,
        });

        if (!uploadUrlRes.success) {
          throw new Error(uploadUrlRes.message || "Failed to get upload URL");
        }

        // Step 2: Upload file to S3
        const uploadResponse = await fetch(uploadUrlRes.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file to S3");
        }

        // Step 3: Update user profile with S3 key
        const updateRes = await updateProfilePicture(uploadUrlRes.fileKey);

        if (!updateRes.success) {
          throw new Error(
            updateRes.message || "Failed to update profile picture"
          );
        }

        message.success("Profile picture uploaded successfully");
        return updateRes.data?.profilePicture || null;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        setError(errorMessage);
        message.error(errorMessage);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  const getDownloadUrl = useCallback(async (): Promise<string | null> => {
    try {
      const response = await getProfilePictureDownloadUrl();
      if (response.success && response.data?.downloadUrl) {
        return response.data.downloadUrl;
      }
      return null;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
    }
  }, []);

  return {
    uploadProfilePicture,
    getDownloadUrl,
    uploading,
    error,
    clearError,
  };
};
