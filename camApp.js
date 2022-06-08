import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainCamera from './components/MainCamera'
import Gallery from './components/Gallery';
import Bigphoto from './components/Bigphoto';
import Camera from './components/CameraComp';

const Stack = createNativeStackNavigator();

function camApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="main"
                    component={MainCamera}
                    options={{
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="gallery"
                    component={Gallery}
                    options={{
                        title: 'Gallery',
                        headerStyle: {
                            backgroundColor: '#C2185B',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'default',
                            fontSize: 22
                        },
                    }} />
                <Stack.Screen
                    name="bigphoto"
                    component={Bigphoto}
                    options={{
                        title: 'Zdjęcie',
                        headerStyle: {
                            backgroundColor: '#C2185B',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'default',
                            fontSize: 22
                        },
                    }} />
                <Stack.Screen
                    name="camera"
                    component={Camera}
                    options={{
                        title: 'Kamera',
                        headerStyle: {
                            backgroundColor: '#C2185B',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'default',
                            fontSize: 22
                        },
                    }} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default camApp;