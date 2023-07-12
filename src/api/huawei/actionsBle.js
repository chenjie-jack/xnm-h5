import { generatePromise, formatUTCDate } from '@/utils/index.js';
// import Toast from '../../components/Toast/Toast.js';
// import i18n from '../../i18n';
export default {
    /* NEW */
    // 连接Ble
    connectBle({ state, commit, dispatch }, payload = {}) {
        console.hLog(`HUAWEI::Action::connectBle`);
        /**
         * 连接蓝牙
         *
         * @param deviceId 设备id
         * @param bleMac 设备蓝牙Mac地址
         * @param resultCallback 回调
         */
        commit('UPDATE_STATE', {
            name: 'connectOk',
            value: 1 // 连接中
        });
        let { params = [state.devId, state.mac] } = payload;
        console.hLog(
            '连接:\n'
            + `devId:${params[0]}\n`
            + `mac:${params[1]}`
        );

        return Promise.race([
            // 连接
            generatePromise({
                method: 'connectBle',
                params,
                callback: `connectBleCallback${new Date().getTime()}`
            }),
            // 倒计时
            dispatch('connectTimeout', 20000),
            // 连接中断
            dispatch('connectBreak')
        ]).then((res = {}) => {
            console.hLog(`连接回调:${JSON.stringify(res)}`);
            commit('UPDATE_STATE', {
                name: 'connectOk',
                value: res.errcode === 0 ? 2 : 0
            });
            if (res.errcode === 0) {
                // 连接成功后 设备状态同步
                console.hLog(`HUAWEI::Action::connectBle sendCommand status`);
                dispatch('sendCommand', {//锁定状态
                    data: {
                        sid: 'status',
                        data: {
                        }
                    },
                    toast: false
                }).then((res = {}) => {
                    console.hLog(`HUAWEI::Action::connectBle sendCommand status then`);
                    dispatch('sendCommand', {//模式
                        data: {
                            sid: 'mode',
                            data: {
                            }
                        },
                        toast: false
                    }).then((res = {}) => {
                        console.hLog(`HUAWEI::Action::connectBle sendCommand mode then`);
                        dispatch('sendCommand', {//电量
                            data: {
                                sid: 'battery',
                                data: {
                                }
                            },
                            toast: false
                        }).then((res = {}) => {
                            console.hLog(`HUAWEI::Action::connectBle sendCommand battery then`);
                            dispatch('sendCommand', {//开关机状态
                                data: {
                                    sid: 'motor',
                                    data: {
                                    }
                                },
                                toast: false
                            }).then((res = {}) => {
                                console.hLog(`HUAWEI::Action::connectBle sendCommand motor then`);
                                dispatch('sendCommand', {//刀头状态
                                    data: {
                                        sid: 'knife',
                                        data: {
                                        }
                                    },
                                    toast: false
                                });
                                return res;
                            });
                            return res;
                        });
                        return res;
                    });
                    return res;
                });

                // 连接成功后重新连接的次数归零
                commit('UPDATE_STATE', {
                    name: 'reConnectCount',
                    value: 0
                });
            } else {
                // 连接失败 次数+1
                if (state.isReconnect) {
                    commit('UPDATE_STATE', {
                        name: 'reConnectCount',
                        value: ++state.reConnectCount
                    });
                    console.hLog('重新连接失败的次数: ', state.reConnectCount);
                    // 是否连接归零
                    commit('UPDATE_STATE', {
                        name: 'isReconnect',
                        value: false
                    });
                }
            }
        });
    },
    // 断开Ble
    disconnectBle({ state }, payload = {}) {
        console.hLog(`HUAWEI::Action::disconnectBle`);
        /**
         * 断开蓝牙
         *
         * @param deviceId 设备id
         * @param mac 设备mac地址
         * @param resultCallback 回调
         *
         */
        let { params = [state.devId, state.mac] } = payload;
        console.hLog(
            '断连:\n'
            + `devId:${params[0]}\n`
            + `mac:${params[1]}`
        );
        return generatePromise({
            method: 'disconnectBle',
            params
        });
    },

    // 订阅Ble消息
    subscribeBleEvent({ state, commit, dispatch }, payload = {}) {
        console.hLog(`HUAWEI::Action::subscribeBleEvent`);
        /**
         * 订阅蓝牙消息
         *
         * @param deviceId 设备id
         * @param bleMac 设备mac地址
         * @param resultCallback 回调
         */
        let { params = [state.devId, state.mac] } = payload;
        console.hLog(
            '订阅:\n'
            + `devId:${params[0]}\n`
            + `mac:${params[1]}`
        );
        return generatePromise({
            method: 'subscribeBleEvent',
            params,
            onCallback: (res = {}) => {
                console.hLog('上报:', JSON.stringify(res));
                if (res.type === 'ConnectionStateChange') {
                    switch (res.newStatus) {
                        case 0: // 已断连
                        case 1: // 连接中
                        case 2: // 已连接
                        case 3: // 断连中
                            state.connectStatus = res.newStatus;
                            if (res.newStatus === 0) {
                                state.connectOk = 0;
                                try {
                                    window.connectBreakCallback();
                                } catch (error) {
                                    console.hLog(error);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                } else if (res.type === 'CharacteristicChanged') {
                    commit('UPDATE_STATE', {
                        name: 'NoControl',
                        value: true
                    });
                    let content = (
                        res.content
                        && res.content.vendor
                    ) ? res.content.vendor : res.content;

                    // 根据不同的数据格式解析对应的数据格式
                    // 如果格式不正确会导致控制按钮无法点击或者按钮状态和文字描述不一致
                    if (content.sid === 'deviceStatus') {
                        for (let i = 0; i < content.data.length; i++) {
                            let sid = content && content.data[i].sid;
                            let data = content && content.data[i];
                            if (
                                !content
                                || !sid
                                || !data
                            ) {
                                return;
                            }
                            // 更新设备上报
                            commit('UPDATE_DEVICE_DATA', content.data[i]);
                        }
                    } else if (content.sid === 'devInfo') {
                        let sid = content && content.sid;
                        let data = content && content.data;
                        state.fwv = content.data.fwv;
                        dispatch('updateDeviceBaseInfo', {
                            data: {
                                devInfo: data
                            }
                        });
                    } else if (content.services !== undefined) {
                        for (let i = 0; i < content.services.length; i++) {
                            let sid = content && content.services[i].sid;
                            let data = content && content.services[i];
                            if (
                                !content
                                || !sid
                                || !data
                            ) {
                                return;
                            }
                            // 更新设备上报
                            commit('UPDATE_DEVICE_DATA', content.services[i]);
                        }
                    } else {
                        let sid = content && content.sid;
                        let data = content && content.data;
                        if (
                            !content
                            || !sid
                            || !data
                        ) {
                            return;
                        }
                        // 更新设备上报
                        commit('UPDATE_DEVICE_DATA', content);
                    }
                }
            }
        });
    },

    // Ble通道发送命令
    sendCommand({ state, commit }, payload = {}) {
        /**
         * 修改蓝牙设备属性
         *
         * @param deviceId 设备id
         * @param bleMac 设备mac地址
         * @param serviceId sid
         * @param data 下发命令数据
         * @param resultCallback 回调
         */
        if (state.controlling) {
            console.hLog('受控中');
            commit('UPDATE_STATE', {
                name: 'NoControl',
                value: true
            });
            // Toast(i18n.t('controlling'));
            return;
        }
        commit('UPDATE_STATE', {
            name: 'NoControl',
            value: false
        });
        let { params = [state.devId, state.mac], data = '{}', toast = true } = payload;
        let orignData = data;
        typeof data === 'string' && (data = JSON.parse(data));
        let serviceId = data.sid;
        data = typeof data.data === 'string' ? data.data : JSON.stringify(data.data);
        let method = 'sendCommand';
        console.hLog('method = ', method, '下发sid = ', serviceId, 'data = ', data);
        let param = method === 'sendCommand' ? [...params, serviceId, data] : [...params, JSON.stringify(orignData)];
        return generatePromise({
            method: method,
            params: param,
            afterHilinkCalled: () => {
                state.controlling = true;
            }
        }).then((res = {}) => {
            state.controlling = false;
            console.hLog('下发回调:', JSON.stringify(res));
            if (res.errcode !== 0 && toast) {
                // Toast(i18n.t('control_fail'));
            }
            else if( res.errcode === 0 ){
                commit('UPDATE_DEVICE_DATA', res.responseData);
            }
            return res;
        });
    },

    // 从云侧删除ble
    deleteDeviceFromCloud({ state }, payload = {}) {
        /**
         * 从云侧删除ble
         *
         * @param deviceId 设备id
         * @param resultCallback 回调
         */
        let { params = [state.devId] } = payload;
        console.hLog(
            'deleteDevice:\n'
            + `devId:${params[0]}\n`
        );
        let method = 'deleteDevice';
        if (window.hilink && !window.hilink.deleteDevice) {
            method = 'deleteDevice';
        }
        return generatePromise({
            // deleteDevice  删除云侧设备接口名称修改
            method: method,
            params: [...params]
        });
    },
    // 清除ble用户注册信息
    clearBleRegInfo({ state }, payload = {}) {
        /**
         * 清除ble用户注册信息
         *
         * @param deviceId 设备id
         * @param bleMac 设备mac地址
         * @param resultCallback 回调
         */
        let { params = [state.devId, state.mac] } = payload;
        console.hLog(
            'clearBleRegInfo:\n'
            + `devId:${params[0]}\n`
            + `mac:${params[1]}`
        );
        return generatePromise({
            method: 'clearBleRegInfo',
            params: [...params]
        });
    },

    // 检测固件升级
    checkDeviceHota({ state, dispatch }, payload = {}) {
        /**
         * 检测固件升级
         *
         * @param sn
         * @param productId
         * @param resultCallback
         */
        let { params = [state.sn, state.proId] } = payload;
        console.hLog(
            'checkDeviceHota00:\n'
            + `sn00:${params[0]}\n`
            + `productId00:${params[1]}`
        );
        return generatePromise({
            method: 'checkDeviceHota',
            params
        });
        // return generatePromise({
        //     method: 'checkDeviceHota',
        //     params
        // }).then((res = {}) => {
        //     console.hLog(`ota res=${res}`);
        //     dispatch('jumpTo', 'com.huawei.smarthome.deviceBleUpgradeActivity');
        // });
    },
    /* OLD */
    // 监听蓝牙开关状态，手机上主动打开或关闭蓝牙模块会触发该函数
    onBluetoothAdapterStateChange({ state, dispatch }, payload = {}) {
        console.hLog(`HUAWEI::Action::onBluetoothAdapterStateChange`);
        let { callback } = payload;
        return generatePromise({
            method: 'onBluetoothAdapterStateChange',
            callback,
            onCallback: (res = {}) => {
                console.hLog(`HUAWEI::Action::getBluetoothAdapterState onCallback ${JSON.stringify(res)}`);
                if (res.available === undefined) {
                    return;
                }
                state.bleOn = res.available;
                if (!res.available) {
                    dispatch('openBluetoothAdapter');
                }
            }
        });
    },
    // 获取手机蓝牙状态
    getBluetoothAdapterState({ state, dispatch }) {
        console.hLog(`HUAWEI::Action::getBluetoothAdapterState`);
        return generatePromise({
            method: 'getBluetoothAdapterState'
        }).then((res = {}) => {
            console.hLog(`HUAWEI::Action::getBluetoothAdapterState then ${JSON.stringify(res)}`);
            if (res.available === undefined) {
                return;
            }
            state.bleOn = res.available;
            if (!res.available) {
                state.connectOk = 0;
                dispatch('openBluetoothAdapter');
            }
        });
    },
    // 打开手机蓝牙
    openBluetoothAdapter() {
        return generatePromise({
            method: 'openBluetoothAdapter',
            type: 'sync'
        });
    },
    // 获取当前注册设备缓存信息
    getCurrentRegisteredDevice({ state, commit, dispatch }) {
        if (!window.hilink || !window.hilink.getCurrentRegisteredDevice){
            return new Promise((resolve) => {
                resolve(true);
            });
        }
        return generatePromise({
            method: 'getCurrentRegisteredDevice'
        }).then((res = {}) => {
            console.hLog('设备信息:', res);
            // 获取到devId和mac后订阅设备消息
            state.devId = res.hilinkDevId;
            state.mac = res.deviceId;
            state.role = res.hilinkDeviceEntity.role;
            state.fwv = res.hilinkDeviceEntity.devInfo.fwv;
            state.hwv = res.hilinkDeviceEntity.devInfo.hwv;
            state.sn = res.hilinkDeviceEntity.devInfo.sn;
            state.model = res.hilinkDeviceEntity.devInfo.model;

            console.hLog('当前是否为共享用户:', res.hilinkDeviceEntity.role);
            if (res.hilinkDeviceEntity.role === 'owner') {
                commit('UPDATE_STATE', {
                    name: 'isShare',
                    value: false
                });
            } else if (res.hilinkDeviceEntity.role === 'family') {
                commit('UPDATE_STATE', {
                    name: 'isShare',
                    value: true
                });
            }

            // 订阅设备消息
            dispatch('subscribeBleEvent');
            if (
                res.hilinkDeviceEntity
                && res.hilinkDeviceEntity.services
            ) {
                let result = res.hilinkDeviceEntity,
                    services = result.services,
                    devInfo = result.devInfo || {};
                // 更新设备id,名称
                commit('UPDATE_DEVICE_INFO', {
                    devId: result.devId,
                    devName: result.devName,
                    otaVersion: devInfo.fwv
                        && devInfo.hwv
                        && `${devInfo.fwv}(${devInfo.hwv})`
                        || ''
                });
                console.hLog('devall', services);
                for (var i = 0; i < services.length; i++) {
                    commit('UPDATE_CLOUD_DATA', services[i]);
                }
            }
        });
    },

    // 更新设备基本信息
    updateDeviceBaseInfo({ state }, payload = {}) {
        /**
         * @param devId
         * @param json_body
         * @param callback
         */
        let { data = '{}' } = payload,
            json_body = data;
        let param = [state.devId, JSON.stringify(json_body)];
        console.hLog('json_body', json_body);
        return generatePromise({
            method: 'updateDeviceBaseInfo',
            params: param
        }).then((res = {}) => {
            console.hLog('updateDeviceBaseInfo回调:', JSON.stringify(res));
            return res;
        });
    }
};
