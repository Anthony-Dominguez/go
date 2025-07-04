import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const { width } = Dimensions.get('window');

type CalendarMode = 'single' | 'range' | 'multiple';

interface CalendarProps {
  mode?: CalendarMode;
  selected?: Date | Date[] | { from: Date; to?: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to?: Date } | undefined) => void;
  disabled?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  style?: any;
  captionLayout?: 'buttons' | 'dropdown';
}

export default function Calendar({
  mode = 'single',
  selected,
  onSelect,
  disabled,
  fromDate,
  toDate,
  style,
  captionLayout = 'buttons',
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getLastDayOfPreviousMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateEqual = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isDateEqual(date, today);
  };

  const isDateDisabled = (date: Date) => {
    if (fromDate && date < fromDate) return true;
    if (toDate && date > toDate) return true;
    if (disabled && disabled(date)) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (mode === 'single' && selected instanceof Date) {
      return isDateEqual(date, selected);
    }
    if (mode === 'multiple' && Array.isArray(selected)) {
      return selected.some(d => isDateEqual(date, d));
    }
    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      const { from, to } = selected;
      if (!from) return false;
      if (!to) return isDateEqual(date, from);
      
      // Check if date is exactly the start or end, or within the range
      return isDateEqual(date, from) || 
             isDateEqual(date, to) || 
             (date > from && date < to);
    }
    return false;
  };

  const isRangeStart = (date: Date) => {
    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      return selected.from && isDateEqual(date, selected.from);
    }
    return false;
  };

  const isRangeEnd = (date: Date) => {
    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      return selected.to && isDateEqual(date, selected.to);
    }
    return false;
  };

  const isInRange = (date: Date) => {
    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      const { from, to } = selected;
      if (!from || !to) return false;
      // Only highlight dates that are strictly between start and end (not including the endpoints)
      return date > from && date < to && !isDateEqual(date, from) && !isDateEqual(date, to);
    }
    return false;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDatePress = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    // Normalize date to remove time components
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    
    if (mode === 'single') {
      onSelect?.(normalizedDate);
    } else if (mode === 'multiple') {
      const currentSelected = Array.isArray(selected) ? selected : [];
      const isAlreadySelected = currentSelected.some(d => isDateEqual(normalizedDate, d));
      
      if (isAlreadySelected) {
        onSelect?.(currentSelected.filter(d => !isDateEqual(normalizedDate, d)));
      } else {
        onSelect?.([...currentSelected, normalizedDate]);
      }
    } else if (mode === 'range') {
      const currentRange = selected && typeof selected === 'object' && 'from' in selected ? selected : { from: undefined, to: undefined };
      
      if (!currentRange.from || (currentRange.from && currentRange.to)) {
        // Start new range
        onSelect?.({ from: normalizedDate, to: undefined });
      } else if (currentRange.from && !currentRange.to) {
        // Complete range
        const normalizedFrom = new Date(currentRange.from.getFullYear(), currentRange.from.getMonth(), currentRange.from.getDate(), 0, 0, 0, 0);
        
        if (normalizedDate.getTime() === normalizedFrom.getTime()) {
          // Same date clicked, keep single date selection
          onSelect?.({ from: normalizedDate, to: undefined });
        } else if (normalizedDate > normalizedFrom) {
          onSelect?.({ from: normalizedFrom, to: normalizedDate });
        } else {
          onSelect?.({ from: normalizedDate, to: normalizedFrom });
        }
      }
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const lastDayPrevMonth = getLastDayOfPreviousMonth(currentDate);
    const totalCells = 42; // 6 rows × 7 days
    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = lastDayPrevMonth - i;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day, 0, 0, 0, 0);
      days.push(
        <TouchableOpacity
          key={`prev-${day}`}
          style={[styles.dayCell, styles.otherMonthDay]}
          onPress={() => handleDatePress(date)}
          disabled={isDateDisabled(date)}
        >
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 0, 0, 0, 0);
      const isSelectedDate = isDateSelected(date);
      const isTodayDate = isToday(date);
      const isDisabled = isDateDisabled(date);
      const isStart = isRangeStart(date);
      const isEnd = isRangeEnd(date);
      const inRange = isInRange(date);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isStart && styles.rangeStart,
            isEnd && styles.rangeEnd,
            inRange && styles.inRange,
            (isStart || isEnd) && !inRange && styles.selectedDay,
            isTodayDate && !isSelectedDate && !isStart && !isEnd && styles.todayDay,
            isDisabled && styles.disabledDay,
          ]}
          onPress={() => handleDatePress(date)}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.dayText,
              (isStart || isEnd) && styles.rangeEdgeText,
              inRange && styles.inRangeText,
              isTodayDate && !isSelectedDate && !isStart && !isEnd && styles.todayDayText,
              isDisabled && styles.disabledDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    // Next month's leading days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day, 0, 0, 0, 0);
      days.push(
        <TouchableOpacity
          key={`next-${day}`}
          style={[styles.dayCell, styles.otherMonthDay]}
          onPress={() => handleDatePress(date)}
          disabled={isDateDisabled(date)}
        >
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <Card variant="default" padding="lg" style={[styles.calendar, style]}>
      {/* Header */}
      <View style={styles.header}>
        {captionLayout === 'buttons' ? (
          <>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigateMonth('prev')}
            >
              <Ionicons name="chevron-back" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <Text style={styles.monthYear}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigateMonth('next')}
            >
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
        )}
      </View>

      {/* Day Names */}
      <View style={styles.dayNamesRow}>
        {dayNames.map((dayName) => (
          <View key={dayName} style={styles.dayNameCell}>
            <Text style={styles.dayNameText}>{dayName}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {renderCalendarDays()}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: width - 40,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: (width - 120) / 7, // Adjust for padding and margins
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  selectedDay: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  todayDay: {
    backgroundColor: '#FF6B9D',
    borderRadius: 8,
  },
  todayDayText: {
    color: 'white',
    fontWeight: '600',
  },
  otherMonthDay: {
    // No special styling needed, handled by text color
  },
  otherMonthText: {
    color: '#D1D5DB',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: '#D1D5DB',
  },
  rangeStart: {
    backgroundColor: '#FF6B9D',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rangeEnd: {
    backgroundColor: '#FF6B9D',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  inRange: {
    backgroundColor: 'rgba(255, 107, 157, 0.2)',
    borderRadius: 0,
  },
  rangeEdgeText: {
    color: 'white',
    fontWeight: '600',
  },
  inRangeText: {
    color: '#FF6B9D',
    fontWeight: '500',
  },
});