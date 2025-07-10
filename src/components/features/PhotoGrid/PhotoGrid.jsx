import React from 'react';
import './PhotoGrid.css';

const PhotoGrid = ({ title = '活动精彩瞬间', photos = [], className = '' }) => {
  // 默认照片占位符
  const defaultPhotos = [
    { id: 1, type: 'large', alt: '运动活动大图' },
    { id: 2, type: 'small', alt: '团队活动1' },
    { id: 3, type: 'small', alt: '团队活动2' },
    { id: 4, type: 'small', alt: '团队活动3' },
    { id: 5, type: 'small', alt: '团队活动4' },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  return (
    <div className={`photo-grid-container ${className}`}>
      <h2 className="photo-grid-title">{title}</h2>
      <div className="photo-grid">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id || index}
            className={`photo-item ${photo.type === 'large' ? 'photo-large' : 'photo-small'} hover-lift`}
            style={photo.src ? { backgroundImage: `url(${photo.src})` } : {}}
          >
            {!photo.src && (
              <div className="photo-placeholder">
                <div className="photo-placeholder-icon">📸</div>
                <span className="photo-placeholder-text">{photo.alt}</span>
              </div>
            )}
            <div className="photo-overlay">
              <div className="photo-overlay-content">
                <h4>{photo.title || photo.alt}</h4>
                {photo.description && <p>{photo.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
