import {
    CALLBACKS,
    isUndef,
    jsonParse,
    tryFn,
    generatePromise
} from '../../utils/index';
import ble from './actionsBle.js';

export default {
    ...ble,
    // 初始化回调
    initCallback({ state, getters, dispatch }) {
        window.onPause = () => {
            console.hLog('onPause');
        };
        window.onResume = () => {
            console.hLog('onResume');
            if (state.hasUpdateOta) {
                state.hasUpdateOta = false;
                if (!getters.canControl) {
                    if (!state.bleOn) {
                        dispatch('openBluetoothAdapter');
                        return;
                    }
                    // 规避重连失败，需要先断连再重连
                    dispatch('disconnectBle').then((res = {}) => {
                        console.hLog(`断连回调:${JSON.stringify(res)}`);
                        dispatch('subscribeBleEvent');
                        dispatch('connectBle');
                    });
                }
            }
        };
        window.addEventListener('online', () => {
            state.network = 'online';
        });
        window.addEventListener('offline', () => {
            console.hLog('offline');
            state.network = 'offline';
        });
        // 回调函数
        window[CALLBACKS] = {
            // 通用回调
            commonCallback() { }
        };
    },
    // 获取手机状态栏高度
    getStatusBarHeight({ state, commit }) {
        tryFn(() => {
            window.hilink.getStatusBarHeight('getStatusBarHeightRes');
            window.getStatusBarHeightRes = res => {
                const data = jsonParse(res);
                commit('UPDATE_STATE', { name: 'statusBarHeight', value: Number(data.statusBarHeight) });
            };
        });
    },
    // 获取手机信息，包含系统和屏幕
    getSystemInfoSync({ state, commit }) {
        let type = 'android';
        let version = '10.0.0';
        let isPad = false;
        let isFold = false;
        let isPortrait = true;
        let font;
        let changeScreen = false; // 折叠屏和平板竖屏
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
            version = String(matchInfo).replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
            let isUaPad
                // eslint-disable-next-line max-len
                = /(?:ipad|playbook)/.test(ua) || (['android', 'harmony'].indexOf(type) !== -1 && !/(?:mobile)/.test(ua));
            let getPadLandscape = window.hilink && window.hilink.getPadLandscape && window.hilink.getPadLandscape();
            let isScreenSpreaded = window.hilink && window.hilink.isScreenSpreaded && window.hilink.isScreenSpreaded();
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
                    console.hLog(`HUAWEI::Action::getSystemInfoSync A font=${font}`);
                } else {
                    font = (browserWidth / 423) * 10;
                    window.deviceType = 'phone';
                    commit('UPDATE_STATE', { name: 'statusBarHeight', value: 12 });
                    console.hLog(`HUAWEI::Action::getSystemInfoSync B font=${font}`);
                }
            } else {
                if (window.screen.width > 500 || isScreenSpreaded) {
                    font = (browserWidth / 677) * 10;
                    isFold = window.deviceType = 'phone-FoldSreen';
                    changeScreen = true;
                    console.hLog(`HUAWEI::Action::getSystemInfoSync AA font=${font}`);
                } else {
                    font = browserWidth / 36;
                    window.deviceType = 'phone';
                    console.hLog(`HUAWEI::Action::getSystemInfoSync BB font=${font}`);
                }
            }
            document.documentElement.style.fontSize = font + 'px';
        } catch (err) {
            console.hLog('通过 navigator.userAgent 获取系统类型和版本报错,使用默认配置android 和 10');
        }
        console.hLog(
            `获取type为${type + version}, ${(isPad ? '平板' : '非平板') + ',' + (isFold ? '折叠屏' : '非折叠屏') + ',' + (isPortrait ? '竖屏' : '横屏')}}`
        );
        commit('UPDATE_STATE', { name: 'isPad', value: isPad });
        commit('UPDATE_STATE', { name: 'isPortrait', value: isPortrait });
        commit('UPDATE_STATE', { name: 'changeScreen', value: changeScreen });
        commit('UPDATE_STATE', { name: 'type', value: isPad });
        commit('UPDATE_STATE', { name: 'version', value: version });
        commit('UPDATE_STATE', { name: 'isFold', value: isFold });
    },

    // 返回智慧生活设备列表
    finishDeviceActivity({ state, dispatch }) {
        tryFn(() => {
            dispatch('disconnectBle');
            window.hilink.finishDeviceActivity();
        });
    },
    // 隐藏/显示原生标题栏
    setTitleVisible(context, val) {
        tryFn(() => {
            window.hilink.setTitleVisible(val);
        }, 'setTitleVisible');
    },
    // 改变标题背景色
    modifyTitleBar(context, isWhite, color = '#ffffff') {
        tryFn(() => {
            window.hilink.modifyTitleBar(isWhite, color, `${CALLBACKS}.commonCallback`);
        }, 'modifyTitleBar');
    },
    // 跳转原生页面
    jumpTo({ state }, val) {
        tryFn(() => {
            window.hilink.jumpTo(val, `${CALLBACKS}.commonCallback`);
            if (val === 'com.huawei.smarthome.deviceBleUpgradeActivity') {
                state.hasUpdateOta = true;
            }
        }, 'jumpTo');
    },
    // 原生TOAST
    toast(context, { time = 3, content }) {
        tryFn(() => {
            window.hilink.toast(time, content);
        }, 'toast');
    },
    // 暗黑模式
    getDarkMode({ commit }) {
        return generatePromise({
            method: 'getDarkMode',
            type: 'sync'
        }).then((mode) => {
            let darkMode = mode === 2;
            commit('UPDATE_STATE', { name: 'darkMode', value: darkMode });
            return mode;
        });
    },
    // 复写物理按键
    overrideBackPressed(context, val) {
        tryFn(() => {
            window.hilink.overrideBackPressed(val, `${CALLBACKS}.commonCallback`);
        }, 'overrideBackPressed');
    },
    // 获取Hag服务
    getAbilities({ state }, payload = {}) {
        const { prodId = state.prodId, devType = state.devType } = payload;
        tryFn(() => {
            // 获取卡片信息 ， getAbility接口失效
            const data = window.hilink.getAbility(prodId, devType);
            const abilities = data && jsonParse(data);
            if (abilities) {
                state.abilities = abilities;
            } else {
                console.hLog('No Abilities');
            }
        }, 'getAbilities');
    },

    // 打印log
    printLog(context, { mark, data }) {
        try {
            window.hilink.h5ConsoleLogPrint(mark, data);
        } catch (error) { }
    },

    // 连接超时
    connectTimeout({ state }, time = 20000) {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    errcode: -1,
                    responseData: 'Timeout'
                });
            }, time);
        });
    },
    // 连接中断
    connectBreak() {
        return new Promise((resolve) => {
            window.connectBreakCallback = () => {
                resolve({
                    errcode: -1,
                    responseData: 'Connect Break'
                });
            };
        });
    }, // 获取app版本
    getAppVersionCode() {
        try {
            if (window.hilink.getSystemInfoSync) {
                window.hilink.getSystemInfoSync('bleAppVersionCodeCallback');
                window.bleAppVersionCodeCallback = res => {
                    const data = jsonParse(res);
                    let version = String(data.version);
                    if (version.length >= 10 && !version.includes('.')) {
                        version = version.slice(3);
                    }
                    window.APPVersionCode = version;
                };
            }
        } catch (error) {
            console.hLog('getAppVersionCode error');
        }
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
};
