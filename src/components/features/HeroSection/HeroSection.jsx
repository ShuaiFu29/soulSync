import React from 'react';
import Button from '../../common/Button';
import StatsDisplay from '../StatsDisplay';
import './HeroSection.css';

const HeroSection = ({
  title = '青春活力，运动无限',
  description = [
    '欢迎来到 SoulSync，一个充满青春活力的运动社区！在这里，你可以找到各种有趣的运动活动，结识志同道合的朋友，一起享受运动的乐趣。',
    '无论是飞盘、徒步、羽毛球还是其他运动，我们都有丰富的活动等你来参与。加入我们，一起燃烧卡路里，释放青春活力！',
  ],
  stats = [],
  onJoinClick,
  className = '',
}) => {
  const handleJoinClick = () => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      // 默认行为：滚动到页面底部或打开注册模态框
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className={`hero-section ${className}`}>
      <div className="hero-content">
        <h2 className="hero-title gradient-text-dark animate-slide-in-right">
          {title}
        </h2>
        <div className="hero-description">
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              <p
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {description}
            </p>
          )}
        </div>

        <StatsDisplay
          stats={stats}
          className="hero-stats animate-slide-in-bottom"
        />

        <Button
          variant="primary"
          size="large"
          onClick={handleJoinClick}
          className="hero-join-button animate-scale-in"
        >
          立即加入
        </Button>
      </div>

      {/* 装饰元素 */}
      <div className="hero-decorations">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-line decoration-line-1"></div>
        <div className="decoration-line decoration-line-2"></div>
      </div>
    </div>
  );
};

export default HeroSection;
