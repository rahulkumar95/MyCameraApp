// screens/HomeScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <Button title="Take a Photo" onPress={() => router.push('../screens/PhotoCaptureScreen')} />
      <View style={{ height: 10 }} />
      <Button title="Check Explicit Permissions" onPress={() => router.push('../screens/ExplicitPermissionScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, marginBottom: 20 },
});

export default HomeScreen;
