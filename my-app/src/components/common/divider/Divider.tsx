import React from 'react';
import './Divider.scss';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({orientation = 'horizontal'}) => {
  const dividerClass = `divider divider--${orientation}`;

  return <div className={dividerClass}></div>;
};


export default Divider;
