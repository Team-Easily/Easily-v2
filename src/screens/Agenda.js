import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { Card } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Agenda = () => {
  const [items, setItems] = useState({});

  //   const loadItems = (day) => {
  //     setTimeout(() => {
  //       for (let i = -15; i < 85; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = timeToString(time);
  //         if (!items[strTime]) {
  //           items[strTime] = [];
  //           const numItems = Math.floor(Math.random() * 3 + 1);
  //           for (let j = 0; j < numItems; j++) {
  //             items[strTime].push({
  //               name: "Item for " + strTime + " #" + j,
  //               height: Math.max(50, Math.floor(Math.random() * 150)),
  //             });
  //           }
  //         }
  //       }
  //       const newItems = {};
  //       Object.keys(items).forEach((key) => {
  //         newItems[key] = items[key];
  //       });
  //       setItems(newItems);
  //     }, 1000);
  //   };

  //   const renderItem = (item) => {
  //     return (
  //       <View style={styles.item}>
  //         <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
  //           <Card>
  //             <Card.Content>
  //               <View
  //                 // style={{
  //                 //   flexDirection: "row",
  //                 //   justifyContent: "space-between",
  //                 //   alignItems: "center",
  //                 // }}
  //               >
  //                 <Text>{item.name}</Text>
  //               </View>
  //             </Card.Content>
  //           </Card>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Agenda
          items={items}
          style={{ borderRadius: 10 }}
          // loadItemsForMonth={loadItems}
          // renderItem={renderItem}
          // onCalendarToggled={(calendarOpened) => {
          //   console.log(calendarOpened);
          // }}

          renderDay={(loadItems) => {
            return <View />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#64646F',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 29,
  },
});

export default Agenda;
