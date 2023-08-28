import React, { Component, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DateRange from '../DateRange';
import DefinedRange from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles from '../../styles';
import { usePopper } from 'react-popper';


const DateRangePicker = (props) => {
    
  const [focusedRange, setFocusedRange] = useState([findNextRangeIndex(props.ranges), 0]);
  const [isOpen, setIsOpen] = useState(false);

  const stylesRef = useRef(generateStyles([coreStyles, props.classNames]));
  const dateRangeRef = useRef();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes }  = usePopper(referenceElement, popperElement,{
    placement:'left-start',
    modifiers: [],
  });


  return (
    <div className={classnames(stylesRef.current.dateRangePickerWrapper, props.className)}>

      {isOpen && <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>

    
      <DefinedRange
        focusedRange={focusedRange}
        onPreviewChange={value =>{
          dateRangeRef.current.updatePreview(
            value ? dateRangeRef.current.calcNewSelection(value, typeof value === 'string') : null
          )
        }
          
        }
        {...props}
        range={props.ranges[focusedRange[0]]}
        className={undefined}
  
      />
          </div>}
      <div>
      <DateRange
        onRangeFocusChange={focusedRange => setFocusedRange(focusedRange)}
        focusedRange={focusedRange}
        {...props}
        onVisibilityChange={visible => setIsOpen(visible)}
        editableDateInputs={true}
        ref={dateRangeRef}
        inputRef={setReferenceElement}
        className={undefined}
      />
      </div>
    </div>
  );

}

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
