import * as React from 'ract';
import {Text,View,TouchableOpacity,StyleSheet,Animate,Dimensions} from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipableFlatlist extends React.Component{
    constructor(props){
       super(props)
       this.staet={
           allNotifications:this.props.allNotifications,
       }
    }
    updatemarkasread=Notification=>{
        db.collection("all_notifications").doc(Notification.doc_id).update({
            notification_status:"read"       
        })
    }
    onswipevaluechange=swipeData=>{
        var allNotifications=this.staet.allNotifications
        const {key,value}=swipeData
        if(value<Dimensions.get("window.width")){
           const newdata=[...allNotifications]
           this.updatemarkasread(allNotifications[key])
           newdata.splice(key,1)
           this.setState({
               allNotifications:newdata
           })
        }
    }
    renderitem=data=>{
        <Animated.View>
                        <ListItem
                     key={i} bottomDivider>
                     <ListItem.Content>
                                        <ListItem.Title>{data.item.thing_name}</ListItem.Title>
                                        <ListItem.Subtitle>{data.item.message}</ListItem.Subtitle>                                                                                                     

                    </ListItem.Content>
                     </ListItem>      
        </Animated.View>
    }
    renderhiddenitem
    render(){
        return(
                  <View>
                         <SwipeListView
                                       disabeleRightSwipe
                                       data={this.staet.allNotifications}
                                       renderitem={this.renderitem}
                                       renderHiddenItem={this.renderhiddenitem}
                                       righrOpenValue={-Dimensions.get("window").width}
                                       previewRowKey={"0"}
                                       previewOpenValue={-40}
                                       previewOpenDelay={3000}
                                       onswipevaluechange={this.onswipevaluechange}
                                       keyExtractor={(item,index)=>index.toString()}
                        />
                  </View>
        )
    }
}