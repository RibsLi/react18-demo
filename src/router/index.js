import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react' // 配置路由懒加载

// import Home from "@/pages/home";
// import About from "@/pages/about";
// import User from "@/pages/user";
// import Other from "@/pages/other";
// import NotFound from "@/pages/error/404";

const Home = lazy(() => import('@/pages/home'))
const About = lazy(() => import('@/pages/about'))
const User = lazy(() => import('@/pages/user'))
const Other = lazy(() => import('@/pages/other'))
const NotFound = lazy(() => import('@/pages/error/404'))

// createBrowserRouter 创建 history 路由
// createHashRouter() 创建 hash 路由
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={null}>
        <Home />
      </Suspense>
    ) // 路由懒加载, 加载时显示 fallback 组件
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={null}>
        <About />
      </Suspense>
    ),
    children: [
      {
        path: 'other',
        // index: true, // 默认渲染子路由页面：去掉 path 并设置 index 为 true
        element: (
          <Suspense fallback={null}>
            <Other />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/user',
    element: (
      <Suspense fallback={null}>
        <User />
      </Suspense>
    )
  },
  {
    path: '/user/:userId/:userName',
    element: (
      <Suspense fallback={null}>
        <User />
      </Suspense>
    )
  },
  {
    path: '*', // 当路由不匹配时渲染 404 页面
    element: (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    )
  }
])

export default router
