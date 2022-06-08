import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let array = []
        console.log(this.props)
        this.props.data.map((item) => {
            if (item != this.props.selected)
                array.push(<TouchableOpacity style={{ flex: 1, flexDirection: 'row', padding: 5 }} onPress={() => this.props.change(item)}>
                    <View style={{ width: 30, height: 30, border: "solid", borderRadius: 100, borderWidth: 4, borderColor: "#E91E63", margin: 5 }}></View>
                    <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                </TouchableOpacity>)
            else
                array.push(<TouchableOpacity style={{ flex: 1, flexDirection: 'row', padding: 5 }} onPress={() => this.props.change(item)}>
                    <View style={{ width: 30, height: 30, border: "solid", borderRadius: 100, borderWidth: 4, borderColor: "#E91E63", margin: 5, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 15, height: 15, backgroundColor: "#E91E63", borderRadius: 100, }}></View>
                    </View>
                    <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                </TouchableOpacity>)
        })
        return (
            <View style={{ flex: 1, flexDirection: this.props.direction }}>
                <Text style={{ fontSize: 20, color: "white" }}>{this.props.groupName}</Text>
                {array}
            </View>
        );
    }
}
