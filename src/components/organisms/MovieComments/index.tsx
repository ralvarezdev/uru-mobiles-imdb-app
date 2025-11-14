import React, { useState } from "react";
import { View, Text } from "react-native";
import CommentCard from "@/components/organisms/CommentCard";
import { AddCommentButton } from "@/components/molecules/AddCommentButton";
import { CommentFilters } from "@/components/molecules/CommentFilters";
import { styles } from "./style";

interface MovieComment {
  user: string;
  badge?: string;
  ago: string;
  rating: number;
  text: string;
}

interface MovieCommentsProps {
  comments: MovieComment[];
  commentCount: number;
  onAddComment: () => void;
}

export const MovieComments: React.FC<MovieCommentsProps> = ({ comments, commentCount, onAddComment }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredComments =
    activeFilter === "All"
      ? comments
      : activeFilter === "Users"
      ? comments.filter((c) => c.badge === "User")
      : comments.filter((c) => c.badge === "Critic");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <Text style={styles.count}>({commentCount.toLocaleString()})</Text>
      </View>

      <AddCommentButton onPress={onAddComment} />

      <CommentFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {filteredComments.map((comment, i) => (
        <CommentCard key={i} {...comment} />
      ))}
    </View>
  );
};

