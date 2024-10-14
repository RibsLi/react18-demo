import { createContext, useContext } from 'react'
// Outlet 决定了子路由的渲染位置
import { Outlet } from 'react-router-dom'

// 祖传孙
const MyContext = createContext()

export default function About() {
  const info = { name: '德玛西亚', age: 18 }

  function handleC2P(args) {
    console.log('子组件传递给父组件的参数', args)
  }

  return (
    <>
      <div>我是关于页面</div>
      <P2C {...info} city="北京" />

      {/* 当我们把内容嵌套在子组件标签中时，父组件会自动在 children 中传递子组件的 props */}
      <P2C>
        <span>这是一个span</span>
      </P2C>

      <br />
      <C2P onHandleC2P={handleC2P} />

      <br />
      <br />
      <MyContext.Provider value={{ name: '德玛西亚', age: 18 }}>
        <G2C />
      </MyContext.Provider>

      <br />
      <br />
      <Outlet />
    </>
  )
}

// 组件通信
// 父传子：通过 props 传递，props 是只读的，不允许在子组件中修改
function P2C(props) {
  console.log('父组件传递给子组件的props', props)
  const { name, age, city, children } = props

  return (
    <div>
      {!children ? (
        <div>
          父传子：{name} - {age} - {city}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// 子传父：父组件提前给子组件传递一个函数，子组件中调用这个函数并传递参数
function C2P(props) {
  return (
    <>
      <div>子传父</div>
      <button onClick={() => props.onHandleC2P('参数')}>子传父</button>
    </>
  )
}

// 祖传孙: 通过 Context
// 1.createContext() 创建一个上下文对象
// 2.在顶层组件通过 Provider 组件提供数据
// 3.在底层组件中通过 useContext 读取数据
function G2C() {
  const { name, age } = useContext(MyContext)
  return (
    <div>
      祖传孙：{name}-{age}
    </div>
  )
}
