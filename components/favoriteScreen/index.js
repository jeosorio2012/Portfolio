import { StyleSheet, Text, View, FlatList, SafeAreaView, CheckBox, TextInput, Button, Pressable, TouchableHighlight, Dimensions, Image} from 'react-native';
import { useState } from 'react';

export default function Favorites({route, navigation}){
    const [search, setSearch]=useState("")
    const [data, setData]=useState(route.params.recipes)
    const [filteredData, setFilteredData]=useState(route.params.recipes)
    const clickRecipe = (item)=>{
      navigation.navigate("recipe", {"item":item,"data":data})
    }
    const itemView = ({item})=>{
      return (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={()=>clickRecipe(item)}>
          <View style={RecipeCard.container}>
           <Image style={RecipeCard.photo} source={require(`../../assets/images/${item.image}`)}/>
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
        <View style={styles.infoRecipeContainer}>
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
                </View>
        <FlatList data={filteredData} renderItem={itemView} vertical keyExtractor={(item)=>`${item.recipeId}`}/>
      </SafeAreaView>
    )
  };

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
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      category: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10,
        color: '#2cd18a'
      },
      infoRecipeContainer: {
        flex: 1,
        margin: 25,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
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