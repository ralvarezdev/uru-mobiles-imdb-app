import React, { useState, useEffect } from "react";
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

interface EditReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => Promise<void>;
  initialRating: number;
  initialReview: string;
  submitting?: boolean;
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialRating,
  initialReview,
  submitting = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [errors, setErrors] = useState<FormErrors>({
    rating: "",
    review: "",
  });

  // Update form when initial values change
  useEffect(() => {
    setRating(initialRating);
    setReview(initialReview);
  }, [initialRating, initialReview, visible]);

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      rating: "",
      review: "",
    };
    let errorMessage = "";

    if (!rating || rating < 1 || rating > 10) {
      newErrors.rating = "Please select a rating between 1 and 10";
      errorMessage = "Please select a rating between 1 and 10";
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
  };

  const handleClose = () => {
    if (submitting) return;
    setRating(initialRating);
    setReview(initialReview);
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
      title="Edit Review"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleClose} disabled={submitting} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Update"
              variant="primary"
              onPress={handleSubmit}
              disabled={!review.trim() || rating === 0 || submitting}
              loading={submitting}
            />
          </View>
        </View>
      }>
      {submitting ? (
        <LoadingMessage message="Updating review..." />
      ) : (
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <StarRating rating={rating} onRatingChange={handleRatingChange} error={errors.rating} />
          <ReviewInput value={review} onChangeText={handleReviewChange} error={errors.review} />
        </View>
      )}
    </Modal>
  );
};

