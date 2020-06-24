import set from '@babel/runtime/helpers/esm/set'
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, Text, Alert } from 'react-native'

const API_KEY = 'hABA9wRHOopkSJGri2ByB0XKDpxeft4l86QbzXdf'
const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/'

const STATE_PROMPT = 'STATE_PROMPT'
const STATE_RESULT = 'STATE_RESULT'


const ResultScreen = ({ name, nasa_jpl_url, is_potentially_hazardous_asteroid, handler }) => (
  <View>
    <Text>{'Name'}</Text>
    <Text>{name}</Text>
    <Text>{'NASA JPL URL'}</Text>
    <Text>{nasa_jpl_url}</Text>
    <Text>{'Is potentially hazardous asteroid'}</Text>
    <Text>{is_potentially_hazardous_asteroid}</Text>
    <Button
      title={'Back to prompt'}
      onPress={handler}
    ></Button>
  </View>
)


const ScreenPrompt = ({ asteroidId, setAsteroidId, queryById, queryRandom }) => (
  <View style={styles.formView}>
    <TextInput
      style={styles.textInput}
      placeholder={'Enter Asteroid ID'}
      onChangeText={setAsteroidId}
      value={asteroidId}
    />
    <View style={styles.buttonsView}>
      <Button
        style={styles.buttonsView}
        title={'Submit'}
        onPress={queryById}
        disabled={asteroidId.trim() == ''}
      />
      <Button style={styles.buttons} title={'Random Asteroid'} onPress={queryRandom} />
    </View>
    <Text>{asteroidId}</Text>
  </View>
)

export default function StartupScreen() {
  const [asteroidId, setAsteroidId] = useState('')
  const [appState, setAppState] = useState(STATE_PROMPT)
  const [resultData, setResultData] = useState(null)

  const queryById = async (astroId = '') => {
    console.log('query ID')
    // await fetch()
    let queryAstroId = typeof astroId === 'string' ? astroId : asteroidId
    console.log('astroId', astroId)
    console.log('asteroidId', asteroidId)
    console.log('queryAstroId', queryAstroId)
    console.log(typeof astroId)
    try {
      const URL = `${API_URL}${queryAstroId}?api_key=${API_KEY}`
      console.log(URL)
      const result = await fetch(URL, { method: 'get' })
      const parsedResult = await result.json()
      console.log(parsedResult)
      const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = parsedResult
      setResultData({
        name,
        nasa_jpl_url,
        is_potentially_hazardous_asteroid,
      })
    } catch (e) {
      Alert.alert('Error occurred, please try again later')
      console.log(e)
    }
  }

  const queryRandom = async () => {
    console.log('query random')
    try {
      const URL = `${API_URL}browse?api_key=${API_KEY}`
      console.log(URL)
      const result = await fetch(URL, { method: 'get' })
      const parsedResult = await result.json()
      let randAstroObjRowNumber
      let randomAstroId
      if (parsedResult && parsedResult.near_earth_objects) {
        randAstroObjRowNumber = (Math.random() * parsedResult.near_earth_objects.length).toFixed()
        console.log('random asteroid #', randAstroObjRowNumber)
      }
      if (
        randAstroObjRowNumber &&
        randAstroObjRowNumber >= 0 &&
        randAstroObjRowNumber < parsedResult.near_earth_objects.length
      ) {
        console.log(randAstroObjRowNumber)
        const { id } = parsedResult.near_earth_objects[randAstroObjRowNumber]
        randomAstroId = id
        console.log(randomAstroId)
        await queryById(randomAstroId)
      } else {
        Alert.alert(`Can't determine random ID`)
        return
      }
    } catch (e) {
      Alert.alert('Error occurred, please try again later')
      console.log(e)
    }
  }

  return (
    <ScreenPrompt
      asteroidId={asteroidId}
      setAsteroidId={setAsteroidId}
      queryById={queryById}
      queryRandom={queryRandom}
    />
  )
}

const styles = StyleSheet.create({
  formView: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
  },
  buttonsView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttons: {
    padding: 5,
  },
})
