import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import * as Location from 'expo-location';

export default function LocationScreen(){
    const [message, setMessage] = useState("Location not requested yet");

    const getLocation = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted"){
            setMessage("Permission denied");
            return;
        }

        const {coords} = await Location.getCurrentPositionAsync({});

        setMessage(`Lat: ${coords.latitude.toFixed(5)}, Lon: ${coords.longitude.toFixed(5)}`);
    }


        return (
            <View style = {{flex: 1, padding: 16}}>
                <Card>
                    <Card.Content>
                        <Text>{message}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode = "contained" onPress={getLocation}>Use my location</Button>
                    </Card.Actions>
                </Card>
            </View>
        );

}