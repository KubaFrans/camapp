import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class CamRoundButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{
                backgroundColor: this.props.color,
                borderRadius: 100,
                flex: 1,
                padding: 3,
                margin: 5,
                justifyContent: "center"
            }} onPress={this.props.function}>
                <Text style={{ textAlign: 'center', fontSize: 30 }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

CamRoundButton.propTypes = {
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
    text: {
        fontSize: 50,
        textAlign: "center",
        color: "black"
    }
})
