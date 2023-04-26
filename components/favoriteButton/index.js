import React, { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function LikeButton (props) {

  return (
    <Pressable onPress={() => props.setLiked((isLiked) => !isLiked)}>
      <MaterialCommunityIcons
        name={props.liked ? "heart" : "heart-outline"}
        size={32}
        color={props.liked ? "red" : "black"}
      />
    </Pressable>
  );
};