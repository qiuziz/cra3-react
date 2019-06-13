/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-06-12 15:09:41
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-13 18:00:33
 */

import React from 'react';
import './index.less';
import { ProgressControl } from './progress-control';
import { getPointerPosition } from './utils';
import { findDOMNode } from 'react-dom';

interface PropsType {
	player: any;
}

export class ControlBar extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			player: props.player,
			play: false,
			currentTime: 0,
			duration: 0,
			volumeSet: false,
			currentVolume: '0'
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
			this.getCurrentTime(this.props.player);
			this.setState({
				player: this.props.player,
				currentVolume: `${this.props.player.volume * 100}%`,
			});
		}
	}

	getCurrentTime = (player: any) => {
		player.addEventListener('timeupdate', (e: any) => {
			this.setState({
				currentTime: player.currentTime,
			})
		});
		player.addEventListener('durationchange', (e: any) => {
			this.setState({
				duration: player.duration
			})
		})
	}

	timeFormat = (seconds = 0, guide = seconds) => {
		let s: number | string = Math.floor(seconds % 60);
		let m: number | string = Math.floor((seconds / 60) % 60);
		let h: number | string = Math.floor(seconds / 3600);
		const gm = Math.floor((guide / 60) % 60);
		const gh = Math.floor(guide / 3600);

		// handle invalid times
		if (isNaN(seconds) || seconds === Infinity) {
			// '-' is false for all relational operators (e.g. <, >=) so this setting
			// will add the minimum number of fields specified by the guide
			h = '-';
			m = '-';
			s = '-';
		}

		// Check if we need to show hours
		h = h > 0 || gh > 0 ? `${h}:` : '';

		// If hours are showing, we may need to add a leading zero.
		// Always show at least one digit of minutes.
		m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`;

		// Check if leading zero is need for seconds
		s = s < 10 ? `0${s}` : s;

		return h + m + s;
	}

	videoControl = () => {
		const { play, player } = this.state;
		if (play) {
			player.pause();
		} else {
			player.play();
		}
		this.setState({ play: !play });
	}

	volumeControl = () => {
		const { volumeSet } = this.state;
		this.setState({ volumeSet: !volumeSet });
	}

	setVolume = (e: any) => {
		const { player } = this.state;
		const position: any = getPointerPosition(findDOMNode(e.currentTarget), e);
		player.volume =	position.y;
		console.log(position, player.volume)
		this.setState({
			currentVolume : `${player.volume * 100}%`,
		})
	}

	public render() {
		const { player, play, duration, currentTime, volumeSet, currentVolume } = this.state;
		return (
			<div className="control-bar-content">
				<i className={`iconfont video-ctrl icon-${play ? 'pause' : 'play'}`} onClick={this.videoControl} />
				<div className="control-bar">
					<div className="option-btn">
						<i className={`iconfont icon-${play ? 'pause' : 'play'}`} onClick={this.videoControl}></i>
						<div className="volume-ctrl">
							<i className={`iconfont icon-${play ? 'mute' : 'volume'}`} onClick={this.volumeControl}></i>
							{
								volumeSet &&
								<div className="volume-progress" onClick={this.setVolume}>
									<div className="current-volume" style={{height: currentVolume}}></div>
								</div>
							}
						</div>
						<div className="times">
							<span className="time current-time">{this.timeFormat(currentTime)}</span>
							<span className="time duration"> / {this.timeFormat(duration)}</span>
						</div>
						
					</div>
					<ProgressControl player={player} />
					<i className="iconfont icon-full-screen"></i>
				</div>
			</div>
		);
	}
}
