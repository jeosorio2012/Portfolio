import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, CheckBox, TextInput, Button, Pressable, TouchableHighlight, Dimensions, Image} from 'react-native';
import { useState } from 'react';

export default function RecipeDetail({route, navigation}){
    return (
        <View>
            <Text>{route.params.name}</Text>
        </View>
    )
}