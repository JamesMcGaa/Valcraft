import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  View,
} from 'react-native';
import {
  Header, Icon, Image, Text,
} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import potionLogo from './assets/potion_logo.png';
import ObjectPage from './pages/ObjectPage';
import SearchPage from './pages/SearchPage';

// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51

// const HIDDEN_DRAWER_ITEMS = ['ObjectPage'];

function CustomDrawerContent(props) { // https://stackoverflow.com/questions/62204060/how-to-hide-drawer-item-in-react-navigation-5x
  const { state, ...rest } = props;
  const newState = { ...state };
  // newState.routes = newState.routes.filter(
  //   (item) => !HIDDEN_DRAWER_ITEMS.includes(item.name),
  // );
  // newState.routeNames = newState.routeNames.filter(
  //   (item) => !HIDDEN_DRAWER_ITEMS.includes(item),
  // );

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={potionLogo}
          style={{ width: 120, height: 120 }}
        />
      </View>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
}

const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="ObjectPage" component={ObjectPage} />
    </Stack.Navigator>
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
      <Drawer.Screen name="All Items" component={Root} />
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
