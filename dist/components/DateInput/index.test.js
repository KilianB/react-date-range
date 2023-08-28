"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _index = _interopRequireDefault(require("./index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const date = new Date('01/01/2021');
describe('DateInput tests', () => {
  const onChange = jest.fn();
  const onFocus = jest.fn();
  test('Should set invalidFormat in state to true', () => {
    const isDateInRange = jest.fn();
    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy'
    }));
    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'fooo'
      }
    });
    input.simulate('keydown', {
      key: 'Enter'
    });
    expect(wrapper.state().invalid.invalidFormat).toEqual(true);
  });
  test('Should set outOfRange in state to true', () => {
    const isDateInRange = jest.fn(() => false);
    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy'
    }));
    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'Dec 8, 2021'
      }
    });
    input.simulate('keydown', {
      key: 'Enter'
    });
    expect(wrapper.state().invalid.outOfRange).toEqual(true);
  });
  test('Should call this.props.onChange if valid date', () => {
    const isDateInRange = jest.fn(() => true);
    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy'
    }));
    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'Dec 8, 2021'
      }
    });
    input.simulate('keydown', {
      key: 'Enter'
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});