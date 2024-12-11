import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../../Assets/Css/Colors';
import DocumentPicker from 'react-native-document-picker';
import VectorIcon from '../../../Icon/VectorIcon';
import { useSelector } from 'react-redux';

const Documents = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [staticDocuments, setStaticDocuments] = useState([]);

  
  const { ProfileData } = useSelector((state) => state.ShowProfile);
  useEffect(()=>{
    if (ProfileData) {
      setStaticDocuments(ProfileData?.documents)
    }
  },[])


  const uploadDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setUploadedDocuments(prevDocs => [
        ...prevDocs,
        { name: result[0].name, uri: result[0].uri },
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document selection canceled');
      } else {
        console.error('Error uploading document', err);
      }
    }
  };

  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentCard}>
          <VectorIcon icon='Feather' name="file" size={20} color={Colors.Icon_theme_background_dark} />
      <Text style={styles.documentText}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={ProfileStyle.container} showsVerticalScrollIndicator={false}>
      {/* Upload Button */}
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
          <VectorIcon icon='Feather' name="upload" size={20} color={Colors.white_text_color}/>
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
      </View>

      {/* Static Document List */}
      <Text style={styles.sectionTitle}>Documents</Text>
      <FlatList
        data={staticDocuments}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={renderDocumentItem}
        contentContainerStyle={styles.documentList}
      />

      {/* Uploaded Documents List */}
      {uploadedDocuments.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          <FlatList
            data={uploadedDocuments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDocumentItem}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.documentList}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue_yonder_color,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // marginTop: 20,
    color: '#333',
  },
  documentList: {
    marginTop: 10,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth : 0.5,
    borderColor : 'black'
  },
  documentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Documents;
