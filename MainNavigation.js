import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import NFC from './Screens/Nfc'
import P2P from './Screens/P2P'

const TopTab = createMaterialTopTabNavigator()

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <TopTab.Navigator>
                <TopTab.Screen name='NFC' component={NFC} />
                <TopTab.Screen name='P2P' component={P2P} />
            </TopTab.Navigator>
        </NavigationContainer>
    )
}