import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/cartContext';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
        <Text style={{ color: 'grey' }}>{item.quantity} x ${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginBottom: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total:</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={handleCheckout} style={{ backgroundColor: 'green', paddingVertical: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ fontSize: 18 }}>Your cart is empty</Text>
      )}
    </View>
  );
};

export default Cart;
