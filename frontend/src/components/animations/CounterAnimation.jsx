import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const CounterAnimation = ({ 
  start = 0, 
  end, 
  duration = 2.5, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  title,
  description,
  className = '',
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl font-semibold mb-2">
        <span className="text-neon-green">{prefix}</span>
        {inView ? (
          <CountUp
            start={start}
            end={end}
            duration={duration}
            separator="."
            decimals={decimals}
            decimal=","
          />
        ) : (
          start
        )}
        <span className="text-neon-green">{suffix}</span>
      </div>
      {title && <h3 className="text-xl font-semibold mb-1">{title}</h3>}
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
  );
};

export default CounterAnimation;