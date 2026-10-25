import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import * as Location from 'expo-location';

export default function LocationScreen(){
    const [message, setMessage] = useState("Location not requested yet");
    const [location, setLocation] = useState(null);
    const [permission, setPermission] = useState(null);

    const getLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync();
        setPermission(result);
        if (result.status!== "granted"){
            setMessage("Permission denied");
            return;
        }

        setMessage("Getting Location...");
        const {coords} = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        setMessage("Location received!");
    }


        return (
            <View style = {{flex: 1, padding: 16}}>
                <Card>
                    <Card.Content>
                        <Text>{message}</Text>
                        {location && (
                            <>
                                <Text>Latitude: {location.latitude.toFixed(5)}</Text>
                                <Text>Longitude: {location.longitude.toFixed(5)}</Text>
                            </>
                        )}
                        { permission && (
                            <Text>
                                status: {permission.status}, granted: {String(permission.granted)}, canAskAgain: {String(permission.canAskAgain)}
                            </Text>
                        )}
                    </Card.Content>
                    <Card.Actions>
                        <Button mode = "contained" onPress={getLocation}>Use my location</Button>
                    </Card.Actions>
                </Card>
            </View>
        );

}