import React from 'react';
import { View, Dimensions, Image } from 'react-native';
// import Image from 'react-native-scalable-image';

import { Button, Card, Text } from 'react-native-elements';
import drawerLogo from '../assets/background.png';

function HomePage(props) {
  return (
    <View>
      <Card>
        <Card.Title h4>Welcome to Valcraft</Card.Title>
        <Card.Divider />
        <Image
          source={drawerLogo}
          style={{
            width: '100%',
            height: 200,
            // display: 'flex',
            // flex: 1,
            backgroundColor: 'blue',
          }}
          // resizeMode="contain"
        />
      </Card>
      <Card>
        <Card.Title>
          Valcraft is an offline compendium and companion for Valheim.
        </Card.Title>
        <Text>
          View item recipes, track required materials, and plan your route through the world.
        </Text>
      </Card>
    </View>
  );
}

export default HomePage;
