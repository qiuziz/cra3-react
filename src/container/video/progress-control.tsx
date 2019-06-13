/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-06-12 15:09:41
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-13 17:45:02
 */

import React from 'react';
import './index.less';
import { getPointerPosition } from './utils';
import { findDOMNode } from 'react-dom';

interface PropsType {
	player: any;
}

export class ProgressControl extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			player: props.player,
			loaded: 0
		}
	}

  componentDidMount() {
		
	}

	// static getDerivedStateFromProps(nextProps: PropsType, prevState: any) {
	// 	if (nextProps.player !== prevState.player) {
	// 		return {
	// 			player: nextProps.player
	// 		}
	// 	}
	// 	return null;
	// }

	componentDidUpdate(prevProps: PropsType) {
		if (prevProps.player !== this.props.player) {
			this.getLoaded(this.props.player);
			this.setState({
				player: this.props.player
			});
		}
	}

	getLoaded = (player: any) => {
		player.addEventListener('progress', (e: any) => {
			const { buffered } = player;
			this.setState({
				loaded: buffered.length > 0 ? buffered.end(buffered.length - 1) : 0
			})
		});
		player.addEventListener('durationchange', (e: any) => {
			this.setState({
				duration: player.duration
			})
		})
		player.addEventListener('timeupdate', (e: any) => {
			this.setState({
				currentTime: player.currentTime
			})
		})
	}

	getPercent = (top: number, bottom: number) => {
		const percent = top / bottom || 0; // no NaN
    return `${(percent >= 1 ? 1 : percent) * 100}%`;
	}

	seekTo = (e: any) => {
		console.log(e);
		const { player, duration } = this.state;
		const position: any = getPointerPosition(findDOMNode(this), e);
		player.currentTime = duration * position.x;
	}


  public render() {
		const { loaded, duration, currentTime } = this.state;
    return (
      <div className="progress-control" onClick={this.seekTo}>
				<div className="played" style={{width: this.getPercent(currentTime, duration)}} />
				<div className="loaded" style={{width: this.getPercent(loaded, duration)}} />
			</div>
    );
  }
}
