// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, View, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Avatar, Badge, Card, ListItem, Input, Icon,
} from 'react-native-elements';
import { ALL_OBJECTS_DATA } from '../data';

const styles = StyleSheet.create({});

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
    console.log(value);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return '0';
}

const SUBSECTION_KEYS = Object.freeze({
  FUNDAMENTAL: 'FUNDAMENTAL',
  RECIPE: 'RECIPE',
});

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
            onPress={() => navigation.dispatch(StackActions.push('ObjectPage', { name: reqData.name }))}
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

function renderLocation(data, subsections, navigation) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.RECIPE}>
      <Card.Title>Location</Card.Title>
      <Card.Divider />
      <Text>
        {data.location}
      </Text>
    </Card>,
  );
}

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

function handle(key, data, subsections, navigation) {
  if (data[key] !== '') { // CSV to JSON exports these as nonnull
    switch (key) {
      case 'recipe':
        renderRecipe(data, subsections, navigation);
        break;
      case 'location':
        renderLocation(data, subsections, navigation);
        break;
      default:
        break;
    }
  }
}

function generateSubsections(data, navigation) {
  const subsections = [];
  Object.keys(data).forEach((key) => {
    handle(key, data, subsections, navigation);
  });
  return subsections;
}

function ObjectPage(props) {
  const [count, setCount] = useState('0');
  const { name } = props.route.params;
  useEffect(() => {
    async function getAndSet() {
      retrieveData(name).then((data) => {
        setCount(data);
      });
    }
    getAndSet();
  },
  []);
  const data = ALL_OBJECTS_DATA[name];

  const subsections = generateSubsections(data, props.navigation);
  return (
    <ScrollView persistentScrollbar style={{ paddingBottom: 100 }}>
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
            value={data.numberDesired}
          />
        </View>
        <Text style={{ alignSelf: 'center', paddingBottom: 10 }}>
          ❝
          {data.description}
          ❞
        </Text>
        <Text style={{ fontWeight: 'bold' }}>
          {'Type: '}
          {data.type}
        </Text>
        {data.ID !== '' ? (
          <Text style={{ fontWeight: 'bold' }}>
            {'ID: '}
            {data.ID}
          </Text>
        ) : null}
        <Text style={{ fontWeight: 'bold' }}>
          {'Total Needed: '}
        </Text>
        <View style={{ flexDirection: 'row', maxHeight: 30, marginBottom: 10 }}>
          <View style={{
            minWidth: '50%', maxWidth: '80%', flexGrow: 1,
          }}
          >
            <Input
              placeholder="..."
              errorStyle={{ color: 'red' }}
              errorMessage={!isNormalInteger(count) && count !== '' ? 'Please enter a valid amount' : null}
              onChangeText={(text) => {
                if (text === '' || isNormalInteger(text)) {
                  storeData(name, text).then(() => setCount(text));
                }
              }}
              keyboardType="number-pad"
              value={count.toString()}
            />
          </View>
          <Icon
            name="plus"
            type="evilicon"
            color="#517fa4"
            size={40}
            onPress={() => {
              const countAfterIncrement = parseInt(count, 10) + 1;
              const stringFormatted = countAfterIncrement.toString();
              storeData(name, stringFormatted).then(() => setCount(stringFormatted));
            }}
          />
          <Icon
            name="minus"
            type="evilicon"
            color="#517fa4"
            size={40}
            onPress={() => {
              const countAfterDecrement = parseInt(count, 10) - 1;
              if (countAfterDecrement > 0) {
                const stringFormatted = countAfterDecrement.toString();
                storeData(name, stringFormatted).then(() => setCount(stringFormatted));
              }
            }}
          />
        </View>
      </Card>
      {subsections}
      <View style={{ height: 10 }} />
    </ScrollView>
  );
}

export default ObjectPage;
