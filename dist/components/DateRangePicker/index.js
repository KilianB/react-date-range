"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactPopper = require("react-popper");
var _styles = _interopRequireDefault(require("../../styles"));
var _utils = require("../../utils");
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DateRangePicker = props => {
  const [focusedRange, setFocusedRange] = (0, _react.useState)([(0, _utils.findNextRangeIndex)(props.ranges), 0]);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const stylesRef = (0, _react.useRef)((0, _utils.generateStyles)([_styles.default, props.classNames]));
  const dateRangeRef = (0, _react.useRef)();
  const [referenceElement, setReferenceElement] = (0, _react.useState)(null);
  const [popperElement, setPopperElement] = (0, _react.useState)(null);
  const [state, setState] = (0, _react.useState)([{
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  }]);
  const clickTrackRef = (0, _utils.useClickOutside)(() => {
    setIsOpen(false);
  });
  const {
    styles,
    attributes
  } = (0, _reactPopper.usePopper)(referenceElement, popperElement, {
    placement: 'left-start',
    strategy: 'fixed',
    modifiers: [{
      name: 'flip',
      enabled: false
    }]
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: clickTrackRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(stylesRef.current.dateRangePickerWrapper, props.className)
  }, isOpen && /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: setPopperElement,
    style: {
      ...styles.popper,
      zIndex: 100
    }
  }, attributes.popper), /*#__PURE__*/_react.default.createElement(_DefinedRange.default, _extends({
    focusedRange: focusedRange,
    onPreviewChange: value => {
      dateRangeRef.current.updatePreview(value ? dateRangeRef.current.calcNewSelection(value, typeof value === 'string') : null);
    }
  }, props, {
    range: props.ranges[focusedRange[0]],
    className: undefined
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({
    onRangeFocusChange: focusedRange => setFocusedRange(focusedRange),
    focusedRange: focusedRange,
    editableDateInputs: true,
    className: undefined,
    onChange: item => {
      setState([item.selection]);
      props.onChange && props.onChange(item);
    },
    ranges: state
  }, props, {
    isOpen: isOpen,
    onVisibilityChange: visible => {
      setIsOpen(visible);
    },
    ref: dateRangeRef,
    inputRef: setReferenceElement
  })))));
};
DateRangePicker.defaultProps = {
  ranges: [{
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  }]
};
DateRangePicker.propTypes = {
  ..._DateRange.default.propTypes,
  ..._DefinedRange.default.propTypes,
  className: _propTypes.default.string
};
var _default = DateRangePicker;
exports.default = _default;