"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DayCell = require("../DayCell");
var _Month = _interopRequireDefault(require("../Month"));
var _DateInput = _interopRequireDefault(require("../DateInput"));
var _utils = require("../../utils");
var _classnames = _interopRequireDefault(require("classnames"));
var _reactList = _interopRequireDefault(require("react-list"));
var _shallowEqual = require("shallow-equal");
var _max = _interopRequireDefault(require("date-fns/max"));
var _min = _interopRequireDefault(require("date-fns/min"));
var _differenceInDays = _interopRequireDefault(require("date-fns/differenceInDays"));
var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));
var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));
var _differenceInCalendarMonths = _interopRequireDefault(require("date-fns/differenceInCalendarMonths"));
var _setMonth = _interopRequireDefault(require("date-fns/setMonth"));
var _setYear = _interopRequireDefault(require("date-fns/setYear"));
var _addYears = _interopRequireDefault(require("date-fns/addYears"));
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));
var _format = _interopRequireDefault(require("date-fns/format"));
var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));
var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));
var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));
var _styles = _interopRequireDefault(require("../../styles"));
var _accessibility = require("../../accessibility");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Calendar extends _react.PureComponent {
  constructor(_props, context) {
    var _this;
    super(_props, context);
    _this = this;
    _defineProperty(this, "isDateInRange", date => {
      return date >= this.props.minDate && date <= this.props.maxDate;
    });
    _defineProperty(this, "focusToDate", function (date) {
      let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props;
      let preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!_this.list) {
        return;
      }
      if (!props.scroll.enabled) {
        if (preventUnnecessary && props.preventSnapRefocus) {
          const focusedDateDiff = (0, _differenceInCalendarMonths.default)(date, _this.state.focusedDate);
          const isAllowedForward = props.calendarFocus === "forwards" && focusedDateDiff >= 0;
          const isAllowedBackward = props.calendarFocus === "backwards" && focusedDateDiff <= 0;
          if ((isAllowedForward || isAllowedBackward) && Math.abs(focusedDateDiff) < props.months) {
            return;
          }
        }
        _this.setState({
          focusedDate: date
        });
        return;
      }
      const targetMonthIndex = (0, _differenceInCalendarMonths.default)(date, props.minDate, _this.dateOptions);
      const visibleMonths = _this.list.getVisibleRange();
      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      _this.isFirstRender = true;
      _this.list.scrollTo(targetMonthIndex);
      _this.setState({
        focusedDate: date
      });
    });
    _defineProperty(this, "updateShownDate", function () {
      let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      const newProps = props.scroll.enabled && _this.list ? {
        ...props,
        months: _this.list.getVisibleRange().length
      } : props;
      const newFocus = (0, _utils.calcFocusDate)(_this.state.focusedDate, newProps);
      _this.focusToDate(newFocus, newProps);
    });
    _defineProperty(this, "updatePreview", val => {
      if (!val) {
        this.setState({
          preview: null
        });
        return;
      }
      const preview = {
        startDate: val,
        endDate: val,
        color: this.props.color
      };
      this.setState({
        preview
      });
    });
    _defineProperty(this, "changeShownDate", function (value) {
      let mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "set";
      const {
        focusedDate
      } = _this.state;
      const {
        onShownDateChange,
        minDate,
        maxDate
      } = _this.props;
      const modeMapper = {
        monthOffset: () => (0, _addMonths.default)(focusedDate, value),
        setMonth: () => (0, _setMonth.default)(focusedDate, value),
        setYear: () => (0, _setYear.default)(focusedDate, value),
        set: () => value
      };
      const newDate = (0, _min.default)([(0, _max.default)([modeMapper[mode](), minDate]), maxDate]);
      _this.focusToDate(newDate, _this.props, false);
      onShownDateChange && onShownDateChange(newDate);
    });
    _defineProperty(this, "handleRangeFocusChange", (rangesIndex, rangeItemIndex) => {
      this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    });
    _defineProperty(this, "handleScroll", () => {
      if (!this.list) {
        return;
      }
      const {
        onShownDateChange,
        minDate
      } = this.props;
      const {
        focusedDate
      } = this.state;
      const {
        isFirstRender
      } = this;
      const visibleMonths = this.list.getVisibleRange();
      // prevent scroll jump with wrong visible value
      if (visibleMonths[0] === undefined) return;
      const visibleMonth = (0, _addMonths.default)(minDate, visibleMonths[0] || 0);
      const isFocusedToDifferent = !(0, _isSameMonth.default)(visibleMonth, focusedDate);
      if (isFocusedToDifferent && !isFirstRender) {
        this.setState({
          focusedDate: visibleMonth
        });
        onShownDateChange && onShownDateChange(visibleMonth);
      }
      this.isFirstRender = false;
    });
    _defineProperty(this, "renderMonthAndYear", (focusedDate, changeShownDate, props) => {
      const {
        showMonthArrow,
        minDate,
        maxDate,
        showMonthAndYearPickers,
        ariaLabels
      } = props;
      const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
      const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
      const styles = this.styles;
      return /*#__PURE__*/_react.default.createElement("div", {
        onMouseUp: e => e.stopPropagation(),
        className: styles.monthAndYearWrapper
      }, showMonthArrow ? /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)(styles.nextPrevButton, styles.prevButton),
        onClick: () => changeShownDate(-1, "monthOffset"),
        "aria-label": ariaLabels.prevButton
      }, /*#__PURE__*/_react.default.createElement("i", null)) : null, showMonthAndYearPickers ? /*#__PURE__*/_react.default.createElement("span", {
        className: styles.monthAndYearPickers
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: styles.monthPicker
      }, /*#__PURE__*/_react.default.createElement("select", {
        value: focusedDate.getMonth(),
        onChange: e => changeShownDate(e.target.value, "setMonth"),
        "aria-label": ariaLabels.monthPicker
      }, this.state.monthNames.map((monthName, i) => /*#__PURE__*/_react.default.createElement("option", {
        key: i,
        value: i
      }, monthName)))), /*#__PURE__*/_react.default.createElement("span", {
        className: styles.monthAndYearDivider
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: styles.yearPicker
      }, /*#__PURE__*/_react.default.createElement("select", {
        value: focusedDate.getFullYear(),
        onChange: e => changeShownDate(e.target.value, "setYear"),
        "aria-label": ariaLabels.yearPicker
      }, new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map((val, i) => {
        const year = val - i;
        return /*#__PURE__*/_react.default.createElement("option", {
          key: year,
          value: year
        }, year);
      })))) : /*#__PURE__*/_react.default.createElement("span", {
        className: styles.monthAndYearPickers
      }, this.state.monthNames[focusedDate.getMonth()], " ", focusedDate.getFullYear()), showMonthArrow ? /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)(styles.nextPrevButton, styles.nextButton),
        onClick: () => changeShownDate(+1, "monthOffset"),
        "aria-label": ariaLabels.nextButton
      }, /*#__PURE__*/_react.default.createElement("i", null)) : null);
    });
    _defineProperty(this, "renderDateDisplay", () => {
      const {
        focusedRange,
        color,
        ranges,
        rangeColors,
        dateDisplayFormat,
        editableDateInputs,
        startDatePlaceholder,
        endDatePlaceholder,
        ariaLabels,
        onVisibilityChange,
        inputRef
      } = this.props;
      const defaultColor = rangeColors[focusedRange[0]] || color;
      const styles = this.styles;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: styles.dateDisplayWrapper,
        ref: inputRef
      }, ranges.map((range, i) => {
        if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
        return /*#__PURE__*/_react.default.createElement("div", {
          className: styles.dateDisplay,
          key: i,
          style: {
            color: range.color || defaultColor,
            minWidth: 400
          }
        }, /*#__PURE__*/_react.default.createElement(_DateInput.default, {
          className: (0, _classnames.default)(styles.dateDisplayItem, {
            [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 0
          }),
          readOnly: !editableDateInputs,
          disabled: range.disabled,
          value: range.startDate,
          placeholder: startDatePlaceholder,
          dateOptions: this.dateOptions,
          dateDisplayFormat: dateDisplayFormat,
          ariaLabel: ariaLabels.dateInput && ariaLabels.dateInput[range.key] && ariaLabels.dateInput[range.key].startDate,
          onChange: this.onDragSelectionEnd,
          onFocus: () => {
            this.setState({
              isOpen: true
            });
            if (!this.state.isOpen && onVisibilityChange) {
              onVisibilityChange(true);
            }
            this.handleRangeFocusChange(i, 0);
          },
          isDateInRange: this.isDateInRange
        }), /*#__PURE__*/_react.default.createElement(_DateInput.default, {
          className: (0, _classnames.default)(styles.dateDisplayItem, {
            [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1
          }),
          readOnly: !editableDateInputs,
          disabled: range.disabled,
          value: range.endDate,
          placeholder: endDatePlaceholder,
          dateOptions: this.dateOptions,
          dateDisplayFormat: dateDisplayFormat,
          ariaLabel: ariaLabels.dateInput && ariaLabels.dateInput[range.key] && ariaLabels.dateInput[range.key].endDate,
          onChange: this.onDragSelectionEnd,
          onFocus: () => {
            this.setState({
              isOpen: true
            });
            if (!this.state.isOpen && onVisibilityChange) {
              onVisibilityChange(true);
            }
            this.handleRangeFocusChange(i, 1);
          },
          isDateInRange: this.isDateInRange
        }));
      }));
    });
    _defineProperty(this, "onDragSelectionStart", date => {
      const {
        onChange,
        dragSelectionEnabled
      } = this.props;
      if (dragSelectionEnabled) {
        this.setState({
          drag: {
            status: true,
            range: {
              startDate: date,
              endDate: date
            },
            disablePreview: true
          }
        });
      } else {
        onChange && onChange(date);
      }
    });
    _defineProperty(this, "onDragSelectionEnd", date => {
      const {
        updateRange,
        displayMode,
        onChange,
        dragSelectionEnabled
      } = this.props;
      if (this.props.focusedRange[1] === 1) {
        this.setState({
          isOpen: false
        });
        if (this.state.isOpen && this.props.onVisibilityChange) {
          this.props.onVisibilityChange(false);
        }
      }
      if (!dragSelectionEnabled) return;
      if (displayMode === "date" || !this.state.drag.status) {
        onChange && onChange(date);
        return;
      }
      const newRange = {
        startDate: this.state.drag.range.startDate,
        endDate: date
      };
      if (displayMode !== "dateRange" || (0, _isSameDay.default)(newRange.startDate, date)) {
        this.setState({
          drag: {
            status: false,
            range: {}
          }
        }, () => onChange && onChange(date));
      } else {
        this.setState({
          drag: {
            status: false,
            range: {}
          }
        }, () => {
          updateRange && updateRange(newRange);
        });
      }
    });
    _defineProperty(this, "onDragSelectionMove", date => {
      const {
        drag
      } = this.state;
      if (!drag.status || !this.props.dragSelectionEnabled) return;
      this.setState({
        drag: {
          status: drag.status,
          range: {
            startDate: drag.range.startDate,
            endDate: date
          },
          disablePreview: true
        }
      });
    });
    _defineProperty(this, "estimateMonthSize", (index, cache) => {
      const {
        direction,
        minDate
      } = this.props;
      const {
        scrollArea
      } = this.state;
      if (cache) {
        this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }
      if (direction === "horizontal") return scrollArea.monthWidth;
      const monthStep = (0, _addMonths.default)(minDate, index);
      const {
        start,
        end
      } = (0, _utils.getMonthDisplayRange)(monthStep, this.dateOptions);
      const isLongMonth = (0, _differenceInDays.default)(end, start, this.dateOptions) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    });
    this.dateOptions = {
      locale: _props.locale
    };
    if (_props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = _props.weekStartsOn;
    this.styles = (0, _utils.generateStyles)([_styles.default, _props.classNames]);
    this.listSizeCache = {};
    this.isFirstRender = true;
    this.state = {
      monthNames: this.getMonthNames(),
      focusedDate: (0, _utils.calcFocusDate)(null, _props),
      drag: {
        status: false,
        range: {
          startDate: null,
          endDate: null
        },
        disablePreview: false
      },
      scrollArea: this.calcScrollArea(_props),
      isOpen: _props.isOpen
    };
  }
  getMonthNames() {
    return [...Array(12).keys()].map(i => this.props.locale.localize.month(i));
  }
  calcScrollArea(props) {
    const {
      direction,
      months,
      scroll
    } = props;
    if (!scroll.enabled) return {
      enabled: false
    };
    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    if (direction === "vertical") {
      return {
        enabled: true,
        monthHeight: scroll.monthHeight || 220,
        longMonthHeight: longMonthHeight || 260,
        calendarWidth: "auto",
        calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
      };
    }
    return {
      enabled: true,
      monthWidth: scroll.monthWidth || 332,
      calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
      monthHeight: longMonthHeight || 300,
      calendarHeight: longMonthHeight || 300
    };
  }
  componentDidMount() {
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      setTimeout(() => this.focusToDate(this.state.focusedDate));
    }
  }
  componentDidUpdate(prevProps) {
    const propMapper = {
      dateRange: "ranges",
      date: "date"
    };
    const targetProp = propMapper[this.props.displayMode];
    if (this.props[targetProp] !== prevProps[targetProp]) {
      this.updateShownDate(this.props);
    }
    if (prevProps.locale !== this.props.locale || prevProps.weekStartsOn !== this.props.weekStartsOn) {
      this.dateOptions = {
        locale: this.props.locale
      };
      if (this.props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = this.props.weekStartsOn;
      this.setState({
        monthNames: this.getMonthNames()
      });
    }
    if (!(0, _shallowEqual.shallowEqualObjects)(prevProps.scroll, this.props.scroll)) {
      this.setState({
        scrollArea: this.calcScrollArea(this.props)
      });
    }
  }
  renderWeekdays() {
    const now = new Date();
    return /*#__PURE__*/_react.default.createElement("div", {
      className: this.styles.weekDays
    }, (0, _eachDayOfInterval.default)({
      start: (0, _startOfWeek.default)(now, this.dateOptions),
      end: (0, _endOfWeek.default)(now, this.dateOptions)
    }).map((day, i) => /*#__PURE__*/_react.default.createElement("span", {
      className: this.styles.weekDay,
      key: i
    }, (0, _format.default)(day, this.props.weekdayDisplayFormat, this.dateOptions))));
  }
  render() {
    const {
      showDateDisplay,
      onPreviewChange,
      scroll,
      direction,
      disabledDates,
      disabledDay,
      maxDate,
      minDate,
      rangeColors,
      color,
      navigatorRenderer,
      className,
      preview
    } = this.props;
    const {
      scrollArea,
      focusedDate,
      isOpen
    } = this.state;
    const isVertical = direction === "vertical";
    const monthAndYearRenderer = navigatorRenderer || this.renderMonthAndYear;
    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color
    }));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.calendarWrapper, className),
      onMouseUp: () => this.setState({
        drag: {
          status: false,
          range: {}
        }
      }),
      onMouseLeave: () => {
        this.setState({
          drag: {
            status: false,
            range: {}
          }
        });
      },
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, showDateDisplay && this.renderDateDisplay()), isOpen && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'relative',
        backgroundColor: 'white',
        zIndex: 1000
      }
    }, monthAndYearRenderer(focusedDate, this.changeShownDate, this.props), scroll.enabled ? /*#__PURE__*/_react.default.createElement("div", null, isVertical && this.renderWeekdays(this.dateOptions), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
      onMouseLeave: () => onPreviewChange && onPreviewChange(),
      style: {
        width: scrollArea.calendarWidth + 11,
        height: scrollArea.calendarHeight + 11
      },
      onScroll: this.handleScroll
    }, /*#__PURE__*/_react.default.createElement(_reactList.default, {
      length: (0, _differenceInCalendarMonths.default)((0, _endOfMonth.default)(maxDate), (0, _addDays.default)((0, _startOfMonth.default)(minDate), -1), this.dateOptions),
      treshold: 500,
      type: "variable",
      ref: target => this.list = target,
      itemSizeEstimator: this.estimateMonthSize,
      axis: isVertical ? "y" : "x",
      itemRenderer: (index, key) => {
        const monthStep = (0, _addMonths.default)(minDate, index);
        return /*#__PURE__*/_react.default.createElement(_Month.default, _extends({}, this.props, {
          onPreviewChange: onPreviewChange || this.updatePreview,
          preview: preview || this.state.preview,
          ranges: ranges,
          key: key,
          drag: this.state.drag,
          dateOptions: this.dateOptions,
          disabledDates: disabledDates,
          disabledDay: disabledDay,
          month: monthStep,
          onDragSelectionStart: this.onDragSelectionStart,
          onDragSelectionEnd: this.onDragSelectionEnd,
          onDragSelectionMove: this.onDragSelectionMove,
          onMouseLeave: () => onPreviewChange && onPreviewChange(),
          styles: this.styles,
          style: isVertical ? {
            height: this.estimateMonthSize(index)
          } : {
            height: scrollArea.monthHeight,
            width: this.estimateMonthSize(index)
          },
          showMonthName: true,
          showWeekDays: !isVertical
        }));
      }
    }))) : /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal)
    }, new Array(this.props.months).fill(null).map((_, i) => {
      let monthStep = (0, _addMonths.default)(this.state.focusedDate, i);
      if (this.props.calendarFocus === "backwards") {
        monthStep = (0, _subMonths.default)(this.state.focusedDate, this.props.months - 1 - i);
      }
      return /*#__PURE__*/_react.default.createElement(_Month.default, _extends({}, this.props, {
        onPreviewChange: onPreviewChange || this.updatePreview,
        preview: preview || this.state.preview,
        ranges: ranges,
        key: i,
        drag: this.state.drag,
        dateOptions: this.dateOptions,
        disabledDates: disabledDates,
        disabledDay: disabledDay,
        month: monthStep,
        onDragSelectionStart: this.onDragSelectionStart,
        onDragSelectionEnd: this.onDragSelectionEnd,
        onDragSelectionMove: this.onDragSelectionMove,
        onMouseLeave: () => onPreviewChange && onPreviewChange(),
        styles: this.styles,
        showWeekDays: !isVertical || i === 0,
        showMonthName: !isVertical || i > 0
      }));
    }))));
  }
}
Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  disabledDay: () => {},
  classNames: {},
  locale: _enUS.default,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: "MMM d, yyyy",
  monthDisplayFormat: "MMM yyyy",
  weekdayDisplayFormat: "E",
  dayDisplayFormat: "d",
  showDateDisplay: true,
  showPreview: true,
  displayMode: "date",
  months: 1,
  color: "#3d91ff",
  scroll: {
    enabled: false
  },
  direction: "vertical",
  maxDate: (0, _addYears.default)(new Date(), 20),
  minDate: (0, _addYears.default)(new Date(), -100),
  rangeColors: ["#3d91ff", "#3ecf8e", "#fed14c"],
  startDatePlaceholder: "Early",
  endDatePlaceholder: "Continuous",
  editableDateInputs: false,
  dragSelectionEnabled: true,
  fixedHeight: false,
  calendarFocus: "forwards",
  preventSnapRefocus: false,
  ariaLabels: {},
  isOpen: false
};
Calendar.propTypes = {
  showMonthArrow: _propTypes.default.bool,
  showMonthAndYearPickers: _propTypes.default.bool,
  disabledDates: _propTypes.default.array,
  disabledDay: _propTypes.default.func,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  date: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onPreviewChange: _propTypes.default.func,
  onRangeFocusChange: _propTypes.default.func,
  classNames: _propTypes.default.object,
  locale: _propTypes.default.object,
  shownDate: _propTypes.default.object,
  onShownDateChange: _propTypes.default.func,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object,
    color: _propTypes.default.string
  }),
  dateDisplayFormat: _propTypes.default.string,
  monthDisplayFormat: _propTypes.default.string,
  weekdayDisplayFormat: _propTypes.default.string,
  weekStartsOn: _propTypes.default.number,
  dayDisplayFormat: _propTypes.default.string,
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  initialFocusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  months: _propTypes.default.number,
  className: _propTypes.default.string,
  showDateDisplay: _propTypes.default.bool,
  showPreview: _propTypes.default.bool,
  displayMode: _propTypes.default.oneOf(["dateRange", "date"]),
  color: _propTypes.default.string,
  updateRange: _propTypes.default.func,
  scroll: _propTypes.default.shape({
    enabled: _propTypes.default.bool,
    monthHeight: _propTypes.default.number,
    longMonthHeight: _propTypes.default.number,
    monthWidth: _propTypes.default.number,
    calendarWidth: _propTypes.default.number,
    calendarHeight: _propTypes.default.number
  }),
  direction: _propTypes.default.oneOf(["vertical", "horizontal"]),
  startDatePlaceholder: _propTypes.default.string,
  endDatePlaceholder: _propTypes.default.string,
  navigatorRenderer: _propTypes.default.func,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  editableDateInputs: _propTypes.default.bool,
  dragSelectionEnabled: _propTypes.default.bool,
  fixedHeight: _propTypes.default.bool,
  calendarFocus: _propTypes.default.string,
  preventSnapRefocus: _propTypes.default.bool,
  ariaLabels: _accessibility.ariaLabelsShape,
  isOpen: _propTypes.default.bool,
  onVisibilityChange: _propTypes.default.func,
  inputRef: _propTypes.default.func
};
var _default = Calendar;
exports.default = _default;