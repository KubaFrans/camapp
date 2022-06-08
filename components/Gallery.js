import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Dimensions } from "react-native";
import { ToastAndroid } from "react-native";
import { ActivityIndicator } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import FotoItem from './FotoItem';
import CamButton from './CamButton';
import { BackHandler } from "react-native"

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numColumns: 4,
            measurements: [94, 60],
            data: [],
            dataSet: false,
            dataToDelete: [],
        };
    }

    async componentDidMount() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        this.galleryGenerator()
    }

    async galleryGenerator() {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        this.setState({ data: obj.assets, dataSet: true })
        //alert(JSON.stringify(obj.assets, null, 4))
    }

    async refresh() {
        this.setState({ data: [], dataSet: false })
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        this.setState({ data: obj.assets, dataSet: true })
        this.render()
    }

    changeOfGrid() {
        if (this.state.numColumns == 4) {
            this.setState({ numColumns: 1, measurements: [382, 150] })
        } else {
            this.setState({ numColumns: 4, measurements: [94, 60] })
        }
        this.render()
    }

    openCamera() {
        this.props.navigation.navigate("camera", { refresh: this.refresh.bind(this) })
    }

    push(param) {
        let array = this.state.dataToDelete
        if (array.indexOf(param) == -1) {
            array.push(param)
            this.setState({ dataToDelete: array })
        } else {
            array.splice(array.indexOf(param), 1)
            this.setState({ dataToDelete: array })
        }
    }

    async deleteMany() {
        if (this.state.dataToDelete.length != 0) {
            await MediaLibrary.deleteAssetsAsync(this.state.dataToDelete);
            this.refresh()
        } else {
            this.toastInfo()
        }
    }

    toastInfo() {
        ToastAndroid.showWithGravity(
            'Brak elementów do usunięcia',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.15, flexDirection: 'row' }}>
                    <CamButton textOfButton="GRID/LIST" bool={false} function={this.changeOfGrid.bind(this)}></CamButton>
                    <CamButton textOfButton="OPEN CAMERA" bool={false} function={this.openCamera.bind(this)} ></CamButton>
                    <CamButton textOfButton="REMOVE SELECTED" bool={false} function={this.deleteMany.bind(this)}></CamButton>
                </View>
                <View style={{ flex: 1.8 }}>
                    {
                        this.state.dataSet == false ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            <FlatList
                                data={this.state.data}
                                numColumns={this.state.numColumns}
                                key={this.state.numColumns}
                                renderItem={({ item, index }) => <FotoItem uri={this.state.data[index].uri} data={this.state.data[index]} width={this.state.measurements[0]} height={this.state.measurements[1]} navigation={this.props.navigation} keyExtractor={(item, index) => index.toString()} refresh={this.refresh.bind(this)} push={this.push.bind(this, this.state.data[index].id)} />}
                            />
                    }
                </View>
            </View>
        );
    }
}

export default Gallery;
