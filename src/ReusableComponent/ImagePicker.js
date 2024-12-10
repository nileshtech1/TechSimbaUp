import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = ({ onImageSelected, image }) => {
    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 1 },
            response => {
                if (!response.didCancel && !response.errorCode) {
                    onImageSelected(response.assets[0]);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <Button title="Select Image" onPress={selectImage} />
            {image && <Image source={{ uri: image.uri }} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default ImagePicker;
