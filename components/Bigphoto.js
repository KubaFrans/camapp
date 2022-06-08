import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import CamButton from './CamButton';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native"


class Bigphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.route.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    async share() {
        Sharing.shareAsync(this.props.route.params.uri)
    }

    async delete() {
        let array = []
        array.push(this.props.route.params.details.id.toString())
        await MediaLibrary.deleteAssetsAsync(array);
        this.props.route.params.refresh()
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flex: 0.7, margin: 2, padding: 5 }}>
                    <Image
                        style={{
                            width: 350,
                            height: 450,
                            margin: 1,
                            borderRadius: 10
                        }}
                        source={{ uri: this.props.route.params.uri }}
                    />
                </View>
                <View style={{ flex: 0.1 }}><Text style={{ fontSize: 25, textAlign: "center" }}>{this.props.route.params.details.width}x{this.props.route.params.details.height}</Text></View>
                <View style={{ flex: 0.1, margin: 2, padding: 5, flexDirection: "row" }}>
                    <CamButton textOfButton="SHARE" bool={false} function={this.share.bind(this)}></CamButton>
                    <CamButton textOfButton="REMOVE" bool={false} function={this.delete.bind(this)}></CamButton>
                </View>
            </View>
        );
    }
}

export default Bigphoto;
