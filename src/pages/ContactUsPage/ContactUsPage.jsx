import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import ContactForm from '../../components/features/ContactForm';
import ContactInfo from '../../components/features/ContactInfo';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [submittedContacts, setSubmittedContacts] = useState([]);

  const handleContactSubmit = async contactData => {
    try {
      console.log('提交联系信息:', contactData);
      setSubmittedContacts(prev => [contactData, ...prev]);
      return Promise.resolve();
    } catch (error) {
      console.error('提交联系信息失败:', error);
      throw error;
    }
  };

  return (
    <PageLayout backgroundIntensity="light" className="contact-us-page">
      <div className="contact-page-wrapper">
        {/* 页面头部 - 简洁的英雄区域 */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">联系我们</h1>
            <p className="hero-subtitle">
              我们随时为您提供帮助。发送消息，我们会尽快回复您。
            </p>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="main-content">
          {/* 左侧内容 */}
          <div className="content-left">
            {/* 联系表单 */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">发送消息</h2>
                <p className="section-description">
                  填写下面的表单，我们会在24小时内回复您。
                </p>
              </div>
              <ContactForm
                onSubmit={handleContactSubmit}
                className="main-contact-form"
              />
            </div>

            {/* 其他联系方式 */}
            <div className="alternative-contacts">
              <h3 className="alt-title">其他联系方式</h3>
              <div className="contact-options">
                <div className="contact-option">
                  <div className="option-icon">📧</div>
                  <div className="option-content">
                    <h4>邮箱</h4>
                    <p>hello@soulsync.com</p>
                    <span className="option-note">24小时内回复</span>
                  </div>
                </div>
                <div className="contact-option">
                  <div className="option-icon">📱</div>
                  <div className="option-content">
                    <h4>电话</h4>
                    <p>400-123-4567</p>
                    <span className="option-note">工作日 9:00-18:00</span>
                  </div>
                </div>
                <div className="contact-option">
                  <div className="option-icon">💬</div>
                  <div className="option-content">
                    <h4>在线客服</h4>
                    <p>即时聊天支持</p>
                    <span className="option-note">实时响应</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 位置信息 */}
            <div className="location-section">
              <h3 className="location-title">我们的位置</h3>
              <div className="location-card">
                <div className="location-info">
                  <h4>SoulSync 总部</h4>
                  <p>北京市朝阳区运动大厦18层</p>
                  <p>地铁1号线国贸站C口出，步行5分钟</p>
                </div>
                <div className="location-actions">
                  <button className="location-btn primary">查看地图</button>
                  <button className="location-btn secondary">获取路线</button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="content-right">
            <div className="sidebar-sticky">
              {/* 快速联系卡片 */}
              <div className="quick-contact-card">
                <div className="card-header">
                  <h3>需要即时帮助？</h3>
                </div>
                <div className="card-content">
                  <p>我们的客服团队随时准备为您提供帮助。</p>
                  <button className="quick-contact-btn">立即联系</button>
                </div>
              </div>

              {/* 工作时间 */}
              <div className="hours-card">
                <div className="card-header">
                  <h3>工作时间</h3>
                </div>
                <div className="card-content">
                  <div className="hours-list">
                    <div className="hours-item">
                      <span className="hours-day">周一至周五</span>
                      <span className="hours-time">9:00 - 18:00</span>
                    </div>
                    <div className="hours-item">
                      <span className="hours-day">周六</span>
                      <span className="hours-time">10:00 - 16:00</span>
                    </div>
                    <div className="hours-item">
                      <span className="hours-day">周日</span>
                      <span className="hours-time">休息</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 社交媒体 */}
              <div className="social-card">
                <div className="card-header">
                  <h3>关注我们</h3>
                </div>
                <div className="card-content">
                  <p>在社交媒体上获取最新动态</p>
                  <div className="social-links">
                    <a href="#" className="social-link weibo">微博</a>
                    <a href="#" className="social-link wechat">微信</a>
                    <a href="#" className="social-link douyin">抖音</a>
                  </div>
                </div>
              </div>

              {/* 常见问题 */}
              <div className="faq-card">
                <div className="card-header">
                  <h3>常见问题</h3>
                </div>
                <div className="card-content">
                  <div className="faq-links">
                    <a href="#" className="faq-link">如何参加运动活动？</a>
                    <a href="#" className="faq-link">活动费用如何？</a>
                    <a href="#" className="faq-link">新手可以参加吗？</a>
                    <a href="#" className="faq-link">查看更多问题</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactUsPage;
