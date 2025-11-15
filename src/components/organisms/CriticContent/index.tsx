// src/components/organisms/CriticModalContent.tsx
import React from 'react';
import { View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text';
import { styles } from './style';

export const CriticModalContent: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Icono principal */}
      <View style={styles.iconContainer}>
        <Ionicons name="ticket" size={54} color="#DF3D36" />
      </View>

      {/* Main Text */}
      <Text variant="body" style={styles.mainText}>
        By becoming a <Text style={styles.bold}>Verified Critic</Text> you will get:
      </Text>

      {/* Benefits List */}
      <View style={styles.benefitsList}>
        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" style={{ marginRight: 8 }} />
          <Text variant="body" style={styles.benefitText}>
            "Critic" badge on your profile
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" style={{ marginRight: 8 }} />
          <Text variant="body" style={styles.benefitText}>
            Your reviews appear in special section
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" style={{ marginRight: 8 }} />
          <Text variant="body" style={styles.benefitText}>
            Your ratings count as "Critic Ratings"
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" style={{ marginRight: 8 }} />
          <Text variant="body" style={styles.benefitText}>
            Greater visibility on the platform
          </Text>
        </View>
      </View>

      {/* Footer Note */}
      <Text variant="body" style={styles.footerText}>
        This change will be applied immediately
      </Text>
    </View>
  );
};
