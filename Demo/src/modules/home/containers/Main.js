/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, TextInput} from "react-native"
import style from "./style"
import SecureTextInput from "../../common/containers/SecureTextInput"


class Main extends Component<any, any> {

  state = {
    a: '',
    b: '',
    c: '',
  }

  render() {
    const {a, b, c} = this.state

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.view}>

        <SecureTextInput inputID='HOME-MOBILE' maxLength={11} isDigit
                         style={style.inputSecure} placeholder='input only number'
                         value={a} onChangeText={(a) => this.setState({a})}/>

        <SecureTextInput inputID='HOME-NAME' maxLength={15}
                         style={style.inputSecure} placeholder='input name'
                         value={b} onChangeText={(b) => this.setState({b})}/>

        <SecureTextInput inputID='HOME-PASSWORD' maxLength={15} isPassword
                         style={style.inputSecure} placeholder='input password'
                         value={c} onChangeText={(c) => this.setState({c})}/>

        <Text style={style.comment}>The next one is TextInput of React Native</Text>
        <TextInput style={style.input}/>
        <Text style={style.text}>{a}</Text>
        <Text style={style.text}>{b}</Text>
        <Text style={style.text}>{c}</Text>
      </ScrollView>
    )
  }
}

export default Main