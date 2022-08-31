import React from 'react';
import { Avatar } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';

export const AvatarComponent = (props) => {
  if (props.user.imageUrl !== '') {
    return (
      <Image
        style={styles.avatar}
        source={{
          uri: props.user.imageUrl,
        }}
      />
    );
  }
  return (
    <Avatar.Text
      size={100}
      label={props.user.userName[0]}
      style={{ marginBottom: 30 }}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
});
