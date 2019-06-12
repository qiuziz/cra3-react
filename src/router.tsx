/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-05-07 16:03:31
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:44:40
 */

import * as React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HashHistory } from './common';

import { Layout, Nav } from './component';

import {
	CityList,
  CurrentLocation,
  CalendarDemo,
	TabsDemo,
	ImgLoadDemo,
	Home,
	Video
} from './container';

export const routes = [
  {
    path: '/map',
    Component: CurrentLocation,
    exact: true,
    Layout: Layout,
    title: '地图',
  },
  {
    path: '/city',
    Component: CityList,
    exact: true,
    title: '城市选择',
  },
  {
    path: '/calendar-demo',
    Component: CalendarDemo,
    Layout: Layout,
    exact: true,
    title: '日历',
  },
  {
    path: '/tabs-demo',
    Component: TabsDemo,
    exact: true,
    title: '标签页',
  },
  {
    path: '/img-demo',
		Component: ImgLoadDemo,
		Layout: Layout,
    exact: true,
    title: '图片加载',
  },
  {
    path: '/home',
		Component: Home,
		Layout: Layout,
    exact: true,
		title: 'common-utils',
		root: true,
  },
  {
    path: '/video',
		Component: Video,
		Layout: Layout,
    exact: true,
		title: 'video',
  },
];

const App = () => {
  return (
    <Switch>
      {
        routes.map(({ path, Layout, Component, exact, title, root }: any, index) => {
					return (
						<Route
							key={index}
							path={path}
							exact={exact}
							render={
	              props => {
									const { history, location } = props;
	                const History = HashHistory(history, location);
	                document.title = title;
	                return Layout
		                  ? <Layout {...props}>
												<Nav {...props} History={History} root={root} />
		                    <Component {...props} History={History} />
		                  </Layout>
		                  : <div>
													<Nav {...props} History={History} root={root} />
													<Component {...props} History={History} />
												</div>
	              }
							}
            />
          )
        })
      }
      <Redirect to="/home" />
    </Switch>
  )
}

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends React.Component {

  render() {
    return (
      <Router>
        <App />
      </Router>
    )
  }
}