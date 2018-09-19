/** @flow */
import React, {Component} from "react"
import {Text, TouchableOpacity, View, ViewPropTypes} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import style from "./styles/SecureTextInput"
import * as actions from "../actions/Keyboard"
import {connect} from "react-redux"
import PropTypes from "prop-types"


class SecureTextInput extends Component<any, any> {

  shouldComponentUpdate(nextProps) {
    /** 没有焦点时清空输入内容 */
    if (this.props.inputID !== this.props.keyboardInputID && this.props.value.length > 0 && nextProps.value.length === 0) {
      return true
    }
    /** 焦点变化 */
    if (this.props.keyboardInputID !== nextProps.keyboardInputID) {
      return true
    }
    /** 没有焦点 */
    if (this.props.inputID !== this.props.keyboardInputID) {
      return false
    }
    /** 有焦点并获得键盘输入 */
    if (this.props.inputID === nextProps.keyboardInputID && nextProps.value !== nextProps.keyboardOutput) {
      if (nextProps.keyboardOutput.length <= this.props.maxLength) {
        this.props.onChangeText(nextProps.keyboardOutput)
      } else {
        this.focus()
      }
      return false
    }
    return true
  }

  focus = () => {
    const {inputID, value, isDigit = false} = this.props
    this.props.showKeyboard(inputID, value, isDigit)
  }

  render() {
    let {
      inputID,
      value,
      placeholder = '',
      isPassword = false,
      style: inputStyle = {},
      keyboardInputID,
      clearKeyboard,
    } = this.props

    let focus = inputID === keyboardInputID
    if (isPassword) {
      value = value.replace(/\w/g, '●')
    }

    return (
      <TouchableOpacity onPress={this.focus} style={[style.input, inputStyle]} activeOpacity={1}>
        <Text style={[style.inputText, isPassword && style.inputTextPassword]}>{value}</Text>
        <View style={[style.inputCursor, focus && style.inputCursorFocus]}/>
        <Text style={style.inputPlaceholder}>{value.length === 0 && placeholder}</Text>
        <View style={style.inputFill}/>

        {focus && value.length > 0 &&
        <TouchableOpacity onPress={clearKeyboard}>
          <Ionicons name='md-close-circle' size={18} color='#B0B0B0' style={{paddingTop: 3}}/>
        </TouchableOpacity>
        }

      </TouchableOpacity>
    )
  }
}

SecureTextInput.propTypes = {
  inputID: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isDigit: PropTypes.bool,
  isPassword: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  style: ViewPropTypes.style,

  keyboardOutput: PropTypes.string.isRequired,
  keyboardInputID: PropTypes.string.isRequired,

  onChangeText: PropTypes.func.isRequired,
  showKeyboard: PropTypes.func.isRequired,
  clearKeyboard: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    keyboardOutput: state.common.keyboard.output,
    keyboardInputID: state.common.keyboard.inputID,
  }),
  dispatch => ({
    showKeyboard: (inputID, output, isDigit) => dispatch(actions.show(inputID, output, isDigit)),
    clearKeyboard: () => dispatch(actions.clear()),
  })
)(SecureTextInput)
