import { useRef, useState, useEffect } from 'react'
// 组件中使用 useSelector() 获取redux中的数据
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/store/modules/counterStore'

import { Link, useNavigate } from 'react-router-dom'

import './index.css'
import homeStyles from './index.module.css'
import './index.scss'

function Home() {
  // const Home = () => {
  const list = [
    { name: 'John', age: 18 },
    { name: 'Mary', age: 20 },
    { name: 'Bob', age: 25 }
  ]

  // 事件绑定: 可以使用函数声明或箭头函数的格式
  function btnClick1(e) {
    console.log('点击了按钮1', e)
  }
  // const btnClick1 = (e) => {
  //   console.log('点击了按钮1', e)
  // }
  function btnClick2(arg1, arg2, e) {
    console.log(arg1, arg2, e)
  }

  // useState
  const [state, setState] = useState(0)
  const [obj, setObj] = useState({ name: '张三', age: 20, address: { country: '中国', city: '北京' } })
  function handleState() {
    // 方式一：直接修改状态
    // setState(state + 1)

    // 方式二：使用回调函数修改状态
    setState(state => state + 1) // 可以获取状态和界面都更新后的最新状态

    // 修改对象或数组状态：因为set方法是替换操作，所以必须和老的状态合并，不能直接修改对象或数组；有多层嵌套时，也需要进行合并
    // setObj((obj) => ({...obj, age: obj.age + 1 }))
    setObj(obj => ({ ...obj, address: { ...obj.address, city: '上海' } }))
  }

  // 使用 useRef() 通过btnRef.current获取DOM
  const btnRef = useRef(null)

  // useEffect() 副作用函数，可以获取DOM、修改状态、订阅事件、定时器等
  // 1.没有依赖项时，在组件初始化和组件更新时执行
  // 2.空数组依赖时，只在组件初始化时执行
  // 3.有依赖项时，在组件初始化和指定依赖项变化时执行
  // useEffect(() => { doSomething(args) }, [ args ])
  useEffect(() => {
    console.log('---useEffect---')
    //   const timer = setInterval(() => { console.log('执行定时器') }, 1000);
    //   // 可以通过return一个函数来清除副作用，如组件卸载时清除定时器
    //   return () => { clearInterval(timer) }
  }, [])

  // 获取redux中的数据
  // ps: 这里的 counter 是在src/store/index.js中定义
  const { value } = useSelector(data => data.counter)
  // 修改redux数据
  const dispatch = useDispatch()

  // 编程式导航
  const navigate = useNavigate()

  return (
    <>
      {/* 列表渲染 */}
      <div>列表渲染</div>
      {list.map((item, index) => (
        <div key={index}>
          {item.name} - {item.age}
        </div>
      ))}

      <br />

      {/* 条件渲染: 通过逻辑与运算符&&、三元表达式或者 filter() 等高阶函数实现 */}
      <div>条件渲染</div>
      {list.map(
        (item, index) =>
          item.age > 20 && (
            <div key={index}>
              {item.name} - {item.age}
            </div>
          )
      )}
      {list.map((item, index) =>
        item.age > 20 ? (
          <div key={index}>
            {item.name} - {item.age}
          </div>
        ) : null
      )}
      {list
        .filter(item => item.age > 20)
        .map((item, index) => (
          <div key={index}>
            {item.name} - {item.age}
          </div>
        ))}

      <br />

      {/* 事件绑定 */}
      <div>事件绑定</div>
      <button onClick={btnClick1}>按钮1</button>
      {/* 事件中的参数传递 */}
      <button onClick={e => btnClick2('按钮2', 2, e)}>按钮2</button>
      <br />
      <br />

      {/* useState */}
      <div>useState() 状态</div>
      <div>state状态：{state}</div>
      <div>
        obj状态：{obj.name} - {obj.age} - {obj.address.country + obj.address.city}
      </div>
      <button onClick={handleState}>修改状态</button>

      <br />
      <br />

      {/* 样式绑定: 通过 className 或 style 属性绑定样式 */}
      <div className="container">className样式绑定</div>
      <div className={homeStyles.container}>className(模块化)样式绑定</div>
      <div className="home">
        <div className="container">className(sass)样式绑定</div>
      </div>
      <div style={{ backgroundColor: 'red' }}>style样式绑定</div>

      <br />

      {/* useRef() 获取DOM */}
      <div>useRef() 获取DOM</div>
      <button ref={btnRef} onClick={() => console.dir(btnRef.current)}>
        点击获取DOM
      </button>

      <br />
      <br />
      {/* redux 的使用 */}
      <div>redux数据：{value}</div>
      <button onClick={() => dispatch(decrement())}>redux-</button>
      <button onClick={() => dispatch(increment())}>redux+</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>redux+10</button>

      <br />
      <br />
      <div>路由跳转：</div>
      {/* 方法一：声明式导航，通过 <Link to='/path' /> 就行跳转，会被浏览器渲染成a标签 */}
      <Link to="/about">声明式导航</Link>
      {/* 方法二：编程式导航，通过 useNavigate() 钩子函数跳转 */}
      <button onClick={() => navigate('/user')}>编程式导航</button>

      {/* 路由参数传递 */}
      {/* searchParams 传参 */}
      <button onClick={() => navigate('/user?userId=123&userName=德玛西亚')}>searchParams 传参</button>
      {/* params 传参需要修改对应的路由表 path: "/user/:userId", */}
      <button onClick={() => navigate('/user/123/德玛西亚')}>params 传参</button>

      <br />
      <br />
      {/* 嵌套路由 */}
      <button onClick={() => navigate('/about/other')}>二级路由</button>
    </>
  )
}

export default Home
