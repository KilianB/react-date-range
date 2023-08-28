import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import coreStyles from '../../styles';
import { findNextRangeIndex, generateStyles, useClickOutside } from '../../utils';
import DateRange from '../DateRange';
import DefinedRange from '../DefinedRange';

const DateRangePicker = (props) => {
  const [focusedRange, setFocusedRange] = useState([findNextRangeIndex(props.ranges), 0]);
  const [isOpen, setIsOpen] = useState(false);

  const stylesRef = useRef(generateStyles([coreStyles, props.classNames]));
  const dateRangeRef = useRef();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const [state, setState] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection'
    }
  ]);

  const clickTrackRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left-start',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'flip',
        enabled: false
      }
    ]
  });

  return (
    <div ref={clickTrackRef}>
      <div className={classnames(stylesRef.current.dateRangePickerWrapper, props.className)}>
        {isOpen && (
          <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 100 }} {...attributes.popper}>
            <DefinedRange
              focusedRange={focusedRange}
              onPreviewChange={(value) => {
                dateRangeRef.current.updatePreview(
                  value ? dateRangeRef.current.calcNewSelection(value, typeof value === 'string') : null
                );
              }}
              {...props}
              range={props.ranges[focusedRange[0]]}
              className={undefined}
            />
          </div>
        )}
        <div>
          <DateRange
            onRangeFocusChange={(focusedRange) => setFocusedRange(focusedRange)}
            focusedRange={focusedRange}
            editableDateInputs={true}
            className={undefined}
            onChange={(item) => {
              setState([item.selection]);
              props.onChange && props.onChange(item);
            }}
            ranges={state}
            {...props}
            isOpen={isOpen}
            onVisibilityChange={(visible) => {
              setIsOpen(visible);
            }}
            ref={dateRangeRef}
            inputRef={setReferenceElement}
          />
        </div>
      </div>
    </div>
  );
};

DateRangePicker.defaultProps = {
  ranges: [
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection'
    }
  ]
};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string
};

export default DateRangePicker;
