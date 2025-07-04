import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Card, Badge } from '../components/ui';
import { Trip, calculateTripStats, formatDateRange, getCategoryIcon, getCategoryColor } from '../types/trip';

const { width } = Dimensions.get('window');

// Mock trip data for demonstration
const mockTrip: Trip = {
  id: '1',
  title: 'Summer Adventure in Japan',
  destination: 'Tokyo, Japan',
  startDate: new Date('2025-09-03'),
  endDate: new Date('2025-09-10'),
  description: 'An amazing journey through the bustling streets of Tokyo, experiencing traditional culture and modern technology.',
  budget: 3000,
  dailyBudget: 400,
  expenses: [],
  itinerary: [],
  participants: ['current_user'],
  isPublic: true,
  createdBy: 'current_user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

type TabType = 'overview' | 'itinerary' | 'budget' | 'explore';

export default function TripDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const trip = mockTrip; // In real app, get from route params or state
  const [selectedTab, setSelectedTab] = useState<TabType>('overview');
  const tripStats = calculateTripStats(trip);

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'itinerary', label: 'Itinerary' },
    { key: 'budget', label: 'Budget' },
    { key: 'explore', label: 'Explore' },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab trip={trip} stats={tripStats} />;
      case 'itinerary':
        return <ItineraryTab trip={trip} />;
      case 'budget':
        return <BudgetTab trip={trip} stats={tripStats} />;
      case 'explore':
        return <ExploreTab trip={trip} />;
      default:
        return <OverviewTab trip={trip} stats={tripStats} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TripHeader trip={trip} stats={tripStats} />
      
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => setSelectedTab(tab.key as TabType)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {selectedTab === tab.key && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}

// Header Component
function TripHeader({ trip, stats }: { trip: Trip; stats: any }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FF6B9D', '#8B5CF6']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Navigation */}
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Trip Info Card */}
        <View style={styles.tripInfoCard}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>{trip.title}</Text>
            
            <View style={styles.tripDetailRow}>
              <Ionicons name="location" size={16} color="white" />
              <Text style={styles.tripDetail}>{trip.destination}</Text>
            </View>
            
            <View style={styles.tripDetailRow}>
              <Ionicons name="calendar" size={16} color="white" />
              <Text style={styles.tripDetail}>
                {formatDateRange(trip.startDate, trip.endDate)}
              </Text>
            </View>
          </View>
          
          <View style={styles.durationBadge}>
            <Text style={styles.durationNumber}>{stats.duration}</Text>
            <Text style={styles.durationLabel}>days</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <StatItem icon="people" value={trip.participants.length.toString()} label="Travelers" />
        <View style={styles.statDivider} />
        <StatItem icon="card" value={`$${Math.round(stats.totalSpent)}`} label="Spent" />
        <View style={styles.statDivider} />
        <StatItem icon="list" value={trip.itinerary.length.toString()} label="Activities" />
      </View>
    </View>
  );
}

function StatItem({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statHeader}>
        <Ionicons name={icon as any} size={14} color="#FF6B9D" />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Tab Components
function OverviewTab({ trip, stats }: { trip: Trip; stats: any }) {
  return (
    <ScrollView style={styles.tabScrollView} showsVerticalScrollIndicator={false}>
      {/* Description */}
      {trip.description && (
        <Card variant="default" padding="md" style={styles.overviewCard}>
          <Text style={styles.cardTitle}>About This Trip</Text>
          <Text style={styles.description}>{trip.description}</Text>
        </Card>
      )}

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <StatCard title="Duration" value={`${stats.duration} days`} icon="calendar" color="#007AFF" />
        <StatCard title="Budget" value={`$${trip.budget}`} icon="card" color="#34C759" />
        <StatCard title="Expenses" value={`$${Math.round(stats.totalSpent)}`} icon="receipt" color="#FF9500" />
        <StatCard 
          title="Remaining" 
          value={`$${Math.round(stats.remainingBudget)}`} 
          icon="banknote" 
          color={stats.remainingBudget >= 0 ? "#34C759" : "#FF3B30"} 
        />
      </View>

      {/* Recent Activity */}
      <Card variant="default" padding="md" style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        {trip.itinerary.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#8E8E93" />
            <Text style={styles.emptyText}>No activities yet</Text>
            <Text style={styles.emptySubtext}>Add activities to your itinerary</Text>
          </View>
        ) : (
          <View>
            {trip.itinerary.slice(0, 5).map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

function ItineraryTab({ trip }: { trip: Trip }) {
  return (
    <ScrollView style={styles.tabScrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.itineraryHeader}>
        <Text style={styles.itineraryTitle}>Day by Day Itinerary</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      {trip.itinerary.length === 0 ? (
        <Card variant="default" padding="md" style={styles.overviewCard}>
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#8E8E93" />
            <Text style={styles.emptyTitle}>No Itinerary Yet</Text>
            <Text style={styles.emptySubtext}>Add activities to plan your perfect trip</Text>
            <Button variant="primary" size="md" style={styles.emptyButton}>
              Add First Activity
            </Button>
          </View>
        </Card>
      ) : (
        <View>
          {trip.itinerary.map((item) => (
            <ItineraryCard key={item.id} item={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function BudgetTab({ trip, stats }: { trip: Trip; stats: any }) {
  return (
    <ScrollView style={styles.tabScrollView} showsVerticalScrollIndicator={false}>
      {/* Budget Overview */}
      <Card variant="default" padding="md" style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Budget Overview</Text>
        <View style={styles.budgetStats}>
          <BudgetStat title="Budget" amount={trip.budget} color="#007AFF" />
          <BudgetStat title="Spent" amount={stats.totalSpent} color="#FF9500" />
          <BudgetStat 
            title="Remaining" 
            amount={stats.remainingBudget} 
            color={stats.remainingBudget >= 0 ? "#34C759" : "#FF3B30"} 
          />
        </View>
      </Card>

      {/* Add Expense Button */}
      <Button variant="primary" size="lg" style={styles.addExpenseButton}>
        Add Expense
      </Button>

      {/* Expenses List */}
      <Card variant="default" padding="md" style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Recent Expenses</Text>
        {trip.expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#8E8E93" />
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>Start tracking your spending</Text>
          </View>
        ) : (
          <View>
            {trip.expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

function ExploreTab({ trip }: { trip: Trip }) {
  const exploreCategories = [
    { title: 'Top Attractions', icon: 'star', color: '#FFD60A' },
    { title: 'Local Food', icon: 'restaurant', color: '#FF9500' },
    { title: 'Hotels', icon: 'bed', color: '#007AFF' },
    { title: 'Transportation', icon: 'car', color: '#34C759' },
    { title: 'Weather', icon: 'partly-sunny', color: '#00C7BE' },
    { title: 'Culture', icon: 'library', color: '#8B5CF6' },
  ];

  return (
    <ScrollView style={styles.tabScrollView} showsVerticalScrollIndicator={false}>
      <Text style={styles.exploreTitle}>Discover {trip.destination}</Text>
      
      <View style={styles.exploreGrid}>
        {exploreCategories.map((category) => (
          <TouchableOpacity key={category.title} style={styles.exploreCard}>
            <Ionicons name={category.icon as any} size={32} color={category.color} />
            <Text style={styles.exploreCardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Helper Components
function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  return (
    <Card variant="default" padding="md" style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={styles.statCardValue}>{value}</Text>
      <Text style={styles.statCardTitle}>{title}</Text>
    </Card>
  );
}

function BudgetStat({ title, amount, color }: { title: string; amount: number; color: string }) {
  return (
    <View style={styles.budgetStat}>
      <Text style={[styles.budgetAmount, { color }]}>${Math.round(amount)}</Text>
      <Text style={styles.budgetLabel}>{title}</Text>
    </View>
  );
}

function ActivityRow({ item }: { item: any }) {
  return (
    <View style={styles.activityRow}>
      <Ionicons name={getCategoryIcon(item.category) as any} size={20} color={getCategoryColor(item.category)} />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        {item.location && <Text style={styles.activityLocation}>{item.location}</Text>}
      </View>
      {item.cost && <Text style={styles.activityCost}>${Math.round(item.cost)}</Text>}
    </View>
  );
}

function ItineraryCard({ item }: { item: any }) {
  return (
    <Card variant="default" padding="md" style={styles.itineraryCard}>
      <View style={styles.itineraryRow}>
        <View style={styles.itineraryInfo}>
          <Text style={styles.itineraryTitle}>{item.title}</Text>
          {item.location && (
            <View style={styles.itineraryDetail}>
              <Ionicons name="location" size={12} color="#8E8E93" />
              <Text style={styles.itineraryDetailText}>{item.location}</Text>
            </View>
          )}
          {item.timeRange && (
            <View style={styles.itineraryDetail}>
              <Ionicons name="time" size={12} color="#8E8E93" />
              <Text style={styles.itineraryDetailText}>{item.timeRange}</Text>
            </View>
          )}
        </View>
        <View style={styles.itineraryMeta}>
          <Ionicons name={getCategoryIcon(item.category) as any} size={16} color={getCategoryColor(item.category)} />
          {item.cost && <Text style={styles.itineraryCost}>${Math.round(item.cost)}</Text>}
        </View>
      </View>
    </Card>
  );
}

function ExpenseRow({ expense }: { expense: any }) {
  return (
    <View style={styles.expenseRow}>
      <Ionicons name={getCategoryIcon(expense.category) as any} size={20} color={getCategoryColor(expense.category)} />
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseTitle}>{expense.title}</Text>
        <Text style={styles.expenseCategory}>{expense.category}</Text>
      </View>
      <Text style={styles.expenseAmount}>${expense.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    height: 280,
    paddingTop: 10,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tripInfoCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  tripDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDetail: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  durationBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  durationLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#FF6B9D',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '80%',
    backgroundColor: '#FF6B9D',
    borderRadius: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabScrollView: {
    flex: 1,
  },
  overviewCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 52) / 2,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  statCardTitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 12,
  },
  emptyButton: {
    marginTop: 16,
  },
  itineraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itineraryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 4,
  },
  itineraryCard: {
    marginBottom: 12,
  },
  itineraryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itineraryInfo: {
    flex: 1,
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  itineraryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  itineraryDetailText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  itineraryMeta: {
    alignItems: 'flex-end',
  },
  itineraryCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  budgetStat: {
    alignItems: 'center',
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  budgetLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  addExpenseButton: {
    marginBottom: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  activityLocation: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  activityCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  expenseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  expenseCategory: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  exploreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  exploreCard: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exploreCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 12,
    textAlign: 'center',
  },
});