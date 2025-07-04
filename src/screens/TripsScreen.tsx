import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Input, Badge } from '../components/ui';

type FilterType = 'All' | 'Upcoming' | 'Past';

export default function TripsScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const tripData = [
    {
      id: 1,
      title: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      dates: 'Jun 3, 2025 - Jul...',
      budget: '$1,500',
      status: 'Completed',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'DR',
      destination: 'DR',
      dates: 'Aug 11, 2025 - A...',
      budget: '$6,000',
      status: 'In 38 days',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Summer Adventure in...',
      destination: 'Tokyo, Japan',
      dates: 'Sep 3, 2025 - S...',
      budget: '$3,000',
      status: 'In 61 days',
      isCompleted: false,
    },
    {
      id: 4,
      title: 'European Backpacking',
      destination: 'Europe',
      dates: 'Oct 15, 2025 - N...',
      budget: '$2,500',
      status: 'In 104 days',
      isCompleted: false,
    },
  ];

  const filteredTrips = tripData.filter(trip => {
    if (activeFilter === 'Upcoming') return !trip.isCompleted;
    if (activeFilter === 'Past') return trip.isCompleted;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTrip' as never)}>
          <Ionicons name="add" size={24} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search trips..."
          value={searchText}
          onChangeText={setSearchText}
          leftIcon="search"
          variant="default"
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['All', 'Upcoming', 'Past'] as FilterType[]).map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'primary' : 'ghost'}
            size="sm"
            onPress={() => setActiveFilter(filter)}
            style={styles.filterButton}
          >
            {filter}
          </Button>
        ))}
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="filter" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <ScrollView style={styles.tripsList} showsVerticalScrollIndicator={false}>
        {filteredTrips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            onPress={() => navigation.navigate('TripDetails' as never, { tripId: trip.id })}
            activeOpacity={0.8}
          >
            <Card variant="default" padding="md" style={styles.tripCard}>
              <View style={styles.tripRow}>
                <LinearGradient
                  colors={['#FF6B9D', '#8B5CF6']}
                  style={styles.tripImage}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="airplane" size={24} color="white" />
                </LinearGradient>
                
                <View style={styles.tripInfo}>
                  <Text style={styles.tripTitle}>{trip.title}</Text>
                  <Text style={styles.tripDestination}>{trip.destination}</Text>
                  <Text style={styles.tripDates}>{trip.dates}</Text>
                  <Badge 
                    variant={trip.isCompleted ? 'success' : 'primary'} 
                    size="sm"
                    style={styles.tripBadge}
                  >
                    {trip.isCompleted ? 'Completed' : trip.status}
                  </Badge>
                </View>
                
                <View style={styles.tripBudget}>
                  <Text style={styles.budgetAmount}>{trip.budget}</Text>
                  <Text style={styles.budgetLabel}>Budget</Text>
                  <Ionicons name="chevron-forward" size={20} color="#8E8E93" style={styles.chevron} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        
        {/* Add Trip Card */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateTrip' as never)}
          activeOpacity={0.8}
        >
          <Card variant="default" padding="md" style={[styles.tripCard, styles.addTripCard]}>
            <View style={styles.addTripContent}>
              <View style={styles.addTripIcon}>
                <Ionicons name="add" size={32} color="#FF6B9D" />
              </View>
              <Text style={styles.addTripText}>Plan New Trip</Text>
              <Text style={styles.addTripSubtext}>Start planning your next adventure</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  filterButton: {
    marginRight: 12,
  },
  filterIcon: {
    marginLeft: 'auto',
  },
  tripsList: {
    flex: 1,
  },
  tripCard: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
    marginLeft: 16,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  tripBadge: {
    marginTop: 4,
  },
  tripBudget: {
    alignItems: 'flex-end',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  budgetLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  chevron: {
    marginTop: 4,
  },
  addTripCard: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#FF6B9D30',
    backgroundColor: '#FF6B9D05',
  },
  addTripContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  addTripIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FF6B9D15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addTripText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B9D',
    marginBottom: 4,
  },
  addTripSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});