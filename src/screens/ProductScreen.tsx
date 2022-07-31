import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';
import {ProductsContext} from '../context/products';
import {useForm} from '../hooks/useForm';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;
  const {categories} = useCategories();
  const {loadProductById, addProduct, updateProduct, uploadImage} =
    useContext(ProductsContext);

  const {_id, categoriaID, nombre, img, onChange, setFormValue} = useForm({
    _id: id,
    categoriaID: '',
    nombre: name,
    img: '',
  });

  const [tempUri, setTempUri] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nuevo producto',
      headerStyle: {
        backgroundColor: '#5856D6',
      },
      headerTitleStyle: {
        color: 'white',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProduct = async () => {
    if (id) {
      const product = await loadProductById(id);
      setFormValue({
        _id: id,
        categoriaID: product.categoria._id,
        nombre: name,
        img: product.img || '',
      });
    }
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaID, nombre, _id);
    } else {
      const tempCategoriaId = categoriaID || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (!response.assets) {
          return;
        }
        if (!response.assets[0].uri) {
          return;
        }
        setTempUri(response.assets[0].uri);
        uploadImage(response, _id);
      },
    );
  };

  const takePhotoFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (!response.assets) {
          return;
        }
        if (!response.assets[0].uri) {
          return;
        }
        setTempUri(response.assets[0].uri);
        uploadImage(response, _id);
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto: </Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={text => onChange(text, 'nombre')}
        />
        <Text style={styles.label}>Categoria: </Text>
        <Picker
          selectedValue={categoriaID}
          onValueChange={(itemValue, _) => onChange(itemValue, 'categoriaID')}>
          {categories.map(category => (
            <Picker.Item
              key={category._id}
              label={category.nombre}
              value={category._id}
            />
          ))}
        </Picker>
        <Button title="Guardar" onPress={saveOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <View style={styles.btnWrapper}>
            <Button title="Cámara" onPress={takePhoto} color="#5856D6" />
            <View style={styles.separator} />
            <Button
              title="Galeria"
              onPress={takePhotoFromLibrary}
              color="#5856D6"
            />
          </View>
        )}
        {img.length > 0 && !tempUri && (
          <Image source={{uri: img}} style={styles.img} />
        )}
        {tempUri.length > 0 && (
          <Image source={{uri: tempUri}} style={styles.img} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  label: {
    fontSize: 18,
    color: '#888',
  },
  textInput: {
    marginTop: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginBottom: 10,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    width: 10,
  },
  img: {
    width: '100%',
    height: 300,
  },
});
