/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:49:26
 */

import * as React from 'react';
import './index.less';

import { QImgLoad } from '../../component';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export class ImgLoadDemo extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			
		}
	}

	componentWillMount() {

	}
	componentDidMount() {

	}


	public render() {
		return (
			<div className='img-load-demo'>
				<QImgLoad className="img" style={{height: '100%'}} src="https://images.unsplash.com/photo-1447968380625-fd05a577e7b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />
			</div>
		);
	}
}

