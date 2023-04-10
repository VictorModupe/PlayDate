import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { products } from './products';
import ProductItem from './ProductItem';

const ProductList = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} handleAddToCart={handleAddToCart} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cartItems })}>
        <Text style={styles.cartButtonText}>Cart ({cartItems.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  cartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductList;
