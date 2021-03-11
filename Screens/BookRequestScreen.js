import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context'
export default class ThingRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      ThingName:"",
      reasonToRequest:"",
      IsThingRequestActive : "",
      requestedThingName: "",
      ThingStatus:"",
      requestId:"",
      userDocId: '',
      docId :''
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest = async (ThingName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_Things').add({
        "user_id": userId,
        "Thing_name":ThingName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        "Thing_status" : "requested",
         "date"       : firebase.firestore.FieldValue.serverTimestamp()

    })

    await  this.getThingRequest()
    db.collection('users').where("email_id","==",userId).get()
    .then()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        db.collection('users').doc(doc.id).update({
      IsThingRequestActive: true
      })
    })
  })

    this.setState({
        ThingName :'',
        reasonToRequest : '',
        requestId: randomRequestId
    })

    return Alert.alert("Thing Requested Successfully")


  }

receivedThings=(ThingName)=>{
  var userId = this.state.userId
  var requestId = this.state.requestId
  db.collection('received_Things').add({
      "user_id": userId,
      "Thing_name":ThingName,
      "request_id"  : requestId,
      "ThingStatus"  : "received",

  })
}

getIsThingRequestActive(){
  db.collection('users')
  .where('email_id','==',this.state.userId)
  .onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      this.setState({
        IsThingRequestActive:doc.data().IsThingRequestActive,
        userDocId : doc.id
      })
    })
  })
}

getThingRequest =()=>{
  // getting the requested Thing
var ThingRequest=  db.collection('requested_Things')
  .where('user_id','==',this.state.userId)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      if(doc.data().Thing_status !== "received"){
        this.setState({
          requestId : doc.data().request_id,
          requestedThingName: doc.data().Thing_name,
          ThingStatus:doc.data().Thing_status,
          docId     : doc.id
        })
      }
    })
})}



sendNotification=()=>{
  //to get the first name and last name
  db.collection('users').where('email_id','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      var name = doc.data().first_name
      var lastName = doc.data().last_name

      // to get the donor id and Thing nam
      db.collection('all_notifications').where('request_id','==',this.state.requestId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          var donorId  = doc.data().donor_id
          var ThingName =  doc.data().Thing_name

          //targert user id is the donor id to send notification to the user
          db.collection('all_notifications').add({
            "targeted_user_id" : donorId,
            "message" : name +" " + lastName + " received the Thing " + ThingName ,
            "notification_status" : "unread",
            "Thing_name" : ThingName
          })
        })
      })
    })
  })
}

componentDidMount(){
  this.getThingRequest()
  this.getIsThingRequestActive()

}

updateThingRequestStatus=()=>{
  //updating the Thing status after receiving the Thing
  db.collection('requested_Things').doc(this.state.docId)
  .update({
    Thing_status : 'recieved'
  })

  //getting the  doc id to update the users doc
  db.collection('users').where('email_id','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      //updating the doc
      db.collection('users').doc(doc.id).update({
        IsThingRequestActive: false
      })
    })
  })


}


  render(){

    if(this.state.IsThingRequestActive === true){
      return(

        // Status screen
        <SafeAreaProvider>
        <View style = {{flex:1,justifyContent:'center'}}>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Thing Name</Text>
          <Text>{this.state.requestedThingName}</Text>
          </View>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text> Thing Status </Text>

          <Text>{this.state.ThingStatus}</Text>
          </View>

          <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
          onPress={()=>{
            this.sendNotification()
            this.updateThingRequestStatus();
            this.receivedThings(this.state.requestedThingName)
          }}>
          <Text>I recieved the Thing </Text>
          </TouchableOpacity>
        </View>
        </SafeAreaProvider>
      )
    }
    else
    {
    return(
      // Form screen
      <SafeAreaProvider>
        <View style={{flex:1}}>
          <MyHeader title="Request Thing" navigation ={this.props.navigation}/>

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter Thing name"}
                onChangeText={(text)=>{
                    this.setState({
                        ThingName:text
                    })
                }}
                value={this.state.ThingName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the Thing"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{ this.addRequest(this.state.ThingName,this.state.reasonToRequest);
                }}
                >
                <Text>Request</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    </SafeAreaProvider>
    )
  }
}
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
