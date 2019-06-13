/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 17:12:48
 */

import React from 'react';
import './index.less';

import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd-mobile';
import PropsType from './props';
import { TabBarPropsType, Models } from 'rmc-tabs';
import LOCATE_ICON from '../../assets/images/locate.png';
declare var window: any;

export class QVideo extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		console.log(props)
		this.state = {
			locate: props.locate || true,
			locateIcon: props.locateIcon || <img className="locate-icon" src={LOCATE_ICON} alt="" />,
			onLocateClick: props.onLocateClick || (() => {}),
			locateText: props.locateText || ''
		}
	}

	componentDidMount() {
		window.AppBar && window.AppBar.postMessage(JSON.stringify({toggle: '1'}));
	}

	componentWillUnmount() {
		window.AppBar && window.AppBar.postMessage(JSON.stringify({toggle: '0'}));
	}

	componentWillReceiveProps(nextProps: PropsType) {
	
	}

	renderTabBar = (props: TabBarPropsType): React.ReactNode => {
		const { onLocateClick, locateIcon, locateText } = this.state;
		return (<Sticky>
			{({ style }) => <div className="q-tab-bar" style={{ ...style, zIndex: 1 }}>
			<div className="q-location am-tabs-default-bar-tab">
				<div className="q-location-tab" onClick={onLocateClick}>
					{locateIcon}
					<span className="city">{locateText}</span>
				</div>
			</div>
			<Tabs.DefaultTabBar {...props} page={4} renderTab={(tab: Models.TabData) => {
				return <div className="tab-title">{tab.title}</div>
			}}/>
			</div>}
		</Sticky>);
	}


	public render() {
		const { children, ...rest__props } = this.props;
		return (
			<div className='q-tabs'>
				<StickyContainer>
		      <Tabs
						{...rest__props}
						renderTabBar={this.renderTabBar}
		      >
		       {children}
		      </Tabs>
		    </StickyContainer>
			</div>
		);
	}
}
