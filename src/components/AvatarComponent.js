import React from 'react';
import { Avatar } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export const AvatarComponent = () => {
  const user = useSelector((state) => state.auth.currentUser);

  if (user.imageUrl !== '') {
    console.log('AVATAR', user);
    return (
      <Image
        style={styles.avatar}
        source={{
          uri: user.imageUrl,
        }}
      />
    );
  }
  return (
    <Avatar.Text
      size={100}
      label={user.userName[0]}
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
