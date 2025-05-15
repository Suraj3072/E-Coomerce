import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const { cartItems, incrementQty, decrementQty, totalPrice } = useContext(CartContext);

 
  useEffect(() => {
    const readSavedCheckout = async () => {
      const saved = await AsyncStorage.getItem('CHECKOUT_CART');
      if (saved) {
        console.log('Saved checkout cart:', JSON.parse(saved));
      }
    };
    readSavedCheckout();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrementQty(item.id)}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQty(item.id)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          
          <View style={styles.total}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
<Button
  title="Checkout"
  onPress={async () => {
    try {
      await AsyncStorage.setItem('CHECKOUT_CART', JSON.stringify(cartItems));
      alert('Cart saved successfully');
    } catch (e) {
      console.error('Error saving checkout cart:', e);
    }
  }}
/>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    alignSelf: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  price: {
    color: '#1e90ff',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#1e90ff',
  },
  qty: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  total: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f8f8f8',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
