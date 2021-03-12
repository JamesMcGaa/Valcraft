// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabActions, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import {
  Avatar, Badge, Card, Icon, Input, ListItem, Text,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from 'react-navigation';
import { ALL_OBJECTS_DATA } from '../data';

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

async function storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val.toString());
  } catch (error) {
    console.log(error);
  }
}

async function retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return '0';
}

function Material({ name, value, navigation }) {
  return (
    <ListItem
      key={name}
      bottomDivider
      onPress={() => navigation.dispatch(StackActions.push('ObjectPage', { name }))}
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
