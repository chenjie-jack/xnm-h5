/* eslint-disable no-extend-native */
export default function initApi() {
    // 解析云端JSON数据
    JSON.hParse = function (res) {
        let data;
        let dataStr = res;
        // 0 去除object外多余的 "
        dataStr = dataStr.replace(/"{/g, '{');
        dataStr = dataStr.replace(/}"/g, '}');
        // 1 \\ -普通反斜杠; \n -换行符; \r -回车符; \t -制表符; \f -换页符; \t -垂直制表符;
        dataStr = dataStr.replace(/\\|\n|\r|\t|\f|\t/g, '');
        data = JSON.parse(dataStr);
        return data;
    };
    // 打印console和app日志
    console.hLog = function () {
        // console.hLog(...arguments);
        if (!(window.hilink && window.hilink.printLogDebug)) {
            return;
        }
        let resArr = [...arguments],
            strResult = '';
        for (let val of resArr) {
            strResult += typeof val === 'string' ? val : JSON.stringify(val);
        }
        window.hilink.printLogDebug(
            true, // isSaveLog,boolean, true，保存日志信息，false不保存日志信息
            'H5调用打印log', // tag,String,日志信息的关键字
            strResult // msg,String,需要打印的内容或信息
        );
    };
    // desc 获取现在的时间的构造函数
    window.Time = function () {
        // UTC时间自动按照 timeZone 来确认 比如北京时区需-8
        // 注意 单独使用new Date().getMonth() 获取的值比真的值减1
        let time;
        const timeZone = new Date().getTimezoneOffset() * 60 * 1000;
        switch (arguments.length) {
            case 0:
                time = new Date();
                break;
            default:
                try {
                    const HilinkUTCReg = /^\d{8}T\d{6,9}Z$/, // {6,9}中的9 : 云端上报的UTC部分时间戳可能包含毫秒
                        HilinkStatisticsReg = /^\d{8,10}$/;
                    if (arguments.length === 1) {
                        if (HilinkUTCReg.test(arguments[0])) {
                            let UTCTime = arguments[0];
                            time = new Date(
                                UTCTime.substring(0, 4), // 年
                                // 月  UTC的月份保存时+1 为1-12 这里需要-1 为0-11
                                (UTCTime.substring(4, 6) - 1).toString().padStart(2, '0'),
                                UTCTime.substring(6, 8), // 日
                                UTCTime.substring(9, 11), // 时
                                UTCTime.substring(11, 13), // 分
                                UTCTime.substring(13, 15) // 秒
                            );
                            time = new Date(time.getTime() - timeZone);
                        } else if (HilinkStatisticsReg.test(arguments[0])) {
                            let paramArr = [
                                arguments[0].substring(0, 4),
                                (arguments[0].substring(4, 6) - 1).toString().padStart(2, '0'),
                                arguments[0].substring(6, 8)
                            ];
                            arguments[0].length === 10 && paramArr.push(arguments[0].substring(8, 10));
                            time = new Date(...paramArr);
                        } else {
                            time = new Date(...arguments);
                        }
                    } else {
                        time = new Date(...arguments);
                    }
                } catch (err) {
                    console.hLog('new Date报错,参数为' + arguments);
                    return;
                }
                break;
        }
        this.time = time;
        this.milliseconds = time.getTime();
        let timeAddArr = new Date(time.getTime() - timeZone).toISOString().split('T');
        [this.year, this.month, this.day] = timeAddArr[0].split('-');
        [this.hour, this.min, this.sec, this.ms] = [
            timeAddArr[1].substring(0, 2),
            timeAddArr[1].substring(3, 5),
            timeAddArr[1].substring(6, 8),
            timeAddArr[1].substring(9, 12)
        ];
        this.week = time.getDay();
        this.UTCTime = time.toISOString().replace(/[-:.]/g, '');
        this.hourStatisticsTime = [this.year, this.month, this.day, this.hour].join('');
        this.dayStatisticsTime = [this.year, this.month, this.day].join('');
        this.UTCTime = this.UTCTime.slice(0, -4) + 'Z';
        this.logTime = time + ':' + this.ms;
    };
    // 全局所有的回调函数 通用函数 都挂载到 Ag 下
    (function (window) {
        const Ag = {};
        // desc 数据类型判断
        Ag.isNumber = num => typeof num === 'number' && !isNaN(num);
        Ag.isString = str => typeof str === 'string';
        Ag.isBoolean = bool => typeof bool === 'boolean';
        Ag.isArray = arr => Array.isArray(arr);
        Ag.isObject = obj => typeof obj !== 'undefined' && obj !== null && obj.constructor === Object;
        Ag.isFunction = fn => typeof fn === 'function';
        // desc 判定请求接口的回调data是否报错
        Ag.isError = data => data.hasOwnProperty('errcode') && data.errcode !== 0;
        // desc 设置app后的通用回调,防止报错用
        Ag.setAppRes = res => {
            console.hLog(new Time().logTime + '设置app返回', res);
        };
        window.Ag = Ag;
    })(window);
}
