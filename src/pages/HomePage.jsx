import React from 'react';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="homepage-container">
      {/* 动态曲线背景 */}
      <div className="dynamic-curves">
        <div className="curve curve-1"></div>
        <div className="curve curve-2"></div>
        <div className="curve curve-3"></div>
      </div>

      {/* 顶部导航栏 */}
      <nav className="navbar">
        <div className="logo">SoulSync</div>
        <div className="nav-buttons">
          <button onClick={() => onNavigate('login')}>登录</button>
          <button onClick={() => onNavigate('messageWall')}>留言墙</button>
          <button onClick={() => onNavigate('contactUs')}>联系我们</button>
        </div>
      </nav>

      {/* 主要内容区域 - 全屏布局 */}
      <div className="content-wrapper">
        {/* 活动照片展示 - 占满左半部分 */}
        <div className="activity-photos">
          <h2>活动精彩瞬间</h2>
          <div className="photo-grid">
            <div className="photo-large"></div>
            <div className="photo-group">
              <div className="photo-small"></div>
              <div className="photo-small"></div>
              <div className="photo-small"></div>
              <div className="photo-small"></div>
            </div>
          </div>
        </div>

        {/* 文字描述 - 占满右半部分 */}
        <div className="text-description">
          <h2>青春活力，运动无限</h2>
          <div className="description-content">
            <p>
              欢迎来到 SoulSync，一个充满青春活力的运动社区！在这里，你可以找到各种有趣的运动活动，结识志同道合的朋友，一起享受运动的乐趣。
            </p>
            <p>
              无论是飞盘、徒步、羽毛球还是其他运动，我们都有丰富的活动等你来参与。加入我们，一起燃烧卡路里，释放青春活力！
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">活跃用户</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">120+</span>
                <span className="stat-label">每月活动</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">运动类型</span>
              </div>
            </div>
            <button className="join-button">立即加入</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;