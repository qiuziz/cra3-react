/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-06-12 12:49:15
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-13 18:01:18
 */

import * as React from 'react';
import './index.less';
import MP4 from '../../assets/tmp/demo.mp4';
// @ts-ignore
import enableInlineVideo from 'iphone-inline-video';
import { ControlBar } from './control-bar';

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
			this.setState({
				player: this.video,
			});
			enableInlineVideo(this.video);
			this.video.addEventListener('touchstart', (e: any) => {
				console.log(this.video.buffered.end(0));
				console.log(this.video.duration);
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
		this.setState({play: !play});
	}

  public render() {
		const { player } = this.state;
    return (
      <div className="video">
				<div className="player">
				{/* <Player>
		      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
		    </Player> */}
					<video
						width="100%"
						playsInline
			      // poster={POSTER}
			    >
						<source src={MP4} />
					</video>
					<ControlBar player={player} />
				</div>
			</div>
    );
  }
}
