import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const badgeStyles = [
    styles.base,
    styles[size],
    styles[variant],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text` as keyof typeof styles],
    styles[`${variant}Text` as keyof typeof styles],
    textStyle,
  ];

  return (
    <View style={badgeStyles}>
      <Text style={textStyles}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lg: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  
  // Variants
  default: {
    backgroundColor: '#F2F2F7',
  },
  primary: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
  },
  secondary: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  success: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  warning: {
    backgroundColor: 'rgba(255, 159, 10, 0.1)',
  },
  error: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 14,
  },
  
  // Text colors
  defaultText: {
    color: '#6B7280',
  },
  primaryText: {
    color: '#FF6B9D',
  },
  secondaryText: {
    color: '#8B5CF6',
  },
  successText: {
    color: '#34C759',
  },
  warningText: {
    color: '#FF9F0A',
  },
  errorText: {
    color: '#FF3B30',
  },
  outlineText: {
    color: '#6B7280',
  },
});