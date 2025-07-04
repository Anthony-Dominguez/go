import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Input, Calendar } from '../components/ui';
import { Trip } from '../types/trip';


export default function CreateTripScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    description: '',
    budget: '',
    dailyBudget: '',
    hasDailyBudget: false,
    isPublic: true,
  });
  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 0, 0, 0, 0);
  
  const [startDate, setStartDate] = useState(normalizedToday);
  const [endDate, setEndDate] = useState(nextWeek);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{ from: Date; to?: Date }>({
    from: normalizedToday,
    to: nextWeek
  });

  const isFormValid = () => {
    return formData.title.trim() !== '' && 
           formData.destination.trim() !== '' && 
           startDate <= endDate;
  };

  const calculateDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateTrip = () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newTrip: Partial<Trip> = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      description: formData.description.trim(),
      startDate,
      endDate,
      budget: parseFloat(formData.budget) || 0,
      dailyBudget: formData.hasDailyBudget ? parseFloat(formData.dailyBudget) || undefined : undefined,
      isPublic: formData.isPublic,
      expenses: [],
      itinerary: [],
      participants: ['current_user'],
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: Save trip to storage/state management
    console.log('Creating trip:', newTrip);
    
    Alert.alert('Success', 'Trip created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleDateSelection = (range: Date | Date[] | { from: Date; to?: Date } | undefined) => {
    if (range && typeof range === 'object' && 'from' in range) {
      setSelectedRange(range);
      setStartDate(range.from);
      if (range.to) {
        setEndDate(range.to);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          
          <Input
            label="Trip Title"
            placeholder="e.g., Summer Adventure in Japan"
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            style={styles.input}
          />

          <Input
            label="Destination"
            placeholder="e.g., Tokyo, Japan"
            value={formData.destination}
            onChangeText={(text) => setFormData(prev => ({ ...prev, destination: text }))}
            rightIcon="location"
            style={styles.input}
          />

          <Input
            label="Description (Optional)"
            placeholder="Tell us about your trip..."
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card>

        {/* Dates */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>When</Text>
          
          <TouchableOpacity 
            style={styles.dateSelector}
            onPress={() => setShowCalendar(true)}
          >
            <View style={styles.dateRow}>
              <View style={styles.dateButton}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{startDate.toLocaleDateString()}</Text>
              </View>
              
              <Ionicons name="arrow-forward" size={20} color="#8E8E93" />
              
              <View style={styles.dateButton}>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{endDate.toLocaleDateString()}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.durationInfo}>
            <Ionicons name="calendar" size={16} color="#8E8E93" />
            <Text style={styles.durationText}>Duration: {calculateDuration()} days</Text>
          </View>
        </Card>

        {/* Budget */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Budget (Optional)</Text>
          
          <Input
            label="Total Trip Budget"
            placeholder="0"
            value={formData.budget}
            onChangeText={(text) => setFormData(prev => ({ ...prev, budget: text }))}
            keyboardType="numeric"
            leftIcon="card"
            style={styles.input}
          />

          <TouchableOpacity 
            style={styles.toggleRow}
            onPress={() => setFormData(prev => ({ ...prev, hasDailyBudget: !prev.hasDailyBudget }))}
          >
            <Text style={styles.toggleLabel}>Set Daily Budget</Text>
            <View style={[styles.toggle, formData.hasDailyBudget && styles.toggleActive]}>
              {formData.hasDailyBudget && <View style={styles.toggleDot} />}
            </View>
          </TouchableOpacity>

          {formData.hasDailyBudget && (
            <Input
              label="Daily Budget"
              placeholder="0"
              value={formData.dailyBudget}
              onChangeText={(text) => setFormData(prev => ({ ...prev, dailyBudget: text }))}
              keyboardType="numeric"
              leftIcon="card"
              style={styles.input}
            />
          )}
        </Card>

        {/* Privacy */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <TouchableOpacity 
            style={styles.toggleRow}
            onPress={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
          >
            <View style={styles.privacyInfo}>
              <Text style={styles.toggleLabel}>Make trip public</Text>
              <View style={styles.privacyDescription}>
                <Ionicons 
                  name={formData.isPublic ? "globe" : "lock-closed"} 
                  size={12} 
                  color="#8E8E93" 
                />
                <Text style={styles.privacyText}>
                  {formData.isPublic 
                    ? 'Other users can discover and view this trip'
                    : 'Only you and invited participants can see this trip'
                  }
                </Text>
              </View>
            </View>
            <View style={[styles.toggle, formData.isPublic && styles.toggleActive]}>
              {formData.isPublic && <View style={styles.toggleDot} />}
            </View>
          </TouchableOpacity>
        </Card>


        {/* Create Button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="ghost"
            size="lg"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          
          <Button
            variant={isFormValid() ? "primary" : "default"}
            size="lg"
            onPress={handleCreateTrip}
            disabled={!isFormValid()}
            style={styles.createButton}
          >
            Create Trip
          </Button>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Calendar Modal */}
      {showCalendar && (
        <View style={styles.calendarModal}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Travel Dates</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Ionicons name="close" size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={handleDateSelection}
            />
            
            <View style={styles.calendarActions}>
              <Button
                variant="ghost"
                size="md"
                onPress={() => setShowCalendar(false)}
                style={styles.calendarButton}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onPress={() => {
                  // Ensure we have at least a start date when closing
                  if (selectedRange.from && !selectedRange.to) {
                    setEndDate(selectedRange.from);
                  }
                  setShowCalendar(false);
                }}
                style={styles.calendarButton}
              >
                Done
              </Button>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  dateSelector: {
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  dateButton: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  durationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#FF6B9D',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  privacyInfo: {
    flex: 1,
    marginRight: 16,
  },
  privacyDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  privacyText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  cancelButton: {
    flex: 1,
  },
  createButton: {
    flex: 1,
  },
  calendarModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  calendarActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  calendarButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});