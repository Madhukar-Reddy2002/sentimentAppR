import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const ResultsCard = ({ sentiment, themeColors }) => {
  const { label, subjectivity, polarity } = sentiment;

  // State for border color
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    if (label === 'Positive') {
      setBorderColor('#30820d');
    } else if (label === 'Negative') {
      setBorderColor('#e21212');
    } else {
      setBorderColor('#dcad2e');
    }
  }, [label]);

  return (
    <View style={[styles.resultsCard, { borderColor:'black' }]}>
      <Text style={[styles.resultText, { color: themeColors.text }]}>
        Sentiment: {label}
      </Text>
      <View style={styles.card}>
        <View style={[styles.circularProgressContainer, { borderColor:'#f39c12' }]}>
          <Text style={[styles.labelText, { color: themeColors.text }]}>
            Subjectivity:
          </Text>
          {subjectivity !== null && (
            <>
              <CircularProgress
                value={subjectivity * 100}
                radius={80}
                progressValueColor={'#ecf0f1'}
                activeStrokeColor={'#f39c12'}
                inActiveStrokeColor={'#9b59b6'}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={20}
                activeStrokeWidth={40}
              />
            </>
          )}
        </View>
        <View style={[styles.circularProgressContainer, { borderColor }]}>
          <Text style={[styles.labelText, { color: themeColors.text }]}>
            Polarity:
          </Text>
          {polarity !== null && (
            <>
              <CircularProgress
                value={polarity * 100}
                radius={80}
                progressValueColor={'#ecf0f1'}
                activeStrokeColor={borderColor}
                inActiveStrokeColor={'#9b59b6'}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={20}
                activeStrokeWidth={40}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsCard: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  resultText: {
    textAlign: 'center',
    width: 400,
    fontSize: 25,
    marginTop: 5,
    marginBottom: 10,
  },
  circularProgressContainer: {
    padding: 10,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  labelText: {
    fontSize: 16,
  },
  progressLabelText: {
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default ResultsCard;