import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';

const Marquee = ({ text }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: 190, // Move to the left
            duration: 6000, // Adjust speed
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 0, // Move back to the right
            duration: 6000, // Adjust speed
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [scrollX, screenWidth]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.marqueeText,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    height: 40,
    justifyContent: 'center',
  },
  marqueeText: {
    fontSize: 18,
    color: '#000',
    whiteSpace: 'nowrap',
    position: 'absolute',
  },
});

export default Marquee;
