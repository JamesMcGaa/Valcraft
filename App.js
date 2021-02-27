import * as React from 'react';
import {
  View, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Header, Icon, Text, Image,
} from 'react-native-elements';
import PageOne from './pages/FirstPage.js';
import PageTwo from './pages/SecondPage.js';
import potion_logo from './assets/potion_logo.png';

// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const HIDDEN_DRAWER_ITEMS = ['PageOne'];

function CustomDrawerContent(props) { // https://stackoverflow.com/questions/62204060/how-to-hide-drawer-item-in-react-navigation-5x
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => !HIDDEN_DRAWER_ITEMS.includes(item.name),
  );
  newState.routeNames = newState.routeNames.filter(
    (item) => !HIDDEN_DRAWER_ITEMS.includes(item),
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={potion_logo}
          style={{ width: 120, height: 120 }}
        />
      </View>

      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        header: () => (
          <Header
            leftComponent={(
              <Icon
                name="navicon"
                type="evilicon"
                color="#FFF"
                size={40}
                onPress={() => navigation.openDrawer()}
              />
            )}
            centerComponent={<Text h4 style={{ color: 'white' }}>Valcraft</Text>}
            rightComponent={(
              <Icon
                name="sc-telegram"
                type="evilicon"
                color="#FFF"
                size={40}
              />
            )}
          />
        ),
      })}
    >
      <Drawer.Screen name="PageTwo" component={PageTwo} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      {/* Hidden  */}
      <Drawer.Screen name="PageOne" component={PageOne} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </SafeAreaProvider>

  );
}
