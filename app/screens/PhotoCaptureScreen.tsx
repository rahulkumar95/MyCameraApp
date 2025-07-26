// app/photo.tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PhotoCaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
    }
  };

  if (!permission) return <Text>Loading...</Text>;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text>We need camera permission</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <>
          <CameraView style={styles.camera} ref={cameraRef} facing="back" />
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  camera: { width: '100%', height: 400 },
  preview: { width: 300, height: 300, borderRadius: 10, marginVertical: 20 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16 },
});
