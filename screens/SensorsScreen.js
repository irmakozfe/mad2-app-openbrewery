import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { Accelerometer } from 'expo-sensors';

import { palette, serif } from '../utils/theme';

export default function SensorsScreen({navigation}){
    const [data, setData] = useState({x: 0, y:0, z:0});

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);
        const subscription = Accelerometer.addListener((reading) => {
            setData(reading);
        });

        return () => subscription.remove();
    } , []);

    const round = (value) => value.toFixed(3);


    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction color = {palette.amber} onPress={() => navigation.goBack()}/>
                <Appbar.Content title = "Sensors" ></Appbar.Content>    
            </Appbar.Header>

            <Card mode= "contained">
            <Card.Title title ="Accelerometer"></Card.Title>
            <Card.Content>
                <Text>X: {round(data.x)}</Text>
                <Text>Y: {round(data.y)}</Text>
                <Text>Z: {round(data.z)}</Text>
            </Card.Content>
            </Card>

        </View>
    );
    
    
}


