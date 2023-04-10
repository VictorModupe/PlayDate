import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, handleAddToCart }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleAddToCart(product)}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    color: '#AAAAAA',
  },
});

export default ProductItem;
