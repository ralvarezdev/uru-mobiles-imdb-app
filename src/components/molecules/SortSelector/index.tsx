import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { styles } from "./style";
import { SortBy } from "@ralvarezdev/proto-movies-ts";
import { Feather, Ionicons } from "@expo/vector-icons";

export interface SortSelectorProps {
  selected: SortBy | null;
  onSelect: (value: SortBy | null) => void;
}

interface SortOption {
  value: SortBy | null;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const sortOptions: SortOption[] = [
  { value: null, label: "Default", icon: "shuffle" },
  { value: SortBy.PRIMARY_RELEASE_DATE_DESC, label: "Newest", icon: "calendar" },
  { value: SortBy.PRIMARY_RELEASE_DATE_ASC, label: "Oldest", icon: "calendar-outline" },
  { value: SortBy.VOTE_AVERAGE_DESC, label: "Highest Rated", icon: "star" },
  { value: SortBy.VOTE_AVERAGE_ASC, label: "Lowest Rated", icon: "star-outline" },
];

export const SortSelector = ({ selected, onSelect }: SortSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = sortOptions.find((opt) => opt.value === selected) || sortOptions[0];

  const handleSelect = (value: SortBy | null) => {
    onSelect(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectorButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
        <View style={styles.selectorContent}>
          <Text style={styles.selectorLabel}>Sort by:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Ionicons name={selectedOption.icon} size={16} color="#0f1724" style={{ marginRight: 6 }} />
            <Text style={styles.selectorValue}>{selectedOption.label}</Text>
          </View>
          <Feather name="chevron-down" size={18} color="#64748b" />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort by</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            <View style={styles.optionsList}>
              {sortOptions.map((option) => {
                const isSelected = selected === option.value;
                return (
                  <TouchableOpacity
                    key={option.value ?? "default"}
                    style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                      <Ionicons name={option.icon} size={18} color={isSelected ? "#DF3D36" : "#0f1724"} style={{ marginRight: 8 }} />
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option.label}</Text>
                    </View>
                    {isSelected && <Feather name="check" size={20} color="#DF3D36" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

