import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/common/Button';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 登录成功后的处理
      console.log('登录成功', formData);
      alert('登录成功！欢迎回到 SoulSync！');
      navigate('/');
    } catch (error) {
      console.error('登录失败:', error);
      setErrors({ general: '登录失败，请检查您的邮箱和密码' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('忘记密码功能将在后续版本中实现');
  };

  const handleRegister = () => {
    alert('注册功能将在后续版本中实现');
  };

  return (
    <PageLayout backgroundIntensity="light" className="login-page">
      <div className="login-container">
        <div className="login-card card-glass">
          <div className="login-header">
            <h1 className="login-title gradient-text">欢迎回来</h1>
            <p className="login-subtitle">登录您的 SoulSync 账户</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                邮箱地址
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input input-glass ${errors.email ? 'error' : ''}`}
                placeholder="请输入您的邮箱地址"
                autoComplete="email"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input input-glass ${errors.password ? 'error' : ''}`}
                placeholder="请输入您的密码"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                记住我
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="forgot-password-btn"
              >
                忘记密码？
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={isLoading}
              className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>

          <div className="login-footer">
            <p className="register-prompt">
              还没有账户？
              <button
                type="button"
                onClick={handleRegister}
                className="register-btn"
              >
                立即注册
              </button>
            </p>
          </div>

          <div className="social-login">
            <div className="divider">
              <span>或者</span>
            </div>

            <div className="social-buttons">
              <Button
                variant="outline"
                size="medium"
                className="social-btn"
                onClick={() => alert('微信登录功能开发中')}
              >
                <span className="social-icon">💬</span>
                微信
              </Button>

              <Button
                variant="outline"
                size="medium"
                className="social-btn"
                onClick={() => alert('QQ登录功能开发中')}
              >
                <span className="social-icon">🐧</span>
                QQ
              </Button>
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="login-decorations">
          <div className="decoration-circle decoration-1"></div>
          <div className="decoration-circle decoration-2"></div>
          <div className="decoration-line decoration-3"></div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
