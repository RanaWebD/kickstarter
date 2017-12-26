import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <LinearGradient colors={['#214d77', '#214d77']} style={styles.containerStyle}>
      {props.children}
    </LinearGradient>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    width: 100 + '%',
    backgroundColor: '#fff',
    borderColor: '#ddd'
  }
};

export default CardSection;
