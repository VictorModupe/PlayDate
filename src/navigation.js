import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";
import {FontAwesome5} from '@expo/vector-icons'
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import ViewProductScreen from './screens/ViewProductScreen';
import CreatePlaydateScreen from './screens/CreatePlaydateScreen';
import JoinPlaydateScreen from './screens/JoinPlaydateScreen';
import PlaydateScreen from './screens/PlaydateScreen';
import PushNotificationScreen from './screens/PushNotificationScreen';
import ProductList from './components/ProductList';
import CheckoutScreen from './screens/CheckoutScreen';
import React from "react";



const Stack = createNativeStackNavigator();

const Navigation = () => {
    const numberOfItems = useSelector(selectNumberOfItems)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        contentStyle: {
            backgroundColor: "white"
        }
      }}>
        <Stack.Screen name="Products" component={ProductsScreen} 
        options={ ({navigation}) => ( {headerRight:() =>
         <Pressable onPress={() => navigation.navigate('Cart')} style={{flexDirection: 'row'}}>
            <FontAwesome5 name="shopping-cart" size={18} color="gray"/>
            <Text style={{marginLeft: 5, fontVariant:'500'}}>{numberOfItems}</Text>
        </Pressable>})}/>
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />

        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} /> 
          <Stack.Screen name="CreatePlaydate" component={CreatePlaydateScreen} options={{ title: 'Create Playdate' }} />
          <Stack.Screen name="JoinPlaydate" component={JoinPlaydateScreen} options={{ title: 'Join Playdate' }} />
          <Stack.Screen name="CreateProduct" component={CreateProductScreen} options={{ title: 'Create Product' }} />
          <Stack.Screen name="ProductScreen" component={ViewProductScreen} options={{ title: 'View Product' }} />
          <Stack.Screen name="Playdates" component={PlaydateScreen} options={{ title: 'Playdates' }} />
          <Stack.Screen name="PushNotification" component={PushNotificationScreen} options={{ title: 'Push Notification' }} />
          <Stack.Screen name="ProductList" component={ProductList} />
         {/* <Stack.Screen name="Cart" component={Cart} /> */}
         <Stack.Screen name="Order" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
