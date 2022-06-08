import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class CamButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.function}>
                <Text style={styles.text}>{this.props.textOfButton}</Text>
            </TouchableOpacity>
        )
    }
}

CamButton.propTypes = {
    textOfButton: PropTypes.string.isRequired,
    bool: PropTypes.bool.isRequired,
    function: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF5252",
        borderRadius: 5,
        flex: 1,
        padding: 3,
        margin: 5,
        justifyContent: "center"
    },
    text: {
        fontSize: 15,
        textAlign: "center",
        color: "#212121"
    }
})
