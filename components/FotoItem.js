import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TouchableOpacityBase } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: "none",
            borderColor: "white",
            borderWidth: 1
        };
    }

    add() {
        if (this.state.border == "none") {
            this.setState({
                border: "solid",
                borderColor: "green",
                borderWidth: 3
            })
        } else {
            this.setState({
                border: "none",
                borderColor: "white",
                borderWidth: 0
            })
        }
        this.props.push()
    }

    render() {
        return (
            <TouchableOpacity onLongPress={() => this.props.navigation.navigate("bigphoto", { uri: this.props.uri, refresh: this.props.refresh, details: this.props.data })} onPress={this.add.bind(this)}>
                <ImageBackground
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        margin: 1,
                        border: this.state.border,
                        borderColor: this.state.borderColor,
                        borderWidth: this.state.borderWidth
                    }}
                    source={{ uri: this.props.uri }}
                ><Text style={{ color: "red", textAlign: "right", fontSize: 15, fontWeight: "bold" }}>{this.props.data.id}</Text></ImageBackground>
            </TouchableOpacity>
        );
    }
}

export default FotoItem;
