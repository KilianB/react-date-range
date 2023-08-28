"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = _interopRequireDefault(require("../../styles"));
var _defaultRanges = require("../../defaultRanges");
var _DayCell = require("../DayCell");
var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class DefinedRange extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleRangeChange", range => {
      const {
        onChange,
        ranges,
        focusedRange
      } = this.props;
      const selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange({
        [selectedRange.key || `range${focusedRange[0] + 1}`]: {
          ...selectedRange,
          ...range
        }
      });
    });
    this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
  }
  getRangeOptionValue(option) {
    const {
      ranges = [],
      focusedRange = []
    } = this.props;
    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }
    const selectedRange = ranges[focusedRange[0]] || {};
    return option.getCurrentValue(selectedRange) || '';
  }
  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return {
      selectedRange,
      focusedRangeIndex
    };
  }
  render() {
    const {
      headerContent,
      footerContent,
      onPreviewChange,
      inputRanges,
      staticRanges,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_styles.default.definedRangesWrapper, className)
    }, headerContent, /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.staticRanges
    }, staticRanges.map((staticRange, i) => {
      const {
        selectedRange,
        focusedRangeIndex
      } = this.getSelectedRange(ranges, staticRange);
      let labelContent;
      if (staticRange.hasCustomRendering) {
        labelContent = renderStaticRangeLabel(staticRange);
      } else {
        labelContent = staticRange.label;
      }
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)(_styles.default.staticRange, {
          [_styles.default.staticRangeSelected]: Boolean(selectedRange)
        }),
        style: {
          color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null
        },
        key: i,
        onClick: () => this.handleRangeChange(staticRange.range(this.props)),
        onFocus: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseOver: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseLeave: () => {
          onPreviewChange && onPreviewChange();
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        tabIndex: -1,
        className: _styles.default.staticRangeLabel
      }, labelContent));
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.inputRanges
    }, inputRanges.map((rangeOption, i) => /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      key: i,
      styles: _styles.default,
      label: rangeOption.label,
      onFocus: () => this.setState({
        focusedInput: i,
        rangeOffset: 0
      }),
      onBlur: () => this.setState({
        rangeOffset: 0
      }),
      onChange: value => this.handleRangeChange(rangeOption.range(value, this.props)),
      value: this.getRangeOptionValue(rangeOption)
    }))), footerContent);
  }
}
DefinedRange.propTypes = {
  inputRanges: _propTypes.default.array,
  staticRanges: _propTypes.default.array,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onPreviewChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  footerContent: _propTypes.default.any,
  headerContent: _propTypes.default.any,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  className: _propTypes.default.string,
  renderStaticRangeLabel: _propTypes.default.func
};
DefinedRange.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};
var _default = DefinedRange;
exports.default = _default;