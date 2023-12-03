import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../utils'
import { moderateScale } from 'react-native-size-matters'
import AppStore from '../AppStore'

const Metric = ({height}) => {

    return (
        <View style={styles.row}>
            <TextInput
                value={`${height}`}
                placeholder='Enter Height'
                placeholderTextColor={'gray'}
                style={styles.input} onChangeText={(text) => {
                    AppStore.setHeight(text)
                }} />
            <Text style={styles.text}>m</Text>
        </View>
    )
}

export default Metric

const styles = StyleSheet.create({
    row: {
        width: windowWidth * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateScale(10, .3),
    },
    input: {
        width: windowWidth * 0.8,
        borderColor: 'white',
        borderWidth: 2,
        marginRight: moderateScale(10, .3),
        borderRadius: moderateScale(40, .6),
        padding: moderateScale(15, .6),
        color:'white'

    },
    text: {
        color: 'white',
        fontSize: moderateScale(15, .6),
        textAlign: 'center',

    },
})