import { PRO_PLATFORM } from '../config/project';
import Huawei_BLE_STORE  from './huawei/ble';
import Honor_BLE_STORE  from './honor/ble';

import Huawei_WIFI_STORE  from './huawei/wifi';
import Honor_WIFI_STORE  from './honor/wifi';

// TODO：根据项目具体的通信方式选择BLE 或者 WIFI
let exportStore;
//WIFI通信
// if( PRO_PLATFORM === 'huawei'){
//     exportStore = Huawei_WIFI_STORE;
// }
// else{
//     exportStore = Honor_WIFI_STORE;
// }

//蓝牙通信
if( PRO_PLATFORM === 'huawei'){
    exportStore = Huawei_BLE_STORE;
}
else{
    exportStore = Honor_BLE_STORE;
}

export default exportStore;
