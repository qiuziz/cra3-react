/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 17:16:35
 */

import * as React from 'react';
import './index.less';
import MP4 from '../../assets/tmp/demo.mp4';
import POSTER from '../../assets/images/equity-bg-large.png';
// @ts-ignore
import enableInlineVideo from 'iphone-inline-video';

interface PropsType {
  History: any;
  location: any;
  history: any;
}

export class Video extends React.Component<PropsType, any> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }
  componentDidMount() {
		const video: any = document.querySelector('video');
		enableInlineVideo(video);
		video.addEventListener('touchstart', function () {
			video.play();
		});
	}

  componentWillUnmount() {
  }

  public render() {
    return (
      <div className="video">
				{/* <video width="100%" src={MP4}></video> */}
				<video
					width="100%"
					playsInline
		      poster={POSTER}
		      src={MP4}
		    />
			</div>
    );
  }
}
