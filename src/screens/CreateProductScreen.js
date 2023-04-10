import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { db, auth, storage } from '../../firebase';

function CreateProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);


  const handleCreateProduct = async () => {
    const response = await fetch(image.assets[0].uri);
    const blob = await response.blob();

    const metadata = { contentType: 'image/jpeg' };
    const imageRef = storage.ref().child(`images/${uuidv4()}`);
    const snapshot = await imageRef.put(blob, metadata);
    const imageURL = await snapshot.ref.getDownloadURL();

    db.collection('products').add({
      name,
      price,
      image: imageURL,
      seller: auth.currentUser.uid,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 30 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Create a Product</Text>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Product Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Product Price"
        onChangeText={(text) => setPrice(text)}
        value={price}
      />
      {image ? (
        <Image
          source={{ uri: image.assets[0].uri }}
          style={{ width: 300, height: 300, marginBottom: 10 }}
        />
      ) : (
        <Button title="Choose image" onPress={pickImage} />
      )}
      <Button title="Create Product" onPress={handleCreateProduct} />
    </View>
  );
}

export default CreateProductScreen;
