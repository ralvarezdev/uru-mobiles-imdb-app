// src/components/organisms/CriticModalContent.tsx
import React from 'react';
import { View} from 'react-native';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text';
import { styles } from './style';

export const CriticModalContent: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Icono principal */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎭</Text>
      </View>

      {/* Main Text */}
      <Text variant="body" style={styles.mainText}>
        By becoming a <Text style={styles.bold}>Verified Critic</Text> you will get:
      </Text>

      {/* Benefits List */}
      <View style={styles.benefitsList}>
        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            "Critic" badge on your profile
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Your reviews appear in special section
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Your ratings count as "Critic Ratings"
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
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
