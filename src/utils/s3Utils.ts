/**
 * Utility functions for handling S3 URLs and keys
 */

// S3 configuration - these should match your backend configuration
const S3_REGION = import.meta.env.VITE_AWS_REGION || "eu-north-1";
const S3_BUCKET_NAME =
  import.meta.env.VITE_AWS_BUCKET_NAME || "taskaway-files-bucket";

/**
 * Converts an S3 key to a full S3 URL
 * @param key - The S3 key (e.g., "profile-pictures/user123/image.jpg")
 * @returns The full S3 URL or null if key is invalid
 */
export const getS3Url = (key: string | null | undefined): string | null => {
  if (!key) return null;

  // If it's already a full URL (including presigned URLs), return it
  if (key.startsWith("http")) {
    return key;
  }

  // Construct the S3 URL from the key (for public objects)
  return `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${key}`;
};

/**
 * Extracts the S3 key from a full S3 URL
 * @param url - The full S3 URL
 * @returns The S3 key or null if URL is invalid
 */
export const getS3KeyFromUrl = (
  url: string | null | undefined
): string | null => {
  if (!url) return null;

  // If it's not a full URL, assume it's already a key
  if (!url.startsWith("http")) {
    return url;
  }

  // Extract key from URL
  const urlParts = url.split("/");
  const bucketIndex = urlParts.findIndex((part) =>
    part.includes(S3_BUCKET_NAME)
  );

  if (bucketIndex === -1 || bucketIndex >= urlParts.length - 1) {
    return null;
  }

  // Return everything after the bucket name
  return urlParts.slice(bucketIndex + 1).join("/");
};

/**
 * Checks if a string is a valid S3 URL
 * @param url - The URL to check
 * @returns True if it's a valid S3 URL
 */
export const isS3Url = (url: string | null | undefined): boolean => {
  if (!url) return false;
  return url.startsWith("http") && url.includes(".s3.");
};
