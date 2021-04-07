import { StackActions, useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image, ScrollView, Text, View,
} from 'react-native';
import {
  Avatar, Badge, Card, Icon, Input, ListItem,
} from 'react-native-elements';
import { ALL_OBJECTS_DATA } from '../data';
import { storeData, retrieveData, isNormalInteger } from '../utils';

const SUBSECTION_KEYS = Object.freeze({
  FUNDAMENTAL: 'FUNDAMENTAL',
  RECIPE: 'RECIPE',
  NOTES: 'NOTES',
  PREREQUISITES: 'PREREQUISITES',
  STATS: 'STATS',
});

function renderRecipe(data, subsections, navigation) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.RECIPE}>
      <Card.Title>Recipe</Card.Title>
      {data.recipe.map((req, index) => {
        const reqData = ALL_OBJECTS_DATA[req.name];
        return (
          <ListItem
            key={reqData.name}
            bottomDivider={index !== data.recipe.length - 1}
            onPress={() => navigation.navigate('ObjectPage', { name: reqData.name })}
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

function renderLocation(data, subsections) {
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

function renderNotes(data, subsections) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.NOTES}>
      <Card.Title>Description</Card.Title>
      <Card.Divider />
      <Text>
        {data.notes}
      </Text>
    </Card>,
  );
}

function renderPrerequisites(data, subsections) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.PREREQUISITES}>
      <Card.Title>Prerequisites</Card.Title>
      <Card.Divider />
      <Text>
        {data.prerequisites}
      </Text>
    </Card>,
  );
}

function renderStats(data, subsections) {
  subsections.push(
    <Card key={SUBSECTION_KEYS.STATS}>
      <Card.Title>Stats</Card.Title>
      <Card.Divider />
      {Object.keys(data.stats).map((key) => (
        <Text key={key}>
          {`${key}: `}
          <Text style={{ color: '#33B8FF' }}>
            {data.stats[key]}
          </Text>
        </Text>
      ))}

    </Card>,
  );
}

function handle(key, data, subsections, navigation) {
  if (data[key] !== '') { // CSV to JSON exports these as nonnull
    switch (key) {
      case 'notes':
        renderNotes(data, subsections, navigation);
        break;
      case 'prerequisites':
        renderPrerequisites(data, subsections, navigation);
        break;
      case 'stats':
        renderStats(data, subsections, navigation);
        break;
      case 'recipe':
        renderRecipe(data, subsections, navigation);
        break;
      case 'location':
        renderLocation(data, subsections);
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
  useFocusEffect(
    React.useCallback(() => {
      retrieveData(name).then((data) => {
        setCount(data);
      });
    }, []),
  );
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
            name="minus"
            type="evilicon"
            color="#517fa4"
            size={40}
            onPress={() => {
              const countAfterDecrement = parseInt(count, 10) - 1;
              if (countAfterDecrement >= 0) {
                const stringFormatted = countAfterDecrement.toString();
                storeData(name, stringFormatted).then(() => setCount(stringFormatted));
              }
            }}
          />
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
        </View>
      </Card>
      {subsections}
      <View style={{ height: 10 }} />
    </ScrollView>
  );
}

export default ObjectPage;
