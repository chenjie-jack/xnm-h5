import { createStore } from 'vuex'
import actions from '@/api/huawei/ble_api';

import {
    initState,
    handleState
    // getWeekTime
} from '@/utils/index';
import profile from './ble_profile';

const store = createStore({
    state: {
        // 基本信息
        proId: '2MDD',
        devType: '170',
        devName: '',
        devId: '',
        serviceId: '',
        onState: '',
        sn: '', // 序列号
        model: '',
        fwv: '', // 固件版本
        hwv: '', // 硬件版本
        mac: '',
        role: 'owner', // 用户角色 owner|family
        // 手机信息
        statusBarHeight: 24,
        network: 'online',
        isPad: false, // 是否是pad
        isPortrait: false, // 竖屏
        isFold: false, // 折叠屏
        changeScreen: false, // 折叠屏和平板竖屏
        darkMode: false, // 黑暗模式
        browserWidth: 360,
        otaVersion: '',
        bleOn: false, // 手机蓝牙是否开启
        isShare: false, // 是否为共享设备，共享设备不能执行OTA升级和删除操作
        connectStatus: 1, // 设备蓝牙连接状态 0-未连接 1-正在连接 2-已连接 3-断连中
        connectOk: 1, // 设备连接认证回调 0-未连接 1-正在连接 2-已连接
        NoControl: true,
        // Profile
        ...initState(profile),
        updating: false, // 骑行数据同步中
        hasNewVersion: false, // 是否有新固件
        // Hag
        abilities: [],
        // 日期
        year: 2021, // 当前年
        month: 0, // 当前月
        day: 1, // 当前日
        // 其他
        position: 0, // 首页滑动位置
        hasUpdateOta: false,
        controlling: false,
        isReconnect: false, // 记录是否点击了重新连接
        reConnectCount: 0, // 重新连接的次数
        phoneNumber: 'XXX-XX-XXXX', // 客服热线电话
        appMinVersion: '13.0.5.310'// 可以拉起拨号盘的最低app版本号
    },
    mutations: {
        UPDATE_DEVICE_DATA(state, res) {
            handleState(profile, state, res);
        },
        UPDATE_CLOUD_DATA(state, res) {
            handleState(profile, state, res);
        },
        UPDATE_DEVICE_INFO(state, info) {
            info.devId && (state.devId = info.devId);
            info.devName && (state.devName = info.devName);
        },
        UPDATE_STATE(state, { name, value }) {
            state[name] = value;
        }
    },
    getters: {
        // HEADER高度
        headerHeight(state) {
            return state.statusBarHeight + 56;
        },
        imgPath(state) {
            return state.darkMode ? 'dark/' : '';
        },
        // 都为True则连接蓝牙
        canConnect(state) {
            if (
                state.bleOn
                && state.devId
                && state.mac
            ) {
                return true;
            }
            return false;
        },
        canControl(state) {
            return state.connectStatus === 2
                && state.connectOk === 2;
        },
        faultCodes(state) {
            let fault = String(state.faultDetection.fault).split('')
                .reverse();
            let codes = [];
            fault.forEach((item, index) => {
                if (Number(item) === 1) {
                    codes.push(index);
                }
            });
            return codes;
        }
    },
    actions
});

export default store;
