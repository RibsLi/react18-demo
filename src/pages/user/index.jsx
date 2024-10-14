import { useSearchParams, useParams } from 'react-router-dom'

export default function User() {
  // 使用 useSearchParams() 获取 searchParams 参数
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const userName = searchParams.get('userName')

  // 使用 useParams() 获取 params 参数
  const params = useParams()

  return (
    <div>
      我是用户页面 {userId || params.userId} - {userName || params.userName}
    </div>
  )
}
