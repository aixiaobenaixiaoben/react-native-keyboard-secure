import {StyleSheet} from "react-native"

export default StyleSheet.create({
  input: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E1E1',
  },
  inputCursor: {
    height: 22,
    width: 2,
  },
  inputCursorFocus: {
    backgroundColor: '#6688F1'
  },
  inputText: {
    fontSize: 17,
  },
  inputTextPassword: {
    fontSize: 12,
  },
  inputPlaceholder: {
    fontSize: 17,
    color: '#BFBFBF',
  },
  inputFill: {
    flex: 1,
  },
})