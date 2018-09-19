/** @flow */
import {handleActions} from "redux-actions"

import {KEYBOARD_CLEAR, KEYBOARD_DELETE, KEYBOARD_HIDE, KEYBOARD_PRESS, KEYBOARD_SHOW} from "../Constants"


type State = {
  visible: boolean,
  isDigit: boolean,
  inputID: string,
  output: string,
}

const initialState: State = {
  visible: false,
  isDigit: false,
  inputID: '',
  output: '',
}

export default handleActions(
  {
    [KEYBOARD_SHOW]: (state: State, action) => {
      const {inputID, isDigit, output} = action.payload
      return {
        ...state,
        visible: true,
        inputID,
        isDigit,
        output,
      }
    },
    [KEYBOARD_HIDE]: (state: State, action) => {
      return {
        ...state,
        visible: false,
        inputID: '',
        isDigit: false,
        output: '',
      }
    },
    [KEYBOARD_PRESS]: (state: State, action) => {
      return {
        ...state,
        output: state.output + action.payload.key,
      }
    },
    [KEYBOARD_DELETE]: (state: State, action) => {
      let output = state.output
      return {
        ...state,
        output: output.substring(0, output.length - 1),
      }
    },
    [KEYBOARD_CLEAR]: (state: State, action) => {
      return {
        ...state,
        output: '',
      }
    },
  },
  initialState)
