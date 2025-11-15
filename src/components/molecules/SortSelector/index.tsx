import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { styles } from "./style";
import { SortBy } from "@ralvarezdev/proto-movies-ts";
import { Feather } from "@expo/vector-icons";

export interface SortSelectorProps {
  selected: SortBy | null;
  onSelect: (value: SortBy | null) => void;
}

interface SortOption {
  value: SortBy | null;
  label: string;
  emoji: string;
}

const sortOptions: SortOption[] = [
  { value: null, label: "Default", emoji: "🔀" },
  { value: SortBy.PRIMARY_RELEASE_DATE_DESC, label: "Newest", emoji: "📅" },
  { value: SortBy.PRIMARY_RELEASE_DATE_ASC, label: "Oldest", emoji: "📆" },
  { value: SortBy.VOTE_AVERAGE_DESC, label: "Highest Rated", emoji: "⭐" },
  { value: SortBy.VOTE_AVERAGE_ASC, label: "Lowest Rated", emoji: "📉" },
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
          <Text style={styles.selectorValue}>
            {selectedOption.emoji} {selectedOption.label}
          </Text>
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
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {option.emoji} {option.label}
                    </Text>
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

