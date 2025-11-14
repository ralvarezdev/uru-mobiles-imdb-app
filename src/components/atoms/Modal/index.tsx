// src/components/molecules/Modal.tsx
import React from "react";
import { Text } from "@/components/atoms/Text";
import { Modal as RNModal, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { styles } from "./style";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, footer, showCloseButton = true }) => {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.overlayPressable} onPress={onClose}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
            <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                {/* Header */}
                {title && (
                  <View style={styles.header}>
                    <View style={styles.titleContainer}>
                      <Text variant="title" style={styles.title}>
                        {title}
                      </Text>
                    </View>
                    {showCloseButton && (
                      <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                        <Text style={styles.closeButtonText}>×</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {/* Body */}
                <ScrollView
                  style={styles.body}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{ paddingBottom: 10 }}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                  bounces={true}
                  alwaysBounceVertical={false}>
                  {children}
                </ScrollView>

                {/* Footer */}
                {footer && <View style={styles.footer}>{footer}</View>}
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </View>
    </RNModal>
  );
};
