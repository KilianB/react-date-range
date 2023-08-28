"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isEqual = _interopRequireDefault(require("date-fns/isEqual"));
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
var _parse = _interopRequireDefault(require("date-fns/parse"));
var _format = _interopRequireDefault(require("date-fns/format"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class DateInput extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "isValid", value => {
      return {
        isValidFormat: (0, _isValid.default)(value),
        isInRange: this.props.isDateInRange(value)
      };
    });
    _defineProperty(this, "onKeyDown", e => {
      const {
        value
      } = this.state;
      if (e.key === 'Enter') {
        this.update(value);
      }
    });
    _defineProperty(this, "onChange", e => {
      this.setState({
        value: e.target.value,
        changed: true,
        invalid: {
          invalidFormat: false,
          outOfRange: false
        }
      });
    });
    _defineProperty(this, "onBlur", () => {
      const {
        value
      } = this.state;
      this.update(value);
    });
    this.state = {
      invalid: {
        invalidFormat: false,
        outOfRange: false
      },
      changed: false,
      value: this.formatDate(props)
    };
  }
  componentDidUpdate(prevProps) {
    const {
      value
    } = prevProps;
    if (!(0, _isEqual.default)(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props)
      });
    }
  }
  formatDate(_ref) {
    let {
      value,
      dateDisplayFormat,
      dateOptions
    } = _ref;
    if (value) {
      const {
        isInRange,
        isValidFormat
      } = this.isValid(value);
      if (isInRange && isValidFormat) {
        return (0, _format.default)(value, dateDisplayFormat, dateOptions);
      }
    }
    return '';
  }
  update(value) {
    const {
      invalid: {
        invalidFormat,
        outOfRange
      },
      changed
    } = this.state;
    if (invalidFormat || outOfRange || !changed || !value) {
      return;
    }
    const {
      onChange,
      dateDisplayFormat,
      dateOptions
    } = this.props;
    const parsed = (0, _parse.default)(value, dateDisplayFormat, new Date(), dateOptions);
    const {
      isInRange,
      isValidFormat
    } = this.isValid(parsed);
    if (isInRange && isValidFormat) {
      this.setState({
        changed: false
      }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: {
          invalidFormat: !isValidFormat,
          outOfRange: !isInRange
        }
      });
    }
  }
  render() {
    const {
      className,
      readOnly,
      placeholder,
      ariaLabel,
      disabled,
      onFocus
    } = this.props;
    const {
      value,
      invalid: {
        invalidFormat,
        outOfRange
      }
    } = this.state;
    const tooltipWarningMessage = invalidFormat ? 'The date format is invalid' : outOfRange ? 'The date is out of range' : '';
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)({
        rdrInvalidDateInput: invalidFormat || outOfRange
      }, 'rdrDateInput', className)
    }, /*#__PURE__*/_react.default.createElement("input", {
      readOnly: readOnly,
      disabled: disabled,
      value: value,
      placeholder: placeholder,
      "aria-label": ariaLabel,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: onFocus
    }), (invalidFormat || outOfRange) && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrWarning"
    }, "\u26A0"), tooltipWarningMessage && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrTooltipWarning"
    }, tooltipWarningMessage));
  }
}
DateInput.propTypes = {
  value: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dateOptions: _propTypes.default.object,
  dateDisplayFormat: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  isDateInRange: _propTypes.default.func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = DateInput;
exports.default = _default;