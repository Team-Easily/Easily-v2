import { Title } from 'react-native-paper';

export const getModalText = (points) => {
  switch (points) {
    case points === 10:
      return (
        <Title style={{ textAlign: 'center' }}>
          You're doing great!
          <br /> Keep up the momentum!
        </Title>
      );
    case points === 20:
      return (
        <Title style={{ textAlign: 'center' }}>
          Look at you!
          <br /> You're on a roll!
        </Title>
      );
    case points === 30:
      return (
        <Title style={{ textAlign: 'center' }}>
          Need some fresh air?
          <br /> Grab some vitamin D to recharge!
        </Title>
      );
    case points === 40:
      return (
        <Title style={{ textAlign: 'center' }}>
          Time to celebrate!
          <br /> You're amazing!
        </Title>
      );
    case points === 50:
      return (
        <Title style={{ textAlign: 'center' }}>
          Wow, you must be exhausted!
          <br /> You deserve a nap now.
        </Title>
      );
    default:
      return (
        <Title style={{ textAlign: 'center' }}>
          You're doing great!
          <br /> Keep up the momentum!
        </Title>
      );
  }
};

export const getModalImage = (points) => {
  switch (points) {
    case points === 10:
      return './assets/coffee-maker.gif';
    //   return '../assets/coffee-maker.gif';
    case points === 20:
      return './src/assets/scooter.gif';
    case points === 30:
      return './src/assets/sunshine.gif';
    case points === 40:
      return './src/assets/flags-garland.gif';
    case points === 50:
      return './src/assets/polar-bear.gif';
    default:
      return './src/assets/coffee-maker.gif';
  }
};
