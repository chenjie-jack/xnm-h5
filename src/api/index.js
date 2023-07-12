import { PRO_PLATFORM } from '../config/project';
import * as Huawei_BLE  from './huawei/ble_api';
import * as Honor_BLE  from './honor/ble_api';

// TODO：根据生态平台导出不同的api 接口
let API;
if( PRO_PLATFORM === 'huawei'){
    API = Huawei_BLE;
}
else{
    API = Honor_BLE;
}

export default API;
