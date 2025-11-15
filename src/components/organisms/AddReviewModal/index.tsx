import React, { useState } from "react";
import { View } from "react-native";
import { Modal } from "@/components/atoms/Modal";
import { Button } from "@/components/atoms/Button";
import { StarRating } from "@/components/molecules/StarRating";
import { ReviewInput } from "@/components/molecules/ReviewInput";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";

interface FormErrors {
  rating: string;
  review: string;
}

interface AddReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => Promise<void>;
  submitting?: boolean;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  visible,
  onClose,
  onSubmit,
  submitting = false,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    rating: "",
    review: "",
  });

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      rating: "",
      review: "",
    };
    let errorMessage = "";

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Please select a rating between 1 and 5 stars";
      errorMessage = "Please select a rating between 1 and 5 stars";
      isValid = false;
    }

    if (review.trim().length > 1000) {
      newErrors.review = "Review must be 1000 characters or less";
      if (!errorMessage) errorMessage = "Review must be 1000 characters or less";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    await onSubmit(rating, review);
    // Reset form after successful submission
    setRating(0);
    setReview("");
    setErrors({ rating: "", review: "" });
  };

  const handleClose = () => {
    if (submitting) return;
    setRating(0);
    setReview("");
    setErrors({ rating: "", review: "" });
    onClose();
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (errors.rating) {
      setErrors({ ...errors, rating: "" });
    }
  };

  const handleReviewChange = (text: string) => {
    setReview(text);
    if (errors.review) {
      setErrors({ ...errors, review: "" });
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title="Add Review"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleClose} disabled={submitting} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Submit"
              variant="primary"
              onPress={handleSubmit}
              disabled={!review.trim() || rating === 0 || submitting}
              loading={submitting}
            />
          </View>
        </View>
      }>
      {submitting ? (
        <LoadingMessage message="Submitting review..." />
      ) : (
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <StarRating rating={rating} onRatingChange={handleRatingChange} error={errors.rating} />
          <ReviewInput value={review} onChangeText={handleReviewChange} error={errors.review} />
        </View>
      )}
    </Modal>
  );
};

