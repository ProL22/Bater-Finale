import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Header,Icon,Card} from 'react-native-elements';
import {SafeAreaPeovider} from 'react-native-safe-area-context';

export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
                      userId:firebase.auth().currentUser.email,
                      RecieverId:this.props.navigation.getParam('details')["userId"],
                      RequestId:this.props.navigation.getParam('details')["RequestId"],
                      ThingName:this.props.navigation.getParam('details')["ThingName"],
                      ReasonToRequest:this.props.navigation.getParam('details')["ReasonToRequest"],
                      RecieverName:'',
                      RecueverContact:'',
                      RecieverAdress:'',
                      RecieverRequestDocId:''
        
        }
    }
    getRecieverDetails(){
        db.collection('Users').where('EmailId','==',this.state.RecieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    RecieverName:doc.data().FirstName,
                    RecieverContact:doc.data().Contact,
                    RecieverAdress:doc.data().Address,
                })
            })
        }
            )
            db.collection('requested_books').where('RequestId','==',this.state.RequestId).get()
            .then(snapshot=>{
                this.setState({
                    RecieverRequestDocId:doc.id
                })
            })
    }
    updatethingstatus=()=>{
        db.collection('all_donations').add({
            BookName:this.state.BookName,
            RequestId:this.state.RequestId,
            RecieverName:this.state.RecieverName,
            DonorId:this.state.userId,
            Requeststatus:'Donorintrested'
        })
    }
    componentDidMount(){
        this.getRecieverDetails
    }
    render(){
        return(
<SafeAreaPeovider>
                   <View>
                          <Header
                                 backgroundColor='orange'
                                 centerComponent={{text:"Details",style:{fontSize:50}}}
                                 leftComponent={<Icon name='menu' color='grey' onPress={()=>{this.props.navigation.toggleDrawer()}}/>}
                          />
                          <Card
                                title={"Book Information"}
                                titleStyle={{fontSize:20}}
                          >
                                 <Card> Name:{this.state.ThingName} </Card>
                                 <Card> Reason:{this.state.ReasonToRequest} </Card>
                         </Card>
                           {this.state.RecieverId!==this.state.userId
                          ?(<TouchableOpacity onPress={()=>{this.updatethingstatus()}}></TouchableOpacity>)
                          :null
                          }
 
                   </View>
</SafeAreaPeovider>
        )
    }
}