/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-03-05 14:55:35
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 10:22:53
 */

import React from 'react';
import './index.less';
import { QIndexSelect } from '../../component';
import DATA from './data';
import { LocalStorage, getUrlParams } from '../../common';
import LocIcon from '../../assets/images/icon_loc.png';

function handleData(data: any) {
	const urlParams: any = getUrlParams();
	const {currentCity} = urlParams;
	let cityListDataSource: any = {
		'定': [
			{
				"code": "",
				"name": currentCity,
				"chineseChar": null
			}
		],
		'热': data.hots
	};
	data.citys && data.citys.forEach((city: any) => {
		cityListDataSource[city.letter] = city.cityList;
	});
	return cityListDataSource;
}

const handeTitle = (key: string): string => {
	switch(key) {
		case '定':
			return '当前定位城市';
		case '热':
			return '热门城市';
		default:
			return key;
	}
}

const handleItemStyle = (key: string | number): string => {
	switch(key) {
		case '定':
			return 'city-li location';
		case '热':
			return 'city-li hot';
		default:
			return 'city-li';
	}
}

interface PropsType {
	History: any;
	location: any;
	history: any;
}
export class CityList extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);

		const urlParams: any = getUrlParams();
		this.state = {
			data: {},
			...urlParams
		};
	}

	componentWillMount() {

	}

	componentDidMount() {
		this.setState({ data: handleData(DATA) });
	}



	onSelectItem = (rowData: any) => () => {
		LocalStorage.setItem('city', rowData);
		this.props.History.go(-1);
	}
	/**
	 * @description ListView 每条数据函数
	 */
	renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
		return (
					<div className={`city ${handleItemStyle(sectionID)}`}  key={rowID} onClick={this.onSelectItem(rowData)}>
						{sectionID === '定' && <img className="icon-location-city" src={LocIcon} alt="" />}
						{rowData}
					</div>
				)
	};

	
	render() {
		const {data} = this.state;
		return (
			<div className="city-select-wrap">
				<QIndexSelect
					data={data}
					sectionHeader={sectionData => <div className="direction-title">{handeTitle(sectionData)}</div>}
					renderRow={this.renderRow}
				/>
			</div>
		);
	}
}