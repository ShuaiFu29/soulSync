import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import ContactForm from '../../components/features/ContactForm';
import ContactInfo from '../../components/features/ContactInfo';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [submittedContacts, setSubmittedContacts] = useState([]);

  const handleContactSubmit = async contactData => {
    try {
      // 模拟API调用
      console.log('提交联系信息:', contactData);

      // 保存到本地状态（在实际应用中会发送到服务器）
      setSubmittedContacts(prev => [contactData, ...prev]);

      // 这里可以调用实际的API
      // await api.submitContact(contactData);

      return Promise.resolve();
    } catch (error) {
      console.error('提交联系信息失败:', error);
      throw error;
    }
  };

  return (
    <PageLayout backgroundIntensity="light" className="contact-us-page">
      <div className="contact-us-container">
        {/* 页面头部 */}
        <div className="page-header">
          <h1 className="page-title gradient-text">💬 联系我们</h1>
          <p className="page-subtitle">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-icon">⚡</span>
              <span className="stat-text">24小时内回复</span>
            </div>
            <div className="stat-badge">
              <span className="stat-icon">🏆</span>
              <span className="stat-text">98%满意度</span>
            </div>
            <div className="stat-badge">
              <span className="stat-icon">🤝</span>
              <span className="stat-text">专业服务</span>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="contact-content">
          {/* 左侧：联系表单 */}
          <div className="contact-form-section">
            <ContactForm
              onSubmit={handleContactSubmit}
              className="main-contact-form"
            />
          </div>

          {/* 右侧：联系信息 */}
          <div className="contact-info-section">
            <ContactInfo className="main-contact-info" />
          </div>
        </div>

        {/* 底部额外信息 */}
        <div className="additional-info">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>我们的使命</h3>
              <p>
                SoulSync 致力于为运动爱好者创建一个充满活力的社区平台，
                让每个人都能找到适合自己的运动方式，享受健康快乐的生活。
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">🌟</div>
              <h3>为什么选择我们</h3>
              <p>
                专业的运动指导、丰富的活动选择、友好的社区氛围，
                还有贴心的客户服务。我们用心为每一位用户创造最佳体验。
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">🚀</div>
              <h3>加入我们</h3>
              <p>
                无论您是运动新手还是资深爱好者，无论您想参与活动还是组织活动，
                我们都欢迎您的加入。让我们一起创造更美好的运动体验。
              </p>
            </div>
          </div>
        </div>

        {/* 地图区域（占位） */}
        <div className="map-section">
          <h3 className="map-title">
            <span className="title-icon">🗺️</span>
            找到我们
          </h3>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">📍</div>
              <h4>SoulSync 总部</h4>
              <p>北京市朝阳区运动大厦18层</p>
              <p>地铁1号线国贸站C口出，步行5分钟</p>
              <div className="map-actions">
                <button
                  className="map-btn"
                  onClick={() => alert('即将跳转到地图应用')}
                >
                  在地图中查看
                </button>
                <button className="map-btn" onClick={() => alert('地址已复制')}>
                  复制地址
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 用户反馈统计 */}
        {submittedContacts.length > 0 && (
          <div className="feedback-stats">
            <h3>最近反馈</h3>
            <p>
              已收到 {submittedContacts.length}{' '}
              条用户反馈，我们会认真处理每一条意见。
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ContactUsPage;
