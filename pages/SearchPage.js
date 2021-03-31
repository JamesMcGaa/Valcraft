import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Icon, ListItem, SearchBar,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ALL_OBJECTS_DATA } from '../data';

const SEARCH_RESULTS_COUNT_LIMIT = 25;

function SeeMoreResult(navigation) {
  return (
    <ListItem
      key="see more"
      bottomDivider
      disabled
      disabledStyle={{ backgroundColor: 'rgb(225, 232, 238)' }}
    >
      <Icon
        name="search"
        type="evilicon"
        size={40}
        onPress={() => navigation.openDrawer()}
      />
      <ListItem.Content>
        <ListItem.Title>Search to see more!</ListItem.Title>
        <ListItem.Subtitle>...</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const SearchPage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const filtered = Object.keys(ALL_OBJECTS_DATA)
    .filter((objectName) => objectName.toLowerCase().includes(search.toLocaleLowerCase()));
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
        {filtered
          .slice(0, SEARCH_RESULTS_COUNT_LIMIT)
          .map((name) => (
            <ListItem
              key={name}
              bottomDivider
              onPress={() => navigation.navigate('ObjectPage', { name })}
            >
              <Avatar source={ALL_OBJECTS_DATA[name].image} />
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle>{ALL_OBJECTS_DATA[name].type}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        {filtered.length > SEARCH_RESULTS_COUNT_LIMIT ? SeeMoreResult(navigation) : null}
      </ScrollView>
    </View>
  );
};

export default SearchPage;
