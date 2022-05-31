import React from 'react';
import { View, ScrollView } from 'react-native';
import { Game } from './components/Game';
import { styles } from './components/Styles';

export default function App() {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Game />
      </ScrollView>
    </View>
  );
}