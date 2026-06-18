import {Layout, Menu, Popconfirm} from 'antd'
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined,} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo} from "@/store/modules/user";

const {Header, Sider} = Layout

const items = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined/>,
  },
  {
    label: '文章管理',
    key: '/Article',
    icon: <DiffOutlined/>,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined/>,
  },
]

const GeekLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onMenuClick = (route) => {
    navigate(route.key)
  }

  const location = useLocation(); //获取当前页面的路由位置信息，包括路径、查询参数等信息
  const selectedKey = location.pathname; //location 对象，包含当前 URL 的完整路由信息：路径、查询参数等。pathname：路径部分（不含查询参数）

  useEffect(() => { // 组件挂载时，获取用户信息
    dispatch(fetchUserInfo())
  }, [dispatch]);

  const name = useSelector(state => state.user.userInfo.name); //Redux Store 的状态发生变化时，调用传入的箭头函数，组件会重新渲染

  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline" //inline模式下，菜单项会垂直排列，点击后会展开子菜单
            theme="dark" //dark主题下，	菜单主题（深色模式）
            selectedKeys={[selectedKey]} //控制菜单的选中状态，传入当前应该高亮的菜单项 key
            onClick={onMenuClick}
            items={items}
            style={{height: '100%', borderRight: 0}}></Menu>
        </Sider>
        <Layout className="layout-content" style={{padding: 20}}>
          {/*二级路由的出口*/}
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
