import App from './App'
import { ReactRegistry, Garden, Navigator } from 'react-native-navigation-hybrid'

// 配置全局样式
Garden.setStyle({
  topBarStyle: 'dark-content',
})

// 重要必须
ReactRegistry.startRegisterComponent()

// 注意，你的每一个页面都需要注册
ReactRegistry.registerComponent('Home', () => App)

// 重要必须
ReactRegistry.endRegisterComponent()

Navigator.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'Home' } }],
  },
})
