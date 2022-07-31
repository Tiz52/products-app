import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductsContext} from '../context/products/ProductsContext';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text style={styles.headerRightText}>Agregar</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'black',
  },
  productName: {
    fontSize: 20,
    color: '#888',
  },
  separator: {
    borderBottomWidth: 5,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerRightText: {
    color: '#888',
    fontSize: 16,
    marginRight: 10,
  },
});
