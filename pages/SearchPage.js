// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import { TabActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, ListItem, SearchBar,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ALL_OBJECTS_DATA } from '../data';

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
        {Object.keys(ALL_OBJECTS_DATA)
          .filter((objectName) => objectName.toLowerCase().includes(search.toLocaleLowerCase()))
          .map((name) => (
            <ListItem
              key={name}
              bottomDivider
              onPress={() => navigation.dispatch(TabActions.jumpTo('ObjectPage', { name }))}
            >
              <Avatar source={ALL_OBJECTS_DATA[name].image} />
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle>{ALL_OBJECTS_DATA[name].type}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
      </ScrollView>
    </View>

  );
};

export default SecondPage;
