import { View, Image, StyleSheet, FlatList, Pressable } from "react-native";
import products from "../data/products";
import { useNavigation } from "@react-navigation/native";
import {useSelector, useDispatch} from 'react-redux'
import { productsSlice } from "../store/productsSlice";
 
const ProductsScreen = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)

  const navigation = useNavigation()
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable onPress={() =>  {
          dispatch(productsSlice.actions.setSelectedProduct(item.id));
          navigation.navigate('Product Details')} 

         }

        style={styles.itemContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />  
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },

  itemContainer: {
    width: "50%",
    aspectRatio: 1,
  },
});

export default ProductsScreen;
