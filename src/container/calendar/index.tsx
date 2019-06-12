/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 17:12:34
 */

import * as React from 'react';
import './index.less';
import { Models } from 'rmc-calendar/lib/date/DataTypes';
import { QCalendar } from '../../component';
import { Button } from 'antd-mobile';

interface PropsType {
  History: any;
  location: any;
  history: any;
}

const now = new Date();

export class CalendarDemo extends React.Component<PropsType, any> {
  days: number | undefined;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      show: true,
      disableList: [],
      extra: {},
      daysSelectedTip: ''
    }
  }


  componentWillMount() {

  }
  componentDidMount() {

  }

  onConfirm = (startTime?: Date | undefined, endTime?: Date | undefined) => {
    this.setState({
      show: false,
      startTime,
      endTime,
    });
    console.log(startTime, endTime);
  }

  onClose = () => {
    this.setState({
      show: false,
    });
  }

  getDateExtra = (disableList: number[]) => (date: Date): Models.ExtraData => {
    const { extra } = this.state;
    if (disableList && disableList.indexOf(date.getDay()) > -1) {
      extra[+date] = { disable: true }
    }
    return extra[+date];
  }

  onSelect = (date: Date, state?: [Date | undefined, Date | undefined]): [Date, Date] | [Date] | void => {
    console.log(date, state);

    if (date && state &&  state[0]) {
      this.days = Math.floor(Math.abs(+date - +state[0]) / 1000 / 60 / 60 / 24);
      this.setState({ daysSelectedTip: `${this.days}晚` })
    }
  }

  chooseDay = (disableList?: number[]) => () => {
    this.setState({ show: true, disableList, extra: { [+new Date(2019, 4, 13)]: { disable: true } } });
  }


  public render() {
    const { show, disableList, daysSelectedTip } = this.state;
    return (
      <div className='calendar'>
        <Button onClick={this.chooseDay()}>基本</Button>
        <Button onClick={this.chooseDay([0, 6])}>周末不可选</Button>
        <Button onClick={this.chooseDay([3])}>周三不可选</Button>
        <QCalendar
					visible={show}
					maskClosable={true}
          onClose={this.onClose}
          onConfirm={this.onConfirm}
          defaultDate={now}
          initalMonths={3}
          onSelect={this.onSelect}
          getDateExtra={this.getDateExtra(disableList)}
          minDate={new Date(+now)}
          maxDate={new Date(+now + 7776000000)}
          rangeSelectedText={daysSelectedTip}
        />
      </div>
    );
  }
}

