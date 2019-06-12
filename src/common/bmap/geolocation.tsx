/*
 * @Author: qiuz
 * @Date: 2018-05-26 11:59:04
 * */
import { Toast } from 'antd-mobile';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any;

const Geolocation = new BMap.Geolocation();

const DEFAULT_OPTS = {
	/**
	 * BMAP_ANCHOR_TOP_LEFT	控件将定位到地图的左上角
	 * BMAP_ANCHOR_TOP_RIGHT	控件将定位到地图的右上角
	 * BMAP_ANCHOR_BOTTOM_LEFT	控件将定位到地图的左下角
	 * BMAP_ANCHOR_BOTTOM_RIGHT	控件将定位到地图的右下角
	 * 
	 * 控件的停靠位置，默认定位到地图的右下角
	 */
	anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
	
	/**
	 * Size(width: Number, height: Number)
	 * 以指定的宽度和高度创建一个矩形区域大小对象
	 * 控件的水平偏移值
	 */
	offset: {},
	/**
	 * Boolean
	 * 是否显示定位信息面板。默认显示定位信息面板
	 */
	showAddressBar: true,	
	/**
	 * Boolean
	 * 添加控件时是否进行定位。默认添加控件时不进行定位
	 */
	enableAutoLocation: false,
	/**
	 * Icon(url: String, size: Size, opts: IconOptions)
	 * 以给定的图像地址和大小创建图标对象实例
	 */
	locationIcon: {}	

	
}

const getCurrentLocation = () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			Geolocation.getCurrentPosition((r: any) => {
				if(Geolocation.getStatus() === BMAP_STATUS_SUCCESS){
					resolve(r);
				} else {
					Toast.fail('failed'+Geolocation.getStatus());
					reject('failed'+Geolocation.getStatus());
				}
			}, { enableHighAccuracy: true });
		}
	});
}

const geoControl = (opts = {}) => {
	Object.assign(opts, DEFAULT_OPTS);
	return new BMap.GeolocationControl(opts);
}

export { getCurrentLocation, geoControl};