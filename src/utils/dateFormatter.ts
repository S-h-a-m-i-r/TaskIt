/**
 * Date formatting utility functions
 * Provides consistent date formatting across the entire application
 */

/**
 * Formats a date string, Date object, or timestamp to dd/mm/yyyy format
 * @param date - Date string, Date object, timestamp (number), or null/undefined
 * @returns Formatted date string in dd/mm/yyyy format or 'Never' for null/undefined
 */
export const formatDate = (
  date: string | Date | number | null | undefined
): string => {
  if (!date) return "Never";

  const dateObj =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date)
      : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Formats a date string, Date object, or timestamp to dd/mm/yyyy hh:mm format
 * @param date - Date string, Date object, timestamp (number), or null/undefined
 * @returns Formatted date string in dd/mm/yyyy hh:mm format or 'Never' for null/undefined
 */
export const formatDateTime = (
  date: string | Date | number | null | undefined
): string => {
  if (!date) return "Never";

  const dateObj =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date)
      : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Formats a date for display in chat messages (e.g., "Monday, 15 January 2024")
 * @param date - Date string, Date object, timestamp (number), or null/undefined
 * @returns Formatted date string for chat display or 'Never' for null/undefined
 */
export const formatDateForChat = (
  date: string | Date | number | null | undefined
): string => {
  if (!date) return "Never";

  const dateObj =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date)
      : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formats a date for calendar display (e.g., "Mon, Jan 15")
 * @param date - Date object
 * @returns Formatted date string for calendar display
 */
export const formatDateForCalendar = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Formats a date for task details display (e.g., "January 15, 2024")
 * @param date - Date string, Date object, timestamp (number), or null/undefined
 * @returns Formatted date string for task details or 'Never' for null/undefined
 */
export const formatDateForTaskDetails = (
  date: string | Date | number | null | undefined
): string => {
  if (!date) return "Never";

  const dateObj =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date)
      : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formats a date for short display (e.g., "Jan 15, 2024")
 * @param date - Date string, Date object, timestamp (number), or null/undefined
 * @returns Formatted date string for short display or 'Never' for null/undefined
 */
export const formatDateShort = (
  date: string | Date | number | null | undefined
): string => {
  if (!date) return "Never";

  const dateObj =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date)
      : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Checks if two dates are on the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if both dates are on the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};
