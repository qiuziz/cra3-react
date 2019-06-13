/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:42:29
 */

import * as React from 'react';
import './index.less';

import { routes } from '../../router';
import { List } from 'antd-mobile';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export class Home extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			
		}
	}

	componentWillMount() {

	}
	componentDidMount() {

	}

	go = (path: string) => () => {
		this.props.History.push({
			pathname: path
		})
	}


	public render() {
		return (
			<div className='home'>
				<List>
					{
						routes.map((route: any, index: number) => {
							if (route.path !== '/home') {
							return <List.Item key={index} arrow="horizontal">
											<span onClick={this.go(route.path)}>{route.title}</span>
										</List.Item>
							}
							return null;
						})
					}
				</List>
			</div>
		);
	}
}

