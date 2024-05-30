import { Pressable, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Button } from '@rneui/themed';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BarCodeScanningResult } from 'expo-camera/build/legacy/Camera.types';

const Camera = (setReadQR : Function, setQrData : Function,) => {
  function onBarcodeScanned(result : BarCodeScanningResult){
    if (result) {
      setQrData(result);
      ToastAndroid.show(result.data, 3);
    } else {
      ToastAndroid.show("Unrecognized", 3);
    }
    setReadQR(false);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        autofocus='on'
        mode='picture'
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setReadQR(false)}>
              <Text style={styles.text}>Exit Camera</Text>
            </TouchableOpacity>
          </View>
      </CameraView>
    </View>
  );
}

export default function IndexScreen() {
  const [readQR, setReadQR] = useState<boolean>(false);
  const [qrData, setQrData] = useState<BarCodeScanningResult | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  requestPermission();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>
          Go to Settings to allow use of Camera
        </Text>
      </View>
    )
  }

  function toggleCameraActivation(){
    setReadQR((status) => !status);
  }

  if (readQR){
    return Camera(setReadQR, setQrData);
  }

  return (
    <View style={styles.container}>
      <Pressable>
        <Button onPress={toggleCameraActivation}>Read QR</Button>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
