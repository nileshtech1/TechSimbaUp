import {StyleSheet} from 'react-native';
import Colors from '../../../Assets/Css/Colors';

export default ProfileStyle = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  imageContainer: {
    // flex : 0.5,
    alignItems : 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom : 10
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: Colors.white_text_color,
    borderRadius: 8,
    shadowColor: Colors.black_text_color,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth : 0.5,
    borderColor : 'black'
  },
  cardContent: {
    marginLeft: 15,
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
  logoutButton: {
    marginTop: 20,
    backgroundColor: Colors.theme_background_dark,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.white_text_color,
    fontSize: 16,
    fontWeight: '600',
  },
  DialogStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.begonia_color,
  },
  confirmButton: {
    backgroundColor: Colors.theme_background_dark,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  tabView: {
    marginTop: 20,
  },
  tabContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.theme_background_dark,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection : 'row',
  },
  detailRow: {
    marginBottom: 10,
  },
  card1: {
    flex : 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.white_text_color,
    borderRadius: 8,
    shadowColor: Colors.black_text_color,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth : 0.5,
    borderColor : 'black'
  },
});
