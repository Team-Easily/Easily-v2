import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendars } from '../components/calendars/calendars';
import { Headline, Title, List } from 'react-native-paper';

export const GCalsEvents = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const calendars = useSelector((state) => state.calendars.calendars);
  const dispatch = useDispatch();

  const getCalendar = (data) => {
    let calendar = {
      id: data.id,
      body: data.payload.body.data,
      snippet: data.snippet,
      threadId: data.threadId,
    };
    for (
      let headerIndex = 0;
      headerIndex < data.payload.headers.length;
      headerIndex++
    ) {
      if (data.payload.headers[headerIndex].name == 'Subject') {
        calendar.subject = data.payload.headers[headerIndex].value;
      }
      if (data.payload.headers[headerIndex].name == 'From') {
        calendar.from = data.payload.headers[headerIndex].value;
      }
      if (data.payload.headers[headerIndex].name == 'Date') {
        calendar.date = data.payload.headers[headerIndex].value;
      }
    }
    return calendar;
  };

  getEvents = (data) => {
    const event = {
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    };

    const events = response.result.items;
    if (!events || events.length == 0) {
      // document.getElementById('content').innerText = 'No events found.';
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
      (str, event) =>
        `${str}${event.summary} (${
          event.start.dateTime || event.start.date
        })\n`,
      'Events:\n'
    );
    // document.getElementById('content').innerText = output;
  };

  useEffect(() => {
    if (user.uid) {
      const fetchEventsFromCalendar = async () => {
        try {
          let uri = `https://www.googleapis.com/calendar/v3/calendars/primary/events/`;
          const res = await fetch(uri, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: `application/json`,
            },
          });
          const data = await res.json();
          const eventsArr = [];
          data.events.forEach(async (event) => {
            let uri = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}?key=${accessToken}`;

            const res = await fetch(uri, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: `application/json`,
              },
            });
            const data = await res.json();
          });
          console.log('DATA: ', data);

          //   if (
          //     data.labelIds.includes('INBOX') &&
          //     data.labelIds.includes('UNREAD')
          //   ) {
          //     const calendar = getCalendar(data);
          //     calendarsArr.push(calendar);
          //   }
          //   dispatch(setCalendars(calendarsArr));
          // });
          // console.log(calendarsArr);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEventsFromCalendar();
    }
  }, [user]);

  // const from = (calendar) => {
  //   return 'From: ' + calendar.from;
  // };
  // const subject = (calendar) => {
  //   return 'Subject: ' + calendar.subject;
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {calendars.length !== 0 ? (
          <View>
            <Headline style={styles.headline}>
              {calendars.length} calendars waiting
            </Headline>
            <List.Section>
              {!!calendars.length &&
                calendars.map((calendar) => {
                  return (
                    <List.Accordion
                      key={calendar.id}
                      title={from(calendar)}
                      description={subject(calendar)}
                      left={(props) => <List.Icon {...props} icon='gmail' />}
                    >
                      <List.Item
                        title={calendar.snippet}
                        titleNumberOfLines='4'
                      />
                    </List.Accordion>
                  );
                })}
            </List.Section>
          </View>
        ) : (
          <View>
            <Headline style={styles.headline}>No calendars to show.</Headline>
            <Title style={styles.headline}>Did you Login with Google?</Title>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollView: {
    marginHorizontal: 10,
  },
  headline: {
    width: '100%',
    textAlign: 'center',
    marginTop: '1.5rem',
  },
});
