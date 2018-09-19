/** @flow */
import {KEYBOARD_CLEAR, KEYBOARD_DELETE, KEYBOARD_HIDE, KEYBOARD_PRESS, KEYBOARD_SHOW} from "../Constants"

export type Action = {
  type: string,
  payload?: Object,
}

export const show = (inputID: string, output: string = '', isDigit: boolean = false): Action => {
  return {
    type: KEYBOARD_SHOW,
    payload: {
      inputID,
      isDigit,
      output,
    }
  }
}

export const hide = (): Action => {
  return {
    type: KEYBOARD_HIDE,
  }
}

export const press = (key: string = ''): Action => {
  return {
    type: KEYBOARD_PRESS,
    payload: {
      key,
    }
  }
}

export const deleteKey = (): Action => {
  return {
    type: KEYBOARD_DELETE,
  }
}

export const clear = (): Action => {
  return {
    type: KEYBOARD_CLEAR,
  }
}
