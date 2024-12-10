import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoaderOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loaderText}>Authenticating...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loaderContainer: {
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  loaderText: {
    left : 10,
    color: '#5C5C5CEE',
    fontSize: 14,
    
  },
});

export default LoaderOverlay;
