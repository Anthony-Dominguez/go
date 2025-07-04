import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface AddScreenProps {
  onClose?: () => void;
  visible?: boolean;
}

export default function AddScreen({ onClose, visible = false }: AddScreenProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onClose?.();
    });
  };

  const handleTripPlan = () => {
    // Animate out and navigate directly
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      // Navigate to create trip screen without going back first
      navigation.navigate('CreateTrip' as never);
    });
  };

  const handlePost = () => {
    // Animate out and handle post action
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onClose?.();
      // TODO: Navigate to post creation screen when implemented
      console.log('Navigate to Post');
    });
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={closeModal}
    >
      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          activeOpacity={1} 
          onPress={closeModal}
        >
          {/* Action Buttons Container */}
          <Animated.View 
            style={[
              styles.actionsContainer,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            {/* Trip Plan Button */}
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleTripPlan}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FF6B9D', '#8B5CF6']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="map" size={28} color="white" />
              </LinearGradient>
              <Text style={styles.actionText}>Trip Plan</Text>
            </TouchableOpacity>

            {/* Plus Button (Center) */}
            <View style={styles.centerButton}>
              <LinearGradient
                colors={['#FF6B9D', '#8B5CF6']}
                style={styles.plusButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="add" size={32} color="white" />
              </LinearGradient>
            </View>

            {/* Post Button */}
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handlePost}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#34C759', '#007AFF']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="camera" size={28} color="white" />
              </LinearGradient>
              <Text style={styles.actionText}>Post</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Close instruction */}
          <Animated.View 
            style={[
              styles.instructionContainer,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <Text style={styles.instructionText}>Tap anywhere to close</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    zIndex: 5,
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 30,
    zIndex: 10,
  },
  actionGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  centerButton: {
    alignItems: 'center',
  },
  plusButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ rotate: '45deg' }],
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
  },
});