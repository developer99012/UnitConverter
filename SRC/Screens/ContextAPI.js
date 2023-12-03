import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { windowHeight, windowWidth } from '../utils'
import { moderateScale } from 'react-native-size-matters'
import { AppContext, AppDispatchContext } from '../ContextStore'
import RNFS from 'react-native-fs';


const ContextAPI = () => {

  const { height, weight, unitType, feets, inches } = useContext(AppContext)
  const { setHeight, setWeight, setFeets, setInches, convertToImperial, convertToMetric, setUnitType } = useContext(AppDispatchContext)

  const saveToDisk = async () => {
    const dataToSave = {
      weight,
      height,
      feets,
      inches,
      unitType,
    };

    const filePath = RNFS.DocumentDirectoryPath + '/contextData.json';

    try {
      await RNFS.writeFile(filePath, JSON.stringify(dataToSave), 'utf8');
      Alert.alert('Data Saved', 'Data has been saved to disk.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data to disk.');
    }
  };

  const loadFromDisk = async () => {
    const filePath = RNFS.DocumentDirectoryPath + '/contextData.json';
    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {

        const fileContent = await RNFS.readFile(filePath);
        const loadedData = JSON.parse(fileContent);

        // Update your context state with the loaded data
        setWeight(loadedData.weight);
        setHeight(loadedData.height);
        setFeets(loadedData.feets);
        setInches(loadedData.inches);
        setUnitType(loadedData.unitType);

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
          value={`${weight}`}
          style={styles.input} onChangeText={(text) => {
            setWeight(text)
          }} />
        <Text style={styles.text}>{unitType == 'imperial' ? 'lbs' : 'kg'}</Text>
      </View>
      {unitType == 'metric' && <View style={styles.row}>
        <TextInput
          value={`${height}`}
          placeholder='Enter Height'
          placeholderTextColor={'gray'}
          style={styles.input} onChangeText={(text) => {
            setHeight(text)
          }} />
        <Text style={styles.text}>m</Text>
      </View>}
      {unitType == 'imperial' && <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TextInput
            value={`${feets}`}
            placeholder='Feets'
            placeholderTextColor={'gray'}
            style={[styles.input, { width: windowWidth * 0.35 }]}
            onChangeText={(text) => {
              setFeets(text)
            }} />
          <Text style={styles.text}>ft</Text></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TextInput
            value={`${inches}`}
            placeholder='Inches'
            placeholderTextColor={'gray'}

            style={[styles.input, { width: windowWidth * 0.35 }]}
            onChangeText={(text) => {
              setInches(text)
            }} />
          <Text style={styles.text}>in</Text></View>
      </View>}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            convertToImperial()
          }}
          style={[styles.button,
          {
            borderTopStartRadius: moderateScale(20, .6),
            borderBottomStartRadius: moderateScale(20, .6),
            backgroundColor: unitType === 'imperial' ? 'green' : 'white'
          }]}>
          <Text style={[styles.text, { color: unitType == 'imperial' ? 'white' : 'black' }]}>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            convertToMetric()
          }}
          style={[styles.button,
          {
            borderTopEndRadius: moderateScale(20, .6),
            borderBottomEndRadius: moderateScale(20, .6),
            backgroundColor: unitType == 'metric' ? 'green' : 'white'
          }]}>
          <Text style={[styles.text, { color: unitType == 'metric' ? 'white' : 'black' }]}>Metric</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => saveToDisk()}
        style={[styles.button, { borderRadius: moderateScale(40, .6), backgroundColor: 'green' }]}>
        <Text style={styles.text}>Save To Disk</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ContextAPI

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