import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SlidingUpCard from 'react-native-slidingcard'
const width = num => Dimensions.get('window').width * (num / 100)
const height = num => Dimensions.get('window').height * (num / 100)

const imgSample1 = require('./img/braum.jpg')
const imgSample2 = require('./img/draven.jpg')
const imgSample3 = require('./img/ahri.jpg')
const imgSample4 = require('./img/braum.jpg')
const imgSample5 = require('./img/poppy.jpg')
const dataSample = [{ key: 0, image: imgSample1 }, { key: 1, image: imgSample2 },
{ key: 2, image: imgSample3 }, { key: 3, image: imgSample4 }, { key: 4, image: imgSample5 }]

export default class App extends PureComponent {

  _onpressSample() {
    alert('Hello to amazing react native')
  }

  render() {
    return (
      <View style={styles.container}>
        <SlidingUpCard
          onPress={this._onpressSample.bind(this)}
          styleCard={styles.imgCardSize}
          marginFromBottom={height(5)}
          data={dataSample} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imgCardSize: {
    marginLeft: width(5),
    height: height(32),
    width: width(90),
    borderRadius: 9
  },
});
