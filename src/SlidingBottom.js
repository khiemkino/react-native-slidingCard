import React, { Component } from 'react'
import { View, PanResponder, Animated,Dimensions,Platform,StyleSheet } from 'react-native'

const height = num => Dimensions.get('window').height * (num / 100)
const ISIOS = Platform.OS === 'ios'

export default class SlidingUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY({ x: 0, y: props.yDirectionStart }),
      yDirection: new Animated.Value(0),
      valueStart: 0
    }
  }
  changeDirection (value, positionY) {
    Animated.timing(this.state.pan.y, {
      toValue: value,
      delay: 0,
      duration: 300
    }).start(positionY < height(10) && this.props.zActive(-1))
  }
  changeDirectionStart (value) {
    var self = this
    setTimeout(function () {
      self.props.zActive(-1)
    }, ISIOS ? 75 : 15)
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
        if ((this.props.bottomData.length - 1) === this.props.index) return true
      },

      onPanResponderGrant: (e, gestureState) => {
        this.props.zActive(4)
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (e, gestureState) => { this.handlePanResponderMove(e, gestureState) },

      onPanResponderRelease: (e, gestureState) => {
        var positionY = -gestureState.dy
        if ((positionY + height(30)) >= height(50)) {
          this.addCardTop()
          this.props.zActive(-1)
          this.props.heightChange(100)
          this.removeCardBottom()
          this.props.yDirectionStartTop(height(50) - positionY - (this.props.marginFromBottom * 2))
        } else {
          this.changeDirection(0, positionY)
        }

        this.state.pan.flattenOffset()
      }
    })
  }

  removeCardBottom(){
    this.props.index === (this.props.bottomData.length - 1) && this.props.bottomData.splice(this.props.index, 1)
  }

  addCardTop(){
    this.props.topData.push(this.props.bottomData[this.props.index])
  }

  handlePanResponderMove (e, gestureState) {
    var positionY = -gestureState.dy
    if (positionY > 0) {
      this.state.pan.setValue({ x: 0, y: positionY })
    }
  }

  render () {
    let { pan } = this.state

    let [translateX, translateY] = [pan.x, pan.y]

    let imageStyle = { transform: [{ translateX }, { translateY }] }
    return (
      <View style={{ top: this.props.marginFromBottom, height: height(10) / this.props.bottomData.length }}>
        <Animated.View style={[imageStyle, {height: height(100)}]} {...this.panResponder.panHandlers}>
          <View style={styles.container}>
            {this.props.children}
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleY: -1 }]
  }
})
