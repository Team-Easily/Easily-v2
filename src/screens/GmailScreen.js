import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../components/emails/emails';
import { Headline, Title, List } from 'react-native-paper';

export const GmailScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const emails = useSelector((state) => state.emails.emails);
  const dispatch = useDispatch();
  const he = require('he');

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
              const email = getEmail(data);
              emailsArr.push(email);
            }
            dispatch(setEmails(emailsArr));
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmailsFromGmail();
    }
  }, [user]);

  const from = (email) => {
    return 'From: ' + email.from;
  };
  const subject = (email) => {
    return 'Subject: ' + email.subject;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {emails.length !== 0 ? (
          <View>
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
                      color={'#333333'}
                      left={(props) => (
                        <List.Icon {...props} icon='gmail' color={'#07A6A0'} />
                      )}
                    >
                      <List.Item
                        title={he.decode(email.snippet)}
                        titleNumberOfLines='4'
                        color='#666666'
                        titleStyle={styles.snippet}
                      />
                    </List.Accordion>
                  );
                })}
            </List.Section>
          </View>
        ) : (
          <View>
            <Headline style={styles.headline}>No emails to show.</Headline>
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
    paddingHorizontal: 12,
  },
  headline: {
    width: '100%',
    textAlign: 'center',
    marginTop: '2rem',
    color: '#2c497f',
    marginBottom: 13,
    fontSize: '1.7rem',
    fontWeight: '500',
  },
  snippet: {
    lineHeight: '1.3rem',
    fontSize: '1rem',
    color: '#333333',
  },
});
