import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const UploadImage = ({
  title,
  theme,
  typeImage,
  onSelectImage,
  touched,
  errors,
}) => {
  const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      marginTop: 12,
      textAlign: 'center',
    },
    imagePickerContainer: {
      marginBottom: 20,
    },
    imagePickerLabel: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.noteText,
    },
    imagePickerButton: {
      borderWidth: 1,
      borderColor: theme.noteText,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    selectedImage: {
      width: '100%',
      height: 200,
      marginTop: 8,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.imagePickerContainer}>
      <Text style={styles.imagePickerLabel}>{title} (dưới 1MB)</Text>
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={onSelectImage}>
        <Text style={{color: theme.text}}>
          {typeImage ? 'Thay đổi ảnh' : 'Chọn ảnh'}
        </Text>
      </TouchableOpacity>
      {typeImage && (
        <Image
          source={{uri: typeImage.uri}}
          style={styles.selectedImage}
          resizeMode="cover"
        />
      )}
      {touched && errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

export default UploadImage;
