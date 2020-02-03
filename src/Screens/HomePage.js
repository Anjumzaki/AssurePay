import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationEvents
} from "react-navigation";
import * as Font from "expo-font";
import axios from "axios";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import {  Card, CardItem, } from "native-base";
import { connect } from "react-redux";
import {  CalendarList } from "react-native-calendars";
import {  Feather, MaterialCommunityIcons } from "@expo/vector-icons";

class HomePage extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      Password: "",
      msg: "",
      allTransactions: null,
      transctions: null,
      refreshing: true,
      goal: null,
      calDate: new Date().getMonth() + 1,
      monthC: new Date().getMonth() + 1,
      currYear: new Date().getFullYear(),
      modalVisible: false,
      modalVisible1: false,
      goalchange: "",
      bonuschange: "",
      cm: new Date().getMonth() + 1,
      MonthAnjum: new Date().getMonth() + 1,
      newMonth: "",
      currentMonths: new Date().getFullYear()+'-'+new Date().getMonth() + 1 +'-' +new Date().getDate()
    };
    this.getNewMonthData = this.getNewMonthData.bind(this);
  }
  getGoal = () => {
    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/goals/" +
          this.props.user 
      )
      .then(resp => {
        this.setState({ goal: resp.data, refreshing: false });
      })
      .catch(err => console.log(err));
  };
  getdata = () => {
    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/transactions/monthly/" +
          this.props.user +
          "/" +
          parseInt(this.state.calDate) +
          "/" +
          parseInt(this.state.currYear)
      )
      .then(resp => {
        this.setState({ transctions: resp.data });
      })
      .catch(err => console.log(err));
    this.getGoal();
  };
  getAllData = () => {
    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/transactions/" +
          this.props.user
      )
      .then(resp => {
        this.setState({ allTransactions: resp.data });
      })
      .catch(err => console.log(err));
    this.getGoal();
  };
  componentDidMount() {
    this.getdata();
    this.getAllData();
    this.getGoal()
    // alert(new Date(this.state.currYear + "01-" + "0" + this.state.calDate));
    // alert( new Date('2020-01-01'))
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getdata();
    this.getAllData();
    this.getGoal()
  };
  showAlert1 = (navigation, myDate) => {
    Alert.alert(
      "Actions",
      "You want to add a Transaction",
      [
        {
          text: "Add Transaction",
          onPress: () =>
            navigation.navigate("TransScreen", { sectedDate: myDate })
        },
        {
          text: "Show Details",
          onPress: () =>
            navigation.navigate("SingleTransactions", {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: "sell"
            })
        },
        {
          text: "Show Pay Details",
          onPress: () =>
            navigation.navigate("SingleTransactions", {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: "pay"
            })
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  showAlert2 = (navigation, myDate) => {
    Alert.alert(
      "Actions",
      "You want to add a Transaction",
      [
        {
          text: "Add Transaction",
          onPress: () =>
            navigation.navigate("TransScreen", { sectedDate: myDate })
        },
        {
          text: "Show Details",
          onPress: () =>
            navigation.navigate("SingleTransactions", {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: "sell"
            })
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  showAlert3 = (navigation, myDate) => {
    Alert.alert(
      "Actions",
      "You want to add a Transaction",
      [
        {
          text: "Add Transaction",
          onPress: () =>
            navigation.navigate("TransScreen", { sectedDate: myDate })
        },
        {
          text: "Show Pay Details",
          onPress: () =>
            navigation.navigate("SingleTransactions", {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: "pay"
            })
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  showAlert4 = (navigation, myDate) => {
    Alert.alert(
      "Actions",
      "You want to add a Transaction",
      [
        {
          text: "Add Transaction",
          onPress: () =>
            navigation.navigate("TransScreen", { sectedDate: myDate })
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible }, this._onRefresh);
  }
  setModalVisible1(visible) {
    this.setState({ modalVisible1: visible }, this._onRefresh);
  }
  numberWithCommas(x) {
    x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getNewMonthData = month => {
    this.setState(
      { calDate: month[0].month, currYear: month[0].year },
      this._onRefresh
    );
  };
  //   componentDidUpdate(){
  //     this._onRefresh
  //   }
  render() {
    const { currentMonths } = this.state;
    const { navigation } = this.props;
    var nextDays = [];
    var payDates = [];
    if (this.state.allTransactions !== null) {
      var trans = this.state.allTransactions;
      for (var i = 0; i < trans.length; i++) {
        nextDays.push(trans[i].soldDate);
        payDates.push(trans[i].payDate);
      }
    }
    var matched = [];
    let mark = {};
    for (var i = 0; i < nextDays.length; i++) {
      for (var j = 0; j < nextDays.length; j++) {
        if (nextDays[i] == payDates[j]) {
          matched.push(nextDays[i]);
        }
      }
    }
    nextDays.forEach(day => {
      mark[day] = { marked: true, selectedDotColor: "yellow" };
    });
    payDates.forEach(day => {
      mark[day] = { selected: true, selectedDotColor: "yellow" };
    });

    matched.forEach(day => {
      mark[day] = { selected: true, marked: true, selectedDotColor: "yellow" };
    });
    var goal = 0
    var totalIncome = 0,
      totalPay = 0;
    if (
      this.state.allTransactions !== null &&
      this.state.allTransactions.length > 0
    ) {
       
      var totalVolume = 0,
        totalSpiff = 0,
        totalCommission = 0,
        totalBonus = 0;
      var transes = this.state.allTransactions;
      var month = new Date(currentMonths).getMonth();
      var year = new Date(currentMonths).getFullYear();
      if(this.state.goal && this.state.goal.length > 0){
        if(this.state.goal[month]){
          goal = this.state.goal[month].volume
        }
      }
     
      var totalSales = 0
      for (var i = 0; i < transes.length; i++) {
        if (
            new Date(transes[i].soldDate).getMonth() == month &&
            new Date(transes[i].soldDate).getFullYear()  == year
        ) {
          totalVolume += parseFloat(transes[i].volume);
          totalBonus += parseFloat(transes[i].bonus);
          totalCommission += parseFloat(transes[i].commission);
          totalSpiff += parseFloat(transes[i].spiff);
          totalSales = totalSales + 1
        }
      }
      totalIncome = totalVolume;
      totalPay = totalSpiff + totalCommission + totalBonus;
    }
    return (
      // style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <NavigationEvents onDidFocus={this._onRefresh} />
        <View>
          <CalendarList
            style={{
              width: Dimensions.get("window").width
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#3f3fb9",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#3f3fb9",
              selectedDotColor: "#3f3fb9",
              arrowColor: "orange",
              monthTextColor: "blue",
              indicatorColor: "blue",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 18,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16
            }}
            // current={new Date(`01-${this.state.calDate}-${this.state.currYear}`)}
            // onMonthChange={(month) => {alert('month changed', month)}}
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // current={new Date( this.state.currentMonths)}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            // Set custom calendarWidth.
            calendarWidth={Dimensions.get("window").width}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              this.props.navigation.navigate("SingleTransactions", {
                sectedDate: day,
                transctions: this.state.transctions
              });
            }}
            // disableMonthChange={true}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day =>
              this.props.navigation.navigate("TransScreen", { sectedDate: day })
            }
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"MMM yyyy"}
            firstDay={2}
            // onMonthChange={month => {
            //   console.log("month changed", month);
            // }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={7}
            // Hide day names. Default = false
            // Show week numbers to the left. Default = false
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month

            // onVisibleMonthsChange={(months) => {console.log('asd')}}
            // loadItemsForMonth={date => console.log("Month Changed", date)}
            // onVisibleMonthsChange={(months)=>{this.setState({currentMonths:months[0].dateString},console.log(this.state.currentMonths))}}
            markedDates={mark}
            onVisibleMonthsChange={months =>
              this.state.currentMonths == months[0].dateString
                ? console.log(currentMonths)
                :
                setTimeout(
                    function() {
                        this.setState({currentMonths:  months[0].dateString});
                    }
                    .bind(this),
                    1500
                )
            }
            // onDayChange={alert('changes')}
            dayComponent={({ date, state }) => {
              return (
                <View>
                {nextDays.indexOf(date.dateString) > -1 ? (
                  payDates.indexOf(date.dateString) > -1 ? (
                    <TouchableOpacity
                      style={styles.both}
                      onPress={() => this.showAlert1(this.props.navigation, date)}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        {date.day}
                      </Text>
                      <View>
                        <Feather
                          style={styles.myIcons1}
                          name="dollar-sign"
                          size={32}
                          color="green"
                        />
                        <MaterialCommunityIcons
                          style={styles.myIcons1}
                          name="cash-refund"
                          size={32}
                          color="green"
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.sold}
                      onPress={() => this.showAlert2(this.props.navigation, date)}
                    >
                      <Text style={{ textAlign: "center", color: "black" }}>
                        {date.day}
                      </Text>
                      <Feather
                        style={styles.myIcons}
                        name="dollar-sign"
                        size={32}
                        color="green"
                      />
                    </TouchableOpacity>
                  )
                ) : payDates.indexOf(date.dateString) > -1 ? (
                  <TouchableOpacity
                    style={styles.pay}
                    onPress={() => this.showAlert3(this.props.navigation, date)}
                  >
                    <Text style={{ textAlign: "center", color: "black" }}>
                      {date.day}
                    </Text>
                    <MaterialCommunityIcons
                      style={styles.myIcons}
                      name="cash-refund"
                      size={32}
                      color="green"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.simple}
                    onPress={()=>this.showAlert4(this.props.navigation, date)}
                  >
                    <Text style={{ textAlign: "center", color: "black" }}>
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              );
            }}
          />
        </View>
        <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Total Sales: </Text>
              <Text style={styles.head1}>
                {this.state.transctions 
                  ? totalSales
                  : "0"}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Month to Date: </Text>
              <Text style={styles.head1}>
                ${totalVolume ? this.numberWithCommas(totalVolume) : "0.00"}{" "}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Commission: </Text>
              <Text style={styles.head1}>
                $
                {totalCommission
                  ? this.numberWithCommas(totalCommission)
                  : "0.00"}{" "}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <TouchableHighlight
             onPress={() => {
              this.props.navigation.navigate('ChangeMonthlyBonus',{
                date : this.state.currentMonths,
                user : this.props.user,
               })
             }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.head}>Bonus: </Text>
                <Text style={styles.head1}>
                  ${totalBonus ? this.numberWithCommas(totalBonus) : "0.00"}{" "}
                </Text>
              </View>
            </TouchableHighlight>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Spiff: </Text>
              <Text style={styles.head1}>
                ${totalSpiff ? this.numberWithCommas(totalSpiff) : "0.00"}{" "}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <TouchableHighlight
              onPress={() => {
               this.props.navigation.navigate('ChangeMonthlyGoal',{
                 date : this.state.currentMonths,
                 user : this.props.user,
                })
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.head}>Goal: </Text>
                <Text style={styles.head1}>
                  $ 
                  {this.state.goal !== null
                    ? this.numberWithCommas(goal)
                    : "0.00"}{" "}
                </Text>
              </View>
            </TouchableHighlight>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Remaining Goal: </Text>
              <Text style={styles.head1}>
                $
                {totalIncome && this.state.goal !== null
                  ? this.numberWithCommas(goal - totalIncome)
                  : "0.00"}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.head}>Total Pay: </Text>
              <Text style={styles.head1}>
                ${totalPay ? this.numberWithCommas(totalPay) : "0.00"}
              </Text>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
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
const mapStateToProps = state => ({
  user: state.user.userId
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
