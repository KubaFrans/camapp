import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Camera } from "expo-camera";
import CamRoundButton from "./CamRoundButton"
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { BackHandler } from "react-native"
import AnimatedGroup from './AnimatedGroup';


class CameraComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            selectedwb: "auto",
            selectedflashMode: "auto",
            selectedRatio: "4:3",
            selectedsize: null,
            wb: Camera.Constants.whiteBalance,
            ratio: [],
            flashMode: Camera.Constants.FlashMode,
            size: [],
        };
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
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

    changeCamera() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    async smile() {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            this.showToast()
        }
    }

    showToast() {
        ToastAndroid.showWithGravity(
            'Zrobiono zdjęcie',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.selectedRatio)
            this.setState({ size: sizes })
            this.setState({ selectedsize: this.state.size[0] })
        }
    };

    getRatios = async () => {
        if (this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync()
            this.setState({ ratio: ratios })
            this.getSizes()
        }
    };

    changewb(param) {
        this.setState({ selectedwb: param })
    }

    changefm(param) {
        this.setState({ selectedflashMode: param })
    }

    changeratio(param) {
        this.setState({ selectedRatio: param })
        this.getSizes()

    }

    changesize(param) {
        this.setState({ selectedsize: param })
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        onCameraReady={() => this.getRatios()}
                        ratio={this.state.selectedRatio}
                        whiteBalance={this.state.selectedwb}
                        pictureSize={this.state.selectedsize}
                        flashMode={this.state.selectedflashMode}
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 0.8 }}></View>
                        <View style={{ flex: 0.2, flexDirection: 'row-reverse', justifyContent: "space-around" }}>
                            <View style={{ flex: 1 }}>
                                <CamRoundButton function={this.changeCamera.bind(this)} color="#FF5252" text="Zmień kamerę"></CamRoundButton>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CamRoundButton function={this.smile.bind(this)} color="#E4E2EA"></CamRoundButton>
                            </View>
                            <View style={{ flex: 1 }}>
                                <AnimatedGroup wb={Camera.Constants.WhiteBalance} ratio={this.state.ratio} fm={this.state.flashMode} size={this.state.size} selectedwb={this.state.selectedwb} changewb={this.changewb.bind(this)} selectedfm={this.state.selectedflashMode} changefm={this.changefm.bind(this)} selectedratio={this.state.selectedRatio} changeratio={this.changeratio.bind(this)} selectedsize={this.state.selectedsize} changesize={this.changesize.bind(this)} />
                            </View>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}

export default CameraComp;