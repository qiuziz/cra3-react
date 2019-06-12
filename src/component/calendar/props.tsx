import { Models } from 'rmc-calendar/lib/date/DataTypes';
export declare type SelectDateType = [Date, Date] | [Date];
export default interface PropsType {
    /** 入场方向，default: vertical，vertical: 垂直，horizontal: 水平 */
    enterDirection?: 'horizontal' | 'vertical';
    /** 本地化 */
    locale?: Models.Locale;
    /** 关闭时回调 */
    onCancel?: () => void;
    /** 清除时回调 */
    onClear?: () => void;
    /** 确认时回调 */
    onConfirm?: (startDateTime?: Date, endDateTime?: Date) => void;
    /** 是否选择时间，default: false */
    pickTime?: boolean;
    /** (web only) 样式前缀，default: rmc-calendar */
    prefixCls?: string;
    style?: React.CSSProperties;
    /** 选择类型，default: range，one: 单日，range: 日期区间 */
    type?: 'one' | 'range';
    /** 是否显示，default: false */
    visible?: boolean;
    /** 默认选择值，开始时间、结束时间 */
    defaultValue?: SelectDateType;
    /** 显示开始日期，default: today */
    defaultDate?: Date;
    /** 日期扩展数据 */
    getDateExtra?: (date: Date) => Models.ExtraData;
    /** 无限滚动优化（大范围选择），default: false */
    infiniteOpt?: boolean;
    /** 初始化月个数，default: 6 */
    initalMonths?: number;
    /** 最大日期 */
    maxDate?: Date;
    /** 最小日期 */
    minDate?: Date;
    /** 选择区间包含不可用日期 */
    onSelectHasDisableDate?: (date: Date[]) => void;
    /** 选择日期回调，如果有返回值，选择范围将使用返回值 */
    onSelect?: (date: Date, state?: [Date | undefined, Date | undefined]) => SelectDateType | void;
    /** 行大小，default: normal */
    rowSize?: 'normal' | 'xl';
    /** 默认时间选择值 */
    defaultTimeValue?: Date;
    timePickerPrefixCls?: string;
		timePickerPickerPrefixCls?: string;
    /** 点击蒙层是否允许关闭，默认关闭，需提供onClose回调 */
		maskClosable?: boolean;
    /** 区域选择提示文本 */
		rangeSelectedText?: string;
    /** 关闭回调 取消或点击mask */
		onClose?: () => void;
}
