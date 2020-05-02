import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { totalSize } from 'react-native-dimension';
import Button from "../components/Button";
import Colors from "../Styles/Colors";
import History from "./History";
import HistoryContext from "../Context/HistoryContext";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.'];
const operators = ['/', 'x', '-', '+', '='];

const HomeScreen = (props) => {

    const historyContext = useContext(HistoryContext);

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    /**
     * Returns true if the screen is in portrait mode
     */
    isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    /**
     * Returns true of the screen is in landscape mode
     */
    isLandscape = () => {
        const dim = Dimensions.get('screen');
        return dim.width >= dim.height;
    };

    const [firstNum, setFirstNum] = useState(0);
    const [secondNum, setSecondNum] = useState(0);
    const [operation, setOperation] = useState(null);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
    const [dimensions, setDimensions] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });

    onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setDimensions({ width, height });
    }

    const clear = () => {
        setFirstNum(null);
        setSecondNum(null);
        setOperation(null);
        setResult(null);
    }

    const clearHistory = () => {
        setHistory([]);
    }

    const handleSubmit = () => {
        let calcResult = "";
        let parsedFirstNum = parseFloat(firstNum);
        let parsedSecondNum = parseFloat(secondNum);
        if (operation === "/") {
            calcResult = parsedFirstNum / parsedSecondNum;
            setResult(calcResult);
        } else if (operation === "x") {
            calcResult = parsedFirstNum * parsedSecondNum;
            setResult(calcResult);
        } else if (operation === "-") {
            calcResult = parsedFirstNum - parsedSecondNum;
            setResult(calcResult);
        } else if (operation === "+") {
            calcResult = parsedFirstNum + parsedSecondNum;
            setResult(calcResult);
        }
        if (firstNum && parsedSecondNum && operation) {
            let resultString = `${parsedFirstNum} ${operation} ${parsedSecondNum} = ${calcResult}`;
            let index = history.findIndex(x => x === resultString);
            if (index < 0) {
                let newResult = [...history, resultString]
                setHistory([...newResult]);
                historyContext.updateHistory(newResult);
            }
        }
    }

    const handleSetNumbers = (value) => {
        if (!!result) {
            clear();
            setFirstNum(value)
        } else {
            if (!!operation) {
                let val = secondNum + value;
                setSecondNum(val);
            } else {
                let val = firstNum + value;
                setFirstNum(val);
            }
        }
    }

    const handleSetOperation = (value) => {
        setOperation(value);
    }

    const getKeypadContainerStyles = () => {
        let style = {};
        if(isLandscape()) {
            style = { flex: 1, width: dimensions.width / 2, height: dimensions.height * 0.75 };
        } else {
            style = { flex: 1, width: dimensions.width, height: dimensions.height * 0.75 };
        }
        return style;
    }

    const getDigitsContainerStyles = () => {
        let style = {};
        if(isLandscape()) {
            style = Object.assign({}, { width: (dimensions.width / 2) * 0.75, height: dimensions.height * 0.75 })
        } else {
            style = Object.assign({}, { width: (dimensions.width) * 0.75, height: dimensions.height * 0.75 })
        }
        return style;
    }

    const getKeypadButtonWidth = (digit) => {
        let width = 0;
        if(isLandscape()) {
            if(digit == 0) {
                width = ((dimensions.width / 2) * 0.75) * (1 / 3) * 2;
            } else {
                width = ((dimensions.width / 2) * 0.75) * (1 / 3);
            }
        } else {
            if(digit == 0) {
                width = (dimensions.width * 0.75) * (1 / 3) * 2;
            } else {
                width = (dimensions.width * 0.75) * (1 / 3);
            }
        }
        return width;
    }

    const getACButtonWidth = () => {
        let width = 0;
        if(isLandscape()) {
            width = (dimensions.width / 2) * 0.75;
        } else {
            width = (dimensions.width) * 0.75
        }
        return width;
    }

    return (
        <View onLayout={(event) => onLayout(event)} style={styles.body}>
            <View style={isLandscape() ? { flex: 1, width: dimensions.width / 2 } : { flex: 1, width: dimensions.width }}>
                <View style={styles.sectionContainer}>
                    {!isLandscape() && (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("History", {
                                data: history,
                                clear: clearHistory,
                            })}
                        >
                            <Text style={styles.sectionTitle}>History</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.inputText}>{!!firstNum && `${firstNum} ${!!operation ? operation : ""} ${!!secondNum ? secondNum : ""}`}</Text>
                    <Text style={styles.resultText}>{result == 0 ? 0 : result}</Text>
                </View>
                <View style={[styles.keypad, getKeypadContainerStyles()]}>
                    <View style={[styles.digitsContainer, getDigitsContainerStyles()]}>
                        <Button
                            width={getACButtonWidth()}
                            height={(dimensions.height * 0.75) * 0.2}
                            text={'AC'}
                            color={Colors.orange}
                            onPress={() => clear()}
                        />
                        {
                            digits.map((digit, index) => {
                                return (
                                    <View key={index}>
                                        <Button
                                            width={getKeypadButtonWidth(digit)}
                                            height={(dimensions.height * 0.75) * 0.2}
                                            text={digit}
                                            color={Colors.purple}
                                            onPress={handleSetNumbers}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{ width: isLandscape() ? (dimensions.width / 2) * 0.25 : (dimensions.width) * 0.25 }}>
                        {operators.map((operator, index) => {
                            return (
                                <View key={index}>
                                    <Button
                                        width={isLandscape() ? (dimensions.width / 2) * 0.25 : (dimensions.width) * 0.25}
                                        height={(dimensions.height * 0.75) * 0.2}
                                        text={operator}
                                        color={Colors.violet}
                                        onPress={operator === '=' ? handleSubmit : handleSetOperation}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
            {
                isLandscape() && (
                    <View style={{ width: dimensions.width / 2 }}>
                        <History
                            history={history}
                            clear={clearHistory}
                        />
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: Colors.blue,
        flex: 1,
        flexDirection: "row"
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 0,
    },
    digitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    sectionContainer: {
        marginTop: 10,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: totalSize(2),
        fontWeight: '500',
        color: Colors.link,
        textAlign: 'right',
        marginBottom: 20
    },
    inputText: {
        fontSize: totalSize(2),
        fontWeight: '400',
        color: 'white',
        textAlign: 'right'
    },
    resultText: {
        fontSize: totalSize(4),
        fontWeight: '600',
        color: 'white',
        textAlign: 'right',
        paddingTop: 10
    },
});

export default HomeScreen;