/****************************************wifi utils*********************************************/
// 字符串前后去空
export function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}
// try catch 函数集成精简
export function catchFn(fn, warnMsg, fn2) {
    let Msg;
    try {
        fn();
    } catch (err) {
        if (typeof fn2 === 'function') {
            fn2();
        } else if (typeof fn2 === 'object') {
            let timer = setTimeout(() => {
                window.deviceEventCallback(JSON.stringify(fn2));
                clearTimeout(timer);
            }, 500);
        }
        Msg = warnMsg || '未自定义的';
        console.hLog(new Time().logTime, `${Msg}错误信息: ${err}`);
    }
}
// 宽度检验
export function widthCheck(str, maxLen, key) {
    var w = 0;
    // length 获取字数数，不区分汉子和英文
    for (var i = 0; i < str.length; i++) {
        // charCodeAt()获取字符串中某一个字符的编码
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c => 0xff60 && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            this[key] = str.substr(0, i);
            break;
        }
    }
}
export function textValidateName(value) {
    // 设备名称检验
    var flag = '0';
    let pattern = /("|{|}|\/|\\)/; // 防止H5页面解析出问题
    if (value !== '' && value != null) {
        if (pattern.test(value)) {
            flag = '1';
        }
    }
    let regName1 = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\r\n]/g;
    let regName2 = /[^\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
    if (regName1.test(value) && regName2.test(value)) {
        flag = '1';
    }
    if (value.trim().length === 0) flag = '1'; // 不能输入空格符
    if (value === null || value === '') flag = '1';
    if (flag === '1') {
        return true;
    }
    return false;
}
export function widthLength(str) {
    var w = 0;
    // length 获取字数数，不区分汉子和英文
    for (var i = 0; i < str.length; i++) {
        // charCodeAt()获取字符串中某一个字符的编码
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
    }
    return w;
}

/****************************************BLE utils*********************************************/
// 回调对象
export const CALLBACKS = 'hcbs';

//属性未定义判断
export function isUndef(v) {
    return v === undefined || v === null;
}

// 数据转换以及异常处理，并返回处理后的数据
export function jsonParse(res) {
    let data = {};
    try {
        data = JSON.parse(res);
    } catch (err) {
        try {
            let dataStr = res.replace(/:"{/g, ':{');
            dataStr = dataStr.replace(/}",/g, '},');
            dataStr = dataStr.replace(/\\/g, '');
            dataStr = dataStr.replace(/\n/g, '');
            dataStr = dataStr.replace(/\r/g, '');
            dataStr = dataStr.replace(/\t/g, '');
            data = JSON.parse(dataStr);
        } catch (error) {
            try {
                let dataStr = res.replace(/:"{/g, ':{');
                dataStr = dataStr.replace(/\\/g, '');
                dataStr = dataStr.replace(/(^\s*)|(\s*$)/g, '');
                dataStr = dataStr.replace(/}",/g, '},');
                dataStr = dataStr.replace(/}"/g, '}');
                data = JSON.parse(dataStr);
            } catch (error) {
                let dataStr = res.replace(/:"{/g, ':{');
                dataStr = dataStr.replace(/\\/g, '');
                dataStr = dataStr.replace(/}",/g, '},');
                dataStr = dataStr.replace(/}"/g, '}');
                dataStr = dataStr.replace(/"{/g, '{');
                dataStr = dataStr.replace(/]"/g, ']');
                dataStr = dataStr.replace(/\["/g, '[');
                dataStr = dataStr.replace(/\\/g, '');
                dataStr = dataStr.replace(/\n/g, '');
                dataStr = dataStr.replace(/\r/g, '');
                dataStr = dataStr.replace(/\t/g, '');
                dataStr = dataStr.replace(/(^\s*)|(\s*$)/g, '');
                dataStr = dataStr.replace(/}"/g, '}');
                try {
                    data = JSON.parse(dataStr);
                } catch (error) {
                    try {
                        console.hLog('数据解析错误！', res);
                    } catch (error) { }
                }
            }
        }
    }
    return data;
};

/**
 * try catch 函数集成精简
 * @param {Function} fn 需要异常处理的函数
 * @param {String} warnMsg 提示信息
 * @param {Function} fn2 异常之后执行的异常处理函数
 */
export function tryFn(fn, warnMsg, fn2) {
    try {
        fn();
    } catch (err) {
        fn2 && fn2();
        let warnMsgs = warnMsg || '未自定义的';
        console.warn(`${warnMsgs}错误信息: ${err}`);
    }
};

export function addZero(num) {
    return `0${num}`.slice(-2);
};

/**
 * 本地时间转UTC时间
 * @param {Date} date
 * @param {Boolean} deviceTime true:设备对时UTC时间  false:正常UTC时间
 * @returns UTC格式时间
 */
export function formatUTCDate(date, deviceTime) {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    return deviceTime
        // yyMMddHHmmss
        ? `${String(year).slice(2)}${addZero(month)}${addZero(day)}${addZero(hour)}${addZero(minutes)}${addZero(seconds)}`
        // 返回当前当前时间yyyyMMddTHHmmssZ格式
        : `${year}${addZero(month)}${addZero(day)}T${addZero(hour)}${addZero(minutes)}${addZero(seconds)}Z`;
};

/**
 * 四舍五入
 * @param {Number/String} number 数字
 * @param {Number} precision 位数
 */
export function round(number, precision) {
    return Math.round(Number(number) + 'e' + precision) / Math.pow(10, precision);
}

export function initState(profile) {
    let states = {};
    for (let key in profile) {
        states[key] = {};
        let item = profile[key];
        if (Array.isArray(item)) {
            item.forEach((arrayItem, index) => {
                states[key][arrayItem.name] = arrayItem.default;
            });
        } else {
            states[key][item.name] = item.default;
        }
    }
    return states;
}

export function handleState(profile, state, result) {
    if (
        !result
        || !result.sid
        || !result.data
    ) {
        return;
    }

    let sid = result.sid;

    for (let key in profile) {
        if (key !== sid) {
            continue;
        }

        let data = result.data;
        for (let char in data) {
            state[sid][char] = data[char];
        }
    }
}

export function generatePromise(args = {}) {
    // 框架参数及回调方法
    let {
        type,
        method,
        params = [],
        callback,
        onCallback,
        afterHilinkCalled
    } = args;

    return new Promise((resolve, reject) => {
        try {
            // 判断当前的hilink接口是否存在，method为hilink接口名
            if (
                !window.hilink
                || !window.hilink[method]
            ) {
                console.hLog(`No ${method}`);
                return;
            }
            if (type === 'sync') {
                let value = window.hilink[method](...params);
                resolve(value);
            } else {
                // 判断回调方法名
                let callbackName = callback || `${method}Callback`;
                // 解析回调数据
                window[CALLBACKS][callbackName] = (res) => {
                    let result = jsonParse(res);
                    resolve(result);
                    if (onCallback && typeof onCallback === 'function') {
                        onCallback(result);
                    };
                };
                window.hilink[method](...params, `${CALLBACKS}.${callbackName}`);
                if (afterHilinkCalled && typeof afterHilinkCalled === 'function') {
                    afterHilinkCalled();
                };
            }
        } catch (err) {
            console.hLog(err);
        }
    });
}
