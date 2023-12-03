import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mobx from '../Screens/Mobx'
import ContextAPI from '../Screens/ContextAPI'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { windowHeight } from '../utils'
import { moderateScale } from 'react-native-size-matters'

const MainNavigator = () => {
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator initialRouteName='BottomTab' screenOptions={{ headerShown: false }}>
            <stack.Screen name='BottomTab' component={Navigation} />
        </stack.Navigator>)
}

const Navigation = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator initialRouteName='Mobx'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    elevation: 11,
                    height: windowHeight * 0.07,
                    
                },
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: moderateScale(18, .6),
                    paddingVertical: moderateScale(10, .6),
                    marginBottom: moderateScale(1, .3),

                },
                
                tabBarActiveTintColor: 'white',
                tabBarActiveBackgroundColor: 'green'

            }}>
            <Tab.Screen name='Mobx' component={Mobx} />
            <Tab.Screen name='ContextAPI' component={ContextAPI} />
        </Tab.Navigator>

    )
}

export default MainNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: 'white',
    }
})


