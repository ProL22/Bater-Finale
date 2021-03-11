import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../Screens/BookDonateScreen';
import BookRequestScreen from '../Screens/BookRequestScreen';

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{screen:BookDonateScreen,
    navigationOptions:{
        tabBarIcon:<Image source={require("../assets/Donate.jpg")}style={{width:20,height:20}}/> 
    }},
    BookRequest:{screen:BookRequestScreen,
    navigationOptions:{
        tabBarIcon:<Image source={require("../assets/Request.png")}style={{width:20,height:20}}/>
    }
    }
})