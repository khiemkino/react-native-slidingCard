import React, { Component } from 'react'
import { View, PanResponder, StyleSheet, Animated,Dimensions,Platform } from 'react-native'

const height = num => Dimensions.get('window').height * (num / 100)
const ISIOS = Platform.OS === 'ios'

export default class SlidingUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY({ x: 0, y: props.yDirectionStartTop }),
      yDirection: new Animated.Value(0)
    }
  }

  changeDirection () {
    Animated.timing(this.state.pan.y, {
      toValue: 0,
      delay: 0,
      duration: 300
    }).start()
  }

  changeDirectionStart (value) {
    var self = this
    setTimeout(function () {
      self.props.heightChange(50)
    }, ISIOS ? 75 : 25)
    Animated.timing(this.state.pan.y, {
      toValue: value,
      delay: 0,
      duration: 200
    }).start()
  }

  componentWillMount () {
    this.changeDirectionStart(0)
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if ((this.props.topData.length - 1) === this.props.index) {
          var dy = gestureState.dy
          var dx = gestureState.dx
          if (dy > 15) { return true }
          if (dx > 15) { return true }
        }
      },

      onPanResponderGrant: (e, gestureState) => {
        this.props.heightChange(100)
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (e, gestureState) => { this.handlePanResponderMove(e, gestureState) },

      onPanResponderRelease: (e, gestureState) => {
        var positionY = gestureState.dy
        if ((positionY + height(30)) >= height(50)) {
          this.addCardBottom()
          this.props.heightChange(50)
          this.props.zActive(4)
          this.removeCardTop()
          this.props.yDirectionStart(height(50) - positionY - this.props.marginFromBottom)
        } else {
          this.changeDirection()
          this.props.heightChange(50)
        }

        this.state.pan.flattenOffset()
      }
    })
  }

  removeCardTop(){
    this.props.index === (this.props.topData.length - 1) 
    && this.props.topData.splice(this.props.index, 1)
  }

  addCardBottom(){
    this.props.bottomData.push(this.props.topData[this.props.index])
  }

  handlePanResponderMove (e, gestureState) {
    var positionY = gestureState.dy
    if (positionY > 0) {
      this.state.pan.setValue({ x: 0, y: positionY })
    }
  }

  render () {
    let { pan } = this.state

    let [translateX, translateY] = [pan.x, pan.y]

    let rotate = '0deg'

    let imageStyle = { transform: [{ translateX }, { translateY }, { rotate }] }

    return (
      <View style={styles.container}>
        <Animated.View style={imageStyle} {...this.panResponder.panHandlers}>
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
