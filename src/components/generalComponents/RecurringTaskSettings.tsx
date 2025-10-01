import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Radio, Select, Button, RadioChangeEvent } from "antd";
import dayjs from "dayjs";

interface RecurringTaskSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: RecurringSettings) => void;
  onRemove: () => void;
  initialSettings?: RecurringSettings;
}

export interface RecurringSettings {
  pattern: "Daily" | "Weekly" | "Monthly" | "Yearly";
  dailyInterval?: number;
  weeklyInterval?: number;
  weeklyDays?: string[]; // Array of selected days for weekly recurrence
  monthlyInterval?: number;
  yearlyInterval?: number;
  monthlyDayOfWeek?: "first" | "second" | "third" | "fourth" | "last";
  monthlyDay?:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  monthlyDayOfMonth?: number;
  startDate: dayjs.Dayjs;
  endType: "endBy" | "endAfter" | "noEnd";
  endDate?: dayjs.Dayjs;
  endAfterCount?: number;
}

const RecurringTaskSettings: React.FC<RecurringTaskSettingsProps> = ({
  isOpen,
  onClose,
  onSave,
  onRemove,
  initialSettings,
}) => {
  // Get today's day name for default weekly selection
  const getTodayDayName = () => {
    const dayMap: { [key: number]: string } = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    return dayMap[dayjs().day()] || "Sunday";
  };

  // Helper function to find the next monthly occurrence
  const findNextMonthlyOccurrence = (
    startDate: dayjs.Dayjs,
    dayOfWeek: string,
    day: string
  ): dayjs.Dayjs => {
    const dayMap: { [key: string]: number } = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };

    const targetDay = dayMap[day];
    let currentMonth = startDate.startOf("month");
    let candidateDate: dayjs.Dayjs | null;

    // Try current month first
    candidateDate = findNthDayOfWeekInMonth(currentMonth, dayOfWeek, targetDay);
    if (
      candidateDate &&
      (candidateDate.isSame(startDate, "day") ||
        candidateDate.isAfter(startDate, "day"))
    ) {
      return candidateDate;
    }

    // Try next month
    currentMonth = currentMonth.add(1, "month");
    candidateDate = findNthDayOfWeekInMonth(currentMonth, dayOfWeek, targetDay);
    if (candidateDate) {
      return candidateDate;
    }

    // Fallback to start date if no valid date found
    return startDate;
  };

  // Helper function to find the nth occurrence of a day of week in a month
  const findNthDayOfWeekInMonth = (
    monthStart: dayjs.Dayjs,
    dayOfWeek: string,
    targetDay: number
  ): dayjs.Dayjs | null => {
    const dayOfWeekMap: { [key: string]: number } = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      last: -1,
    };

    const occurrence = dayOfWeekMap[dayOfWeek];
    if (occurrence === undefined) return null;

    if (occurrence === -1) {
      // Find last occurrence
      let lastDay = monthStart.endOf("month");
      while (
        lastDay.day() !== targetDay &&
        lastDay.isAfter(monthStart, "day")
      ) {
        lastDay = lastDay.subtract(1, "day");
      }
      return lastDay.day() === targetDay ? lastDay : null;
    }

    // Find nth occurrence
    let currentDate = monthStart.startOf("month");
    let found = 0;

    while (currentDate.month() === monthStart.month() && found < occurrence) {
      if (currentDate.day() === targetDay) {
        found++;
        if (found === occurrence) {
          return currentDate;
        }
      }
      currentDate = currentDate.add(1, "day");
    }

    return null;
  };

  const [settings, setSettings] = useState<RecurringSettings>(() => {
    const today = dayjs();
    const defaultSettings: RecurringSettings = {
      pattern: "Weekly",
      dailyInterval: 1,
      weeklyInterval: 1,
      weeklyDays: [getTodayDayName()], // Default to today's day
      monthlyInterval: 1,
      yearlyInterval: 1,
      monthlyDayOfWeek: "third",
      monthlyDay: "Monday",
      monthlyDayOfMonth: 15,
      startDate: today, // Default to today
      endType: "endBy",
      endDate: undefined, // Will be calculated based on pattern
      endAfterCount: 2, // Default to 2 for weekly recurrence validation
      ...initialSettings,
    };

    // Calculate default end date for monthly pattern
    if (
      defaultSettings.pattern === "Monthly" &&
      defaultSettings.monthlyDayOfWeek &&
      defaultSettings.monthlyDay
    ) {
      const nextMonthOccurrence = findNextMonthlyOccurrence(
        today.add(1, "month"),
        defaultSettings.monthlyDayOfWeek,
        defaultSettings.monthlyDay
      );
      if (nextMonthOccurrence) {
        defaultSettings.endDate = nextMonthOccurrence;
      }
    }

    return defaultSettings;
  });

  const [endAfterInputValue, setEndAfterInputValue] = useState(
    settings.endAfterCount?.toString() || "2"
  );
  const [weeklyIntervalInputValue, setWeeklyIntervalInputValue] = useState(
    settings.weeklyInterval?.toString() || "1"
  );
  const [dateError, setDateError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const weeklyInputRef = useRef<HTMLInputElement>(null);

  // Validation function to check if settings are valid
  const isSettingsValid = (): boolean => {
    // Check if start date is set
    if (!settings.startDate) {
      return false;
    }

    // Check if there are any date errors
    if (dateError) {
      return false;
    }

    // For monthly pattern, check if day and occurrence are set
    if (settings.pattern === "Monthly") {
      if (!settings.monthlyDayOfWeek || !settings.monthlyDay) {
        return false;
      }
      // Check if start date matches the selected day and occurrence
      const isValid = validateDateMatch(
        settings.startDate,
        settings.monthlyDayOfWeek,
        settings.monthlyDay
      );
      if (!isValid) {
        return false;
      }
    }

    // For weekly pattern, check if at least one day is selected
    if (settings.pattern === "Weekly") {
      if (!settings.weeklyDays || settings.weeklyDays.length === 0) {
        return false;
      }
    }

    // For end type "endBy", check if end date is set
    if (settings.endType === "endBy" && !settings.endDate) {
      return false;
    }

    // For end type "endAfter", check if count is set
    if (
      settings.endType === "endAfter" &&
      (!settings.endAfterCount || settings.endAfterCount < 1)
    ) {
      return false;
    }

    // For "noEnd" type, end date can be empty (no validation needed)

    return true;
  };

  // Sync input value with settings
  useEffect(() => {
    if (settings.endType === "endAfter") {
      const minOccurrences = settings.pattern === "Weekly" ? 2 : 1;
      const currentValue = settings.endAfterCount || minOccurrences;
      const finalValue = Math.max(currentValue, minOccurrences);

      setEndAfterInputValue(finalValue.toString());
      if (inputRef.current) {
        inputRef.current.value = finalValue.toString();
      }
    } else {
      const minOccurrences = settings.pattern === "Weekly" ? 2 : 1;
      setEndAfterInputValue(minOccurrences.toString());
      if (inputRef.current) {
        inputRef.current.value = minOccurrences.toString();
      }
    }
  }, [settings.endAfterCount, settings.endType, settings.pattern]);

  // Sync weekly interval input value with settings
  useEffect(() => {
    setWeeklyIntervalInputValue(settings.weeklyInterval?.toString() || "1");
    if (weeklyInputRef.current) {
      weeklyInputRef.current.value = settings.weeklyInterval?.toString() || "1";
    }
  }, [settings.weeklyInterval]);

  const handlePatternChange = (e: RadioChangeEvent) => {
    const newPattern = e.target.value as
      | "Daily"
      | "Weekly"
      | "Monthly"
      | "Yearly";

    // Clear any date errors when pattern changes
    setDateError("");

    setSettings((prev) => {
      const newSettings = {
        ...prev,
        pattern: newPattern,
      };

      // If switching to weekly, auto-select today's day
      if (newPattern === "Weekly") {
        const todayDayName = getTodayDayName();
        const currentWeeklyDays = prev.weeklyDays || [];

        // Only add today's day if not already selected
        if (!currentWeeklyDays.includes(todayDayName)) {
          newSettings.weeklyDays = [...currentWeeklyDays, todayDayName];
        }
      }

      return newSettings;
    });
  };

  const handleEndTypeChange = (e: RadioChangeEvent) => {
    const newEndType = e.target.value as "endBy" | "endAfter" | "noEnd";
    console.log("End type changed to:", newEndType);

    setSettings((prev) => {
      const newSettings = { ...prev, endType: newEndType };

      // Clear other values based on selection
      if (newEndType === "endBy") {
        // Clear endAfterCount when selecting endBy
        newSettings.endAfterCount = undefined;
        // For monthly pattern, auto-sync end date to next month occurrence
        if (
          prev.pattern === "Monthly" &&
          prev.monthlyDayOfWeek &&
          prev.monthlyDay &&
          prev.startDate
        ) {
          const nextMonthOccurrence = findNextMonthlyOccurrence(
            prev.startDate.add(1, "month"),
            prev.monthlyDayOfWeek,
            prev.monthlyDay
          );
          if (nextMonthOccurrence) {
            newSettings.endDate = nextMonthOccurrence;
          }
        }
      } else if (newEndType === "endAfter") {
        // Clear endDate when selecting endAfter
        newSettings.endDate = undefined;
      } else if (newEndType === "noEnd") {
        // Clear both endDate and endAfterCount when selecting noEnd
        newSettings.endDate = undefined;
        newSettings.endAfterCount = undefined;
      }

      return newSettings;
    });
  };

  const handleWeeklyDayChange = (day: string, checked: boolean) => {
    setSettings((prev) => {
      const newWeeklyDays = checked
        ? [...(prev.weeklyDays || []), day]
        : (prev.weeklyDays || []).filter((d) => d !== day);

      // If we have selected days and a start date, adjust the start date
      if (newWeeklyDays.length > 0 && prev.startDate) {
        const adjustedStartDate = findNearestFutureDate(
          dayjs(new Date()),
          newWeeklyDays
        );
        return {
          ...prev,
          weeklyDays: newWeeklyDays,
          startDate: adjustedStartDate,
        };
      }

      return {
        ...prev,
        weeklyDays: newWeeklyDays,
      };
    });
  };

  // Helper function to get day name from date
  const getDayNameFromDate = (date: dayjs.Dayjs): string => {
    const dayMap: { [key: number]: string } = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    return dayMap[date.day()] || "Sunday";
  };

  // Helper function to validate if date matches the selected day and occurrence
  const validateDateMatch = (
    date: dayjs.Dayjs,
    dayOfWeek: string,
    day: string
  ): boolean => {
    if (!dayOfWeek || !day) return true;

    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const targetDay = dayMap[day];
    if (targetDay === undefined) return true;

    // Check if the date matches the target day of the week
    if (date.day() !== targetDay) return false;

    // Check if it matches the occurrence (first, second, third, fourth, last)
    const monthStart = date.startOf("month");
    const candidateDate = findNthDayOfWeekInMonth(
      monthStart,
      dayOfWeek,
      targetDay
    );

    return candidateDate ? date.isSame(candidateDate, "day") : false;
  };

  // Helper function to get monthly occurrence (first, second, third, fourth, last)
  const getMonthlyOccurrence = (date: dayjs.Dayjs, dayName: string): string => {
    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const targetDay = dayMap[dayName];
    if (targetDay === undefined) return "first";

    const monthStart = date.startOf("month");

    // Calculate which occurrence this is
    let occurrence = 1;
    let currentDate = monthStart.add(1, "day");

    // Find the first occurrence of the target day
    while (currentDate.month() === monthStart.month()) {
      if (currentDate.day() === targetDay) {
        break;
      }
      currentDate = currentDate.add(1, "day");
    }

    // Count occurrences until we reach the target date
    while (
      currentDate.isBefore(date, "day") &&
      currentDate.month() === monthStart.month()
    ) {
      currentDate = currentDate.add(7, "day");
      if (
        currentDate.month() === monthStart.month() &&
        currentDate.day() === targetDay
      ) {
        occurrence++;
      }
    }

    // Check if it's the last occurrence
    let lastOccurrence = currentDate;
    while (lastOccurrence.add(7, "day").month() === monthStart.month()) {
      lastOccurrence = lastOccurrence.add(7, "day");
    }

    if (date.isSame(lastOccurrence, "day")) {
      return "last";
    }

    // Map occurrence number to string
    const occurrenceMap: { [key: number]: string } = {
      1: "first",
      2: "second",
      3: "third",
      4: "fourth",
    };

    return occurrenceMap[occurrence] || "first";
  };

  // Handle start date change and auto-select the day
  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) {
      setDateError("Start date is required");
      return;
    }

    setSettings((prev) => {
      const newSettings = { ...prev, startDate: date };

      // If weekly pattern is selected, auto-select the day of the start date
      if (prev.pattern === "Weekly") {
        const dayName = getDayNameFromDate(date);
        const currentWeeklyDays = prev.weeklyDays || [];

        // Only add the day if it's not already selected
        if (!currentWeeklyDays.includes(dayName)) {
          newSettings.weeklyDays = [...currentWeeklyDays, dayName];
        }
      }

      // If monthly pattern is selected, validate date matches selected day and occurrence
      if (prev.pattern === "Monthly") {
        if (prev.monthlyDayOfWeek && prev.monthlyDay) {
          // Check if the selected date matches the current day and occurrence settings
          const isValid = validateDateMatch(
            date,
            prev.monthlyDayOfWeek,
            prev.monthlyDay
          );

          if (!isValid) {
            // Date doesn't match, show error
            setDateError(
              `Selected date doesn't match ${prev.monthlyDayOfWeek} ${prev.monthlyDay}. Please select a valid date or change the day/occurrence.`
            );
          } else {
            // Date matches, clear any previous error
            setDateError("");
          }
        } else {
          // No day/occurrence selected yet, auto-select based on date
          const dayName = getDayNameFromDate(date);
          const occurrence = getMonthlyOccurrence(date, dayName);

          newSettings.monthlyDay = dayName as
            | "Monday"
            | "Tuesday"
            | "Wednesday"
            | "Thursday"
            | "Friday"
            | "Saturday"
            | "Sunday";
          newSettings.monthlyDayOfWeek = occurrence as
            | "first"
            | "second"
            | "third"
            | "fourth"
            | "last";
        }

        // If end type is "endBy", sync end date to next month occurrence
        if (prev.endType === "endBy") {
          const nextMonthOccurrence = findNextMonthlyOccurrence(
            date.add(1, "month"),
            newSettings.monthlyDayOfWeek || "first",
            newSettings.monthlyDay || "Monday"
          );
          if (nextMonthOccurrence) {
            newSettings.endDate = nextMonthOccurrence;
          }
        }
      }

      return newSettings;
    });
  };

  const handleMonthlyDayChange = (dayOfWeek: string, day: string) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        monthlyDayOfWeek: dayOfWeek as
          | "first"
          | "second"
          | "third"
          | "fourth"
          | "last",
        monthlyDay: day as
          | "Monday"
          | "Tuesday"
          | "Wednesday"
          | "Thursday"
          | "Friday"
          | "Saturday"
          | "Sunday",
      };

      // If we have a start date, check if it matches the new day/occurrence
      if (prev.startDate) {
        const isValid = validateDateMatch(prev.startDate, dayOfWeek, day);

        if (!isValid) {
          // Date doesn't match, show error
          setDateError(
            `Current start date doesn't match ${dayOfWeek} ${day}. Please select a valid date.`
          );
          newSettings.startDate = dayjs(); // Reset to today
        } else {
          // Date matches, clear any previous error
          setDateError("");
        }
      }

      // If we have an end date and it's set to "endBy", sync it to next month occurrence
      if (prev.endType === "endBy" && prev.startDate) {
        const nextMonthOccurrence = findNextMonthlyOccurrence(
          prev.startDate.add(1, "month"),
          dayOfWeek,
          day
        );
        if (nextMonthOccurrence) {
          newSettings.endDate = nextMonthOccurrence;
        }
      }

      return newSettings;
    });
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  // Helper function to find the nearest future date based on selected days
  const findNearestFutureDate = (
    startDate: dayjs.Dayjs,
    selectedDays: string[]
  ): dayjs.Dayjs => {
    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    // Convert selected days to day numbers and sort by priority (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
    const dayNumbers = selectedDays
      .map((day) => dayMap[day])
      .sort((a, b) => {
        // Priority: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6), Sun(0)
        const priorityA = a === 0 ? 7 : a; // Sunday gets lowest priority
        const priorityB = b === 0 ? 7 : b;
        return priorityA - priorityB;
      });

    if (dayNumbers.length === 0) return startDate;

    const startDayOfWeek = startDate.day();

    // Find the first selected day that is on or after the start date
    for (const dayNum of dayNumbers) {
      const daysToAdd = (dayNum - startDayOfWeek + 7) % 7;
      const candidateDate = startDate.add(daysToAdd, "day");

      // If the candidate date is on or after the start date, use it
      if (
        candidateDate.isSame(startDate, "day") ||
        candidateDate.isAfter(startDate, "day")
      ) {
        return candidateDate;
      }
    }

    // If no day is found in the current week, use the first priority day of next week
    const firstDay = dayNumbers[0];
    const daysToAdd = ((firstDay - startDayOfWeek + 7) % 7) + 7;
    return startDate.add(daysToAdd, "day");
  };

  // Helper function to get minimum end date based on pattern and start date
  const getMinimumEndDate = (
    pattern: string,
    startDate: dayjs.Dayjs,
    weeklyInterval: number = 1
  ): dayjs.Dayjs => {
    if (pattern === "Weekly") {
      // For weekly, must be at least one interval from start date
      return startDate.add(weeklyInterval, "week");
    }

    // For other patterns, use start date or today (whichever is later)
    const today = dayjs();
    return startDate.isAfter(today) ? startDate : today;
  };

  // Helper function to check if a date is allowed for weekly recurrence
  const isDateAllowedForWeekly = (
    date: dayjs.Dayjs,
    selectedDays: string[],
    startDate: dayjs.Dayjs,
    weeklyInterval: number = 1
  ): boolean => {
    if (!selectedDays || selectedDays.length === 0) return true;

    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const dateDayNumber = date.day();
    const selectedDayNumbers = selectedDays.map((day) => dayMap[day]);

    // First check if the date falls on one of the selected days
    if (!selectedDayNumbers.includes(dateDayNumber)) {
      return false;
    }

    // Always allow the start date itself
    if (date.isSame(startDate, "day")) {
      return true;
    }

    // If interval is 1, allow any selected day
    if (weeklyInterval === 1) {
      return true;
    }

    // For intervals > 1, check if the date aligns with the interval
    const daysDiff = date.diff(startDate, "day") - 7;
    const weeksDiff = Math.floor(daysDiff / 7);
    return weeksDiff % weeklyInterval === 0;
  };

  // Helper function to check if a date is allowed for monthly recurrence
  const isDateAllowedForMonthly = (
    date: dayjs.Dayjs,
    dayOfWeek: string,
    day: string
  ): boolean => {
    if (!dayOfWeek || !day) return true;

    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const targetDay = dayMap[day];
    if (targetDay === undefined) return true;

    // Check if the date matches the target day of the week
    if (date.day() !== targetDay) return false;

    // Check if it matches the occurrence (first, second, third, fourth, last)
    const monthStart = date.startOf("month");
    const candidateDate = findNthDayOfWeekInMonth(
      monthStart,
      dayOfWeek,
      targetDay
    );

    return candidateDate ? date.isSame(candidateDate, "day") : false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recurring Task Settings
          </h2>

          {/* Recurrence Pattern Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Recurrence pattern
            </h3>
            <div className="flex gap-8">
              {/* Radio buttons for pattern selection */}
              <div className="flex flex-col gap-3">
                <Radio.Group
                  value={settings.pattern}
                  onChange={handlePatternChange}
                >
                  <div className="flex flex-col gap-3">
                    <Radio value="Daily" className="text-gray-700">
                      Daily
                    </Radio>
                    <Radio value="Weekly" className="text-gray-700">
                      Weekly
                    </Radio>
                    <Radio value="Monthly" className="text-gray-700">
                      Monthly
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* Pattern configuration */}
              <div className="flex-1 pl-8 border-l border-gray-300">
                {settings.pattern === "Weekly" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Recur every</span>
                      <input
                        ref={weeklyInputRef}
                        type="number"
                        value={weeklyIntervalInputValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setWeeklyIntervalInputValue(newValue);
                          setSettings((prev) => ({
                            ...prev,
                            weeklyInterval:
                              newValue === "" ? 1 : parseInt(newValue) || 1,
                          }));
                        }}
                        className="text-black w-16 h-4 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50"
                        placeholder="1"
                        min="1"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                        autoComplete="off"
                      />
                      <span className="text-gray-700">week(s) on:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => {
                        const isStartDateDay =
                          settings.pattern === "Weekly" &&
                          getDayNameFromDate(settings.startDate) === day;
                        const isSelected =
                          settings.weeklyDays?.includes(day) || false;

                        return (
                          <label
                            key={day}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) =>
                                handleWeeklyDayChange(day, e.target.checked)
                              }
                              className="w-4 h-4 text-primary-50 bg-gray-100 border-gray-300 rounded focus:ring-primary-50 focus:ring-2"
                            />
                            <span
                              className={`text-sm ${
                                isStartDateDay
                                  ? "font-semibold text-primary-50"
                                  : "text-gray-700"
                              }`}
                            >
                              {day}
                              {isStartDateDay && " (start date)"}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
                {settings.pattern === "Monthly" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Radio.Group value="the" className="flex items-center">
                        <Radio value="the" className="text-gray-700">
                          The
                        </Radio>
                      </Radio.Group>
                      <Select
                        value={settings.monthlyDayOfWeek}
                        onChange={(value) =>
                          handleMonthlyDayChange(
                            value,
                            settings.monthlyDay || "Monday"
                          )
                        }
                        className="w-24"
                        options={[
                          { value: "first", label: "first" },
                          { value: "second", label: "second" },
                          { value: "third", label: "third" },
                          { value: "fourth", label: "fourth" },
                          { value: "last", label: "last" },
                        ]}
                      />
                      <Select
                        value={settings.monthlyDay}
                        onChange={(value) =>
                          handleMonthlyDayChange(
                            settings.monthlyDayOfWeek || "first",
                            value
                          )
                        }
                        className="w-28"
                        options={[
                          { value: "Monday", label: "Monday" },
                          { value: "Tuesday", label: "Tuesday" },
                          { value: "Wednesday", label: "Wednesday" },
                          { value: "Thursday", label: "Thursday" },
                          { value: "Friday", label: "Friday" },
                          { value: "Saturday", label: "Saturday" },
                          { value: "Sunday", label: "Sunday" },
                        ]}
                      />
                      <span className="text-gray-700">of every</span>

                      <span className="text-gray-700">month(s)</span>
                    </div>
                  </div>
                )}
                {settings.pattern === "Yearly" && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Every</span>
                    <input
                      type="number"
                      value={settings.yearlyInterval}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          yearlyInterval: parseInt(e.target.value) || 1,
                        }))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      min="1"
                    />
                    <span className="text-gray-700">year(s)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Range of Recurrence Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Range of recurrence
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Start:</span>
                  <DatePicker
                    value={settings.startDate}
                    onChange={handleStartDateChange}
                    format="ddd M/D/YYYY"
                    className="w-40"
                    disabledDate={(current) => {
                      if (!current) return false;
                      // Disable past dates
                      return current.isBefore(dayjs(), "day");
                    }}
                  />
                </div>
                {dateError && (
                  <div className="text-red-500 text-sm ml-16">{dateError}</div>
                )}
              </div>

              <div className="space-y-3">
                <Radio.Group
                  value={settings.endType}
                  onChange={handleEndTypeChange}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Radio value="endBy" className="text-gray-700">
                        End by:
                      </Radio>
                      <DatePicker
                        value={settings.endDate}
                        onChange={(date) =>
                          setSettings((prev) => ({
                            ...prev,
                            endDate: date || dayjs(),
                          }))
                        }
                        format="ddd M/D/YYYY"
                        className="w-40"
                        disabled={settings.endType !== "endBy"}
                        placeholder={
                          settings.pattern === "Weekly" && settings.startDate
                            ? `Select end date (only ${
                                settings.weeklyDays?.join(", ") ||
                                "selected days"
                              })`
                            : settings.pattern === "Monthly" &&
                              settings.monthlyDayOfWeek &&
                              settings.monthlyDay
                            ? `Select end date (only ${settings.monthlyDayOfWeek} ${settings.monthlyDay})`
                            : "Select end date"
                        }
                        disabledDate={(current) => {
                          if (!current || !settings.startDate) return false;

                          const minEndDate = getMinimumEndDate(
                            settings.pattern,
                            settings.startDate,
                            settings.weeklyInterval || 1
                          );

                          // Check if date is before minimum end date
                          if (current.isBefore(minEndDate, "day")) {
                            return true;
                          }

                          // For weekly pattern, only allow selected days
                          if (
                            settings.pattern === "Weekly" &&
                            settings.weeklyDays
                          ) {
                            return !isDateAllowedForWeekly(
                              current,
                              settings.weeklyDays,
                              settings.startDate,
                              settings.weeklyInterval || 1
                            );
                          }

                          // For monthly pattern, only allow matching occurrence days
                          if (
                            settings.pattern === "Monthly" &&
                            settings.monthlyDayOfWeek &&
                            settings.monthlyDay
                          ) {
                            return !isDateAllowedForMonthly(
                              current,
                              settings.monthlyDayOfWeek,
                              settings.monthlyDay
                            );
                          }

                          return false;
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio value="endAfter" className="text-gray-700">
                        End after:
                      </Radio>
                      <input
                        ref={inputRef}
                        type="number"
                        value={endAfterInputValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setEndAfterInputValue(newValue);

                          // For weekly recurrence, minimum 2 occurrences (at least one week away from today)
                          const minOccurrences =
                            settings.pattern === "Weekly" ? 2 : 1;
                          const parsedValue =
                            parseInt(newValue) || minOccurrences;
                          const finalValue =
                            newValue === ""
                              ? minOccurrences
                              : Math.max(parsedValue, minOccurrences);

                          setSettings((prev) => ({
                            ...prev,
                            endAfterCount: finalValue,
                          }));
                        }}
                        className="text-black w-16 h-4 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50"
                        placeholder={settings.pattern === "Weekly" ? "2" : "1"}
                        min={settings.pattern === "Weekly" ? 2 : 1}
                        disabled={settings.endType !== "endAfter"}
                        style={{
                          backgroundColor:
                            settings.endType === "endAfter"
                              ? "white"
                              : "#f3f4f6",
                          color:
                            settings.endType === "endAfter"
                              ? "black"
                              : "#9ca3af",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                        autoComplete="off"
                      />

                      <span className="text-xs text-gray-500 ml-2">
                        occurrences
                        {settings.pattern === "Weekly" && (
                          <span className="text-blue-600 ml-1">
                            (min: 2 for weekly)
                          </span>
                        )}
                      </span>
                    </div>
                    <div>
                      <Radio value="noEnd" className="text-gray-700">
                        No end date
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={!isSettingsValid()}
              className={`px-6 py-2 rounded-md font-medium ${
                isSettingsValid()
                  ? "bg-primary-50 hover:bg-primary-200 text-white border-primary-50 hover:border-primary-200"
                  : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              }`}
            >
              OK
            </Button>
            <Button
              onClick={onClose}
              className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 rounded-md font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRemove}
              className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-500 border border-gray-300 hover:border-gray-400 rounded-md font-medium"
            >
              Remove Recurrence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringTaskSettings;
