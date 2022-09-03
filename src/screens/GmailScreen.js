import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { handleSignoutClick } from '../components/GmailJS';
import { handleAuthClick } from '../components/GmailJS';

export const GmailScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
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
            if (data.labelIds.includes('UNREAD')) {
              const email = {
                id: data.id,
                from: data.payload.headers[15].value,
                subject: data.payload.headers[14].value,
                date: data.payload.headers[17].value,
                body: data.payload.body.data,
                snippet: data.snippet,
                threadId: data.threadId,
              };
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>{emails.length}</Text>
          {/* 
          {emails.map((email) => <EmailAccordian props={email}/>)}
        */}
          {!!emails.length &&
            emails.map((email) => {
              return <Text key={email.id}>{email.subject}</Text>;
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
