import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import * as Font from "expo-font";

class StartGeo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../gg.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#E91E63" }}>
                {
                    this.state.fontloaded
                        ?
                        <TouchableOpacity style={{ flex: 1, backgroundColor: "#C2185B", justifyContent: "center", alignItems: "center" }} onPress={() => this.props.navigation.navigate("gallery")}>
                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 60,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> Camera App</Text>

                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 22,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> show gallery pictures </Text>

                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 22,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> take picture from camera </Text>

                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 22,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> save photo to device </Text>

                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 22,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> delete photo from device </Text>

                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 22,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}> share photo </Text>
                        </TouchableOpacity>
                        :
                        null
                }

            </View>
        );
    }
}

export default StartGeo;
