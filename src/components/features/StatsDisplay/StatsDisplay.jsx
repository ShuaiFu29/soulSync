import React, { useState, useEffect } from 'react';
import './StatsDisplay.css';

const StatsDisplay = ({ stats = [], animateOnView = true, className = '' }) => {
  const [animated, setAnimated] = useState(false);

  // 默认统计数据
  const defaultStats = [
    { number: 500, label: '活跃用户', suffix: '+' },
    { number: 120, label: '每月活动', suffix: '+' },
    { number: 30, label: '运动类型', suffix: '+' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    if (animateOnView) {
      const timer = setTimeout(() => {
        setAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animateOnView]);

  const AnimatedNumber = ({ targetNumber, suffix = '', duration = 2000 }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
      if (!animated) return;

      let startTime;
      const startNumber = 0;
      const difference = targetNumber - startNumber;

      const updateNumber = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startNumber + difference * easeOutQuart);

        setCurrentNumber(current);

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      };

      requestAnimationFrame(updateNumber);
    }, [targetNumber, duration]);

    return (
      <span className="stat-number gradient-text">
        {currentNumber}
        {suffix}
      </span>
    );
  };

  return (
    <div className={`stats-display ${className}`}>
      {displayStats.map((stat, index) => (
        <div
          key={index}
          className={`stat-item ${animated ? 'animate' : ''}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <AnimatedNumber
            targetNumber={stat.number}
            suffix={stat.suffix || ''}
            duration={2000 + index * 200}
          />
          <span className="stat-label">{stat.label}</span>
          {stat.description && (
            <span className="stat-description">{stat.description}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
