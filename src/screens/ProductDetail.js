
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ route,navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count} ratings)</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={() => {
            console.log('Product:', product);
            addToCart(product);
            navigation.navigate('Cart'); 
          }}
          color="#1e90ff"
        />
      </View>

    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    color: '#1e90ff',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
