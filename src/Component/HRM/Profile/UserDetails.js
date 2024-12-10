import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../Assets/Css/Colors';
import ProfileStyle from './ProfileStyle';
import VectorIcon from '../../../Icon/VectorIcon';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { ProfileData } = useSelector((state) => state.ShowProfile);
  const {first_name,middle_name, last_name,gender, dob, country, state, city, pincode, address, nationality} = ProfileData?.employee;


  return (
    <ScrollView style={ProfileStyle.container} showsVerticalScrollIndicator={false}>
      {/* Personal Information Section */}
      <Text style={ProfileStyle.sectionHeader}>Personal Information</Text>
      <View style={ProfileStyle.card}>
        <VectorIcon icon="Feather" name="user" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Name</Text>
          <Text style={ProfileStyle.value}>{first_name} {middle_name} {last_name}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="calendar" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Date of Birth</Text>
          <Text style={ProfileStyle.value}>{dob}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="info" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Gender</Text>
          <Text style={ProfileStyle.value}>{gender}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="globe" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Nationality</Text>
          <Text style={ProfileStyle.value}>{nationality}</Text>
        </View>
      </View>

      {/* Current Address Section */}
      <Text style={ProfileStyle.sectionHeader}>Current Address</Text>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="globe" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Country</Text>
          <Text style={ProfileStyle.value}>{country}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="map" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>State</Text>
          <Text style={ProfileStyle.value}>{state}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="map-pin" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>City</Text>
          <Text style={ProfileStyle.value}>{city}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="hash" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Pincode</Text>
          <Text style={ProfileStyle.value}>{pincode}</Text>
        </View>
      </View>
      <View style={ProfileStyle.card}>
      <VectorIcon icon="Feather" name="home" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Address</Text>
          <Text style={ProfileStyle.value}>{address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};


export default UserDetails;
