import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context'
import RecieverDetailsScreen from './RecieverDetailsScreen'
export default class ThingDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedThingsList : []
    }
  this.requestRef= null
  }

  getRequestedThingsList =()=>{
    this.requestRef = db.collection("requested_Things")
    .onSnapshot((snapshot)=>{
      var requestedThingsList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedThingsList : requestedThingsList
      });
    })
  }

  componentDidMount(){
    this.getRequestedThingsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
                     key={i} bottomDivider>
                     <ListItem.Content>
                                        <ListItem.Title>{item.Thing_name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.reason_to_request}</ListItem.Subtitle>
                                                                                                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate("RecieverDetails"),{"details":item}}}>
                                                                                                                      <Text>View</Text>
                                                                                                     </TouchableOpacity>


                    </ListItem.Content>
                     </ListItem>
                     
        )
     }

  render(){
    return(
      <SafeAreaProvider>
      <View style={{flex:1}}>
        <MyHeader title="Donate Things" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedThingsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Things</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedThingsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
      </SafeAreaProvider> 
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
