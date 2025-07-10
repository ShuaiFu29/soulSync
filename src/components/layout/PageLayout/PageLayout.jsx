import React from 'react';
import Navigation from '../../common/Navigation';
import DynamicBackground from '../../common/DynamicBackground';
import './PageLayout.css';

const PageLayout = ({
  children,
  showBackground = true,
  backgroundIntensity = 'normal',
  showParticles = false,
  className = '',
}) => {
  return (
    <div className={`page-layout ${className}`}>
      {showBackground && (
        <DynamicBackground
          intensity={backgroundIntensity}
          showParticles={showParticles}
        />
      )}

      <Navigation />

      <main className="page-main">{children}</main>
    </div>
  );
};

export default PageLayout;
