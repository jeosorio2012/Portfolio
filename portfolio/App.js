import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, CheckBox, TextInput, Button, Pressable, TouchableHighlight, Dimensions, Image} from 'react-native';
import RecipeDetail from "./components/detailScreen/index"
//import Summary from "./components/summary/index"
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import recipes from "./recipes.json"


const Stack = createNativeStackNavigator();
function Home({navigation}){
  const [search, setSearch]=useState("")
  const [data, setData]=useState(recipes)
  const [filteredData, setFilteredData]=useState(recipes)
  const clickRecipe = (item)=>{
    navigation.navigate("recipe", {...item})
  }
  const itemView = ({item})=>{
    return (
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={()=>clickRecipe(item)}>
        <View style={RecipeCard.container}>
         <Image style={RecipeCard.photo} source={require(`./assets/images/${item.image}`)} />
         <Text style={RecipeCard.title}>{item.name}</Text><br></br>
        </View>
      </TouchableHighlight>
    )
  }

const searchFilter = (text)=>{
  if(text){
    const newData = data.filter(function (item){
      var upperTitle = item.name.toUpperCase()
      return upperTitle.indexOf(text.toUpperCase())>-1
    } )
    setFilteredData(newData)
    setSearch(text)
  }else{
    setFilteredData(data)
    setSearch(text)
  }
}

  return (
    <SafeAreaView>
      <TextInput style={styles.textInputStyle} value={search} placeholder='Search Recipes' onChangeText={(text)=>searchFilter(text)}/>
      <FlatList data={filteredData} renderItem={itemView} vertical keyExtractor={(item)=>`${item.recipeId}`}/>
    </SafeAreaView>
  )
};

export default function App() {
  return (
    <NavigationContainer><Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="home" component={Home}/>
    <Stack.Screen name="recipe" component={RecipeDetail}/>
    </Stack.Navigator></NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  }
});

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 1;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const RecipeCard = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: RECIPE_ITEM_MARGIN,
      marginTop: 20,
      width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
      height: RECIPE_ITEM_HEIGHT + 75,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 15
    },
    title: {
      flex: 1,
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#444444',
      marginTop: 3,
      marginRight: 5,
      marginLeft: 5,
    },
    photo: {
      width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
      height: RECIPE_ITEM_HEIGHT,
      borderRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
  });

  