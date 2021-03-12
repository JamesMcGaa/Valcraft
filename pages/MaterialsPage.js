import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Badge, ListItem,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ALL_OBJECTS_DATA } from '../data';

function Material({ name, value, navigation }) {
  return (
    <ListItem
      key={name}
      bottomDivider
      onPress={() => navigation.navigate('ObjectPage', { name })}
    >
      <Avatar source={ALL_OBJECTS_DATA[name].image} />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
      </ListItem.Content>
      <Badge value={value} status="primary" />
    </ListItem>
  );
}

function setOrIncrement(obj, key, val) {
  if (val === 0) {
    return;
  }
  if (!(key in obj)) {
    obj[key] = 0;
  }
  obj[key] += val;
}

function MaterialsPage({ navigation }) {
  const [materials, setMaterials] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          const newMaterials = {};
          stores.forEach((value) => {
            const name = value[0];
            const count = parseInt(value[1], 10);
            const { recipe } = ALL_OBJECTS_DATA[name];
            if (count !== 0) {
              if (recipe === '') {
                setOrIncrement(newMaterials, name, count);
              } else {
                recipe.forEach((element) => {
                  setOrIncrement(newMaterials, element.name, count * element.quantity);
                });
              }
            }
          });
          setMaterials(newMaterials);
        });
      });
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {Object.keys(materials)
          .map((name) => <Material name={name} value={materials[name]} key={name} navigation={navigation} />)}
      </ScrollView>
    </View>
  );
}

export default MaterialsPage;
