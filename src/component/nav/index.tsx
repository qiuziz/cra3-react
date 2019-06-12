/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-06-05 10:57:09
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:41:47
 */

import './index.less';

import * as React from 'react';
import { Icon, NavBar } from 'antd-mobile';

interface Props {
	History: any;
	root: boolean;
}

export class Nav extends React.Component<Props, {}> {

	onLeftClick = () => {
		this.props.History.goBack();
	}

	componentDidMount() {

	}

  render () {
		const { root } = this.props;
    return (
		<nav className="nav-bar">
			<NavBar
				className="nav-bar"
	      mode="dark"
	      icon={!root && <Icon type="left" />}
	      onLeftClick={this.onLeftClick}
	      
	    >{document.title}</NavBar>
			</nav>
    )
  }
}

