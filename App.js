
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'
import {AppTabNavigator} from './Components/AppTabNavigator';
import {creaeAppContainer,createAppContainer,createSwitchNavigator} from 'react-navigation'
import {AppDraweravigator} from './Components/AppDrawerNavigator';
export default class  App extends React.Component {
render(){
  return (
    <View>
           <AppContainer/>
    </View>
  )
}
}
const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  BottomTab:{screen:AppDraweravigator}
})
const AppContainer=createAppContainer(SwitchNavigator)
