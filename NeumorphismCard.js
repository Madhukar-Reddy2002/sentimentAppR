import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RADIUS = 10;

const NeumorphismCard = ({ children, style, borderColor }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const lightShadowColor = '#ffffff';
  const darkShadowColor = '#000000';
  const backgroundColor = isPressed ? '#cfd8dc' : '#eceff1';
  const shadowColor = isPressed ? lightShadowColor : isPressed ? darkShadowColor : '#b0bec5';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, style, { borderColor }]}
    >
      <View style={[styles.neumorphism, { backgroundColor, shadowColor, borderColor }]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: '#cfd8dc', // Default border color
    marginVertical: 20,
  },
  neumorphism: {
    borderRadius: RADIUS,
    shadowColor: '#fff',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default NeumorphismCard;