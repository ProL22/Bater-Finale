import * as React from 'react';
import {View,TouchableOpacity} from 'react-native'
import firebase from 'firebase';
import {DrawerItems} from 'react-navigation-drawer'
import { Text } from 'react-native';
 export default class SideBarMenu extends React.Component{
     render(){
         return(
             <View>
                    <DrawerItems {...this.props}/>
                    <TouchableOpacity onPress={()=>{this.props.navigate('WelcomeScreen')
                    firebase.auth().signOut()
                }}>
                    <Text>LogOut</Text>
                    </TouchableOpacity>
             </View>
         )
     }
 }