import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Animated } from "react-native";
import GearButton from './GearButton';
import RadioGroup from './RadioGroup';

export default class AnimatedGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(600),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        this.toPos = 25
    }

    toggle() {
        if (this.isHidden) this.toPos = -125; else this.toPos = 600
        Animated.spring(
            this.state.pos,
            {
                toValue: this.toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();
        this.isHidden = !this.isHidden;
    }

    render() {
        let array = []
        array.push(
            <RadioGroup
                change={this.props.changewb}
                direction="column"
                data={Object.keys(this.props.wb).sort()}
                selected={this.props.selectedwb}
                groupName="WHITE BALANCE"
                key={0}
            />)
        array.push(
            <RadioGroup
                change={this.props.changefm}
                direction="column"
                data={Object.keys(this.props.fm).sort()}
                selected={this.props.selectedfm}
                groupName="FLASH MODE"
                key={1}
            />)
        array.push(
            <RadioGroup
                change={this.props.changeratio}
                direction="column"
                data={this.props.ratio}
                selected={this.props.selectedratio}
                groupName="CAMERA RATIO"
                key={2}
            />)
        array.push(
            <RadioGroup
                change={this.props.changesize}
                direction="column"
                data={this.props.size}
                selected={this.props.selectedsize}
                groupName="PICTURE SIZE"
                key={3}
            />)

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <ScrollView style={{ flex: 1, flexDirection: "column", overflow: "scroll" }}>
                        {array}
                    </ScrollView>
                </Animated.View>
                <GearButton function={() => { this.toggle() }} color="#FF5252" />

            </View >
        );
    }
}

var styles = StyleSheet.create({
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#212121",
        opacity: 0.4,
        height: 550,
        width: 250,
    }
});