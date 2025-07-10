import React, { useState } from 'react';
import Button from '../../common/Button';
import './MessageForm.css';

const MessageForm = ({ onSubmit, currentUser, className = '' }) => {
  const [formData, setFormData] = useState({
    content: '',
    tags: '',
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({});

  const MAX_CHARS = 500;
  const MAX_TAGS = 5;

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;

    if (name === 'content') {
      if (value.length <= MAX_CHARS) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

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

    if (!formData.content.trim()) {
      newErrors.content = '请输入留言内容';
    } else if (formData.content.trim().length < 5) {
      newErrors.content = '留言内容至少需要5个字符';
    }

    if (formData.tags) {
      const tagArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      if (tagArray.length > MAX_TAGS) {
        newErrors.tags = `最多只能添加${MAX_TAGS}个标签`;
      }
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
      const messageData = {
        content: formData.content.trim(),
        author: formData.isAnonymous ? '匿名用户' : currentUser?.name || '游客',
        timestamp: new Date().toISOString(),
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map(tag => tag.trim())
              .filter(tag => tag)
          : [],
        avatar: formData.isAnonymous ? null : currentUser?.avatar,
        likes: 0,
        isLiked: false,
        replies: [],
      };

      await onSubmit?.(messageData);

      // 重置表单
      setFormData({
        content: '',
        tags: '',
        isAnonymous: false,
      });
      setCharCount(0);
      setErrors({});
    } catch (error) {
      console.error('发布留言失败:', error);
      setErrors({ general: '发布失败，请稍后重试' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmojiInsert = emoji => {
    const newContent = formData.content + emoji;
    if (newContent.length <= MAX_CHARS) {
      setFormData(prev => ({ ...prev, content: newContent }));
      setCharCount(newContent.length);
    }
  };

  const commonEmojis = [
    '😊',
    '😍',
    '🥰',
    '😎',
    '🤔',
    '😂',
    '👍',
    '❤️',
    '🔥',
    '⭐',
  ];

  return (
    <div className={`message-form-container ${className}`}>
      <div className="message-form card-glass">
        <div className="form-header">
          <h3 className="form-title">💬 分享你的想法</h3>
          <p className="form-subtitle">与运动伙伴们分享你的感受和想法</p>
        </div>

        <form onSubmit={handleSubmit} className="message-form-content">
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              留言内容 *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className={`form-textarea input-glass ${errors.content ? 'error' : ''}`}
              placeholder="分享你的运动心得、感受或者问题..."
              rows={4}
              maxLength={MAX_CHARS}
            />
            <div className="textarea-footer">
              <div className="char-count">
                <span className={charCount > MAX_CHARS * 0.9 ? 'warning' : ''}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
              {errors.content && (
                <span className="field-error">{errors.content}</span>
              )}
            </div>
          </div>

          <div className="emoji-picker">
            <span className="emoji-label">快速插入表情：</span>
            <div className="emoji-list">
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  className="emoji-btn"
                  onClick={() => handleEmojiInsert(emoji)}
                  disabled={charCount >= MAX_CHARS}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              标签 (可选)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className={`form-input input-glass ${errors.tags ? 'error' : ''}`}
              placeholder="运动类型, 心情, 感受 (用逗号分隔，最多5个)"
            />
            {errors.tags && <span className="field-error">{errors.tags}</span>}
            <div className="tags-hint">例如：跑步, 快乐, 健康</div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              匿名发布
            </label>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="ghost"
              size="medium"
              onClick={() => {
                setFormData({ content: '', tags: '', isAnonymous: false });
                setCharCount(0);
                setErrors({});
              }}
              disabled={isSubmitting}
            >
              清空
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isSubmitting || !formData.content.trim()}
              className={isSubmitting ? 'loading' : ''}
            >
              {isSubmitting ? '发布中...' : '发布留言'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
