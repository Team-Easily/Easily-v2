import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../components/emails/emails';
import { Headline, List } from 'react-native-paper';

export const GmailScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const emails = useSelector((state) => state.emails.emails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      const fetchEmailsFromGmail = async () => {
        try {
          let uri = `https://gmail.googleapis.com/gmail/v1/users/me/messages`;
          const res = await fetch(uri, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: `application/json`,
            },
          });
          const data = await res.json();
          const emailsArr = [];
          data.messages.forEach(async (message) => {
            let uri = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?key=${accessToken}`;
            const res = await fetch(uri, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: `application/json`,
              },
            });
            const data = await res.json();
            if (
              data.labelIds.includes('INBOX') &&
              data.labelIds.includes('UNREAD')
            ) {
              console.log('Data: ', data);
              // if (data.labelIds.includes('UNREAD')) {
              // const email = {
              //   id: data.id,
              //   from: data.payload.headers[19].value,
              //   subject: data.payload.headers[18].value,
              //   date: data.payload.headers[17].value,
              //   body: data.payload.body.data,
              //   snippet: data.snippet,
              //   threadId: data.threadId,
              // };
              const email = getEmail(data);
              emailsArr.push(email);
            }
            dispatch(setEmails(emailsArr));
          });
          console.log(emailsArr);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmailsFromGmail();
    }
  }, [user]);

  const getEmail = (data) => {
    let email = {
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
        email.subject = data.payload.headers[headerIndex].value;
      }
      if (data.payload.headers[headerIndex].name == 'From') {
        email.from = data.payload.headers[headerIndex].value;
      }
      if (data.payload.headers[headerIndex].name == 'Date') {
        email.date = data.payload.headers[headerIndex].value;
      }
    }
    return email;
  };

  const from = (email) => {
    return 'From: ' + email.from;
  };
  const subject = (email) => {
    return 'Subject: ' + email.subject;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Headline style={styles.headline}>
          {emails.length} emails waiting
        </Headline>

        <List.Section>
          {!!emails.length &&
            emails.map((email) => {
              return (
                <List.Accordion
                  key={email.id}
                  title={from(email)}
                  description={subject(email)}
                  left={(props) => <List.Icon {...props} icon='gmail' />}
                >
                  <List.Item title={email.snippet} titleNumberOfLines='4' />
                </List.Accordion>
              );
            })}
        </List.Section>
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
    marginTop: '1rem',
  },
});
