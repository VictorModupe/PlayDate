import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTotal } from '../store/cartSlice';
import { PaystackWebView } from 'react-native-paystack';

const Checkout = () => {
  const total = useSelector(selectTotal);

  const handlePayment = async () => {
    const reference = `ref-${Date.now()}`;
    
<PaystackWebView
  paystackKey="pk_test_e931fb74285fce7e6d10e4f26b9c97eb1c40a175"
  amount={total * 100}
  billingEmail="oluwamayowaadeoni@gmail.com"
  billingMobile="08123456789"
  billingName="John Doe"
  ActivityIndicatorColor="green"
  onCancel={(response) => {
    console.log(response);
  }}
  onSuccess={(response) => {
    console.log(response);
  }}
  autoStart={false}
  refNumber={reference}
/>
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Checkout Items</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{total} US$</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay with Paystack</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default Checkout;
