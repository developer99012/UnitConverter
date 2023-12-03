import { StyleSheet, Text, TextInput, TouchableOpacity, View , Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeight, windowWidth } from '../utils'
import { moderateScale } from 'react-native-size-matters'
import Metric from '../Components/Metric'
import Imperial from '../Components/Imperial'
import appStore from '../AppStore'
import { observer } from 'mobx-react'
import RNFS from 'react-native-fs';


const Mobx = observer(() => {

    const saveToDisk = async () => {
        const dataToSave = {
            weight:appStore.weight,
            height:appStore.height,
            feets:appStore.feets,
            inches:appStore.inches,
            unitType:appStore.unitType,
        };

        const filePath = RNFS.DocumentDirectoryPath + '/mobxData.json';

        try {
            await RNFS.writeFile(filePath, JSON.stringify(dataToSave), 'utf8');
            Alert.alert('Data Saved', 'Data has been saved to disk.');
        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save data to disk.');
        }
    };

    const loadFromDisk = async () => {
        const filePath = RNFS.DocumentDirectoryPath + '/mobxData.json';
        try {
            const fileExists = await RNFS.exists(filePath);
            if (fileExists) {
                const fileContent = await RNFS.readFile(filePath);
                const loadedData = JSON.parse(fileContent);

                // Update your context state with the loaded data
                appStore.setWeight(loadedData.weight);
                appStore.setHeight(loadedData.height);
                appStore.setFeets(loadedData.feets);
                appStore.setInches(loadedData.inches);
                appStore.setUnitType(loadedData.unitType);

                Alert.alert('Data Loaded', 'Data has been loaded from disk.');
            }

        } catch (error) {
            console.error('Error loading data:', error);
            Alert.alert('Error', 'Failed to load data from disk.');
        }

    };

    useEffect(() => {
        loadFromDisk()
    }, [])





    return (
        <View style={styles.mainContainer}>
            <View style={styles.row}>
                <TextInput
                    placeholder='Enter weight'
                    placeholderTextColor={'gray'}
                    value={`${appStore.weight}`}

                    style={styles.input} onChangeText={(text) => {
                        appStore.setWeight(text)
                    }} />
                <Text style={styles.text}>{appStore.unitType == 'imperial' ? 'lbs' : 'kg'}</Text>
            </View>
            {appStore.unitType == 'metric' && <Metric height={appStore.height} />}
            {appStore.unitType == 'imperial' && <Imperial feets={appStore.feets} inches={appStore.inches} />}
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => {
                        appStore.convertToImperial()
                        // appStore.setUnitType('imperial')
                        // setUnitType(appStore.unitType)
                    }}
                    style={[styles.button,
                    {
                        borderTopStartRadius: moderateScale(20, .6),
                        borderBottomStartRadius: moderateScale(20, .6),
                        backgroundColor: appStore.unitType === 'imperial' ? 'green' : 'white'
                    }]}>
                    <Text style={[styles.text, { color: appStore.unitType == 'imperial' ? 'white' : 'black' }]}>Imperial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // appStore.setUnitType('metric')
                        // setUnitType(appStore.unitType)
                        appStore.convertToMetric()

                    }

                    }
                    style={[styles.button,
                    {
                        borderTopEndRadius: moderateScale(20, .6),
                        borderBottomEndRadius: moderateScale(20, .6),
                        backgroundColor: appStore.unitType == 'metric' ? 'green' : 'white'
                    }]}>
                    <Text style={[styles.text, { color: appStore.unitType == 'metric' ? 'white' : 'black' }]}>Metric</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=> saveToDisk()} style={[styles.button, { borderRadius: moderateScale(40, .6), backgroundColor: 'green' }]}>
                <Text style={styles.text}>Save To Disk</Text>
            </TouchableOpacity>


        </View>
    )
})

export default Mobx

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        backgroundColor: 'black'
    },
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
        // backgroundColor:'red',
        borderRadius: moderateScale(40, .6),
        padding: moderateScale(15, .6),
        color: 'white'

    },
    text: {
        color: 'white',
        fontSize: moderateScale(15, .6),
        textAlign: 'center',

    },
    button: {
        width: windowWidth * 0.45,
        // backgroundColor: 'green',
        paddingVertical: moderateScale(15, .6),

    }

})