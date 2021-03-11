import * as React from 'react'
import {TextInput,View,StyleSheet,TouchableOpacity,Image, Button} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import {Header} from 'react-native-elements'
export default class WelcomeScreen extends React.component{
constructor(){
      super()
      this.state={
          EmailId:'',
          Password:'',
      }
}
 usersignup=(EmailId,Password)=>{
    firebase.auth().createUserWithEmailAndPassword(EmailId, Password)
    .then((user) => {
      alert("User SignedUp")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error Message")
    });
 }
 usersignup=(EmailId,Password,ConfirmPassword)=>{
  if(Password!==ConfirmPassword){
    alert("Password doesn't matched")
  }
  else{
    firebase.auth().createUserWithEmailAndPassword(EmailId, Password)
    .then(() => {
       db.collection("Users").add({
         FirstName:this.state.FirstName,
         LastName:this.state.LastName,
         Contact:this.state.Contact,
         Address:this.state.Address,
         EmailId:this.state.EmailId
       })
      alert("User added Succesfully",
      '',
      [{text:'ok',onPress:()=>this.setState({"isModalvisible":false})}]
      )
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error Message")
    });}
}
   render(){
       return(
        <SafeAreaProvider>
           <View>
               {this.ShowModal()}
                  <Header
                          backgroundColor={"yellow"}
                          centerComponent={{
                              text:'EveryDayNeeds',
                              style:{color:'#fff',fontSize:10 }
                          }}
                  />
                  <TextInput
                             style={styles.TextI}
                             placeholder="Email eg.EverDay@Needs.com"
                             keyboardType='email-address'
                             onChangeText={(text)=>{
                                 this.setState({EmailId:text})
                             }
                            }                     
                  />
                  <TextInput
                          style={style.TextI}
                          placeholder="Password"
                          secureTextEntry={true}
                          onChangeText={(text)=>{
                               this.setState({Password:text})
                          }
                        }
                />
                 <Button title='Signup' color='orange'onPres={()=>{this.usersignup(this.state.EmailId,this.state.Password)}}/>
                 <Button title='Signin' color='orange'onPres={()=>{this.usersignin(this.state.EmailId,this.state.Password)}}/>
           </View>
           </SafeAreaProvider>
       )
   }
}
const styles = StyleSheet.create({
 TextI:{
     width:200,
     height:50,
     border:'solid',
     borderRadius:10
     
 }
})