//Imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, CheckBox, TextInput, Button, Pressable, TouchableHighlight, Dimensions, Image, ScrollView} from 'react-native';
import { useState } from 'react';
import LikeButton from "../favoriteButton/index"

//Recipe Detail screen
export default function RecipeDetail({route, navigation}){
    const [liked, setLiked] = useState(route.params.item.favorite)
    const setFavorite = (isFavorited)=>{
        setLiked(!liked)
        route.params.item.favorite=!liked
        const elementIndex = route.params.data.findIndex((element) => element.recipeId == route.params.item.recipeId);
        route.params.data[elementIndex].favorite = !liked;
    }
    const goToFavorites=()=>{
        var filtered = route.params.data.filter((element)=>element.favorite==true)
        navigation.navigate("favorite", {"recipes":filtered})
      }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.infoRecipeContainer}>
            <View style={styles.imageContainer}><Image style={styles.image} source={require(`../../assets/images/${route.params.item.image}`)}/></View>
                <Text style={styles.infoRecipeName}>{route.params.item.name}</Text>
                
                <View style={styles.infoContainer}>
                  <Text style={styles.infoDescriptionRecipe}>{route.params.item.description}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoDescriptionRecipe}>Ingredients: {route.params.item.ingredients}</Text>
                </View>
                <View>
                    <LikeButton liked={liked} setLiked={setFavorite}/>
                </View>
                <View style={styles.infoContainer}>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("home")
                    }
                  >
                    <Text style={styles.category}>
                      Home
                    </Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.infoContainer}>
                  <TouchableHighlight
                      onPress={goToFavorites}>
                    <Text style={styles.category}>
                      Favorite List
                    </Text>
                  </TouchableHighlight>
                 </View>
              </View>
              
        </ScrollView>
    )
}

const { width: viewportWidth } = Dimensions.get('window');

//Styles
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    },
    image: {
      width: '100%',
      height: 250
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      width: viewportWidth,
      height: 250
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      marginTop: 200
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0
    },
    infoRecipeContainer: {
      flex: 1,
      margin: 25,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    infoPhoto: {
      height: 20,
      width: 20,
      marginRight: 0
    },
    infoRecipe: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    category: {
      fontSize: 14,
      fontWeight: 'bold',
      margin: 10,
      color: '#2cd18a'
    },
    infoDescriptionRecipe: {
      textAlign: 'left',
      fontSize: 16,
      marginTop: 30,
      margin: 15
    },
    infoRecipeName: {
      fontSize: 28,
      margin: 20,
      marginTop:120,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
    }
  });