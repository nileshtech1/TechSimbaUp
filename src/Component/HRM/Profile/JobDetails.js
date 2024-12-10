import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../Assets/Css/Colors';
import ProfileStyle from './ProfileStyle';
import VectorIcon from '../../../Icon/VectorIcon';
import { useSelector } from 'react-redux';

const JobDetails = () => {
  const { ProfileData } = useSelector((state) => state.ShowProfile);
  const {location} = ProfileData?.location;
  const {joining_date} = ProfileData?.employee;
  // const {reporting_manager} = ProfileData?.reporting_manager;
  const {name} = ProfileData?.reporting_teamleader;

  const workData = {
    reportingManager: 'Jane Smith',
  };

  return (
    <ScrollView style={ProfileStyle.container} showsVerticalScrollIndicator={false}>
      {/* Section Header */}
      <Text style={ProfileStyle.sectionHeader}>Work Information</Text>

      {/* Work Location */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="map-pin" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Work Location</Text>
          <Text style={ProfileStyle.value}>{location}</Text>
        </View>
      </View>

      {/* Joining Date */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="calendar" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Joining Date</Text>
          <Text style={ProfileStyle.value}>{joining_date}</Text>
        </View>
      </View>

      {/* Reporting Manager */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="user" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Reporting Manager</Text>
          <Text style={ProfileStyle.value}>{workData.reportingManager}</Text>
        </View>
      </View>

      {/* Reporting Team Leader */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="users" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Reporting Team Leader</Text>
          <Text style={ProfileStyle.value}>{name}</Text>
        </View>
      </View>
    </ScrollView>
  );
};



export default JobDetails;
