/*
 * @Author: qiuz
 * @Date: 2018-05-24 15:28:32
 * */

import './index.less';

import * as React from 'react';
import { withRouter } from 'react-router-dom';


interface Props {
	History: any;
}

@(withRouter as any)
export class Layout extends React.Component<Props, {}> {

  render () {
    return (
		<div className="layout">
					<header></header>
					<main>
						{this.props.children}
					</main>
			</div>
    )
  }
}

