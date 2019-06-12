/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 10:23:36
 */

import * as React from 'react';
import './index.less';
import { ActionSheet } from 'antd-mobile';
import { getUrlParams, bMapTransQQMap, detectOS } from '../../common';
import { BmapApi } from '../../common/bmap';
import POS_ICON from '../../assets/images/mao-pos-icon.png';

interface PropsType {
  History: any;
  location: any;
  history: any;
}

const INFO = {
  longitude: '121.439926',
  latitude: '31.350927',
  desLongitude: '121.456905', // 客户位置经度
  desLatitude: '31.230391', // 客户位置纬度
  placename: '上海万信R酒店',
  address: '浦东新区 崮山路688号',
};

export class CurrentLocation extends React.Component<PropsType, any> {
  map: any;
  isAndroid: boolean = detectOS() === 'Android';
  constructor(props: PropsType) {
    super(props);

    const urlParams: any = getUrlParams();
    console.log(urlParams);
    this.state = {
      ...INFO,
      ...urlParams
    }
  }

  componentWillMount() {

  }
  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    ActionSheet.close();
  }

  initMap = () => {
    const { desLatitude, desLongitude, address, placename } = this.state;
    const
      map = BmapApi.Map('allmap'),
      posIcon = BmapApi.Icon(POS_ICON, BmapApi.Size(35, 46), {
        imageSize: BmapApi.Size(35, 46), // 指定定位位置
      }),
      point = BmapApi.Point(desLongitude, desLatitude),
      marker = BmapApi.Marker(point, { icon: posIcon });

    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom();

    const content = `
			<div class="info-window-content">
				<div class="placename">
					${placename}
				</div>
				<div class="address">
					<div class="content">
						${address}
					</div>
					<div class="navigate">
						<i class="iconfont icon-daohang"></i>
					</div>
				</div>
			</div>
		`;

    const offset = BmapApi.Size(-153, -150);
    const label = BmapApi.Label(content, { position: point, offset });

    map.addOverlay(marker);
    map.addOverlay(label);

    label.addEventListener('click', () => {
      this.showActionSheet();
    })
  }

  callApp = (button: string) => {
    console.log(button);
    const { longitude, latitude, desLatitude, desLongitude, placename } = this.state;
    switch (button) {
      case '百度地图':
        window.location.href = this.isAndroid ? `bdapp://map/direction?origin=我的位置&destination=name:${placename}|latlng:${desLatitude},${desLongitude}&coord_type=bd09ll&mode=driving&src=andr.baidu.openAPIdemo` : `baidumap://map/direction?origin={{我的位置}}&destination=name:${placename}|latlng:${desLatitude},${desLongitude}&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo`;
        break;
      case '高德地图':
        window.location.href = this.isAndroid ? `androidamap://keywordNavi?sourceApplication=amap&keyword=${placename}&style=2` : `iosamap://path?sourceApplication=amap&sid=BGVIS1&did=BGVIS2&dname=${placename}&dev=0&t=0`;
        break;
      case '腾讯地图':
        const start: any = bMapTransQQMap(longitude, latitude);
        const dest: any = bMapTransQQMap(desLongitude, desLatitude);
        window.location.href = `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=${start.lat},${start.lng}&to=${placename}&tocoord=${dest.lat},${dest.lng}&referer=TUABZ-5QYCX-FDO4S-TKRCD-27CYJ-DUBRI`;
        break;
      default:
        break;
    }
  }
  showActionSheet = () => {
    const BUTTONS = ['百度地图', '高德地图', '腾讯地图', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // title: 'title',
      message: '请选择导航软件',
      maskClosable: true,
    },
      (buttonIndex) => {
        this.callApp(BUTTONS[buttonIndex]);
      });
  }

  public render() {
    return (
      <div id="allmap" className="geo-location-wrap"></div>
    );
  }
}
