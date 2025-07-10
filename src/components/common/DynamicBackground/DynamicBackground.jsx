import React from 'react';
import './DynamicBackground.css';

const DynamicBackground = ({
  intensity = 'normal',
  showParticles = false,
  className = '',
}) => {
  const getIntensityClass = () => {
    switch (intensity) {
      case 'light':
        return 'intensity-light';
      case 'strong':
        return 'intensity-strong';
      default:
        return 'intensity-normal';
    }
  };

  return (
    <div className={`dynamic-background ${getIntensityClass()} ${className}`}>
      {/* 动态曲线背景 */}
      <div className="dynamic-curves">
        <div className="curve curve-1"></div>
        <div className="curve curve-2"></div>
        <div className="curve curve-3"></div>
        <div className="curve curve-4"></div>
        <div className="curve curve-5"></div>
      </div>

      {/* 可选的粒子效果 */}
      {showParticles && (
        <div className="particles">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      )}

      {/* 渐变叠加层 */}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default DynamicBackground;
