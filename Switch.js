// Switch.js
import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';

const Switch = ({ isDarkTheme, toggleTheme }) => {
  const ballTranslateX = useRef(new Animated.Value(isDarkTheme ? 35 : 0)).current;
  const ballElevation = useRef(new Animated.Value(isDarkTheme ? 5 : 2)).current;

  useEffect(() => {
    if (!Easing) {
      console.error('Error: Easing is undefined. Please import it from react-native.');
      return;
    }
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(ballTranslateX, {
        toValue: isDarkTheme ? 35 : 0,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(ballElevation, {
        toValue: isDarkTheme ? 5 : 2,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isDarkTheme]);

  return (
    <View style={styles.outerSwitchContainer}>
      <TouchableOpacity style={styles.switchContainer} onPress={toggleTheme}>
        <Animated.View style={[styles.innerSwitch, { elevation: ballElevation }]}>
          <Animated.View
            style={[
              styles.ball,
              { transform: [{ translateX: ballTranslateX }] },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerSwitchContainer: {},
  switchContainer: {
    width: 70,
    height: 35,
    borderRadius: 70 / 2,
    backgroundColor: '#e0e0e0',
    shadowColor: '#c4c4c4',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  innerSwitch: {
    flex: 1,
    borderRadius: 70 / 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#64b5f6',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    elevation: 2,
  },
});

export default Switch;