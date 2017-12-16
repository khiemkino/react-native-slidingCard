# react-native-slidingCard
[![npm version](https://badge.fury.io/js/react-native-slidingcard.svg)](https://badge.fury.io/js/react-native-slidingcard)

## Installation
```
npm install react-native-slidingCard --save
```
or
```
yarn add react-native-slidingCard
```

## Preview

![App preview](/example.gif)

## Props

### Card props

| Props    | type   | description                                                                                             | required | default                          |
|:----------|:--------|:---------------------------------------------------------------------------------------------------------|:----------------------------------|:------------|
| styleCard    | object | style of card sliding up & down | yes |{    marginLeft: width(5),height: height(32),width: width(90),borderRadius: 9}
| marginFromBottom    | object | spacing from bottom | no | height(5)
| data | array | card data for render card image | yes | 0 |
| onPress | func | event active when card sliding to top | no | false |


## Usage example
**- Require key image in card data**

```javascript
import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SlidingUpCard from 'react-native-slidingcard'
const width = num => Dimensions.get('window').width * (num / 100)
const height = num => Dimensions.get('window').height * (num / 100)

// Change your image link
const imgSample1 = require('./img/braum.jpg')
const imgSample2 = require('./img/draven.jpg')
const imgSample3 = require('./img/ahri.jpg')
const imgSample4 = require('./img/braum.jpg')
const imgSample5 = require('./img/poppy.jpg')
const dataSample = [{ key: 0, image: imgSample1 }, { key: 1, image: imgSample2 },
{ key: 2, image: imgSample3 }, { key: 3, image: imgSample4 }, { key: 4, image: imgSample5 }]

export default class Example extends PureComponent {

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

```

## Next version()

Any suggestion and contributions are welcome. 
Please contact me if you get anything error - Email: khiemkino@gmail.com.
                                            - Facebook:https://www.facebook.com/khiemdn
