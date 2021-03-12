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
import drawerLogo from './assets/pixel_fire_logo.png';
import MaterialsPage from './pages/MaterialsPage';
import ObjectPage from './pages/ObjectPage';
import RequirementsPage from './pages/RequirementsPage';
import SearchPage from './pages/SearchPage';

function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const newState = { ...state };
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
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="ObjectPage" component={ObjectPage} />
      <Stack.Screen name="RequirementsPage" component={RequirementsPage} />
      <Stack.Screen name="MaterialsPage" component={MaterialsPage} />
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
      <Drawer.Screen name="Tracked Items" component={RequirementsTabRoot} />
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
