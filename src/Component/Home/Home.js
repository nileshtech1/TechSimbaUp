import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Colors from '../../Assets/Css/Colors';
import VectorIcon from '../../Icon/VectorIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowProfileApi } from '../../Redux/API/ShowProfileApi';
import { useDispatch } from 'react-redux';
import { shortcuts } from '../../Assets/StaticData/Data';

const Home = ({navigation}) => {
  const [user, setUser] = useState('')
  const dispatch= useDispatch();
  // Define shortcut data with icons
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('User');
        if (data) {
          const userData = JSON.parse(data);
         setUser(userData)
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(ShowProfileApi());
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
          }}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Text style={styles.Title}>Welcome : {user?.name}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.card1}>
            <VectorIcon
              icon="Feather"
              name="hash"
              size={20}
              color={Colors.theme_background_dark}
            />
            <View style={styles.cardContent}>
              <Text style={styles.label}>Employee Number</Text>
              <Text style={styles.value}>TS0004</Text>
            </View>
          </View>
          <View style={styles.card1}>
            <VectorIcon
              icon="Feather"
              name="calendar"
              size={20}
              color={Colors.theme_background_dark}
            />
            <View style={styles.cardContent}>
              <Text style={styles.label}>Joining Date</Text>
              <Text style={styles.value}>2024-11-01</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {shortcuts.map((shortcut, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(shortcut.route)}>
            {/* Render icon */}
            {shortcut.icon == 'megaphone' ? (
              <VectorIcon
                icon="MaterialIcons"
                name="announcement"
                size={30}
                color="#fff"
              />
            ) : (
              <VectorIcon
              icon={shortcut.icon === 'rupee-sign' ? 'FontAwesome5' : 'Feather'}
                name={shortcut.icon}
                size={30}
                color="#fff"
              />
            )}
            <Text style={styles.cardText}>{shortcut.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  card: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: Colors.theme_background_dark,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10, // Add spacing between icon and text
    textAlign: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    top: -150,
    left: -10,
    width: 350,
    height: 350,
    borderRadius: 225,
    backgroundColor: Colors.theme_background
  },
  backgroundCircle2: {
    position: 'absolute',
    right: 100,
    bottom: -100,
    width: 350,
    height: 350,
    borderRadius: 200,
    backgroundColor: Colors.theme_background
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  card1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#FFFFFFA8",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  label: {
    fontSize: 14,
    color: Colors.granite_Gray_color,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: Colors.black_text_color,
    fontWeight: '600',
  },
  cardContent: {
    marginLeft: 15,
  },
  Title: {
    fontSize: 18,
    color: Colors.black_text_color,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

export default Home;
