/** @flow */
import React, {Component} from "react"
import {Keyboard as SysKeyboard, Platform, Text, TouchableOpacity, View} from "react-native"
import Feather from "react-native-vector-icons/Feather"
import Material from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import style from "./styles/Keyboard"
import * as actions from "../actions/Keyboard"
import {connect} from "react-redux"
import PropTypes from "prop-types"


const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['ABC', '0', 'DELETE'],

  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['up', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'DELETE'],
  ['123', 'SPACE', '#+='],

  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['UP', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
  ['123', 'SPACE', '#+='],

  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ['\'', '"', '=', '_', ':', ';', '?', '~', '|', '•'],
  ['+', '-', '\\', '/', '[', ']', '{', '}', 'DELETE'],
  ['123', ',', '.', '<', '>', '€', '£', '¥', 'ABC'],
]

class Keyboard extends Component<any, any> {

  state = {
    keyboardIndex: 0,
    pressKey: '',
  }

  keyboardWillShowListener: Object

  componentWillMount() {
    this.props.hide()
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener = SysKeyboard.addListener('keyboardWillShow', this.hide)
    } else {
      /** in android/app/src/main/AndroidManifest.xml,
       * change the value of android:windowSoftInputMode from adjustResize to adjustPan */
      this.keyboardWillShowListener = SysKeyboard.addListener('keyboardDidShow', this.hide)
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      SysKeyboard.dismiss()
      /** 以数字键盘展开 */
      if (this.state.keyboardIndex !== 0) {
        this.setState({keyboardIndex: 0})
        return false
      }
    }
    if (nextProps.isDigit && this.state.keyboardIndex !== 0) {
      this.setState({keyboardIndex: 0})
      return false
    }
    return true
  }

  hide = () => {
    if (this.props.visible) {
      this.props.hide()
    }
  }

  press = (key: string) => {
    if (key === '123') {
      this.setState({keyboardIndex: 0})
    } else if (key === 'ABC') {
      if (this.props.isDigit && this.state.keyboardIndex === 0) {
        this.props.hide()
      } else {
        this.setState({keyboardIndex: 1})
      }
    } else if (key === 'up') {
      this.setState({keyboardIndex: 2})
    } else if (key === 'UP') {
      this.setState({keyboardIndex: 1})
    } else if (key === '#+=') {
      this.setState({keyboardIndex: 3})
    } else if (key === 'DELETE') {
      this.props.deleteKey()
    } else if (key === 'SPACE') {
      this.props.press('')
    } else {
      this.props.press(key)
    }
  }

  getKeyElement = (key: string) => {
    const {keyboardIndex, pressKey} = this.state
    if (key === 'DELETE') {
      return key === pressKey
        ? <MaterialIcons name='backspace' size={24} color='#FFFFFF'/>
        : <Feather name='delete' size={24} color='#FFFFFF'/>
    }
    if (key === 'up') {
      return <Material name='apple-keyboard-shift' size={28} color='#FFFFFF'/>
    }
    if (key === 'UP') {
      return <Entypo name='arrow-bold-up' size={28} color='#FFFFFF'/>
    }

    let keyTextStyle = [style.keyText]
    if (keyboardIndex === 0) {
      keyTextStyle = [...keyTextStyle, style.keyTextBold]
    }
    if (key === 'ABC' || key === '123' || key === '#+=') {
      keyTextStyle = [...keyTextStyle, style.keyShiftText]
      if (keyboardIndex === 3 && key === 'ABC') {
        keyTextStyle = [...keyTextStyle, style.keyShiftSmallText]
      }
    }
    if (key === 'SPACE') {
      key = ''
    } else if (key === 'ABC' && this.props.isDigit && keyboardIndex === 0) {
      key = '完成'
    }
    return <Text style={keyTextStyle}>{key}</Text>
  }

  getRowElements = (keyboardIndex: number, rowIndex: number) => {
    const {pressKey} = this.state
    let line = keys[keyboardIndex * 4 + rowIndex]
    let elements = []

    for (let i = 0; i < line.length; i++) {
      let key = line[i]

      let keyStyle = [style.key]
      if (key === pressKey || key === 'ABC' || key === 'DELETE' || key === 'up' || key === '123' || key === '#+=' || key === 'UP') {
        keyStyle = [...keyStyle, style.keyPress]
      }
      if (keyboardIndex === 1 && key === 'up' || keyboardIndex === 2 && key === 'UP' || keyboardIndex === 3 && key === '123') {
        keyStyle = [...keyStyle, style.keyLeft]
      }
      if (keyboardIndex === 1 && key === 'DELETE' || keyboardIndex === 2 && key === 'DELETE' || keyboardIndex === 3 && (key === 'DELETE' || key === 'ABC')) {
        keyStyle = [...keyStyle, style.keyRight]
      }
      if ((keyboardIndex === 1 || keyboardIndex === 2) && (key === '123' || key === '#+=')) {
        keyStyle = [...keyStyle, style.keyBig]
      }
      let element =
        <TouchableOpacity
          key={key}
          onPress={() => this.press(key)}
          onPressIn={() => this.setState({pressKey: key})}
          onPressOut={() => this.setState({pressKey: ''})}
          style={keyStyle}
          activeOpacity={1}>
          {this.getKeyElement(key)}
        </TouchableOpacity>

      elements.push(element)
    }
    return elements
  }

  render() {
    const {visible, isDigit} = this.props
    if (!visible) {
      return <View/>
    }

    const {keyboardIndex} = this.state

    let row0Style = [style.row]
    let row1Style = [style.row]
    let row2Style = [style.row]
    let row3Style = [style.row]
    if (keyboardIndex === 1 || keyboardIndex === 2) {
      row0Style = [...row0Style, style.rowSpace]
      row1Style = [...row1Style, style.rowSpace, style.rowPaddingLeft, style.rowPaddingRight]
      row2Style = [...row2Style, style.rowSpace]
      row3Style = [...row3Style, style.rowSpace]
    }
    if (keyboardIndex === 3) {
      row0Style = [...row0Style, style.rowSpace]
      row1Style = [...row1Style, style.rowSpace]
      row2Style = [...row2Style, style.rowSpace, style.rowPaddingLeft]
      row3Style = [...row3Style, style.rowSpace]
    }

    return (
      <View style={style.keyboard}>

        <View style={style.keyboardTitle}>
          {!isDigit &&
          <Text style={style.keyboardTitleLeft}/>
          }
          <Text style={style.keyboardTitleMiddle}>安全输入</Text>
          {!isDigit &&
          <TouchableOpacity onPress={this.props.hide}>
            <Text style={style.keyboardTitleRight}>完成</Text>
          </TouchableOpacity>
          }
        </View>

        <View style={row0Style}>
          {this.getRowElements(keyboardIndex, 0)}
        </View>

        <View style={row1Style}>
          {this.getRowElements(keyboardIndex, 1)}
        </View>

        <View style={row2Style}>
          {this.getRowElements(keyboardIndex, 2)}
        </View>

        <View style={row3Style}>
          {this.getRowElements(keyboardIndex, 3)}
        </View>

      </View>
    )
  }
}

Keyboard.propTypes = {
  visible: PropTypes.bool.isRequired,
  isDigit: PropTypes.bool.isRequired,

  hide: PropTypes.func.isRequired,
  press: PropTypes.func.isRequired,
  deleteKey: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    visible: state.common.keyboard.visible,
    isDigit: state.common.keyboard.isDigit,
  }),
  dispatch => ({
    hide: () => dispatch(actions.hide()),
    press: data => dispatch(actions.press(data)),
    deleteKey: () => dispatch(actions.deleteKey()),
  })
)(Keyboard)
