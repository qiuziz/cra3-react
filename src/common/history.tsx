/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-01-09 14:54:17
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 15:56:04
 */

import queryString from 'qs';
declare var window: any;

interface PropType {
	pathname: string;
	search?: string;
	hash?: string;
	state?: object;
}

export const HashHistory = (history: any, location: any) => {
	const urlParams: any = queryString.parse(location.search, { ignoreQueryPrefix: true });
	return {
		push: (params: PropType) => {
			const pathSearch = params.search || '';
			const search = queryString.stringify({...urlParams, ...queryString.parse(pathSearch, { ignoreQueryPrefix: true })});
			if (window.NavtiveRoute) {
				window.NavtiveRoute.postMessage(JSON.stringify({method: 'PUSH', url: `${window.location.origin}/#${params.pathname}?${search}`}))
			} else {
				history.push({
					...params,
					pathname: params.pathname,
					search
				});
			}
		},
		go: (n: number) => history.go(n),
		replace: (params: PropType) => {
			const pathSearch = params.search || '';
			const search = queryString.stringify({...urlParams, ...queryString.parse(pathSearch, { ignoreQueryPrefix: true })});
			history.replace({
				...params,
				pathname: params.pathname,
				search
			});
		},
		goForward: () => history.go(1),
		block: () => history.block(),
		goBack: () => {
			if (window.NavtiveRoute) {
				window.NavtiveRoute.postMessage(JSON.stringify({method: 'POP'}));
			} else {
				history.goBack();
			}	
		}
	}
}