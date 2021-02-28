// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Avatar, Badge, Card, ListItem, SearchBar,
} from 'react-native-elements';
import { TabActions } from '@react-navigation/native';
import {
  OBJECT_NAMES, ALL_OBJECTS_DATA,
} from '../data';

const INCREMENT_DECREMENT_DESIRE_BUTTON_SIZE = 40;

const styles = StyleSheet.create({

});

const SUBSECTION_KEYS = Object.freeze({
  FUNDAMENTAL: 'FUNDAMENTAL',
  RECIPE: 'RECIPE',
});

function handle(key, data, subsections, navigation) {
  console.log('handle', key, data[key]);
  if (data[key] !== '') { // CSV to JSON exports these as nonnull
    switch (key) {
      case 'recipe':
        console.log('recip');
        renderRecipe(data, subsections, navigation);
        break;
      default:
        break;
    }
  }
}

function renderFundamentalSubsection(data) {
  return (
    <Card key={SUBSECTION_KEYS.FUNDAMENTAL}>
      <Card.Title h4>{data.name}</Card.Title>
      <Card.Divider />
      <View>
        <Image
          source={data.image}
          style={{
            width: 64, height: 64, alignSelf: 'center',
          }}
        />
        <Badge
          status="primary"
          containerStyle={{ alignSelf: 'center', top: -16, right: -4 }}
          value={730}
        />
      </View>
      <Text style={{ fontWeight: 'bold' }}>
        {'Type: '}
        {data.type}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {data.description}
      </Text>
    </Card>
  );
}

function renderRecipe(data, subsections, navigation) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.RECIPE}>
      <Card.Title>Recipe</Card.Title>
      {data.recipe.map((req) => {
        const reqData = ALL_OBJECTS_DATA[req.name];
        return (
          <ListItem
            key={reqData.name}
            bottomDivider
            onPress={() => navigation.dispatch(TabActions.jumpTo('ObjectPage', { name: reqData.name }))}
          >
            <View>
              <Avatar source={reqData.image} />
              <Badge
                status="error"
                containerStyle={{ position: 'absolute', top: 16, right: -4 }}
                value={req.quantity}
              />
            </View>
            <ListItem.Content>
              <ListItem.Title>{reqData.name}</ListItem.Title>
              <ListItem.Subtitle>{reqData.type}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </Card>,
  );
}

function generateSubsections(data, navigation) {
  const subsections = [];
  subsections.push(
    renderFundamentalSubsection(data),
  );

  for (const [key, value] of Object.entries(data)) {
    handle(key, data, subsections, navigation);
  }
  return subsections;
}

function TabOneScreen(props) {
  const data = ALL_OBJECTS_DATA[props.route.params.name];
  const subsections = generateSubsections(data, props.navigation);
  return (
    <ScrollView>
      {subsections}
    </ScrollView>
  );
}

export default TabOneScreen;
