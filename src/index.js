import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import SlidingUp from './SlidingUp'
import SlidingBottom from './SlidingBottom'

const ISIOS = Platform.OS === 'ios'
const width = num => Dimensions.get('window').width * (num / 100)
const height = num => Dimensions.get('window').height * (num / 100)

export default class SlidingUpCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topData: [],
      bottomData: props.data,
      zIdxActive: 1,
      iHeightChange: 50,
      iDirectionStart: 0,
      iDirectionStartTop: 0
    }
    this.changeZActive = this.changeZActive.bind(this)
    this.changeYDirectionStart = this.changeYDirectionStart.bind(this)
    this.changeYDirectionStartTop = this.changeYDirectionStartTop.bind(this)
    this.changeHeightChange = this.changeHeightChange.bind(this)
  }

  changeZActive(zIdxActive) {
    this.setState({ zIdxActive })
  }

  changeYDirectionStart(iDirectionStart){
    this.setState({ iDirectionStart })
  }

  changeYDirectionStartTop(iDirectionStartTop){
    this.setState({ iDirectionStartTop })
  }

  changeHeightChange(iHeightChange){
    this.setState({ iHeightChange })
  }


  render() {
    const { topData, bottomData, iDirectionStartTop,
      zIdxActive, iHeightChange, iDirectionStart } = this.state
    const { marginFromBottom = height(5),onPress,
      styleCard = styles.imgCardSize
      } = this.props
    return (
      <View style={styles.container}>

        <View style={[styles.topContainer, { height: height(iHeightChange) }]}>
          {topData.map((item, index) => {
            return (
              <SlidingUp
                key={item.key}
                index={index}
                topData={topData}
                bottomData={bottomData}
                marginFromBottom={marginFromBottom}
                yDirectionStartTop={iDirectionStartTop}
                zActive={this.changeZActive}
                heightChange={this.changeHeightChange}
                yDirectionStart={this.changeYDirectionStart}>
                <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
                  <Image source={item.image} style={styleCard} />
                </TouchableHighlight>
              </SlidingUp>
            )
          })}
        </View>

        {/* Token card bottom container */}
        <View style={[styles.bottomContainer, { zIndex: zIdxActive }]}>
          {bottomData.map((item, index) => {
            return (
              <SlidingBottom
                key={item.key}
                index={index}
                topData={topData}
                marginFromBottom={marginFromBottom}
                bottomData={bottomData}
                yDirectionStart={iDirectionStart}
                zActive={this.changeZActive}
                heightChange={this.changeHeightChange}
                yDirectionStartTop={this.changeYDirectionStartTop}>
                <Image source={item.image} style={styleCard} />
              </SlidingBottom>
            )
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    top: height(ISIOS ? 4.5 : 1.5),
    zIndex: 0,
    position: 'relative'
  },
  bottomContainer: {
    height: height(100),
    transform: [{ scaleY: -1 }],
    position: 'absolute'
  },
  imgCardSize: {
    marginLeft: width(5),
    height: height(32),
    width: width(90),
    borderRadius: 9
  },
});

