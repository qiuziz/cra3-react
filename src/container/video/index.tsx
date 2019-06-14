/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-06-12 12:49:15
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-14 17:04:53
 */

import * as React from 'react';
import './index.less';
import MP4 from '../../assets/tmp/demo.mp4';

interface PropsType {
  History: any;
  location: any;
  history: any;
}

export class Video extends React.Component<PropsType, any> {
	video: any | undefined;
	constructor(props: PropsType) {
		super(props);
		this.state = {
			play: false,
			player: null,
		}
	}

  componentDidMount() {
		this.video = document.querySelector('video');
		if (this.video) {
			this.video.addEventListener('touchstart', (e: any) => {
				const { play } = this.state;
				play && this.videoControl();
			});
		}
	}

	videoControl = () => {
		const { play } = this.state;
		if (play) {
			this.video.pause();
		} else {
			this.video.play();
		}
		this.setState({ play: !play });
	}

  public render() {
		const { play } = this.state;
    return (
      <div className="video">
				<div className="player">
				<i className={`iconfont video-ctrl icon-${play ? '' : 'play'}`} onClick={this.videoControl} />
					<video width="100%" >
						<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
					</video>
				</div>
			</div>
    );
  }
}
