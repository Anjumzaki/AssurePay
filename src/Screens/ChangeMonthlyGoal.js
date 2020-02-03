import React from "react";
import { Text,View,StyleSheet,Dimensions,TextInput,TouchableHighlight } from "react-native";
import axios from 'axios'
export default class ChangeMonthlyGoal extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      goalchange:'',
      user:'',
      currentMonths:''
    };
  }
  componentDidMount() {
    this.setState({ 
        currentMonths: this.props.navigation.getParam("date") ,
        user :this.props.navigation.getParam("user")
    });
  }
 
  render() {
    const months = ['Jan', 'Feb', 'Mar', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"]  
    return (
        <View style={{ marginTop: 100 }}>
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Change Goal for {months[parseInt(new Date(this.state.currentMonths).getMonth())]}
          </Text>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms1}
              onChangeText={goalchange => this.setState({ goalchange })}
              value={this.state.goalchange}
              placeholder="Goal "
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View>

          <TouchableHighlight
            // style={{flex: 1, alignItems: "center"}}
            underlayColor={"transparent"}
            onPress={() => {
              axios
                .post(
                  "https://intense-harbor-45607.herokuapp.com/edit/goal/month/" +
                    this.state.user +
                    "/" +
                    new Date(this.state.currentMonths).getFullYear() +
                    "/" +
                    parseInt(new Date(this.state.currentMonths).getMonth()+1) +
                    "/" +
                    this.state.goalchange
                ).then(
                    (res)=>alert('Succesfully Changed')
                )
            }}
          >
            <Text style={styles.saveBtn}>Save</Text>


          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('HomePage')} >
            <Text style={[styles.saveBtn,{backgroundColor:'#ff1358'}]}>
            Back
            </Text>
            
              </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    SectionStyle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      margin: 10
    },
    ImageStyle: {
      padding: 10,
      margin: 5,
      marginLeft: 15,
      marginRight: 15,
      height: 10,
      width: 10,
      resizeMode: "stretch",
      alignItems: "center"
    },
    saveBtn: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#3f3fb9",
      color: "white",
      borderRadius: 10,
      margin: 30,
      textAlign: "center"
    },
    ImageStyle1: {
      padding: 10,
      margin: 5,
      marginLeft: 15,
      marginRight: 15,
      height: 10,
      width: 25,
      resizeMode: "stretch",
      alignItems: "center"
    },
    forms: {
      fontSize: 19,
      padding: 8,
      width: Dimensions.get("window").width - 105,
      borderBottomWidth: 1,
      borderColor: "white",
      height: 50,
      fontFamily: "open-sans-bold",
      color: "white"
    },
    regButton1: {
      fontSize: 22,
      fontFamily: "open-sans-simple",
      color: "white"
    },
    regButton: {
      fontFamily: "open-sans-simple",
      width: Dimensions.get("window").width - 105,
      alignItems: "center",
      backgroundColor: "#ff1358",
      padding: 10,
      borderRadius: 100,
      marginTop: 60
    },
    reg: {
      textDecorationLine: "underline",
      color: "#ff1358",
  
      fontFamily: "open-sans-simple",
      fontSize: 20
    },
    reg1: {
      fontFamily: "open-sans-simple",
      color: "white",
      fontSize: 20
    },
    myIcons: {
      fontSize: 14
    },
    sold: {
      // flexDirection: 'row',
      borderWidth: 0.5,
      borderColor: "silver",
      borderStyle: "solid",
      width: Dimensions.get("window").width / 7 - 2.7,
      height: Dimensions.get("window").width / 7 - 2.7,
      justifyContent: "center",
      alignContent: "center",
      margin: 0,
      paddingTop: 8,
      marginBottom: -2,
      alignContent: "center",
      marginTop: -12,
      alignItems: "center"
    },
    pay: {
      // flexDirection: 'row',
      backgroundColor: "yellow",
      padding: 5,
      borderWidth: 0.5,
      borderColor: "silver",
      borderStyle: "solid",
      width: Dimensions.get("window").width / 7 - 2.7,
      height: Dimensions.get("window").width / 7 - 2.7,
      margin: 0,
      paddingTop: 8,
      marginBottom: -2,
      alignContent: "center",
      marginTop: -12,
      alignItems: "center"
    },
    both: {
      padding: 5,
      flexDirection: "row",
      backgroundColor: "yellow",
      borderWidth: 0.5,
      borderColor: "silver",
      borderStyle: "solid",
      width: Dimensions.get("window").width / 7 - 2.7,
      height: Dimensions.get("window").width / 7 - 2.7,
      margin: 0,
      paddingTop: 8,
      marginTop: -12,
      alignContent: "center",
      marginBottom: -2
    },
    simple: {
      padding: 5,
      borderWidth: 0.5,
      borderColor: "silver",
      borderStyle: "solid",
      width: Dimensions.get("window").width / 7 - 2.7,
      height: Dimensions.get("window").width / 7 - 2.7,
      margin: 0,
      paddingTop: 8,
      marginBottom: -2,
      marginTop: -12,
      alignContent: "center"
    },
    myIcons1: {
      fontSize: 10
    },
    myDrops: {
      width: Dimensions.get("window").width / 3,
      alignItems: "center",
      margin: 10,
      borderWidth: 1,
      borderColor: "#3f3fb9",
      fontSize: 20,
      borderRadius: 5,
      backgroundColor: "#F6F6F6"
    },
    myDrop: {
      height: 40,
      width: "100%",
      color: "#3f3fb9"
    },
    SectionStyle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 5,
      borderColor: "#3f3fb9",
      borderWidth: 1,
      margin: 10
    },
    forms1: {
      fontSize: 19,
      padding: 8,
      width: Dimensions.get("window").width - 25,
      height: 50,
      fontFamily: "open-sans-bold",
      color: "black",
      borderRadius: 10
    },
    forms: {
      padding: 10,
      backgroundColor: "#fff",
      color: "#3f3fb9",
      width:
        Dimensions.get("window").width - Dimensions.get("window").width / 3 - 75,
      fontSize: 18
    },
    head: {
      fontSize: 14,
      fontWeight: "bold",
      color: "gray",
      width: Dimensions.get("window").width / 2 + 30
    },
    cardHead: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    cardHead1: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: -15
    },
    head1: {
      fontSize: 14,
      color: "#3f3fb9",
      alignSelf: "center"
    }
  });
