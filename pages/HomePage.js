import React from 'react';
import { View, Image } from 'react-native';

import { Button, Card, Text } from 'react-native-elements';
import drawerLogo from '../assets/pixel_fire_logo.png';

function HomePage(props) {
  return (
    <View>
      <Card>
        <Card.Title h4>Welcome to Valcraft</Card.Title>
        <Card.Divider />
        <Image
          source={drawerLogo}
          style={{
            width: 150, height: 150, margin: 10, resizeMode: 'contain', alignSelf: 'center',
          }}
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
