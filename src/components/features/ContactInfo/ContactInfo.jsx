import React from 'react';
import Button from '../../common/Button';
import './ContactInfo.css';

const ContactInfo = ({ className = '' }) => {
  const contactMethods = [
    {
      icon: '📧',
      title: '邮箱联系',
      content: 'hello@soulsync.com',
      description: '我们通常在24小时内回复邮件',
      action: () => window.open('mailto:hello@soulsync.com'),
      actionText: '发送邮件',
    },
    {
      icon: '📱',
      title: '电话咨询',
      content: '400-123-4567',
      description: '工作日 9:00-18:00 提供电话支持',
      action: () => window.open('tel:400-123-4567'),
      actionText: '拨打电话',
    },
    {
      icon: '💬',
      title: '微信客服',
      content: 'SoulSync_Official',
      description: '扫描二维码或搜索微信号添加',
      action: () => alert('请搜索微信号：SoulSync_Official'),
      actionText: '添加微信',
    },
    {
      icon: '📍',
      title: '公司地址',
      content: '北京市朝阳区运动大厦18层',
      description: '欢迎预约到访，我们期待与您面谈',
      action: () => alert('地址已复制到剪贴板'),
      actionText: '查看地图',
    },
  ];

  const socialLinks = [
    {
      name: '微博',
      icon: '🔗',
      url: 'https://weibo.com/soulsync',
      color: '#ff6b6b',
    },
    {
      name: '抖音',
      icon: '🎵',
      url: 'https://douyin.com/soulsync',
      color: '#ff4757',
    },
    {
      name: '小红书',
      icon: '📖',
      url: 'https://xiaohongshu.com/soulsync',
      color: '#ff3838',
    },
    {
      name: 'B站',
      icon: '📺',
      url: 'https://bilibili.com/soulsync',
      color: '#00d2d3',
    },
  ];

  const workingHours = [
    { day: '周一至周五', time: '9:00 - 18:00', note: '工作时间' },
    { day: '周六', time: '10:00 - 16:00', note: '部分服务' },
    { day: '周日', time: '休息', note: '紧急事务请发邮件' },
  ];

  const faqItems = [
    {
      question: '如何参加运动活动？',
      answer:
        '您可以在首页查看最新活动，点击感兴趣的活动进行报名。我们会定期组织各类运动活动，包括跑步、羽毛球、瑜伽等。',
    },
    {
      question: '活动费用如何？',
      answer:
        '大部分基础活动都是免费的，部分需要场地费或器材费的活动会提前说明收费标准。我们致力于让更多人参与运动。',
    },
    {
      question: '新手可以参加吗？',
      answer:
        '当然可以！我们欢迎所有水平的运动爱好者。许多活动专门为新手设计，有专业教练指导，让您安全愉快地开始运动之旅。',
    },
    {
      question: '如何成为活动组织者？',
      answer:
        '如果您有组织活动的经验和热情，可以通过联系表单申请成为活动组织者。我们会提供必要的支持和培训。',
    },
  ];

  return (
    <div className={`contact-info ${className}`}>
      {/* 联系方式 */}
      <div className="contact-methods">
        <h3 className="section-title">
          <span className="title-icon">📞</span>
          联系方式
        </h3>
        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-card card-glass hover-lift">
              <div className="contact-icon">{method.icon}</div>
              <div className="contact-content">
                <h4 className="contact-title">{method.title}</h4>
                <p className="contact-detail">{method.content}</p>
                <p className="contact-description">{method.description}</p>
                <Button
                  variant="outline"
                  size="small"
                  onClick={method.action}
                  className="contact-action-btn"
                >
                  {method.actionText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 工作时间 */}
      <div className="working-hours">
        <h3 className="section-title">
          <span className="title-icon">⏰</span>
          工作时间
        </h3>
        <div className="hours-table">
          {workingHours.map((schedule, index) => (
            <div key={index} className="hours-row">
              <div className="hours-day">{schedule.day}</div>
              <div className="hours-time">{schedule.time}</div>
              <div className="hours-note">{schedule.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 社交媒体 */}
      <div className="social-media">
        <h3 className="section-title">
          <span className="title-icon">🌟</span>
          关注我们
        </h3>
        <p className="social-description">
          在社交媒体上关注我们，获取最新的活动资讯和运动干货
        </p>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{ '--social-color': social.color }}
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 常见问题 */}
      <div className="faq-section">
        <h3 className="section-title">
          <span className="title-icon">❓</span>
          常见问题
        </h3>
        <div className="faq-list">
          {faqItems.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">
                <span className="question-text">{faq.question}</span>
                <span className="question-icon">+</span>
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* 应急联系 */}
      <div className="emergency-contact">
        <div className="emergency-card">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-content">
            <h4>紧急联系</h4>
            <p>
              如遇紧急情况，请拨打：<strong>400-123-4567</strong>
            </p>
            <p>
              或发送邮件至：<strong>emergency@soulsync.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
