import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  ScrollView, StyleSheet,
  TextInput,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginTop: 40,
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});

const CustomSidebarMenu = (props) => {
  const BASE_PATH = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="never"
    >
      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />
      <SearchBar />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TextInput keyboardType="numeric" />
    </ScrollView>
  );
};

export default CustomSidebarMenu;
