/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-28 13:49:52
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-12 10:20:16
 */
declare var window: any;

const hmtKey = process.env.REACT_APP_DES ? 'bc15fcc65e906ce38d46646e4544663c' : 'a0dc727a9a3501cf815e3a3b4fa77ee0';

export const HMTSetup = () => {
	var hm = document.createElement("script");
	hm.src = `https://hm.baidu.com/hm.js?${hmtKey}`;
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode && s.parentNode.insertBefore(hm, s);
}

export const HMT_trackEvent = (category: string, action: string, opt_label?: string, opt_value?: number) => {
	window._hmt && window._hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
};
