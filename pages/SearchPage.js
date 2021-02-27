// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState } from 'react';
import {
  SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Avatar, Button, Header, ListItem, SearchBar,
} from 'react-native-elements';
import { TabActions } from '@react-navigation/native';
import workbench from '../assets/Workbench.png';

const list = [{
  name: 'Workbench',
  avatar_url: workbench,
  type: 'Furniture',
},
];
const SecondPage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  return (

    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Search for items, materials..."
        value={search}
        onChangeText={(e) => setSearch(e)}
        style={{ width: '100%' }}
        lightTheme
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {
    list
      .filter((e) => e.name.toLowerCase().includes(search.toLocaleLowerCase()))
      .map((l, i) => (
        <ListItem key={i} bottomDivider onPress={(event) => navigation.dispatch(TabActions.jumpTo('ObjectPage', { name: l.name }))}>
          <Avatar source={l.avatar_url} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.type}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
  }
      </ScrollView>
    </View>

  );
};

export default SecondPage;
