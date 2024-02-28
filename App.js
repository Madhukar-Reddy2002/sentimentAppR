import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import axios from 'axios';
import ResultsCard from './ResultPage';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [inputText, setInputText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const ballTranslateX = useRef(new Animated.Value(0)).current;
  const ballElevation = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    if (!Easing) {
      console.error('Error: Easing is undefined. Please import it from react-native.');
      return;
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
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
  };

  const handleInputChange = (text) => setInputText(text);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://sentimentapi2-production.up.railway.app/analyze', {
        text: inputText,
      });

      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  const themeColors = {
    background: isDarkTheme ? '#263238' : '#eceff1',
    text: isDarkTheme ? '#ffffff' : '#000000',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.box}>
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
        <TextInput
          style={[styles.input, { color: themeColors.text, borderColor: themeColors.text }]}
          placeholder="Enter text..."
          value={inputText}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit </Text>
        </TouchableOpacity>
        {sentiment && (
          <View style={styles.resultsBox}>
            <ResultsCard sentiment={sentiment} themeColors={themeColors} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'transperant',
    alignItems: 'center',
  },
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
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#64b5f6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
  },
  resultsBox: {
    marginTop: 20,
  },
});

export default App;