import React, { useState, useEffect } from 'react';
import MessageCard from '../MessageCard';
import Button from '../../common/Button';
import './MessageList.css';

const MessageList = ({
  messages = [],
  onLoadMore,
  onLike,
  onReply,
  currentUser,
  loading = false,
  hasMore = false,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState('latest'); // latest, popular, oldest
  const [filterBy, setFilterBy] = useState('all'); // all, followed, own
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);

  // 排序和筛选逻辑
  useEffect(() => {
    let filtered = [...messages];

    // 搜索过滤
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        message =>
          message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.tags?.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // 类型过滤
    switch (filterBy) {
      case 'own':
        filtered = filtered.filter(
          message =>
            message.author === currentUser?.name ||
            (currentUser?.isAnonymous && message.author === '匿名用户')
        );
        break;
      case 'followed':
        // 这里可以根据关注列表过滤
        // filtered = filtered.filter(message => currentUser?.following?.includes(message.author));
        break;
      default:
        // 'all' - 不做过滤
        break;
    }

    // 排序
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default: // 'latest'
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }

    setFilteredMessages(filtered);
  }, [messages, searchQuery, sortBy, filterBy, currentUser]);

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = newSort => {
    setSortBy(newSort);
  };

  const handleFilterChange = newFilter => {
    setFilterBy(newFilter);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('latest');
    setFilterBy('all');
  };

  const getSortLabel = sort => {
    const labels = {
      latest: '最新',
      popular: '最热',
      oldest: '最早',
    };
    return labels[sort] || '最新';
  };

  const getFilterLabel = filter => {
    const labels = {
      all: '全部',
      followed: '关注',
      own: '我的',
    };
    return labels[filter] || '全部';
  };

  if (messages.length === 0 && !loading) {
    return (
      <div className={`message-list ${className}`}>
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>还没有留言</h3>
          <p>成为第一个分享想法的人吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`message-list ${className}`}>
      {/* 搜索和过滤工具栏 */}
      <div className="message-toolbar">
        <div className="search-section">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="搜索留言内容、作者或标签..."
              className="search-input input-glass"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">排序：</label>
            <div className="filter-buttons">
              {['latest', 'popular', 'oldest'].map(sort => (
                <Button
                  key={sort}
                  variant={sortBy === sort ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => handleSortChange(sort)}
                  className="filter-btn"
                >
                  {getSortLabel(sort)}
                </Button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">筛选：</label>
            <div className="filter-buttons">
              {['all', 'followed', 'own'].map(filter => (
                <Button
                  key={filter}
                  variant={filterBy === filter ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => handleFilterChange(filter)}
                  className="filter-btn"
                >
                  {getFilterLabel(filter)}
                </Button>
              ))}
            </div>
          </div>

          {(searchQuery || sortBy !== 'latest' || filterBy !== 'all') && (
            <Button
              variant="outline"
              size="small"
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              清除筛选
            </Button>
          )}
        </div>
      </div>

      {/* 结果统计 */}
      <div className="results-info">
        <span className="results-count">
          共 {filteredMessages.length} 条留言
          {searchQuery && ` · 搜索"${searchQuery}"`}
        </span>
      </div>

      {/* 留言列表 */}
      <div className="messages-container">
        {filteredMessages.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>没有找到匹配的留言</h3>
            <p>试试调整搜索条件或筛选选项</p>
            <Button variant="outline" size="medium" onClick={clearFilters}>
              清除所有筛选
            </Button>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <MessageCard
              key={message.id || index}
              message={message}
              onLike={onLike}
              onReply={onReply}
              currentUser={currentUser}
              className={`message-item-${index}`}
            />
          ))
        )}
      </div>

      {/* 加载更多 */}
      {hasMore && (
        <div className="load-more-section">
          <Button
            variant="outline"
            size="large"
            onClick={onLoadMore}
            disabled={loading}
            className={`load-more-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? '加载中...' : '加载更多留言'}
          </Button>
        </div>
      )}

      {/* 加载指示器 */}
      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>正在加载留言...</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
