// Task status utility functions for consistent color handling across the application

export type TaskStatus = 
  | 'Submitted' 
  | 'InProgress'
  | 'Completed' 
  | 'Closed'
  | 'Unknown';

// Color schemes for different use cases
export interface StatusColorScheme {
  background: string;
  text: string;
  border?: string;
  hover?: string;
}

// Comprehensive status color mapping
const STATUS_COLORS: Record<TaskStatus, StatusColorScheme> = {
  'Submitted': {
    background: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100'
  },

  'InProgress': {
    background: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-100'
  },
  'Completed': {
    background: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  },
  'Closed': {
    background: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    hover: 'hover:bg-red-100'
  },

  'Unknown': {
    background: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100'
  }
};

// Default color scheme for unknown statuses
const DEFAULT_COLORS: StatusColorScheme = {
  background: 'bg-gray-50',
  text: 'text-gray-700',
  border: 'border-gray-200',
  hover: 'hover:bg-gray-100'
};

/**
 * Get the complete color scheme for a task status
 * @param status - The task status
 * @returns StatusColorScheme object with all color classes
 */
export function getTaskStatusColors(status: string): StatusColorScheme {
  const normalizedStatus = normalizeStatus(status);
  return STATUS_COLORS[normalizedStatus] || DEFAULT_COLORS;
}

/**
 * Get only the background color for a task status
 * @param status - The task status
 * @returns Background color class
 */
export function getTaskStatusBackground(status: string): string {
  return getTaskStatusColors(status).background;
}

/**
 * Get only the text color for a task status
 * @param status - The task status
 * @returns Text color class
 */
export function getTaskStatusTextColor(status: string): string {
  return getTaskStatusColors(status).text;
}

/**
 * Get a complete CSS class string for a status badge
 * @param status - The task status
 * @param additionalClasses - Additional CSS classes to append
 * @returns Complete CSS class string
 */
export function getTaskStatusBadgeClasses(
  status: string, 
  additionalClasses: string = ''
): string {
  const colors = getTaskStatusColors(status);
  const baseClasses = ' rounded-full text-sm font-medium text-left';
  return `${baseClasses} ${colors.background} ${colors.text} ${additionalClasses}`.trim();
}

/**
 * Get row background color for table rows
 * @param status - The task status
 * @returns Background color class for table rows
 */
export function getTaskRowBackground(status: string): string {
  return getTaskStatusBackground(status);
}

/**
 * Normalize status strings to handle variations
 * @param status - The raw status string
 * @returns Normalized status
 */
function normalizeStatus(status: string): TaskStatus {
  const normalized = status.trim();
  
  // Handle common variations
  if (normalized.toLowerCase().includes('progress')) {
    return 'InProgress';
  }
  if (normalized.toLowerCase().includes('submit')) {
    return 'Submitted';
  }
  if (normalized.toLowerCase().includes('complete')) {
    return 'Completed';
  }
  if (normalized.toLowerCase().includes('close')) {
    return 'Closed';
  }

  
  // Direct matches
  if (normalized in STATUS_COLORS) {
    return normalized as TaskStatus;
  }
  
  return 'Unknown';
}

/**
 * Get status display text (for consistent display across the app)
 * @param status - The task status
 * @returns Display-friendly status text
 */
export function getStatusDisplayText(status: string): string {
  const normalized = normalizeStatus(status);
  
  const displayMap: Record<TaskStatus, string> = {
    'Submitted': 'Submitted',
    'InProgress': 'InProgress',
    'Completed': 'Completed',
    'Closed': 'Closed',
    'Unknown': 'Unknown'
  };
  
  return displayMap[normalized];
}

/**
 * Check if a status indicates the task is active/in progress
 * @param status - The task status
 * @returns True if task is active
 */
export function isTaskActive(status: string): boolean {
  const normalized = normalizeStatus(status);
  return ['Submitted', 'InProgress'].includes(normalized);
}

/**
 * Check if a status indicates the task is completed
 * @param status - The task status
 * @returns True if task is completed
 */
export function isTaskCompleted(status: string): boolean {
  const normalized = normalizeStatus(status);
  return ['Completed', 'Closed'].includes(normalized);
} 