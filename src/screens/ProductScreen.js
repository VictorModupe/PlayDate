import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ProductScreen() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = async () => {
    try {
      const uid = firebase.auth().currentUser.uid;
      await firestore().collection('products').add({
        productName,
        productPrice: parseFloat(productPrice),
        uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setProductName('');
      setProductPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Add Product</Text>
      <TextInput value={productName} onChangeText={setProductName} placeholder="Product Name" />
      <TextInput value={productPrice} onChangeText={setProductPrice} placeholder="Product Price" keyboardType="numeric" />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
}
