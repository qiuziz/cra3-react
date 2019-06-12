/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-12-20 20:27:51
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:59:56
 */

/**
 *  页面通过 pageType 来区分
 *  数据统一用data来获取
 *  Usage: 
 *   import { callAppRouter } from 'src/common/webViewJavascriptBridge';
 * 		...
 * 	 callAppRouter('setValue', {pageType: '1', data: {}}, (res: any) => {
 * 		 // do sth
 *   });
 * 	 
 * 	JS调用APP(setValue)
 *  1. pageType = 1
 *  		年检代办上线检测选择地址，跳APP地址搜索选择页面 
 * 			params:{pageType: 1}
 * 			callbackData:{data:{
 * 				address: ’上海市静安区灵石路656号盛大汽车大厦’,
 * 				cityName: ‘上海市’,
 * 				countyName: ‘静安区’,
 * 				latitude: "31.153885",
 * 				longitude: "121.630018"
 * 			}}
 *  2. pageType = 2
 *  		年检代办车辆信息，跳APP车辆信息编辑页面（新增车辆）
 * 			{pageType:2, data:{carInfo: {}, isAdd: true}
 * 			callbackData:{data:{carInfo: {}, isAdd: true}}
 *  3. pageType = 3 
 *   	任务中心 添加车辆
 *  4. pageType = 4
 *  		任务中心 完善车辆信息 
 *  5. pageType = 5
 *  		任务中心 订单 
 *  6. pageType = 6
 *     任务中心 评价
 *  7. pageType = 7
 * 			邀请好友 邀请微信好友 
 *  8. pageType = 8
 * 			任务中心 邀请好友 
 *  9. pageType = 9
 * 			年检代办获取当前城市定位 
 * 			callbackData:{data:{ cityName: ‘上海市’, latitude: "31.153885",  longitude: "121.630018}}
 *  10. pageType = 10
 * 			年检代办导航栏 订单显示隐藏红点 
 * 			params: {pageType: 10, data: {showOrderEnter: true, orderNum: ‘1'}}
 * 			no callback
 *  11. pageType = 11
 * 			任务中心 绑定微信 
 *  12. pageType = 12
 * 			任务中心 关注公众号 
 *  13. pageType = 13
 * 			邀请好友 洗车频道
 *  14. pageType = 14
 * 			邀请好友 油卡频道
 *  15. pageType = 15
 * 			年检代办订单列表和详情 付款按钮 
 * 			params: {pageType: 10, data: {orderNo: ’NJDB1231243214’, couponAmount: ‘50'}}
 * 			callbackData: null
 *  16. pageType = 16
 * 			任务中心 车辆列表
 *  17. pageType = 17
 * 			年检代办首页滚动距离,客户端控制导航渐变 
 * 			params: {pageType: 17, data: {top: 60}}
 *  18. pageType = 18
 * 			年检代办订单列表、详情上传材料按钮 
 * 			params: {pageType: 18}
 *  19. pageType = 19
 * 			拨打电话 
 * 			params:  {pageType: 19, data: {phoneNo: 18516540448}}
 *  20. pageType = 20
 * 			邀请好友 邀请好友登录
 *  21. pageType = 21
 * 			任务中心 抽奖或兑换后，立即使用按钮
 *  
 *  22. pageType = 22
 * 			道路救援支付页-获取道路救援订单信息 
 *  23. pageType = 23
 * 			年检代办首页获取app首页选中的车辆信息 
 *  24. pageType = 24
 * 			所有依赖于登录后的h5页面 登录失效后跳APP我的页面 
 *  25. pageType = 25
 * 			年检代办 退款跳成功页 
 * 			params : {pageType: 25 , data: {amount: 99}}
 *  26. pageType = 26
 * 			洗车支付页-获取洗车订单信息
 *  27. pageType = 27
 * 			云闪付支付
 *   
 * 	Usage: 
 *   import { registerRouter, unRegisterRouter } from 'src/common/webViewJavascriptBridge';
 * 		...
 * 	 registerRouter('getValue', (res: any) => {
 * 		if (res.pageType === '1') {
 * 			// do sth
 * 		} else {
 * 			// do sth
 * 		}
 *	 })
 * 	 
 *  componentWillUnmount() {
 *		unRegisterRouter('getValue');
 *	}
 *
 *	APP调用JS(getVlaue):
 *  1. pageType = 1
 * 		年检代办未支付页面 
 *  2. pageType = 2
 * 		道路救援未支付页面 { pageType: 2, data: {}}  
 */

import { detectOS } from './detect-os';
import { isFunction } from './is-type';

const win: any = window;

const PLATFORM = detectOS();

export function setupWebViewJavascriptBridge(callback: any = () => { }) {
	if (win.WebViewJavascriptBridge) { return callback(win.WebViewJavascriptBridge); }
	if (win.WVJBCallbacks) { return win.WVJBCallbacks.push(callback); }
	win.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

PLATFORM !== 'isWX' && setupWebViewJavascriptBridge();

export const callAppRouter = (method: string, params: object, callback?: (res: object) => void) => {
	if (PLATFORM === 'iOS') {
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.callHandler(method, params, (result: object) => {
			callback && isFunction(callback) && callback(result || { data: {} });
		});
	} else if (PLATFORM === 'Android') {
		// 生成回调函数方法名称
		const callbackName = 'CB_' + Date.now() + '_' + Math.ceil(Math.random() * 10);
		// 挂载一个临时函数到window变量上，方便app回调
		if (callback) {
			win[callbackName] = (result: string) => {
				let resultObj: object;
				try {
					resultObj = JSON.parse(result);
				} catch {
					resultObj = {};
				}
				callback(resultObj);
				//回调成功之后删除挂载到window上的临时函数
				delete win[callbackName];
			}
		}
		if (win.WebViewJavascriptBridge && isFunction(win.WebViewJavascriptBridge[method])) {
			win.WebViewJavascriptBridge[method](JSON.stringify(params), callbackName);
		}
	}
};

export const registerRouter = (method: string, callback?: (res: object) => void) => {
	if (PLATFORM === 'iOS') {
		!win.WebViewJavascriptBridge && setupWebViewJavascriptBridge();
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.registerHandler(method, (result: object) => {
			callback && isFunction(callback) && callback(result || {});
		});
	} else if (PLATFORM === 'Android') {
		win[method] = (result: string) => {
			let resultObj: object;
			try {
				resultObj = JSON.parse(result);
			} catch {
				resultObj = {};
			}
		  callback && isFunction(callback) &&	callback(resultObj);
		};
	}
}
export const unRegisterRouter = (method: string) => {
	if (PLATFORM === 'iOS') {
		!win.WebViewJavascriptBridge && setupWebViewJavascriptBridge();
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.registerHandler(method, (result: object) => {
			// isFunction(callback) && callback(result || {});
		});
	} else if (PLATFORM === 'Android') {
		win[method] = () => { };
	}
}
