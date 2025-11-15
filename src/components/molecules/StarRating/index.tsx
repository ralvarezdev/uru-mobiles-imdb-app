import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { convert10To5, getFullStars, hasHalfStar, getEmptyStars, roundToHalf } from "@/utils/ratingConverter";

interface StarRatingProps {
  rating: number; // Rating in 1-10 scale
  onRatingChange: (rating: number) => void; // Callback with rating in 1-10 scale
  error?: string;
  readonly?: boolean; // If true, stars are not clickable
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, error, readonly = false }) => {
  // Convert 1-10 scale to 1-5 scale for display
  const rating5 = convert10To5(rating);
  const roundedRating5 = roundToHalf(rating5);
  const fullStars = getFullStars(roundedRating5);
  const hasHalf = hasHalfStar(roundedRating5);

  const handleStarPress = (starIndex: number, isHalf: boolean) => {
    if (readonly) return;
    
    // starIndex is 0-based (0-4)
    // Convert to 1-10 scale: each star represents 2 points
    // Full star at index i = (i + 1) * 2
    // Half star at index i = (i + 0.5) * 2 = (i + 1) * 2 - 1
    const rating10 = isHalf ? (starIndex + 1) * 2 - 1 : (starIndex + 1) * 2;
    onRatingChange(rating10);
  };

  const getStarIcon = (starIndex: number): string => {
    if (starIndex < fullStars) {
      return "star";
    } else if (starIndex === fullStars && hasHalf) {
      return "star-half";
    } else {
      return "star-outline";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating</Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, i) => {
          const iconName = getStarIcon(i);
          
          return (
            <View key={`star-${i}`} style={styles.starButton}>
              <Ionicons 
                name={iconName as any} 
                size={32} 
                color="#ffb400" 
              />
              {!readonly && (
                <View style={styles.starTouchAreas} pointerEvents="box-none">
                  {/* Left half for half star */}
                  <TouchableOpacity
                    style={styles.starHalfLeft}
                    onPress={() => handleStarPress(i, true)}
                    activeOpacity={0.7}
                  />
                  {/* Right half for full star */}
                  <TouchableOpacity
                    style={styles.starHalfRight}
                    onPress={() => handleStarPress(i, false)}
                    activeOpacity={0.7}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
      {rating > 0 && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)} / 10 ({roundedRating5.toFixed(1)} / 5 stars)
        </Text>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

