import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './SRC/Navigator/Navigation'
import { AppProvider } from './SRC/ContextStore'

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppProvider>


  )
}

export default App

const styles = StyleSheet.create({})