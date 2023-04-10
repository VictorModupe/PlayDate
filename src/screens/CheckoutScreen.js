import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import PaystackWebView from 'react-native-paystack-webview';

const CheckoutScreen = () => {
    console.log('CheckoutScreen mounted');

  const [showPaystack, setShowPaystack] = useState(false);

  const handlePay = () => {
    setShowPaystack(true);
  };

  const handleSuccess = async (response) => {
    try {
      console.log(response);
      // Handle successful payment here
      setShowPaystack(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClose = () => {
    setShowPaystack(false);
  };
  return (
    <View>
      <Text>Checkout Screen</Text>
      <Button title="Pay with Paystack" onPress={handlePay} />
    
      {/* <Modal visible={showPaystack} animationType="slide">
        <View style={{ flex: 1 }}>
          <PaystackWebView
            paystackKey="pk_test_e931fb74285fce7e6d10e4f26b9c97eb1c40a175"
            amount={10000}
            billingEmail="oluwamayowaadeoni@gmail.com"
            billingMobile="08123456789"
            billingName="John Doe"
            ActivityIndicatorColor="green"
            onCancel={handleClose}
            onSuccess={handleSuccess}
            autoStart={false}
          />
          <Button title="Close" onPress={handleClose} />
        </View>
      </Modal> */}
    </View>
  );
};

export default CheckoutScreen;
