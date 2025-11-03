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

      {/* Texto principal */}
      <Text variant="body" style={styles.mainText}>
        Al convertirte en <Text style={styles.bold}>Crítico Verificado</Text> obtendrás:
      </Text>

      {/* Lista de beneficios */}
      <View style={styles.benefitsList}>
        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Badge de "Crítico" en tu perfil
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Tus reseñas aparecen en sección especial
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Tus ratings cuentan como "Rating de Críticos"
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✅</Text>
          <Text variant="body" style={styles.benefitText}>
            Mayor visibilidad en la plataforma
          </Text>
        </View>
      </View>

      {/* Nota final */}
      <Text variant="body" style={styles.footerText}>
        Este cambio se aplicará inmediatamente
      </Text>
    </View>
  );
};
