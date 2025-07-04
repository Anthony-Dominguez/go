import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Calendar, Button, Card } from '../components/ui';

export default function CalendarDemoScreen() {
  // Single date selection (like shadcn example)
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Range selection
  const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>();
  
  // Multiple selection
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar Examples</Text>
          <Text style={styles.headerSubtitle}>shadcn/ui inspired Calendar component</Text>
        </View>

        {/* Single Date Selection */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Single Date Selection</Text>
          <Text style={styles.sectionDescription}>
            {date ? `Selected: ${date.toLocaleDateString()}` : 'No date selected'}
          </Text>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            style={styles.calendar}
            captionLayout="buttons"
          />
          
          <Button
            variant="outline"
            onPress={() => setDate(undefined)}
            style={styles.clearButton}
          >
            Clear Selection
          </Button>
        </Card>

        {/* Range Selection */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Range Selection</Text>
          <Text style={styles.sectionDescription}>
            {range?.from && range?.to 
              ? `Range: ${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : range?.from 
                ? `Start: ${range.from.toLocaleDateString()}`
                : 'No range selected'
            }
          </Text>
          
          <Calendar
            mode="range"
            selected={range}
            onSelect={(value) => setRange(value as { from: Date; to?: Date })}
            style={styles.calendar}
            fromDate={new Date()}
          />
          
          <Button
            variant="outline"
            onPress={() => setRange(undefined)}
            style={styles.clearButton}
          >
            Clear Range
          </Button>
        </Card>

        {/* Multiple Selection */}
        <Card variant="default" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Multiple Selection</Text>
          <Text style={styles.sectionDescription}>
            {multipleDates.length > 0 
              ? `Selected ${multipleDates.length} dates`
              : 'No dates selected'
            }
          </Text>
          
          <Calendar
            mode="multiple"
            selected={multipleDates}
            onSelect={(value) => setMultipleDates(value as Date[])}
            style={styles.calendar}
          />
          
          <Button
            variant="outline"
            onPress={() => setMultipleDates([])}
            style={styles.clearButton}
          >
            Clear All
          </Button>
        </Card>

        {/* Code Example */}
        <Card variant="outlined" padding="md" style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Example</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`const [date, setDate] = useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    captionLayout="buttons"
  />
)`}
            </Text>
          </View>
        </Card>
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
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  calendar: {
    marginBottom: 16,
  },
  clearButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  codeContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  codeText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
});