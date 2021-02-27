// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { SearchBar } from 'react-native-elements';
import {
  OBJECT_NAMES, ALL_OBJECTS_DATA,
} from '../data';
import workbench from '../assets/Workbench.png';

const INCREMENT_DECREMENT_DESIRE_BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  item_icon: {
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    marginRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },

  itemName: {
    flex: 1,
    flexWrap: 'wrap-reverse',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

function TabOneScreen(props) {
  const data = ALL_OBJECTS_DATA[props.route.params.name];
  const items = [
    { name: 'TURQUOISE', code: 2 },
    { name: 'EMERALD', code: 3 },
    { name: 'PETER RIVER', code: 4 },
    { name: 'AMETHYST', code: 5 },
  ];

  const [numDesired, setNumDesired] = React.useState(730);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item_icon}>
          <Image source={data.image} />
        </View>
        <Text style={styles.title}>
          Workbench (
          {numDesired}
          )
        </Text>
        <TouchableOpacity
          onPress={() => {
            setNumDesired(numDesired - 1);
          }}
          style={{ marginRight: 3 }}
        >
          <AntIcon
            name="minuscircleo"
            size={INCREMENT_DECREMENT_DESIRE_BUTTON_SIZE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumDesired(numDesired + 1);
          }}
        >
          <AntIcon
            name="pluscircleo"
            size={INCREMENT_DECREMENT_DESIRE_BUTTON_SIZE}
          />
        </TouchableOpacity>
      </View>
      <FlatGrid
        itemDimension={100}
        data={items}
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: '#3498db' }]}>
            <Image source={workbench} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
      />

    </View>
  );
}

export default TabOneScreen;
