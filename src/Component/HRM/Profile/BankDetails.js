import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../Assets/Css/Colors';
import ProfileStyle from './ProfileStyle';
import VectorIcon from '../../../Icon/VectorIcon';
import { useSelector } from 'react-redux';

const BankDetails = () => {
  const { ProfileData } = useSelector((state) => state.ShowProfile);
  const {account_name, account_number, bank, ifsc_code, branch} = ProfileData?.employee;



  return (
    <ScrollView style={ProfileStyle.container} showsVerticalScrollIndicator={false}>
      {/* Section Header */}
      <Text style={ProfileStyle.sectionHeader}>Compensation Details</Text>

      {/* Bank Name */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="briefcase" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Bank Name</Text>
          <Text style={ProfileStyle.value}>{bank || "N/A"}</Text>
        </View>
      </View>

      {/* Account Name */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="user" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Account Name</Text>
          <Text style={ProfileStyle.value}>{account_name || "N/A"}</Text>
        </View>
      </View>

      {/* Account Number */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="hash" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Account Number</Text>
          <Text style={ProfileStyle.value}>{account_number || "N/A"}</Text>
        </View>
      </View>

      {/* IFSC Code */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="code" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>IFSC Code</Text>
          <Text style={ProfileStyle.value}>{ifsc_code || "N/A"}</Text>
        </View>
      </View>

      {/* Branch */}
      <View style={ProfileStyle.card}>
        <VectorIcon icon='Feather' name="map-pin" size={20} color={Colors.Icon_theme_background_dark} />
        <View style={ProfileStyle.cardContent}>
          <Text style={ProfileStyle.label}>Branch</Text>
          <Text style={ProfileStyle.value}>{branch || "N/A"}</Text>
        </View>
      </View>
    </ScrollView>
  );
};



export default BankDetails;
