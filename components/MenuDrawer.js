import React from 'react';
import 'react-native-gesture-handler';
import {View, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './Home';
import History from './History';
import MyProfile from './MyProfile';
import CustomDrawer from './CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => toggleDrawer()}
        style={{minheight: 30, minwidth: 30, padding: 10}}>
        <Image
          styles={{resizeMode: 'contain'}}
          source={require('./assets/logos/menu.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

function drawerScreen1({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        component={Home}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function drawerScreen3({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        component={MyProfile}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function drawerScreen2({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        component={History}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MenuDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home'}}
        component={drawerScreen1}
      />
      <Drawer.Screen
        name="MyProfile"
        options={{drawerLabel: 'MyProfile'}}
        component={drawerScreen3}
      />
      <Drawer.Screen
        name="History"
        options={{drawerLabel: 'History'}}
        component={drawerScreen2}
      />
    </Drawer.Navigator>
  );
}

export default MenuDrawer;
