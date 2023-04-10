import {  Text, FlatList, StyleSheet, View, Pressable, TouchableOpacity   } from 'react-native';
import CartListItem from '../components/CartListItem';
import { useSelector } from 'react-redux';
import { selectDeliveryPrice, selectSubtotal, selectTotal } from '../store/cartSlice';

const ShoppingCartTotal =  () => {
    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const total = useSelector(selectTotal)

    


    return(
    <View style={styles.totalContainer}>
        <View style={styles.row}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>{subtotal} US$</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.text}>Delivery  </Text>
            <Text style={styles.text}>{deliveryFee} US$</Text>

        </View>

        <View style={styles.row}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>{total}US$</Text>

        </View>
    </View>

    ) 
}

const ShoppingCart = ({navigation}) => {

    const cartItems = useSelector(state => state.cart.items)
    const handleCheckout = () => {
        navigation.navigate('Order');
      };


    return (

        <>
        

        <FlatList
        data={cartItems} 
        renderItem={({item}) => <CartListItem cartItem={item} /> }
        ListFooterComponent={ShoppingCartTotal}

        />


        <TouchableOpacity style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>


    {/* <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
    </Pressable> */}
    </>
  )
}; 

const styles = StyleSheet.create({
    totalContainer: {
        margin  : 20,
        borderColor: 'gainsboro',
        borderTopWidth: 1,

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    text: {
        fontSize: 16,
        color: 'gray',   
    },

    textBold: {
        fontSize: 16,
        fontWeight: '500'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'

    },

    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    }
}) 


export default ShoppingCart 

