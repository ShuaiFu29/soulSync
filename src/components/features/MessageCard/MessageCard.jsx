import React, { useState } from 'react';
import Button from '../../common/Button';
import './MessageCard.css';

const MessageCard = ({
  message,
  onLike,
  onReply,
  currentUser = null,
  className = '',
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiking, setIsLiking] = useState(false);

  const {
    id,
    author,
    content,
    timestamp,
    likes = 0,
    isLiked = false,
    replies = [],
    tags = [],
    avatar,
  } = message;

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await onLike?.(id);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async e => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await onReply?.(id, {
        content: replyText,
        author: currentUser?.name || '匿名用户',
        timestamp: new Date().toISOString(),
      });
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('回复失败:', error);
    }
  };

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className={`message-card card-glass hover-lift ${className}`}>
      <div className="message-header">
        <div className="author-info">
          <div className="author-avatar">
            {avatar ? (
              <img src={avatar} alt={author} />
            ) : (
              <div className="avatar-placeholder">
                {author?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          <div className="author-details">
            <h4 className="author-name">{author || '匿名用户'}</h4>
            <span className="message-time">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      <div className="message-content">
        <p>{content}</p>

        {tags.length > 0 && (
          <div className="message-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="message-actions">
        <Button
          variant="ghost"
          size="small"
          onClick={handleLike}
          disabled={isLiking}
          className={`like-btn ${isLiked ? 'liked' : ''}`}
        >
          <span className="like-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="like-count">{likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="small"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="reply-btn"
        >
          <span className="reply-icon">💬</span>
          回复
        </Button>
      </div>

      {replies.length > 0 && (
        <div className="message-replies">
          <h5 className="replies-title">回复 ({replies.length})</h5>
          {replies.map((reply, index) => (
            <div key={index} className="reply-item">
              <div className="reply-author">{reply.author}:</div>
              <div className="reply-content">{reply.content}</div>
              <div className="reply-time">
                {formatTimestamp(reply.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showReplyForm && (
        <form onSubmit={handleReply} className="reply-form">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="写下你的回复..."
            className="reply-textarea input-glass"
            rows={3}
            required
          />
          <div className="reply-form-actions">
            <Button
              type="button"
              variant="ghost"
              size="small"
              onClick={() => {
                setShowReplyForm(false);
                setReplyText('');
              }}
            >
              取消
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="small"
              disabled={!replyText.trim()}
            >
              发送回复
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MessageCard;
