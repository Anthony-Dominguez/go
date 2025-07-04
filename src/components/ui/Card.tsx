import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  padding?: number | 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  variant = 'default',
  style,
  padding = 'md',
}: CardProps) {
  const getPaddingValue = () => {
    if (typeof padding === 'number') return padding;
    switch (padding) {
      case 'none': return 0;
      case 'sm': return 12;
      case 'md': return 16;
      case 'lg': return 20;
      default: return 16;
    }
  };

  const cardStyles = [
    styles.base,
    styles[variant],
    { padding: getPaddingValue() },
    style,
  ];

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  default: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  elevated: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  
  outlined: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  
  ghost: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowOpacity: 0,
    elevation: 0,
  },
});