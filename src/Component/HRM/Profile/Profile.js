import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ProfileStyle from './ProfileStyle';
import UserDetails from './UserDetails';
import JobDetails from './JobDetails';
import BankDetails from './BankDetails';
import Documents from './Documents';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../Assets/Css/Colors';
import VectorIcon from '../../../Icon/VectorIcon';
import { useDispatch, useSelector } from 'react-redux';
import LoaderOverlay from '../../../ReusableComponent/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'userDetails', title: 'User Details'},
    {key: 'jobDetails', title: 'Job Details'},
    {key: 'bankDetails', title: 'Bank Details'},
    {key: 'documents', title: 'Documents'},
  ]);
  const { ProfileData, ProfileLoading } = useSelector((state) => state.ShowProfile);
const {employee_number, joining_date} = ProfileData?.employee;


  

  const renderScene = SceneMap({
    userDetails: UserDetails,
    jobDetails: JobDetails,
    bankDetails: BankDetails,
    documents: Documents,
  });

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    AsyncStorage.removeItem("Token");
    AsyncStorage.removeItem("User");
    GoogleSignin.signOut();
    navigation.navigate('Login'); // Adjust route name as needed
  };

  return (
    <>
      <View style={ProfileStyle.container}>
        <View style={ProfileStyle.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
            }}
            resizeMode="contain"
            style={ProfileStyle.profileImage}
          />
          <View style={ProfileStyle.detailsContainer}>
            <View style={ProfileStyle.card1}>
            <VectorIcon
              icon="Feather"
              name="hash"
              size={20}
              color={Colors.Icon_theme_background_dark}
            />
              <View style={ProfileStyle.cardContent}>
                <Text style={ProfileStyle.label}>Employee Number</Text>
                <Text style={ProfileStyle.value}>{employee_number }</Text>
              </View>
            </View>
            <View style={ProfileStyle.card1}>
            <VectorIcon
              icon="Feather"
              name="calendar"
              size={20}
              color={Colors.Icon_theme_background_dark}
            />
              <View style={ProfileStyle.cardContent}>
                <Text style={ProfileStyle.label}>Joining Date</Text>
                <Text style={ProfileStyle.value}>{joining_date || ""}</Text>
              </View>
            </View>
          </View>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Dimensions.get('window').width}}
          style={ProfileStyle.tabView}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: "#33A826FF"}} // Active tab indicator
              style={{backgroundColor: '#ffffff'}} // Background color of the tab bar
              activeColor="#33A826FF" // Active tab text/icon color
              inactiveColor= {Colors.black_text_color}
              labelStyle={{fontWeight: 'bold'}} // Customize text style
            />
          )}
        />
        <TouchableOpacity
          style={ProfileStyle.logoutButton}
          onPress={handleLogout}>
          <Text style={ProfileStyle.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={ProfileStyle.modalOverlay}>
          <View style={ProfileStyle.modalContent}>
            <Text style={ProfileStyle.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={ProfileStyle.modalActions}>
              <TouchableOpacity
                style={[ProfileStyle.modalButton, ProfileStyle.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={ProfileStyle.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ProfileStyle.modalButton, ProfileStyle.confirmButton]}
                onPress={confirmLogout}>
                <Text style={ProfileStyle.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        ProfileLoading ? <LoaderOverlay/> : null
      }
    </>
  );
};

export default Profile;
