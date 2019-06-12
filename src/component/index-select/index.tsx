/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-03-05 14:43:03
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 10:22:38
 */

import * as React from 'react';
import './index.less';
import { StickyContainer, Sticky } from 'react-sticky';
import { ListView } from 'antd-mobile';

interface PropsType {
	data: dataType;
	quickSearchBarStyle?: Object;
	renderRow?: (rowData: any, sectionID: string | number, rowID: string | number) => React.ReactElement<any>
	sectionHeader?: (sectionData: any) => React.ReactElement<any>
}

interface dataType {
	[propName: string]: Array<dataItemType>
}

interface dataItemType {
	code: string;
	name: string;
	[propName: string]: any;
}

function genData(ds: any, data: dataType) {
  const dataBlob: any = {};
  const sectionIDs: any = [];
  const rowIDs: any = [];
  Object.keys(data).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    data[item].forEach((item: dataItemType) => {
      rowIDs[index].push(item.code);
      dataBlob[item.code] = item.name;
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

export class QIndexSelect extends React.Component<PropsType, any> {
	listViewRef: any;
	indexDom: Element | undefined;
	timer: any;
	constructor(props: PropsType) {
		super(props);
		const getSectionData = (dataBlob: any, sectionID: string | number) => dataBlob[sectionID];
    const getRowData = (dataBlob: any, sectionID: string | number, rowID: string | number) => dataBlob[rowID];
		const dataSource = new ListView.DataSource({
			getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
      sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
		});

		this.state = {
			dataSource, // ListView列表数据源
			currentIndex: '', // 当前索引
			isTouch: false, // 触摸ing
		}
	}

	componentDidMount() {
		this.setState({
			dataSource: genData(this.state.dataSource, this.props.data),
		});
		setTimeout(this.fixTouchMove, 600);
	}

	componentWillReceiveProps(newProps: any) {
		this.setState({
			dataSource: genData(this.state.dataSource, newProps.data),
		});
		setTimeout(this.fixTouchMove, 600);
	}

	/**
	 * @description fix antd-mobile ListView.IndexList TouchMove 
	 */
 	fixTouchMove = () => {
		const moveListener = (e: Event) => e.preventDefault();
		const startListener = (e: Event) => this.setState({isTouch: true});
		this.indexDom = document.body.getElementsByClassName('am-indexed-list-quick-search-bar')[0];
		this.indexDom.addEventListener('touchmove', moveListener, false);
		// this.indexDom.addEventListener('touchend', endListener, false);
		this.indexDom.addEventListener('touchstart', startListener, false);
	}
	 
 	/**
	 * @description IndexList TouchMove Current Index
	 */
	quick = (sectionID: any, topId?:any) => {
		clearTimeout(this.timer);
		this.setState({currentIndex: sectionID || topId, isTouch: true});
		this.timer = setTimeout(() => this.setState({isTouch: false}), 300);
	}

	/**
	 * @description ListView 每条数据函数
	 */
	renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
		return this.props.renderRow
		? this.props.renderRow(rowData, sectionID, rowID)
		: (
				<div className="city" key={rowID}>
					{rowData}
				</div>
			)
	}

	public render() {
		const { dataSource, currentIndex, isTouch } = this.state;
		return (
			<div className="index-select" style={{position: 'relative'}}>
				<ListView.IndexedList
					ref={ref => this.listViewRef = ref}
					dataSource={dataSource}
					className="am-list sticky-list"
					// @ts-ignore
					renderSectionWrapper={(sectionID: string | number) => (
						<StickyContainer
							key={`s_${sectionID}_c`}
							className={`sticky-container ${sectionID === '定' || sectionID === '热' ? 'current-hot-city' : ''}`}
							style={{ zIndex: 4 }}
						/>
					)}
					renderRow={this.renderRow}
					useBodyScroll
					renderSectionHeader={sectionData => (
						<Sticky>
							{({
								style,
							}) => (
								<div
									className="sticky"
									style={{
										...style,
										zIndex: 3,
										width: '100%',
										left: 0
									}}
								>{this.props.sectionHeader ? this.props.sectionHeader(sectionData) : sectionData}</div>
							)}
						</Sticky>
					)}
					quickSearchBarStyle={{
						color: '#333333',
						fontSize: '14px',
						zIndex: 10,
						top: '85px',
						...this.props.quickSearchBarStyle
					}}
					delayTime={10}
					onQuickSearch={this.quick}
				/>
				<div className="current-quick" style={{display: isTouch && currentIndex ? '' : 'none'}}>
					 {currentIndex}
				</div>
			</div>
		);
	}
}
