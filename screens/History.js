import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { totalSize } from 'react-native-dimension';
import Colors from "../Styles/Colors";
import HistoryContext from "../Context/HistoryContext";

const History = (props) => {
    const historyContext = useContext(HistoryContext);

    const handleClear = () => {
        if (!!props && props.route) {
            props.route.params.clear();
        } else {
            props.clear();
        }
        historyContext.resetHistory();
    }

    return (
        <>
            <ScrollView style={styles.body}>
                {historyContext.history.length >= 1 && historyContext.history.map((item, index) => {
                    return (
                        <Text style={styles.entry} key={index}>{item}</Text>
                    )
                })}

            </ScrollView>
            <TouchableOpacity
                style={[styles.clearButton, !historyContext.history.length ? styles.btnDiabled : {}]}
                onPress={() => handleClear()}
                disabled={!historyContext.history.length}
            >
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.blue,
        paddingHorizontal: 24,
        marginBottom: 60
    },
    entry: {
        fontSize: totalSize(3),
        fontWeight: '600',
        color: 'white',
        textAlign: 'right',
        marginVertical: totalSize(1)
    },
    clearButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 60,
        width: '100%',
        backgroundColor: Colors.orange,
        justifyContent: "center",
        alignItems: "center"
    },
    clearButtonText: {
        fontSize: totalSize(3),
        fontWeight: '500',
        color: 'white',
    },
    btnDiabled: {
        opacity: 0.5
    }
})

export default History;