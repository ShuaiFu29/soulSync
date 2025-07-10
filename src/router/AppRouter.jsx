import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from '../pages/HomePage';

// 懒加载其他页面组件
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const MessageWallPage = React.lazy(() => import('../pages/MessageWallPage'));
const ContactUsPage = React.lazy(() => import('../pages/ContactUsPage'));

// 加载组件
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>页面加载中...</p>
  </div>
);

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('路由错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>😕 页面加载出错</h2>
          <p>抱歉，页面遇到了一些问题。</p>
          <button onClick={() => window.location.reload()}>重新加载</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 路由配置
const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'SoulSync - 运动社区',
  },
  {
    path: '/login',
    element: <LoginPage />,
    title: '登录 - SoulSync',
  },
  {
    path: '/message-wall',
    element: <MessageWallPage />,
    title: '留言墙 - SoulSync',
  },
  {
    path: '/contact-us',
    element: <ContactUsPage />,
    title: '联系我们 - SoulSync',
  },
];

// 路由包装组件，用于设置页面标题
const RouteWrapper = ({ element, title }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return element;
};

const AppRouter = () => {
  return (
    <Router>
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteWrapper element={route.element} title={route.title} />
                }
              />
            ))}

            {/* 404 重定向到首页 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
