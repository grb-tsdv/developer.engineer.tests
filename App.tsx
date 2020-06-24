import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native'
import { withNavigationItem } from 'react-native-navigation-hybrid'
import { Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import StartupScreen from './src';

function App() {
  return (
    <>
      <SafeAreaView>
        <StartupScreen />
      </SafeAreaView>
    </>
  )
}

export default App
