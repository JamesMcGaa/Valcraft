import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import {
  View,
} from 'react-native';
import {
  Header, Icon, Image, Text,
} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import potionLogo from './assets/pixel_fire_logo.png';
import ObjectPage from './pages/ObjectPage';
import SearchPage from './pages/SearchPage';
import RequirementsPage from './pages/RequirementsPage';

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
          style={{
            width: 150, height: 150, margin: 10, resizeMode: 'contain',
          }}
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
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="ObjectPage" component={ObjectPage} />
      <Stack.Screen name="RequirementsPage" component={RequirementsPage} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function RequirementsTabRoot() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Materials Required" component={HomeScreen} />
      <Tab.Screen name="Items" component={RequirementsPage} />
    </Tab.Navigator>
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
            backgroundColor="#4B3223"
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
      <Drawer.Screen name="RequirementsPage" component={RequirementsTabRoot} />
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
