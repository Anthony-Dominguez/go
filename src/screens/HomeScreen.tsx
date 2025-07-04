import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Input, Badge } from '../components/ui';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Apple User</Text>
          </View>
          <View style={styles.profileContainer}>
            <LinearGradient
              colors={['#FF6B9D', '#8B5CF6']}
              style={styles.profileAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.avatarText}>A</Text>
            </LinearGradient>
          </View>
        </View>

        {/* GO Branding */}
        <View style={styles.brandingSection}>
          <View style={styles.brandingContainer}>
            <LinearGradient
              colors={['#FF6B9D', '#8B5CF6']}
              style={styles.goTextGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.goText}>GO</Text>
            </LinearGradient>
            <Text style={styles.anywhereText}>Anywhere</Text>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Where do you want to go?"
            value={searchText}
            onChangeText={setSearchText}
            leftIcon="search"
            variant="default"
            style={styles.searchInput}
          />

          {/* Quick Action Buttons */}
          <View style={styles.quickActions}>
            <Button
              variant="ghost"
              size="md"
              icon="add-circle"
              style={styles.actionButton}
              onPress={() => navigation.navigate('CreateTrip' as never)}
            >
              Plan Trip
            </Button>
            <Button
              variant="ghost"
              size="md"
              icon="globe-outline"
              style={styles.actionButton}
            >
              Explore
            </Button>
            <Button
              variant="ghost"
              size="md"
              icon="location"
              style={styles.actionButton}
            >
              Nearby
            </Button>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Card variant="default" padding="md" style={styles.statCard}>
            <Ionicons name="airplane" size={24} color="#FF6B9D" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </Card>
          <Card variant="default" padding="md" style={styles.statCard}>
            <Ionicons name="calendar-outline" size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </Card>
          <Card variant="default" padding="md" style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#34C759" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
        </View>

        {/* Upcoming Adventures */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Adventures</Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate('Trips')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity 
              onPress={() => (navigation as any).navigate('TripDetails', { tripId: '1' })}
              activeOpacity={0.8}
            >
              <Card variant="elevated" padding="none" style={styles.tripCard}>
                <LinearGradient
                  colors={['#FF6B9D', '#8B5CF6']}
                  style={styles.tripCardImage}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="airplane" size={30} color="white" />
                </LinearGradient>
                <View style={styles.tripCardContent}>
                  <Text style={styles.tripTitle}>DR</Text>
                  <Text style={styles.tripSubtitle}>DR</Text>
                  <Text style={styles.tripDate}>Aug 11, 2025 - Aug 25, 2025</Text>
                  <Badge variant="warning" size="sm" style={styles.tripBadge}>
                    In 38 days
                  </Badge>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => (navigation as any).navigate('TripDetails', { tripId: '2' })}
              activeOpacity={0.8}
            >
              <Card variant="elevated" padding="none" style={styles.tripCard}>
                <LinearGradient
                  colors={['#FF6B9D', '#8B5CF6']}
                  style={styles.tripCardImage}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="airplane" size={30} color="white" />
                </LinearGradient>
                <View style={styles.tripCardContent}>
                  <Text style={styles.tripTitle}>Summer Adventure in Japan</Text>
                  <Text style={styles.tripSubtitle}>Tokyo, Japan</Text>
                  <Text style={styles.tripDate}>Sep 3, 2025</Text>
                  <Badge variant="primary" size="sm" style={styles.tripBadge}>
                    In 61 days
                  </Badge>
                </View>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Memories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Memories</Text>
          <TouchableOpacity 
            onPress={() => (navigation as any).navigate('TripDetails', { tripId: '3' })}
            activeOpacity={0.8}
          >
            <Card variant="default" padding="md" style={styles.memoryCard}>
              <View style={styles.memoryRow}>
                <LinearGradient
                  colors={['#FF6B9D', '#8B5CF6']}
                  style={styles.memoryImage}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="camera" size={24} color="white" />
                </LinearGradient>
                <View style={styles.memoryContent}>
                  <Text style={styles.memoryTitle}>Bali Retreat</Text>
                  <Text style={styles.memorySubtitle}>Bali, Indonesia</Text>
                  <Text style={styles.memoryDate}>Jun 3, 2025 - Jun 10, 2025</Text>
                  <Badge variant="success" size="sm" style={styles.memoryBadge}>
                    Completed
                  </Badge>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </View>
            </Card>
          </TouchableOpacity>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '400',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  profileContainer: {
    marginTop: 5,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  brandingSection: {
    marginBottom: 30,
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goTextGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  goText: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
  },
  anywhereText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8E8E93',
    marginLeft: 10,
    marginTop: 8,
  },
  searchSection: {
    marginBottom: 30,
  },
  searchInput: {
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  tripCard: {
    width: 200,
    marginRight: 16,
  },
  tripCardImage: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripCardContent: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  tripSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  tripBadge: {
    marginTop: 4,
  },
  memoryCard: {
    // Card component handles styling
  },
  memoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memoryContent: {
    flex: 1,
    marginLeft: 16,
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  memorySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  memoryDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  memoryBadge: {
    marginTop: 4,
  },
});