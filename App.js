import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function App() {
  const [images, setImages] = useState([]);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.cancelled) {
        if(result.selected) {
          setImages(result.selected);
        } else {
          setImages([result])
        }
      }
    } catch (e) {
      console.log("Error: ", e)
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title='Pick up pictures' onPress={pickImage} />
      {images.length > 0 ? (
        <FlatList 
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
        />
      ) : (
        <Text type="title">No images selected yet.</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  image: {
    width: 300,
    height: 150
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
