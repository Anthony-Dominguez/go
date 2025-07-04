import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Calendar } from '../components/ui';

export default function DatePickerScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const handleDateSelect = (date: Date) => {
    if (isSelectingRange) {
      if (!startDate) {
        setStartDate(date);
        setEndDate(undefined);
      } else if (!endDate) {
        if (date > startDate) {
          setEndDate(date);
        } else {
          setStartDate(date);
          setEndDate(undefined);
        }
      } else {
        // Reset and start new selection
        setStartDate(date);
        setEndDate(undefined);
      }
    } else {
      setSelectedDate(date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: { color: string; textColor?: string } } = {};
    
    if (isSelectingRange && startDate && endDate) {
      const current = new Date(startDate);
      while (current <= endDate) {
        const key = current.toISOString().split('T')[0];
        if (current.getTime() === startDate.getTime() || current.getTime() === endDate.getTime()) {
          marked[key] = { color: '#FF6B9D', textColor: 'white' };
        } else {
          marked[key] = { color: 'rgba(255, 107, 157, 0.2)', textColor: '#FF6B9D' };
        }
        current.setDate(current.getDate() + 1);
      }
    }
    
    return marked;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Dates</Text>
          <Text style={styles.headerSubtitle}>Choose your travel dates</Text>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeContainer}>
          <Button
            variant={!isSelectingRange ? 'primary' : 'outline'}
            size="sm"
            onPress={() => {
              setIsSelectingRange(false);
              setStartDate(undefined);
              setEndDate(undefined);
            }}
            style={styles.modeButton}
          >
            Single Date
          </Button>
          <Button
            variant={isSelectingRange ? 'primary' : 'outline'}
            size="sm"
            onPress={() => {
              setIsSelectingRange(true);
              setSelectedDate(undefined);
            }}
            style={styles.modeButton}
          >
            Date Range
          </Button>
        </View>

        {/* Calendar */}
        <Calendar
          selectedDate={!isSelectingRange ? selectedDate : startDate}
          onDateSelect={handleDateSelect}
          minDate={new Date()}
          markedDates={getMarkedDates()}
        />

        {/* Selected Date Display */}
        {!isSelectingRange && selectedDate && (
          <Card variant="default" padding="md" style={styles.selectionCard}>
            <View style={styles.selectionHeader}>
              <Ionicons name="calendar" size={20} color="#FF6B9D" />
              <Text style={styles.selectionTitle}>Selected Date</Text>
            </View>
            <Text style={styles.selectionDate}>{formatDate(selectedDate)}</Text>
          </Card>
        )}

        {/* Date Range Display */}
        {isSelectingRange && (startDate || endDate) && (
          <Card variant="default" padding="md" style={styles.selectionCard}>
            <View style={styles.selectionHeader}>
              <Ionicons name="calendar" size={20} color="#FF6B9D" />
              <Text style={styles.selectionTitle}>Trip Duration</Text>
            </View>
            
            {startDate && (
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Check-in:</Text>
                <Text style={styles.selectionDate}>{formatDate(startDate)}</Text>
              </View>
            )}
            
            {endDate && (
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Check-out:</Text>
                <Text style={styles.selectionDate}>{formatDate(endDate)}</Text>
              </View>
            )}
            
            {startDate && endDate && (
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>
                  {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </Text>
              </View>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            variant="outline"
            size="lg"
            onPress={() => {
              setSelectedDate(undefined);
              setStartDate(undefined);
              setEndDate(undefined);
            }}
            style={styles.actionButton}
          >
            Clear
          </Button>
          <Button
            variant="gradient"
            size="lg"
            disabled={!selectedDate && (!startDate || !endDate)}
            style={styles.actionButton}
          >
            Confirm Dates
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  modeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
  },
  modeButton: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  selectionCard: {
    marginTop: 20,
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  selectionDate: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  dateRow: {
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  durationContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});