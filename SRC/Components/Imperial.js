import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../utils'
import { moderateScale } from 'react-native-size-matters'
import appStore from '../AppStore'

const Imperial = ({feets, inches}) => {
    return (
        <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TextInput
                    value={`${feets}`}
                    placeholder='Feets'
                    placeholderTextColor={'gray'}
                    style={[styles.input, { width: windowWidth * 0.35 }]}
                    onChangeText={(text) => {
                        appStore.setFeets(text)
                    }} />
                <Text style={styles.text}>ft</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TextInput
                    value={`${inches}`}
                    placeholder='Inches'
                    placeholderTextColor={'gray'}

                    style={[styles.input, { width: windowWidth * 0.35 }]}
                    onChangeText={(text) => {
                        appStore.setInches(text)
                    }} />
                <Text style={styles.text}>in</Text></View>
        </View>
    )
}

export default Imperial

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
        color: 'white'

    },
    text: {
        color: 'white',
        fontSize: moderateScale(15, .6),
        textAlign: 'center',

    }
})