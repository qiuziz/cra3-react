/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-05-27 10:08:14
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 10:21:57
 */

import './index.less';

import React from 'react';
import classNames from 'classnames';
import DEFAULT from './default.png';

interface propTypes {
	className?: string;
	style?: object;
	defaultStyle?: object;
	src: string,
	defaultSrc?: string
	onLoad?: (load: boolean) => void;
}

export class QImgLoad extends React.Component<propTypes, any> {
	static defaultProps = {
		className: '',
		style: {},
		defaultStyle: {},
		src: '',
		defaultSrc: DEFAULT,
		onLoad: (load: boolean) => { console.log(load)}
	}

	constructor(props: propTypes) {
		super(props);

		this.state = {
			load: false,
			once: true,
			imgSrc: props.defaultSrc
		}
	}


	loadSuccess = () => {
		const { src, onLoad = () => {} } = this.props;
		this.setState({
			load: true,
			once: false,
			imgSrc: src
		}, () => onLoad(true));
	}

	loadError = () => {
		const { onLoad = () => {} } = this.props;
		this.setState({
			once: false,
			load: false,
		}, () => onLoad(false));
	}
	
	render() {
		const { className, src, style } = this.props;
		const { imgSrc, once } = this.state;
		return (
			<div className={classNames('q-load__img__content', className)}>
				<img
					className="q-img"
					src={imgSrc}
					style={style}
					alt=""
				/>
				{
					once &&
					<img
						className="q-img__load"
						src={src}
						onLoad={this.loadSuccess}
						onError={this.loadError}
						alt=""
					/>
				}
				
			</div>
		)
	}
}
