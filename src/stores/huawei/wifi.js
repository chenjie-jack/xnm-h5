import { createStore } from 'vuex'
import API from '@/api';
import { lang, i18n } from '@/i18n/index';
import ResourcesForTheme from '@/config/resource';

// 导入profile 生成对应state
import profile from './wifi_profile';

const { t } = i18n.global;

let profileState = {};
for (let sid in profile) {
    // 遍历导出state, 设置对应state初始化值
    profileState[sid] = {};
    for (let cha in profile[sid]) {
        if (profile[sid][cha].type === 'number') {
            if (Array.isArray(profile[sid][cha].range)) {
                profileState[sid][cha] = profile[sid][cha].range[0];
            } else if (profile[sid][cha].range.constructor === Object) {
                profileState[sid][cha] = profile[sid][cha].range.min;
            } else {
                profileState[sid][cha] = null;
            }
        } else if (profile[sid][cha].type === 'string') {
            if (Array.isArray(profile[sid][cha].range)) {
                profileState[sid][cha] = profile[sid][cha].range[0];
            } else if (profile[sid][cha].range.constructor === Object) {
                profileState[sid][cha] = ''.padStart(profile[sid][cha].range.min, ' ');
            } else {
                profileState[sid][cha] = null;
            }
        } else if (profile[sid][cha].type === 'array[object]') {
            profileState[sid][cha] = [];
        }
    }
}

const store = createStore({
    state: {
        // h5_build_time 在build/webpack.prod.conf.js 和 build/webpack.dev.conf.js中的
        // new webpack.DefinePlugin有定义 暴露给全局
        /* eslint-disable */
        // h5_build_time,
        /* eslint-enable */
        // 设备型号和sn通过接口获取
        // 获取状态栏返回的高度,默认24,header其余56,共80px,全面屏返回的高度>24
        statusBarHeight: 24,
        navBarHeight: 56,
        isDarkMode: false,
        // 是否已经获取所有数据
        hasGetAllData: false,
        // 显示是否正在下发中的弹窗
        // showTaskToast: false,
        // 手机类型,系统版本相关信息,
        lang,
        type: 'android',
        version: '10.0',
        homeType: false,
        isPad: false,
        isPortrait: false, // 竖屏
        isFold: false, // 折叠屏
        changeScreen: false, // 折叠屏和平板竖屏
        shareDevice: false,
        isShare: false,
        phoneNumber: 'XXX-XX-XXXX', // 客服热线电话
        appMinVersion: '13.0.5.310', // 可以拉起拨号盘的最低app版本号
        operateList: [
            {
                name: t('computer'),
                img: 'ic_diannao_off',
                imgActive: 'ic_diannao_on',
                attr: { brightness: true }
            },
            {
                name: t('favorite'),
                img: 'ic_zuiai_off',
                imgActive: 'ic_zuiai_on',
                attr: { brightness: true }
            }
        ],
        config: {
            brightness: 40
        },

        //产品信息
        devName: '光圣投影仪',
        roomName: '客厅',
        // hilink协议定义 不能修改
        // eslint-disable-next-line id-length
        devId: '',
        sn: '',
        deviceModel: '',
        netStatus: 'online',
        role: '',

        // 涉及app本地保存用的全局变量
        isCloseMessage: false,// 已关闭故障信息
        fwv: '', // 旧的版本号
        sn: '',
        onceTime: true,
        loading: true,
        devImg: ResourcesForTheme("product_img"),
        logo: ResourcesForTheme("logo_img"),

        //profile
        ...profileState,
    },
    mutations: {
        // desc: 提交非hilink数据  devId
        commitAppData(state, obj) {
            for (let key in obj) {
                if (state.hasOwnProperty(key)) {
                    state[key] = obj[key];
                }
            }
        },
        // desc: 提交hilink格式的数据 profile { netInfo:{}}
        // note: param只能是 object 或是 array[object]
        commitMock(state, param) {
            const simulateData = dataObj => {
                for (let sid in dataObj) {
                    if (!state.hasOwnProperty(sid)) {
                        continue;
                    }
                    for (let cha in dataObj[sid]) {
                        if (!state[sid].hasOwnProperty(cha)) {
                            continue;
                        }
                        state[sid][cha] = dataObj[sid][cha];
                    }
                }
            };
            if (Ag.isArray(param)) {
                for (let obj of param) {
                    Ag.isObject(obj) && simulateData(obj);
                }
            } else if (Ag.isObject(param)) {
                simulateData(param);
            }
            setTimeout(() => {
                state.showTaskToast = false;
            }, 1000);
        },
        // hilink数据结构的提交
        commitHilink(state, obj) {
            if (!profile.hasOwnProperty(obj.sid)) {
                console.hLog('上报数据异常,sid未定义', JSON.stringify(obj));
                return;
            }
            if (!Ag.isObject(obj.data)) {
                console.hLog('上报数据异常,data不为对象结构', JSON.stringify(obj));
                return;
            }
            for (let cha in obj.data) {
                if (!profile[obj.sid].hasOwnProperty(cha)) {
                    console.hLog('上报数据异常,cha未定义', JSON.stringify(obj));
                    continue;
                }
                if (profile[obj.sid][cha].type === 'number') {
                    if (typeof obj.data[cha] !== 'number') {
                        console.hLog('上报数据异常,cha数据类型不为number', JSON.stringify(obj));
                        continue;
                    }
                    if (Array.isArray(profile[obj.sid][cha].range)) {
                        if (profile[obj.sid][cha].range.indexOf(obj.data[cha]) === -1) {
                            console.hLog('上报数据异常,cha的枚举值未录入', JSON.stringify(obj));
                            continue;
                        }
                        state[obj.sid][cha] = obj.data[cha];
                    } else if (profile[obj.sid][cha].range.constructor === Object) {
                        if (
                            obj.data[cha] < profile[obj.sid][cha].range.min
                            || obj.data[cha] > profile[obj.sid][cha].range.max
                        ) {
                            console.hLog('上报数据异常,cha的数字大小超出', JSON.stringify(obj));
                            continue;
                        }
                        state[obj.sid][cha] = obj.data[cha];
                    }
                } else if (profile[obj.sid][cha].type === 'string') {
                    if (typeof obj.data[cha] !== 'string') {
                        console.hLog('上报数据异常,cha的数据类型不为string', JSON.stringify(obj));
                        continue;
                    }
                    if (Array.isArray(profile[obj.sid][cha].range)) {
                        if (profile[obj.sid][cha].range.indexOf(obj.data[cha]) === -1) {
                            console.hLog('上报数据异常,cha的枚举值未录入', JSON.stringify(obj));
                            continue;
                        }
                        state[obj.sid][cha] = obj.data[cha];
                    } else if (profile[obj.sid][cha].range.constructor === Object) {
                        let min = profile[obj.sid][cha].range.min || 0;
                        if (obj.data[cha].length < min || obj.data[cha].length > profile[obj.sid][cha].range.max) {
                            console.hLog('上报数据异常,cha的字符长度大小超出', JSON.stringify(obj));
                            continue;
                        }
                        state[obj.sid][cha] = obj.data[cha];
                    }
                } else if (profile[obj.sid][cha].type === 'array[object]') {
                    // 目前没有做数据验证
                    state[obj.sid][cha] = obj.data[cha];
                }
            }
        }
    },
    actions: {
        // desc 设置标题不可见
        hiddenTitle() {
            return new Promise((resolve, reject) => {
                window.hilink && window.hilink.setTitleVisible(false, 'Ag.hiddenTitleRes');
                window.Ag.hiddenTitleRes = res => {
                    let data = JSON.hParse(res);
                    Ag.isError(data) ? reject(new Error('hiddenTitle error')) : resolve();
                };
            });
        },
        // desc 设置原生title文字颜色和背景颜色(包括最顶上的显示时间的部分)
        modifyTitleBar({ commit }, param) {
            const { isColorWhite = state.isDarkMode, bg = state.isDarkMode ? '#ffffff' : '#000000' } = param || {};
            return new Promise((resolve, reject) => {
                window.hilink
                    && window.hilink.modifyTitleBar
                    && window.hilink.modifyTitleBar(isColorWhite, bg, 'Ag.modifyTitleBarRes');
                window.Ag.modifyTitleBarRes = res => {
                    let data = JSON.hParse(res);
                    Ag.isError(data) ? reject(new Error('hiddenTitile error')) : resolve();
                };
            });
        },
        // desc 获取状态栏高度
        getStatusBarHeight({ commit }) {
            return new Promise((resolve, reject) => {
                window.hilink && window.hilink.getStatusBarHeight('Ag.getStatusBarHeightRes');
                window.Ag.getStatusBarHeightRes = res => {
                    let data = JSON.hParse(res);
                    if (Ag.isError(data)) {
                        reject(new Error('getStatusBarHeight error'));
                    } else {
                        commit('commitAppData', { statusBarHeight: data.statusBarHeight });
                        resolve();
                    }
                };
            });
        },
        // desc 获取手机信息,包含系统和屏幕
        getPhoneInfo({ commit }) {
            let type = 'android';
            let version = '10.0.0';
            let isPad = false;
            let isFold = false;
            let isPortrait = false;
            let isDarkMode = false;
            let font;
            let changeScreen = false;
            try {
                let ua = navigator.userAgent.toLowerCase();
                let reg, matchInfo;
                if (ua.indexOf('like mac os x') > 0) {
                    reg = /os [\d._]+/gi;
                    type = 'ios';
                } else if (ua.indexOf('android') > 0) {
                    reg = /android [\d._]+/gi;
                    type = 'android';
                } else if (ua.indexOf('harmony') > 0) {
                    reg = /harmony [\d._]+/gi;
                    type = 'harmony';
                }
                matchInfo = ua.match(reg);
                version = String(matchInfo)
                    .replace(/[^0-9|_.]/gi, '')
                    .replace(/_/gi, '.');
                let isUaPad
                    // eslint-disable-next-line max-len
                    = /(?:ipad|playbook)/.test(ua) || (['android', 'harmony'].indexOf(type) !== -1 && !/(?:mobile)/.test(ua));
                let getPadLandscape = window.hilink && window.hilink.getPadLandscape && window.hilink.getPadLandscape();
                let isScreenSpreaded
                    = window.hilink && window.hilink.isScreenSpreaded && window.hilink.isScreenSpreaded();
                if (window.orientation === 180 || window.orientation === 0) {
                    isPortrait = true;
                } else if (window.orientation === 90 || window.orientation === -90) {
                    isPortrait = false;
                }
                isPad = isUaPad || getPadLandscape === 1 || getPadLandscape === 0;
                let browserWidth = document.documentElement.clientWidth;
                if (isPad) {
                    if (isPortrait || getPadLandscape === 1) {
                        font = (browserWidth / 800) * 10;
                        window.deviceType = 'pad-S';
                        changeScreen = true;
                    } else {
                        font = browserWidth / 42.3;
                        window.deviceType = 'phone';
                        commit('commitAppData', { statusBarHeight: 12 });
                    }
                } else {
                    if (window.screen.width > 500 || isScreenSpreaded) {
                        font = (browserWidth / 677) * 10;
                        isFold = window.deviceType = 'phone-FoldSreen';
                        changeScreen = true;
                    } else {
                        font = browserWidth / 36;
                        window.deviceType = 'phone';
                    }
                }
                document.documentElement.style.fontSize = font + 'px';
                if (type === 'ios') {
                    window.hilink.getDarkMode('Ag.getDarkMode');
                    window.Ag.getDarkMode = res => {
                        Number(res) === 2 && (state.isDarkMode = true);
                    };
                } else {
                    window.hilink && window.hilink.getDarkMode && window.hilink.getDarkMode() === 2 && (isDarkMode = true);
                }
            } catch (err) {
                console.hLog('通过 navigator.userAgent 获取系统类型和版本报错,使用默认配置android 和 10');
            }
            console.hLog(
                new Time().logTime,
                `获取type为${type + version}, ${(isPad ? '平板' : '非平板') + ',' + (isFold ? '折叠屏' : '非折叠屏') + ','
                + (isPortrait ? '竖屏' : '横屏') + ',' + window.deviceType
                }}`
            );
            commit('commitAppData', { type, version, isPad, isDarkMode, isFold, isPortrait, changeScreen });
        },
        // desc 向云端获取缓存的所有数据
        getDevInfoAll({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                if (!window.hilink) {
                    commit('commitAppData', { hasGetAllData: true });
                    return;
                }
                window.hilink.getDevCacheAll('0', '', 'Ag.getDevCacheAllRes');
                window.Ag.getDevCacheAllRes = res => {
                    let data = JSON.hParse(res);
                    console.hLog(new Time().logTime + 'app本地缓存', data);
                    if (typeof data.role !== 'undefined' && data.role !== 'owner') {
                        state.shareDevice = true;
                    }
                    commit('commitAppData', {
                        devId: data.devId,
                        devName: data.devName,
                        sn: data.devInfo.sn,
                        deviceModel: data.devInfo.model,
                        netStatus: data.light.on,
                        role: data.role,
                        roomName: data.roomName
                    });
                };
                // 获取设备状态(最新)
                window.hilink.getDevInfoAll('0', '', 'Ag.getDevInfoAllRes');
                console.hLog(new Time().logTime + '获取云端快照');
                window.Ag.getDevInfoAllRes = res => {
                    let data = JSON.hParse(res);
                    commit('commitAppData', { hasGetAllData: true, showTaskToast: false });
                    console.hLog(new Time().logTime + 'getDevInfoAllRes', data);
                    data.services.forEach(service => commit('commitHilink', service));
                    resolve();
                };
            });
        },
        // desc 下发指令统一通道
        // param type:Object,required:true,default:{sid:{cha:1}}
        setDevInfo({ commit }, param) {
            return new Promise((resolve, reject) => {
                console.hLog(new Time().logTime + '下发数据', param);
                commit('commitAppData', { showTaskToast: true });
                if (window.hilink) {
                    window.hilink.setDeviceInfo('0', JSON.stringify(param), 'Ag.setDevInfoRes');
                    console.hLog(new Time().logTime + '下发数据string', JSON.stringify(param));
                } else {
                    // 模拟下发用
                    setTimeout(() => {
                        commit('commitAppData', { showTaskToast: false });
                        resolve();
                    }, 100);
                    setTimeout(() => {
                        commit('commitMock', param);
                    }, 300);
                }
                window.Ag.setDevInfoRes = res => {
                    commit('commitAppData', { showTaskToast: false });
                    let data = JSON.hParse(res);
                    console.hLog(new Time().logTime + '返回命令错误码', res);
                    Ag.isError(data) ? reject(new Error('error')) : resolve();
                };
            });
        },

        // 跳转原生页面
        jumpTo({ commit }, pathStr) {
            return new Promise((resolve, reject) => {
                window.hilink && window.hilink.jumpTo(pathStr, 'Ag.jumpToRes');
                window.Ag.jumpToRes = res => {
                    const data = JSON.hParse(res);
                    Ag.isError(data) ? reject(new Error('error')) : resolve();
                };
            });
        },
        // 调用原生toast
        toast({ commit }, toastStr) {
            window.hilink ? window.hilink.toast(2, toastStr) : alert('str');
        },
        // 删除设备
        deleteDev({ dispatch }) {
            window.hilink && window.hilink.deleteDevice(true, 'Ag.deleteDevRes');
            window.Ag.deleteDevRes = res => {
                const data = JSON.hParse(res);
                Ag.isError(data) || dispatch('closeWebview');
            };
        },
        // 获取摆放位置
        getRoomList({ commit }) {
            window.hilink && window.hilink.getRoomList('Ag.getRoomListRes');
            window.Ag.getRoomListRes = res => {
                let data = JSON.hParse(res);
                commit('commitAppData', { roomList: data.roomList });
            };
        },
        // 拉起设备信息界面
        jumpToDeviceInfo({ dispatch }) {
            window.hilink && window.hilink.jumpTo('com.huawei.smarthome.deviceinfoactivity', 'Ag.jumpToDeviceInfoResult');
            Ag.jumpToDeviceInfoResult = res => { };
        },
        // desc 设置设备名称,后台提供的接口不一致
        setDevName({ commit, dispatch }, nameStr) {
            return new Promise((resolve, reject) => {
                window.hilink
                    ? window.hilink.modifyDeviceName(nameStr, 'Ag.setDevNameRes')
                    : commit('commitAppData', { devName: nameStr });
                console.hLog(new Time().logTime + '设置名称为', nameStr);
                window.Ag.setDevNameRes = res => {
                    console.hLog(new Time().logTime + '返回修改设备名称结果', res);
                    let data = JSON.hParse(res);
                    Ag.isError(data) ? reject(new Error('error')) : resolve();
                };
            });
        },
        // 修改设备位置
        modifyDeviceRoomName({ commit, dispatch }, roomName) {
            return new Promise((resolve, reject) => {
                window.hilink
                    ? window.hilink.modifyDeviceRoomName(roomName, 'Ag.modifyDeviceRoomNameRes')
                    : commit('commitAppData', { roomName: roomName });
                console.hLog(new Time().logTime + '设置房间位置为', roomName);
                window.Ag.modifyDeviceRoomNameRes = res => {
                    console.hLog(new Time().logTime + '返回修改设备房间位置结果', res);
                    let data = JSON.hParse(res);
                    Ag.isError(data) ? reject(new Error('error')) : resolve();
                };
            });
        },
        // 获取app版本
        getAppVersionCode() {
            return new Promise((resolve, reject) => {
                window.hilink && window.hilink.getAppVersionCode('Ag.appVersionCodeCallback');
                window.Ag.appVersionCodeCallback = res => {
                    let version = Number(res);
                    window.APPVersionCode = version;
                    Ag.isError(version) ? reject(new Error('getAppVersionCode error')) : resolve();
                };
            });
        },
        // 当前app版本是否大于等于目标版本
        isLaterAppVersion({ dispatch }, targetVersion) {
            const curVersion = String(window.APPVersionCode || '13.0.0.0');
            let isLater = false;
            if (curVersion.includes('.')) {
                const target = targetVersion.split('.');
                const current = curVersion.split('.');
                let length = current.length;
                if (current.length >= target.length) {
                    isLater = true;
                    length = target.length;
                }
                for (let i = 0; i < length; i++) {
                    if (Number(current[i]) !== Number(target[i])) {
                        isLater = Number(current[i]) > Number(target[i]);
                        break;
                    }
                }
            } else {
                let newVersion = String(targetVersion).replace(/\./g, '');
                isLater = Number(curVersion) >= Number(newVersion);
            }
            return isLater;
        }
    },
    getters: {
        getImgBase64: state => (picName, suffix) => {
            let imgSrc = '';
            let isDark = state.isDarkMode;
            switch (true) {
                case isDark:
                    imgSrc = require('../../static/img/dark/' + picName + '.' + suffix);
                    break;
                default:
                    imgSrc = require('../../static/img/' + picName + '.' + suffix);
                    break;
            }
            return imgSrc;
        }
    }
});

export default store;
