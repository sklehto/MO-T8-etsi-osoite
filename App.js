import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221 });

  const getLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=JAcsRdRgyu1DAGalI6nGJRizSuA3m1VM&location=${address}`)
    .then(response => response.json())
    .then(data => {
      const location = {
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }
      setLocation(location)
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={location}
      >
        <Marker 
          coordinate={location}
          title={address}
        />
      </MapView>

      <TextInput 
        style={styles.input}
        placeholder='Write an address' 
        onChangeText={ address => setAddress(address) } 
        value={address} 
      />

      <View style={styles.button}>
        <Button 
          title='Show' 
          onPress={getLocation} 
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: 0,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    paddingTop: 5,
  },
});
