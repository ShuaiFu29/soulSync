import React, { useState } from 'react';
import Button from '../../common/Button';
import './ContactForm.css';

const ContactForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const categories = [
    { value: 'general', label: '一般咨询' },
    { value: 'join', label: '加入我们' },
    { value: 'activity', label: '活动报名' },
    { value: 'cooperation', label: '合作洽谈' },
    { value: 'feedback', label: '意见反馈' },
    { value: 'technical', label: '技术支持' },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    // 清除提交状态
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '姓名至少需要2个字符';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '请输入咨询主题';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = '主题至少需要5个字符';
    }

    if (!formData.message.trim()) {
      newErrors.message = '请输入详细内容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '内容至少需要10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      const contactData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };

      await onSubmit?.(contactData);

      // 提交成功
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general',
      });
      setErrors({});
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-form-container ${className}`}>
      <div className="contact-form card-glass">
        <div className="form-header">
          <h3 className="form-title">📧 联系我们</h3>
          <p className="form-subtitle">有任何问题或建议，随时与我们取得联系</p>
        </div>

        {submitStatus === 'success' && (
          <div className="status-message success">
            <div className="status-icon">✅</div>
            <div className="status-content">
              <h4>提交成功！</h4>
              <p>感谢您的咨询，我们会在24小时内回复您。</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="status-message error">
            <div className="status-icon">❌</div>
            <div className="status-content">
              <h4>提交失败</h4>
              <p>网络异常，请稍后重试或直接联系我们。</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form-content">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input input-glass ${errors.name ? 'error' : ''}`}
                placeholder="请输入您的姓名"
                maxLength={20}
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label required">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input input-glass ${errors.email ? 'error' : ''}`}
                placeholder="请输入您的邮箱地址"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                手机号码 (可选)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input input-glass ${errors.phone ? 'error' : ''}`}
                placeholder="请输入您的手机号码"
                maxLength={11}
              />
              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                咨询类型
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input-glass select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label required">
              咨询主题
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`form-input input-glass ${errors.subject ? 'error' : ''}`}
              placeholder="请简要描述您的咨询主题"
              maxLength={100}
            />
            {errors.subject && (
              <span className="field-error">{errors.subject}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label required">
              详细内容
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea input-glass ${errors.message ? 'error' : ''}`}
              placeholder="请详细描述您的问题或建议，我们会认真对待每一条反馈..."
              rows={6}
              maxLength={1000}
            />
            <div className="textarea-footer">
              <span className="char-count">{formData.message.length}/1000</span>
              {errors.message && (
                <span className="field-error">{errors.message}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="ghost"
              size="medium"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: '',
                  category: 'general',
                });
                setErrors({});
                setSubmitStatus(null);
              }}
              disabled={isSubmitting}
            >
              重置
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isSubmitting}
              className={isSubmitting ? 'loading' : ''}
            >
              {isSubmitting ? '提交中...' : '发送消息'}
            </Button>
          </div>
        </form>

        <div className="form-footer">
          <p className="privacy-note">
            📝 我们重视您的隐私，提交的信息仅用于回复您的咨询。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
