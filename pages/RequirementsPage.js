import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Button, Icon, Input, ListItem,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { ALL_OBJECTS_DATA } from '../data';
import { storeData, retrieveData, isNormalInteger } from '../utils';

function Requirement({ name, navigation }) {
  const [count, setCount] = useState('0');
  useFocusEffect(
    React.useCallback(() => {
      retrieveData(name).then((data) => {
        setCount(data);
      });
    }, []),
  );
  if (count === '0') {
    return null;
  }
  return (
    <ListItem
      key={name}
      bottomDivider
      onPress={() => navigation.navigate('ObjectPage', { name })}
    >
      <View style={{ flexDirection: 'row', maxHeight: 30, marginBottom: 10 }}>
        <Avatar source={ALL_OBJECTS_DATA[name].image} />
        <ListItem.Content style={{ marginLeft: 10 }}>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
        <View style={{
          maxWidth: '30%', flexGrow: 1,
        }}
        >
          <Input
            placeholder="..."
            inputStyle={{ textAlign: 'center' }}
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
    </ListItem>
  );
}

function RequirementsPage({ navigation }) {
  const [reqs, setReqs] = useState(null);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getAllKeys().then((data) => setReqs(data));
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ConfirmDialog
          title="Confirmation"
          message="Are you sure you want to clear your tracked requirements?"
          visible={visible}
          onTouchOutside={() => setVisible(false)}
          positiveButton={{
            title: 'Clear',
            onPress: () => AsyncStorage.clear().then((data) => {
              setReqs(null);
              setVisible(false);
            }),
          }}
          negativeButton={{
            title: 'Cancel',
            onPress: () => setVisible(false),
          }}
        />
        <Button
          title="Clear All"
          type="outline"
          buttonStyle={{ margin: 3, borderWidth: 0.5, borderRadius: 9 }}
          onPress={() => setVisible(true)}
        />
        {reqs !== null ? reqs
          .map((name) => <Requirement name={name} key={name} navigation={navigation} />) : null}
      </ScrollView>
    </View>
  );
}

export default RequirementsPage;
