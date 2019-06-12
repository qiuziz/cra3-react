/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 17:16:20
 */

import * as React from 'react';
import './index.less';

import { QTabs } from '../../component';
import { LocalStorage } from '../../common';

interface PropsType {
	History: any;
	location: any;
	history: any;
}



const tabs = [
  { title: '住宿' },
  { title: '自助餐' },
  { title: '下午茶' },
  { title: '住宿' },
  { title: '自助餐' },
  { title: '下午茶' },
  { title: '住宿' },
  { title: '自助餐' },
  { title: '下午茶' },
];

export class TabsDemo extends React.Component<PropsType, any> {
	days: number | undefined;
	constructor(props: PropsType) {
		super(props);
		const currentCity = LocalStorage.getItem('city');
		this.state = {
			currentCity
		}
	}


	componentWillMount() {

	}
	componentDidMount() {

	}

	selectCity = () => {
		this.props.History.push({pathname: '/city',})
	}


	public render() {
		const { currentCity } = this.state;
		return (
			<div className='tabs'>
				<div style={{height: '400px'}}>400px</div>
				<QTabs
					tabs={tabs}
					locateText={currentCity}
					initialPage={1}
					swipeable={false}
					onLocateClick={this.selectCity}
        >
					{
						tabs.map((tab: any, index: number) =>
							<div key={index} style={{ display: 'flex', paddingTop: '100px', justifyContent: 'center', height: '1250px', backgroundColor: '#fff' }}>
			          Content of {tab.title} tab
			        </div>
						)
					}
				</QTabs>
			</div>
		);
	}
}

