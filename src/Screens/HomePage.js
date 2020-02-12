import React from 'react';
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
  Alert,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import * as Font from 'expo-font';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { userAsync } from '../store/actions';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import { CalendarList } from 'react-native-calendars';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

class HomePage extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      Password: '',
      msg: '',
      allTransactions: null,
      transctions: null,
      refreshing: true,
      goal: null,
      calDate: new Date().getMonth() + 1,
      monthC: new Date().getMonth() + 1,
      currYear: new Date().getFullYear(),
      modalVisible: false,
      modalVisible1: false,
      goalchange: '',
      bonuschange: '',
      cm: new Date().getMonth() + 1,
      MonthAnjum: new Date().getMonth() + 1,
      newMonth: '',
      currentMonths:
        new Date().getFullYear() +
        '-' +
        new Date().getMonth() +
        1 +
        '-' +
        new Date().getDate(),
    };
    this.getNewMonthData = this.getNewMonthData.bind(this);
  }
  getGoal = () => {
    axios
      .get(
        'https://intense-harbor-45607.herokuapp.com/get/all/goals/' +
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
        'https://intense-harbor-45607.herokuapp.com/get/all/transactions/monthly/' +
          this.props.user +
          '/' +
          parseInt(this.state.calDate) +
          '/' +
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
        'https://intense-harbor-45607.herokuapp.com/get/all/transactions/' +
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
    this.getGoal();
    // alert(new Date(this.state.currYear + "01-" + "0" + this.state.calDate));
    // alert( new Date('2020-01-01'))
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getdata();
    this.getAllData();
    this.getGoal();
  };
  showAlert1 = (navigation, myDate) => {
    Alert.alert(
      'Actions',
      'You want to add a Transaction',
      [
        {
          text: 'Add Transaction',
          onPress: () =>
            navigation.navigate('TransScreen', { sectedDate: myDate }),
        },
        {
          text: 'Show Details',
          onPress: () =>
            navigation.navigate('SingleTransactions', {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: 'sell',
            }),
        },
        {
          text: 'Show Pay Details',
          onPress: () =>
            navigation.navigate('SingleTransactions', {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: 'pay',
            }),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  showAlert2 = (navigation, myDate) => {
    Alert.alert(
      'Actions',
      'You want to add a Transaction',
      [
        {
          text: 'Add Transaction',
          onPress: () =>
            navigation.navigate('TransScreen', { sectedDate: myDate }),
        },
        {
          text: 'Show Details',
          onPress: () =>
            navigation.navigate('SingleTransactions', {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: 'sell',
            }),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  showAlert3 = (navigation, myDate) => {
    Alert.alert(
      'Actions',
      'You want to add a Transaction',
      [
        {
          text: 'Add Transaction',
          onPress: () =>
            navigation.navigate('TransScreen', { sectedDate: myDate }),
        },
        {
          text: 'Show Pay Details',
          onPress: () =>
            navigation.navigate('SingleTransactions', {
              sectedDate: myDate,
              transctions: this.state.allTransactions,
              type: 'pay',
            }),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  showAlert4 = (navigation, myDate) => {
    Alert.alert(
      'Actions',
      'You want to add a Transaction',
      [
        {
          text: 'Add Transaction',
          onPress: () =>
            navigation.navigate('TransScreen', { sectedDate: myDate }),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    for (let i = 0; i < nextDays.length; i++) {
      for (var j = 0; j < nextDays.length; j++) {
        if (nextDays[i] == payDates[j]) {
          matched.push(nextDays[i]);
        }
      }
    }
    nextDays.forEach(day => {
      mark[day] = { marked: true, selectedDotColor: 'yellow' };
    });
    payDates.forEach(day => {
      mark[day] = { selected: true, selectedDotColor: 'yellow' };
    });

    matched.forEach(day => {
      mark[day] = { selected: true, marked: true, selectedDotColor: 'yellow' };
    });
    var goal = 0;
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
      if (this.state.goal && this.state.goal.length > 0) {
        if (this.state.goal[month]) {
          goal = this.state.goal[month].volume;
        }
      }

      var totalSales = 0;
      for (let i = 0; i < transes.length; i++) {
        if (
          new Date(transes[i].soldDate).getMonth() == month &&
          new Date(transes[i].soldDate).getFullYear() == year
        ) {
          totalVolume += parseFloat(transes[i].volume);
          totalBonus += parseFloat(transes[i].bonus);
          totalCommission += parseFloat(transes[i].commission);
          totalSpiff += parseFloat(transes[i].spiff);
          totalSales = totalSales + 1;
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
        }>
        <NavigationEvents onDidFocus={this._onRefresh} />
        <View style={{flex:1}}>
          <CalendarList
            style={{
              width: Dimensions.get('window').width,
              flexGrow:1
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#3f3fb9',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#3f3fb9',
              selectedDotColor: '#3f3fb9',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 18,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16,
            }}
            // current={new Date(`01-${this.state.calDate}-${this.state.currYear}`)}
            // onMonthChange={(month) => {alert('month changed', month)}}
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // current={new Date( this.state.currentMonths)}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            // Set custom calendarWidth.
            calendarWidth={Dimensions.get('window').width}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              this.props.navigation.navigate('SingleTransactions', {
                sectedDate: day,
                transctions: this.state.transctions,
              });
            }}
            // disableMonthChange={true}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day =>
              this.props.navigation.navigate('TransScreen', { sectedDate: day })
            }
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMM yyyy'}
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
                : setTimeout(
                    function() {
                      this.setState({ currentMonths: months[0].dateString });
                    }.bind(this),
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
                        onPress={() =>
                          this.showAlert1(this.props.navigation, date)
                        }>
                        <Text style={{ textAlign: 'center', color: 'black' }}>
                          {date.day}
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
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
                        onPress={() =>
                          this.showAlert2(this.props.navigation, date)
                        }>
                        <Text style={{ textAlign: 'center', color: 'black' }}>
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
                      onPress={() =>
                        this.showAlert3(this.props.navigation, date)
                      }>
                      <Text style={{ textAlign: 'center', color: 'black' }}>
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
                      onPress={() =>
                        this.showAlert4(this.props.navigation, date)
                      }>
                      <Text style={{ textAlign: 'center', color: 'black' }}>
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
        <Card style={styles.cardIos}>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Total Sales: </Text>
              <Text style={styles.head1}>
                {this.state.transctions ? totalSales : '0'}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Month to Date: </Text>
              <Text style={styles.head1}>
                ${totalVolume ? this.numberWithCommas(totalVolume) : '0.00'}{' '}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Commission: </Text>
              <Text style={styles.head1}>
                $
                {totalCommission
                  ? this.numberWithCommas(totalCommission)
                  : '0.00'}{' '}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('ChangeMonthlyBonus', {
                  date: this.state.currentMonths,
                  user: this.props.user,
                });
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.head}>Bonus: </Text>
                <Text style={styles.head1}>
                  ${totalBonus ? this.numberWithCommas(totalBonus) : '0.00'}{' '}
                </Text>
              </View>
            </TouchableHighlight>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Spiff: </Text>
              <Text style={styles.head1}>
                ${totalSpiff ? this.numberWithCommas(totalSpiff) : '0.00'}{' '}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('ChangeMonthlyGoal', {
                  date: this.state.currentMonths,
                  user: this.props.user,
                });
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.head}>Goal: </Text>
                <Text style={styles.head1}>
                  $
                  {this.state.goal !== null
                    ? this.numberWithCommas(goal)
                    : '0.00'}{' '}
                </Text>
              </View>
            </TouchableHighlight>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Remaining Goal: </Text>
              <Text style={styles.head1}>
                $
                {totalIncome && this.state.goal !== null
                  ? this.numberWithCommas(goal - totalIncome)
                  : '0.00'}
              </Text>
            </View>
          </CardItem>
          <CardItem style={styles.cardHead1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>Total Pay: </Text>
              <Text style={styles.head1}>
                ${totalPay ? this.numberWithCommas(totalPay) : '0.00'}
              </Text>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  myIcons: {
    fontSize: 14,
  },
  sold: {
    // flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'silver',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 0,
    paddingTop: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 0,
        width: 40,
        height: 40,
      },
      android: {
        marginTop: -12,
        marginBottom: -2,
        width: Dimensions.get('window').width / 7 - 2.7,
        height: Dimensions.get('window').width / 7 - 2.7,
      },
    }),
  },
  pay: {
    // flexDirection: 'row',
    backgroundColor: 'yellow',
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderStyle: 'solid',

    margin: 0,
    paddingTop: 8,

    alignContent: 'center',

    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 0,
         width: 40,
        height: 40,
      },
      android: {
        marginTop: -12,
        marginBottom: -2,
        width: Dimensions.get('window').width / 7 - 2.7,
        height: Dimensions.get('window').width / 7 - 2.7,
      },
    }),
  },
  both: {
    padding: 5,
    backgroundColor: 'yellow',
    borderWidth: 0.5,
    borderColor: 'silver',
    borderStyle: 'solid',
    margin: 0,
    paddingTop: 8,
    alignContent: 'center',
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 0,
         width: 40,
        height: 40,
      },
      android: {
        marginTop: -12,
        marginBottom: -2,
        width: Dimensions.get('window').width / 7 - 2.7,
        height: Dimensions.get('window').width / 7 - 2.7,
      },
    }),
  },
  simple: {
    borderWidth: 0.5,
    paddingTop: 8,
    borderColor: 'silver',
    borderStyle: 'solid',
    margin: 0,
    alignContent: 'center',
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 0,
         width: 40,
        height: 40,
      },
      android: {
        marginTop: -12,
        marginBottom: -2,
        width: Dimensions.get('window').width / 7 - 2.7,
        height: Dimensions.get('window').width / 7 - 2.7,
      },
    }),
  },
  myIcons1: {
    fontSize: 10,
  },

  head: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    width: Dimensions.get('window').width / 2 + 30,
  },

  cardHead1: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    ...Platform.select({
      ios: {
        marginBottom: -10,
      },
      android: {
        marginBottom: -15,
      },
    }),
  },
  head1: {
    fontSize: 14,
    color: '#3f3fb9',
    alignSelf: 'center',
  },
  cardIos: {

    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        padding: 0,
        marginTop: 20,
      },
      android: {
        marginLeft: 10,
        marginRight: 10,
        padding: 0,
      },
    }),
  },
});
const mapStateToProps = state => ({
  user: state.user.userId,
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
