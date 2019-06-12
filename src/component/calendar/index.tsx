/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 17:05:17
 */

import React from 'react';
import './index.less';

import { Calendar } from 'antd-mobile';
import PropsType from './props';
import { isFunction } from '../../common';

export class QCalendar extends React.Component<PropsType, any> {
	maskEle!: Element | null;
	endDate: Date | undefined;
	onClose: () => void;
	constructor(props: PropsType) {
		super(props);
		this.onClose = this.props.onClose || (() => {});
		this.state = {
			visible: props.visible,
			maskClosable: props.maskClosable || true,
			rangeSelectedText: props.rangeSelectedText || ''
		}
	}

	componentDidMount() {
		const { maskClosable } = this.state;
		maskClosable && this.addMaskClosable();
	}

	componentWillReceiveProps(nextProps: PropsType) {
		const { visible, rangeSelectedText } = this.state;
		if (visible !== nextProps.visible) {
			this.setState({visible: nextProps.visible});
		}
		if (rangeSelectedText !== nextProps.rangeSelectedText) {
			setTimeout(() => this.createDaysTip(nextProps.rangeSelectedText || ''), 0);
		}
	}

	componentWillUnmount() {
		this.removeMaskClosable();
	}

	/**
	 * @description 增加mask点击关闭功能 默认开启
	 */
	addMaskClosable = () => {
		this.maskEle = document.querySelector('.mask');

		this.maskEle && isFunction(this.onClose) && this.maskEle.addEventListener('click', this.onClose);
	}

	/**
	 * @description 移除mask上的监听
	 */
	removeMaskClosable = () => {
		this.maskEle && this.maskEle.removeEventListener('click', this.onClose);
	}

	/**
	 * @description 选中回调
	 */
	onSelect = (date: Date, state?: [Date | undefined, Date | undefined]): void | [Date, Date] | [Date] => {
		this.clearDaysTip();
		if (this.props.onSelect && isFunction(this.props.onSelect)) {
			return this.props.onSelect(date, state);
		}
	}

	/**
	 * @description 清除区间选择提示
	 */
	clearDaysTip = () => {
		const tipEle = document.querySelector('.tip');
		tipEle && (tipEle.className = 'info date-selected');
	}

	/**
	 * @description 添加区间选择提示
	 */
	createDaysTip = (content: string) => {
		const [selectedStartEle, selectedEndEle] = Array.from(document.querySelectorAll('.info.date-selected'));
		if (selectedStartEle) {
			selectedStartEle.className = 'info date-selected'
		}
		if (selectedEndEle) {
			selectedEndEle.className += ' tip';
			selectedEndEle.innerText = content;
		}
	}

	public render() {
    const { visible } = this.state;
		return (
			<div className='q-calendar'>
				<Calendar
					{...this.props}
					visible={visible}
					showShortcut={false}
					renderHeader={() => <div></div>}
					onSelect={this.onSelect}
        />
			</div>
		);
	}
}
