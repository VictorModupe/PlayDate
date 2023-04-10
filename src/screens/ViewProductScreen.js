import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../../firebase';

function ViewProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    firebase.database().ref('/products').on('value', snapshot => {
      const data = snapshot.val();
      const productList = Object.entries(data).map(item => {
        const [id, product] = item;
        return { id, ...product };
      });
      setProducts(productList);
    });
  }, []);

  const handleAddToCart = (product) => {
    // Implement your cart logic here
    console.log('Added to cart:', product.name);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}>
      <Image style={styles.productImage} source={{ uri: item.image }} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewProductScreen;
