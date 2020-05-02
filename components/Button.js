import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import { totalSize } from 'react-native-dimension';
import Colors from "../Styles/Colors";

const Button = (props) => {
    const { text, color, width, height, onPress } = props;
    return (
        <TouchableOpacity
            onPress={() => onPress(text)}
            style={[styles.button, { width: width, height: height, backgroundColor: color, borderColor: text === "AC" ? Colors.violet : Colors.borderColor }]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        width: '100%',
    },
    buttonText: {
        fontSize: totalSize(3),
        fontWeight: '600',
        color: 'white',
    }
})

export default Button;