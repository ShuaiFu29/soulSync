import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import MessageForm from '../../components/features/MessageForm';
import MessageList from '../../components/features/MessageList';
import './MessageWallPage.css';

const MessageWallPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentUser] = useState({
    name: '运动爱好者',
    avatar: null,
    id: 'user_123',
  });

  // 模拟初始数据
  useEffect(() => {
    const initialMessages = [
      {
        id: '1',
        author: '小明',
        content:
          '今天跑了10公里，感觉超棒！运动真的是最好的解压方式，推荐大家都试试晨跑，空气清新，心情也会变得很好。',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30分钟前
        likes: 15,
        isLiked: false,
        replies: [
          {
            author: '小红',
            content: '我也喜欢晨跑！一起组队吧',
            timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          },
        ],
        tags: ['跑步', '健康', '晨练'],
        avatar: null,
      },
      {
        id: '2',
        author: '健身达人',
        content:
          '刚从健身房回来，今天练的是胸肌和三头。感觉状态越来越好了，坚持真的很重要！💪',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2小时前
        likes: 8,
        isLiked: true,
        replies: [],
        tags: ['健身', '肌肉训练'],
        avatar: null,
      },
      {
        id: '3',
        author: '瑜伽爱好者',
        content:
          '今天的瑜伽课特别棒，老师教了一些新的体式。瑜伽不仅能锻炼身体，还能让心灵得到平静。推荐大家尝试！',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5小时前
        likes: 12,
        isLiked: false,
        replies: [
          {
            author: '小李',
            content: '瑜伽确实很棒，我也在学',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          },
          {
            author: '运动小白',
            content: '请问有推荐的瑜伽教程吗？',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          },
        ],
        tags: ['瑜伽', '放松', '身心健康'],
        avatar: null,
      },
      {
        id: '4',
        author: '匿名用户',
        content:
          '刚开始运动，有点累但是很充实。希望能坚持下去，大家有什么建议吗？',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8小时前
        likes: 6,
        isLiked: false,
        replies: [],
        tags: ['新手', '坚持'],
        avatar: null,
      },
      {
        id: '5',
        author: '游泳教练',
        content:
          '游泳是全身运动，对关节压力小，特别适合想要减重和塑形的朋友。夏天游泳既锻炼又凉爽！',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12小时前
        likes: 20,
        isLiked: false,
        replies: [
          {
            author: '小王',
            content: '游泳确实很好，但是我不太会',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
          },
        ],
        tags: ['游泳', '减重', '全身运动'],
        avatar: null,
      },
    ];

    setMessages(initialMessages);
  }, []);

  const handleSubmitMessage = async messageData => {
    try {
      setLoading(true);

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMessage = {
        ...messageData,
        id: Date.now().toString(),
        likes: 0,
        isLiked: false,
        replies: [],
      };

      setMessages(prev => [newMessage, ...prev]);
    } catch (error) {
      console.error('发布留言失败:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLikeMessage = async messageId => {
    try {
      setMessages(prev =>
        prev.map(message => {
          if (message.id === messageId) {
            return {
              ...message,
              isLiked: !message.isLiked,
              likes: message.isLiked ? message.likes - 1 : message.likes + 1,
            };
          }
          return message;
        })
      );

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('点赞失败:', error);
      // 回滚状态
      setMessages(prev =>
        prev.map(message => {
          if (message.id === messageId) {
            return {
              ...message,
              isLiked: !message.isLiked,
              likes: message.isLiked ? message.likes + 1 : message.likes - 1,
            };
          }
          return message;
        })
      );
    }
  };

  const handleReplyMessage = async (messageId, replyData) => {
    try {
      const newReply = {
        ...replyData,
        id: Date.now().toString(),
      };

      setMessages(prev =>
        prev.map(message => {
          if (message.id === messageId) {
            return {
              ...message,
              replies: [...(message.replies || []), newReply],
            };
          }
          return message;
        })
      );

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('回复失败:', error);
      throw error;
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);

      // 模拟加载更多数据
      await new Promise(resolve => setTimeout(resolve, 1000));

      const moreMessages = [
        {
          id: `${Date.now()}-1`,
          author: '篮球小子',
          content: '今天和朋友们打了两小时篮球，出了一身汗，感觉真爽！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          likes: 3,
          isLiked: false,
          replies: [],
          tags: ['篮球', '团队运动'],
          avatar: null,
        },
        {
          id: `${Date.now()}-2`,
          author: '登山客',
          content:
            '周末爬山看日出，虽然累但是风景真的很美。运动让我们更接近大自然！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
          likes: 7,
          isLiked: false,
          replies: [],
          tags: ['登山', '户外', '日出'],
          avatar: null,
        },
      ];

      setMessages(prev => [...prev, ...moreMessages]);

      // 模拟没有更多数据
      if (messages.length > 15) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout backgroundIntensity="light" className="message-wall-page">
      <div className="message-wall-container">
        <div className="page-header">
          <h1 className="page-title gradient-text">🏃‍♂️ 运动留言墙</h1>
          <p className="page-subtitle">分享你的运动心得，与伙伴们一起成长</p>
        </div>

        <div className="message-wall-content">
          <MessageForm
            onSubmit={handleSubmitMessage}
            currentUser={currentUser}
            className="message-form-section"
          />

          <MessageList
            messages={messages}
            onLoadMore={handleLoadMore}
            onLike={handleLikeMessage}
            onReply={handleReplyMessage}
            currentUser={currentUser}
            loading={loading}
            hasMore={hasMore}
            className="message-list-section"
          />
        </div>

        {/* 页面统计信息 */}
        <div className="page-stats">
          <div className="stat-item">
            <span className="stat-number">{messages.length}</span>
            <span className="stat-label">条留言</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {messages.reduce(
                (total, msg) => total + (msg.replies?.length || 0),
                0
              )}
            </span>
            <span className="stat-label">条回复</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {messages.reduce((total, msg) => total + (msg.likes || 0), 0)}
            </span>
            <span className="stat-label">个点赞</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MessageWallPage;
