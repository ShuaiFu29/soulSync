import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PhotoGrid from '../components/features/PhotoGrid';
import HeroSection from '../components/features/HeroSection';
import './HomePage.css';

const HomePage = () => {
  // 统计数据
  const stats = [
    { number: 500, label: '活跃用户', suffix: '+' },
    { number: 120, label: '每月活动', suffix: '+' },
    { number: 30, label: '运动类型', suffix: '+' },
  ];

  // 活动照片数据（可以后续从API获取）
  const photos = [
    { id: 1, type: 'large', alt: '团队户外运动', title: '户外徒步活动' },
    { id: 2, type: 'small', alt: '羽毛球比赛', title: '羽毛球友谊赛' },
    { id: 3, type: 'small', alt: '飞盘运动', title: '飞盘训练营' },
    { id: 4, type: 'small', alt: '瑜伽课程', title: '晨间瑜伽' },
    { id: 5, type: 'small', alt: '跑步活动', title: '晨跑俱乐部' },
  ];

  const handleJoinClick = () => {
    // 可以导航到注册页面或显示注册模态框
    console.log('用户点击了加入按钮');
    // 这里可以添加具体的加入逻辑
  };

  return (
    <PageLayout showParticles className="homepage">
      <div className="homepage-content">
        <PhotoGrid
          title="活动精彩瞬间"
          photos={photos}
          className="homepage-photos"
        />

        <HeroSection
          title="青春活力，运动无限"
          description={[
            '欢迎来到 SoulSync，一个充满青春活力的运动社区！在这里，你可以找到各种有趣的运动活动，结识志同道合的朋友，一起享受运动的乐趣。',
            '无论是飞盘、徒步、羽毛球还是其他运动，我们都有丰富的活动等你来参与。加入我们，一起燃烧卡路里，释放青春活力！',
          ]}
          stats={stats}
          onJoinClick={handleJoinClick}
          className="homepage-hero"
        />
      </div>
    </PageLayout>
  );
};

export default HomePage;
