// Trip Management Types

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  budget: number;
  dailyBudget?: number;
  expenses: Expense[];
  itinerary: ItineraryItem[];
  participants: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  paidBy: string;
  splitBetween: string[];
  notes?: string;
  receiptImageURL?: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  location?: string;
  category: ItineraryCategory;
  isCompleted: boolean;
  notes?: string;
  imageURL?: string;
  cost?: number;
}

export enum ExpenseCategory {
  ACCOMMODATION = 'Accommodation',
  TRANSPORTATION = 'Transportation',
  FOOD = 'Food & Drinks',
  ACTIVITIES = 'Activities',
  SHOPPING = 'Shopping',
  OTHER = 'Other',
}

export enum ItineraryCategory {
  FLIGHT = 'Flight',
  ACCOMMODATION = 'Accommodation',
  ACTIVITY = 'Activity',
  RESTAURANT = 'Restaurant',
  TRANSPORTATION = 'Transportation',
  MEETING = 'Meeting',
  OTHER = 'Other',
}

export interface TripStats {
  duration: number;
  totalExpenses: number;
  totalItineraryCosts: number;
  totalSpent: number;
  remainingBudget: number;
}

// Helper functions
export const calculateTripStats = (trip: Trip): TripStats => {
  const duration = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalItineraryCosts = trip.itinerary.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalSpent = totalExpenses + totalItineraryCosts;
  const remainingBudget = trip.budget - totalSpent;

  return {
    duration,
    totalExpenses,
    totalItineraryCosts,
    totalSpent,
    remainingBudget,
  };
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const formatter = new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
};

export const getCategoryIcon = (category: ExpenseCategory | ItineraryCategory): string => {
  const iconMap = {
    // Expense categories
    [ExpenseCategory.ACCOMMODATION]: 'bed',
    [ExpenseCategory.TRANSPORTATION]: 'airplane',
    [ExpenseCategory.FOOD]: 'restaurant',
    [ExpenseCategory.ACTIVITIES]: 'ticket',
    [ExpenseCategory.SHOPPING]: 'bag',
    [ExpenseCategory.OTHER]: 'ellipsis-horizontal',
    
    // Itinerary categories
    [ItineraryCategory.FLIGHT]: 'airplane',
    [ItineraryCategory.ACCOMMODATION]: 'bed',
    [ItineraryCategory.ACTIVITY]: 'walk',
    [ItineraryCategory.RESTAURANT]: 'restaurant',
    [ItineraryCategory.TRANSPORTATION]: 'car',
    [ItineraryCategory.MEETING]: 'people',
    [ItineraryCategory.OTHER]: 'calendar',
  };
  
  return iconMap[category] || 'help';
};

export const getCategoryColor = (category: ExpenseCategory | ItineraryCategory): string => {
  const colorMap = {
    // Expense categories
    [ExpenseCategory.ACCOMMODATION]: '#007AFF',
    [ExpenseCategory.TRANSPORTATION]: '#34C759',
    [ExpenseCategory.FOOD]: '#FF9500',
    [ExpenseCategory.ACTIVITIES]: '#8B5CF6',
    [ExpenseCategory.SHOPPING]: '#FF6B9D',
    [ExpenseCategory.OTHER]: '#8E8E93',
    
    // Itinerary categories
    [ItineraryCategory.FLIGHT]: '#007AFF',
    [ItineraryCategory.ACCOMMODATION]: '#8B5CF6',
    [ItineraryCategory.ACTIVITY]: '#34C759',
    [ItineraryCategory.RESTAURANT]: '#FF9500',
    [ItineraryCategory.TRANSPORTATION]: '#8E8E93',
    [ItineraryCategory.MEETING]: '#FF3B30',
    [ItineraryCategory.OTHER]: '#8E8E93',
  };
  
  return colorMap[category] || '#8E8E93';
};