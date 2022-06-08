import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class GearButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{
                backgroundColor: this.props.color,
                borderRadius: 100,
                flex: 1,
                padding: 3,
                margin: 5,
                justifyContent: "center",
                opacity: 0.3
            }} onPress={this.props.function}>
                <ImageBackground
                    style={{
                        flex: 0.9
                    }}
                    source={require('../gfx/gearico.png')}>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

GearButton.propTypes = {
    function: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF5252",
        borderRadius: 100,
        flex: 1,
        padding: 3,
        margin: 5,
        justifyContent: "center"
    },
})
