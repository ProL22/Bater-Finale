import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../Screens/BookDonateScreen';
import RecieverDetailsScreen from '../Screens/RecieverDetailsScreen';

export const AppStackNavigator=createStackNavigator({
    BookDonateScreen:{screen:BookDonateScreen,
    navigationOptions:{headerShown:false}
    },
    RecieverDetailsScreen:{screen:RecieverDetailsScreen,
    navigationOptions:{headerShown:false}
    },

})