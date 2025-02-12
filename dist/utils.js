"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.generateStyles = generateStyles;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.useClickOutside = useClickOutside;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _differenceInCalendarMonths = _interopRequireDefault(require("date-fns/differenceInCalendarMonths"));
var _differenceInCalendarDays = _interopRequireDefault(require("date-fns/differenceInCalendarDays"));
var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));
var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function calcFocusDate(currentFocusedDate, props) {
  const {
    shownDate,
    date,
    months,
    ranges,
    focusedRange,
    displayMode
  } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = (0, _startOfMonth.default)(targetInterval.start || new Date());
  targetInterval.end = (0, _endOfMonth.default)(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if ((0, _differenceInCalendarMonths.default)(targetInterval.start, targetInterval.end) > months) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}
function findNextRangeIndex(ranges) {
  let currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  const nextIndex = ranges.findIndex((range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled);
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}
function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  const startDateOfMonth = (0, _startOfMonth.default)(date, dateOptions);
  const endDateOfMonth = (0, _endOfMonth.default)(date, dateOptions);
  const startDateOfCalendar = (0, _startOfWeek.default)(startDateOfMonth, dateOptions);
  let endDateOfCalendar = (0, _endOfWeek.default)(endDateOfMonth, dateOptions);
  if (fixedHeight && (0, _differenceInCalendarDays.default)(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = (0, _addDays.default)(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}
function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources.filter(source => Boolean(source)).reduce((styles, styleSource) => {
    Object.keys(styleSource).forEach(key => {
      styles[key] = (0, _classnames.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}
function useClickOutside(cb) {
  const ref = _react.default.useRef(null);
  const refCb = _react.default.useRef(cb);
  _react.default.useLayoutEffect(() => {
    refCb.current = cb;
  });
  _react.default.useEffect(() => {
    const handler = e => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);
  return ref;
}