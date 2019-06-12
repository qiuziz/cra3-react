/*
 * @Author: taiyunhang
 * @Date: 2018-04-10 20:13:55
 * */

import {Toast} from 'antd-mobile';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;

const map = new BMap.Map();
const myGeo = new BMap.Geocoder();
const localSearch = new BMap.LocalSearch(map);

class BmapApi {
	/**
	 * @func
	 * @desc 实例化一个地图对象
	 * @param {string} id
	 */
	Map(id: string) {
		return new BMap.Map(id);
	}

	/**
	 * @func
	 * @desc 实例化一个标注
	 * @param {Object} point
	 * @param {Object} opts
	 */
	Marker(point: object, opts: object) {
		return new BMap.Marker(point, opts);
	}

	/**
	 * @description 实例化一个信息窗口
	 */
	InfoWindow(sContent: JSX.Element | string, opts: object) {
		let infoWindow = new BMap.InfoWindow(sContent, opts);
		return infoWindow;
	}

	/**
	 * @func
	 * @desc 实例化一个图标
	 * @param {string} imgUrl
	 * @param {Object} size
	 * @param {Object} opts
	 */
	Icon(imgUrl: string, size: object, opts: object = {}) {
		return new BMap.Icon(imgUrl, size, opts);
	}

	/**
	 * @func
	 * @desc 实例化一个百度label组件
	 * @param {string} content
	 * @param {Object} opts
	 */
	Label(content: JSX.Element | string, opts: object) {
		return new BMap.Label(content, opts);
	}

	/**
	 * @func
	 * @desc 实例化一个设置大小对象
	 * @param {number} w
	 * @param {number} h
	 */
	Size(w: number, h: number) {
		return new BMap.Size(w, h);
	}

	/**
	 * @func
	 * @desc 实例化一个坐标点
	 * @param {number} lng
	 * @param {number} lat
	 */
	Point(lng: number, lat: number) {
		return new BMap.Point(lng, lat);
	}

	/**
	 * @func
	 * @desc 实例化一个Geolocation对象
	 */
	Geolocation() {
		return new BMap.Geolocation();
	}

	/**
	 * @func
	 * @desc 实例化一个Geocoder对象
	 */
	Geocoder() {
		return new BMap.Geocoder();
	}

	/**
	 * @func
	 * @desc 地图输入提示
	 * @param {string} inputId 需绑定的输入框id
	 */
	Autocomplete(inputId: string, callback: (value: string) => void) {
		let ac = new BMap.Autocomplete( // 建立一个自动完成的对象
			{
				'input': inputId
			});
		ac.addEventListener('onhighlight', function (e: any) { // 鼠标放在下拉列表上的事件

		});
		ac.addEventListener('onconfirm', function (e: any) { // 鼠标点击下拉列表后的事件
			let _value = e.item.value;
			let myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
			callback(myValue);
		});
		return ac;
	}

	/**
	 * @desc 地址转经纬度
	 * @param {string} Baddress 需解析的地址
	 */
	AddressToPoint(Baddress: string) {
		return new Promise((resolve, reject) => {
			if (Baddress) {
				myGeo.getPoint(Baddress, function (point: any) {
					if (point) {
						let pt = new BMap.Point(point.lng, point.lat);
						resolve(pt);
					} else {
						localSearch.setSearchCompleteCallback(function (searchResult: any) {
							let poi = searchResult.getPoi(0);
							if (poi) {
								let point = poi.point;
								let pt = new BMap.Point(point.lng, point.lat);
								resolve(pt);
							} else {
								reject('未解析到结果！');
							}
						});
						localSearch.search(Baddress);
					}
				}, '中国');
			} else {
				reject('未解析到结果！');
			}
		});
	}

	/**
	 * @desc 经纬度转地址
	 * @param {Object} point 需逆地址解析的经纬度
	 */
	PointToAddress(point: {lng: number, lat: number}) {
		return new Promise((resolve, reject) => {
			myGeo.getLocation(point, function (rs: any) {
				if (rs) {
					console.log(rs);
					// let addComp = rs.addressComponents;
					resolve(rs);
				} else {
					reject('未解析到结果！');
				}
			});
		});
	}

	/**
	 * @desc 根据起始地计算距离
	 * @param {lng: number, lat: number} startPoint 出发地经纬度
	 * @param {lng: number, lat: number} endPoint 目的地经纬度
	 */
	GetDistance(startPoint: {lng: number, lat: number}, endPoint: {lng: number, lat: number}) {
		return new Promise((resolve, reject) => {
			let searchComplete = function (results: any) {
				console.log(results);
				/* eslint-disable */
				if (transit.getStatus() !== BMAP_STATUS_SUCCESS) {
					reject('未获取距离结果！');
					return;
				}
				/* eslint-disable */
				let plan = results.getPlan(0);
				// let time = plan.getDuration(true); //获取时间
				let distance = plan.getDistance(false); // 获取距离 true返回距离字符串（包含单位）false仅返回数值（单位米）
				distance = (distance / 1000).toFixed(0);
				resolve(distance);
			};
			let transit = new BMap.DrivingRoute(map, {
				onSearchComplete: searchComplete
			});
			transit.search(startPoint, endPoint);
		});
	}

	/**
	 * @func
	 * @desc 定位
	 */
	GetCurrentPosition() {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				const geolocation = this.Geolocation();
				const geoc = this.Geocoder();
				geolocation.getCurrentPosition((r: any) => {
					if (geolocation.getStatus() === 0) {
						geoc.getLocation(r.point, (rs: any) => {
							var addComp = rs.addressComponents;
							sessionStorage.longitude = rs.point.lng;
							sessionStorage.latitude = rs.point.lat;
							sessionStorage.gps = addComp.city;
							sessionStorage.addComp = JSON.stringify(addComp);
							// sessionStorage.myAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
							resolve('');
						});
					} else {
						Toast.fail('failed' + geolocation.getStatus());
					}
				}, { enableHighAccuracy: true });
			} else {
				Toast.fail('浏览器不支持地理定位。');
			}
		});
	}

}

export default new BmapApi();
