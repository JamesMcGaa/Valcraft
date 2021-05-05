import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AdMobBanner, Linking } from 'expo-ads-admob';
import Constants from 'expo-constants';
import drawerLogo from './assets/pixel_fire_logo.png';
import MaterialsPage from './pages/MaterialsPage';
import ObjectPage from './pages/ObjectPage';
import RequirementsPage from './pages/RequirementsPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';

const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-9949701533501420/9744473329';
const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

const DISPLAY_DRAWER_ITEMS = ['About', 'All Items', 'Tracked Items'];
function loadInBrowser(url) {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
}

function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => DISPLAY_DRAWER_ITEMS.includes(item.name),
  );
  newState.routeNames = newState.routeNames.filter(
    (item) => DISPLAY_DRAWER_ITEMS.includes(item),
  );
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={drawerLogo}
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
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
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
      <Tab.Screen name="Materials Required" component={MaterialsPage} />
      <Tab.Screen name="Tracked Items" component={RequirementsPage} />
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
                style={{ alignSelf: 'center' }}
              />
            )}
            centerComponent={<Text h4 style={{ color: 'white' }}>Valcraft</Text>}
          />
        ),

      })}
    >
      <Drawer.Screen name="About" component={HomePage} />
      <Drawer.Screen name="All Items" component={SearchPage} />
      <Drawer.Screen name="Tracked Items" component={RequirementsTabRoot} />
      <Drawer.Screen name="ObjectPage" component={ObjectPage} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
      {/* <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={adUnitID}
        servePersonalizedAds
      /> */}
    </SafeAreaProvider>
  );
}
