var g_bleTimeOut=0;

// 利用随机数结合16进制生成唯一请求标识id
export function generateRequestId(){
    return Math.random().toString(16).slice(2);
}

// 计算屏幕ppi - deprecated
export function getPPI() {
    var width = 1080;
    var height = 2340;
    var inch = 6.1;
    var ppi = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / inch;
    console.hLog("HONORNATIVE:getPPI=>width::" + width + "=>height::" + height + "=>inch::" + inch + "=>ppi::" + ppi);
    return ppi;
}

/******************************参数获取函数***********************************/
// 获取本地语言状态
export function getAppLanguage(){
    console.hLog("HONORNATIVE:getAppLanguage");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getAppLanguageSync", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getAppLanguageCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.getAppLanguageCallback = (res)=>{
            console.hLog("HONORNATIVE:getAppLanguageCallback");
            window.LANGUAGE = res.language;//设置系统语言
            console.hLog(window.LANGUAGE);
        }
    }
}

// 获取本地主题模式
export function getThemeMode(){
    console.hLog("HONORNATIVE:getThemeMode");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getThemeMode", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getThemeModeCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.getThemeModeCallback = (res)=>{
            console.hLog("HONORNATIVE:getThemeModeCallback");
            window.THEMEMODE = res.themeMode;//设置本地主题模式
            console.hLog(window.THEMEMODE);
        }
    }
}

// 获取手机状态栏高度
export function getStatusBarHeight(){
    console.hLog("HONORNATIVE:getStatusBarHeight");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getStatusBarHeight", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getStatusBarHeightCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.getStatusBarHeightCallback = (res)=>{
            console.hLog("HONORNATIVE:getStatusBarHeightCallback");
            window.STATUSBARHEIGHT=res.statusBarHeight;
            console.hLog(window.STATUSBARHEIGHT);
        }
    }
}

// 获取当前设备是否为平板的判断值
export function getIsPad(){
    console.hLog("HONORNATIVE:getIsPad");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "isPad", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getIsPadCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.getIsPadCallback = (res)=>{
            window.ISPAD=res.isPad;
            console.hLog( "HONORNATIVE:getIsPadCallback" + window.ISPAD);
        }
    }
}

// 获取折叠屏当前折叠状态
export function getScreenSpreaded(){
    // console.hLog("HONORNATIVE:getScreenSpreaded");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getScreenSpreaded", //string 执行方法
            "", // 空string
            "getScreenSpreaded", //string，请求Id
            "getScreenSpreadedCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.getScreenSpreadedCallback = (res)=>{
            // console.hLog("HONORNATIVE:getScreenSpreadedCallback");
            window.SPREADEDMODE = res.spreadedMode;// 折叠屏当前折叠状态
            console.hLog(window.SPREADEDMODE);
        }
    }
}

// 获取智慧空间APP版本
export function getAppVersion(mode){
    console.hLog("HONORNATIVE:getAppVersion");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getAppVersion", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getAppVersionCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.getAppVersionCallback = (res)=>{
            console.hLog("HONORNATIVE:getAppVersionCallback");
            console.hLog(res);
        }
    }
}

/******************************功能调用函数***********************************/
// 弹出原生提示语
//len ，提示显示时长 0: 短时显示 1: 长时显示
//str 提示内容
export function toast(len,str){
    console.hLog("HONORNATIVE:toast");
    if( window.honorConnect ){
        let obj={"toastLength":1,"body":str};
        let body=JSON.stringify(obj);
        window.honorConnect.handler(
            "toast", //string 执行方法
            body, // body,string,可选
            generateRequestId(), //string，请求Id
            "toastCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.toastCallback = (res)=>{
            console.hLog("HONORNATIVE:toastCallback");
            console.hLog(res);
        }
    }
}

// 设置APP状态栏颜色模式, mode : string类型 1：正常模式 2：dark模式
export function setStatusBarMode(mode){
    console.hLog("HONORNATIVE:setStatusBarMode");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "setStatusBarMode", //string 执行方法
            mode, // body,string,可选
            generateRequestId(), //string，请求Id
            "setStatusBarModeCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.setStatusBarModeCallback = (res)=>{
            console.hLog("HONORNATIVE:setStatusBarModeCallback");
            console.hLog(res);
        }
    }
}

// 弹出原生编辑窗口
// obj={
//     "title": "编辑设备名称", //string ，弹框标题
//     "hint": "请输入设备名称", //string ，用户输入为空时编辑框显示的提示语
//     "userInput": "我的设备", //string ，当前已有的编辑内容
//     "toastWhenEmpty": "请输入设备名称" //string ，用户输入为空时点击确定，toast显示的提示语
//   };
export function showEditDialog(obj){
    console.hLog("HONORNATIVE:showEditDialog");
    if( window.honorConnect ){
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "showEditDialog", //string 执行方法
            body, // body,string,可选，见下描述
            generateRequestId(), //string，请求Id
            "showEditDialogCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.showEditDialogCallback = (res)=>{
            console.hLog("HONORNATIVE:showEditDialogCallback");
            if( res.status === 0){
                if( res.userInput ){
                    modifyDeviceName(res.userInput);
                    window.DEVICENAME = res.userInput;
                }
                console.hLog("window.DEVICENAME=" + window.DEVICENAME);
            }
        }
    }
}

// 获取设备名
export function getDeviceName(){
    console.hLog("HONORNATIVE:getDeviceName");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getDeviceName", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getDeviceNameCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.getDeviceNameCallback = (res)=>{
            console.hLog("HONORNATIVE:getDeviceNameCallback=" + res);
            if( res.status === 0 ){
                window.DEVICENAME=res.deviceName;
                console.hLog(window.DEVICENAME);
            }
        }
    }
}

// 修改设备名
export function modifyDeviceName(name){
    console.hLog("HONORNATIVE:modifyDeviceName");
    if( window.honorConnect ){
        let obj={"deviceName":name};
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "modifyDeviceName", //string 执行方法
            body, // body,string,可选，见下描述
            generateRequestId(), //string，请求Id
            "modifyDeviceNameCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
            );
        window.modifyDeviceNameCallback = (res)=>{
            console.hLog("HONORNATIVE:modifyDeviceNameCallback");
            console.hLog(res);
        }
    }
}

// 删除设备
export function deleteDevice(){
    console.hLog("HONORNATIVE:deleteDevice");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "deleteDevice", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "deleteDeviceCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.deleteDeviceCallback = (res)=>{
            console.hLog("HONORNATIVE:deleteDeviceCallback");
            if( res.status === 0 ){
                exitDeviceActivity();
            }
        }
    }
}

// 获取设备所属空间
export function getRoomInfo(){
    console.hLog("HONORNATIVE:getRoomInfo");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getRoomInfo", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getRoomInfoCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.getRoomInfoCallback = (res)=>{
            console.hLog("HONORNATIVE:getRoomInfoCallback=>" + JSON.stringify(res));
            if( res.status === 0 && res.roomList.length > 0){
                window.ROOMLIST = res.roomList;// 空间列表
                window.DEVICEROOMID = res.currentRoomId;// 设备空间ID
                for(var i = 0 ; i < window.ROOMLIST.length ; i ++){//遍历列表获取设备空间名称
                    if( window.DEVICEROOMID === window.ROOMLIST[i].roomId ){
                        window.DEVICEROOMNAME = window.ROOMLIST[i].roomName;//获取空间名称
                    }
                }
            }
        }
    }
}

// 移动设设备摆放空间
export function modifyDeviceRoom(destRoomId,destRoomName){
    console.hLog("HONORNATIVE:modifyDeviceRoom");
    if( window.honorConnect ){
        let obj={"destRoomId":destRoomId};
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "modifyDeviceRoom", //string 执行方法
            body, // body,string,可选，见下描述
            generateRequestId(), //string，请求Id
            "modifyDeviceRoomCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.modifyDeviceRoomCallback = (res)=>{
            console.hLog("HONORNATIVE:modifyDeviceRoomCallback");
            window.DEVICEROOMID = destRoomId;// 设备空间ID
            window.DEVICEROOMNAME = destRoomName;//获取空间名称
            console.hLog("room::" + window.DEVICEROOMID + window.DEVICEROOMNAME);
        }
    }
}

// 退出设备页面
export function exitDeviceActivity(){
    console.hLog("HONORNATIVE:exitDeviceActivity");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "exitDeviceActivity", //string 执行方法
            "",  // body,string类型url,必传，app侧loadUrl中的地址参数
        );
    }
}

/******************************法律信息交互***********************************/
// 跳转新的法律信息H5页面
export function jumpLegalInformation(){
    console.hLog("HONORNATIVE:jumpLegalInformation");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "jumpLegalInformation", //string 执行方法
            "https://contentplatform-drcn.hihonorcdn.com/HCEP/deviceweb/protocol/index.html" // 空string
        );
    }
}

/******************************设备蓝牙交互***********************************/
// 查询设备全部状态
export function getDevInfoAll(){
    console.hLog("HONORNATIVE:getDevInfoAll");
    if( window.honorConnect ){
        window.honorConnect.handler(
            "getDevInfoAll", //string 执行方法
            "", // 空string
            generateRequestId(), //string，请求Id
            "getDevInfoAllCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.getDevInfoAllCallback = (res)=>{
            console.hLog("HONORNATIVE:getDevInfoAllCallback=>" + JSON.stringify(res));
            if( res && res.status === 0 && res.prdID === window.PRODUCTID){// 确认是有效的事件
                for(var i = 0 ; i < res.serviceList.length ; i++){//遍历服务列表
                    if(res.serviceList[i].id==="razor"){//TODO::固件已实现的专用服务，其他服务固件不支持
                        if( res.serviceList[i].propertyList && res.serviceList[i].propertyList.length > 0 ){//服务的特性列表有效
                            for(var j = 0 ; j < res.serviceList[i].propertyList.length ; j++){//遍历服务的特性列表
                                if( res.serviceList[i].propertyList[j].id === "quantity"){// 电量
                                    if( res.serviceList[i].propertyList[j].value > 0 && res.serviceList[i].propertyList[j].value < 101){
                                        //电量取值区间为1-100，其他的异常数据需要丢弃
                                        window.QUANTITY = res.serviceList[i].propertyList[j].value;
                                    }
                                } else if( res.serviceList[i].propertyList[j].id === "gear"){// 档位
                                    window.GEAR = res.serviceList[i].propertyList[j].value;// 剃须刀档位，取值范围1-3，步长1
                                } else if( res.serviceList[i].propertyList[j].id === "lock"){// 旅行锁
                                    window.LOCK = res.serviceList[i].propertyList[j].value;// 旅行锁开关，0:未开启旅行锁，1:开启旅行锁
                                } else if( res.serviceList[i].propertyList[j].id === "devicestatus"){// 旅行锁
                                    window.DEVICESTATE = res.serviceList[i].propertyList[j].value;// 设备工作状态开关，0:暂停，1:工作中
                                } else{
                                    console.hLog("not support property!!!");
                                }
                            }
                        }
                    }else{
                        //TODO: 获取固件版本号和mac地址
                        console.hLog("not support service!!!");
                    }
                }
            }
            else{
                console.hLog("error! ")
            }
        }
    }
}

// 查询设备部分属性
// obj={
//     "serviceId1":["propertyId1","propertyId2","propertyId3"],
//     "serviceId2":["propertyId21","propertyId22"]
// };
export function getDeviceServices(obj){
    console.hLog("HONORNATIVE:getDeviceServices");
    if( window.honorConnect ){
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "getDeviceServices", //string 执行方法
            body, // 要查询的属性信息，由多个serviceId与多个propertyId组成json
            generateRequestId(), //string，请求Id
            "getDeviceServicesCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.getDeviceServicesCallback = (res)=>{
            console.hLog("HONORNATIVE:getDeviceServicesCallback=>" + JSON.stringify(res));
            if( res && res.status === 0 && res.prdID === window.PRODUCTID){// 确认是有效的事件
                for(var i = 0 ; i < res.serviceList.length ; i++){//遍历服务列表
                    if(res.serviceList[i].id==="razor"){//TODO::固件已实现的专用服务，其他服务固件不支持
                        if( res.serviceList[i].propertyList && res.serviceList[i].propertyList.length > 0 ){//服务的特性列表有效
                            for(var j = 0 ; j < res.serviceList[i].propertyList.length ; j++){//遍历服务的特性列表
                                if( res.serviceList[i].propertyList[j].id === "quantity"){// 电量
                                    if( res.serviceList[i].propertyList[j].value > 0 && res.serviceList[i].propertyList[j].value < 101){
                                        //电量取值区间为1-100，其他的异常数据需要丢弃
                                        window.QUANTITY = res.serviceList[i].propertyList[j].value;
                                    }
                                } else if( res.serviceList[i].propertyList[j].id === "gear"){// 档位
                                    window.GEAR = res.serviceList[i].propertyList[j].value;// 剃须刀档位，取值范围1-3，步长1
                                } else if( res.serviceList[i].propertyList[j].id === "lock"){// 旅行锁
                                    window.LOCK = res.serviceList[i].propertyList[j].value;// 旅行锁开关，0:未开启旅行锁，1:开启旅行锁
                                } else if( res.serviceList[i].propertyList[j].id === "devicestatus"){// 旅行锁
                                    window.DEVICESTATE = res.serviceList[i].propertyList[j].value;// 设备工作状态开关，0:暂停，1:工作中
                                } else{
                                    console.hLog("not support property!!!");
                                }
                            }
                        }
                    }else{
                        console.hLog("not support service!!!");
                    }
                }
            }
            else{
                console.hLog("error! ")
            }
        }
    }
}

// 下发命令给设备
// {
//     "serviceId": "serviceId",
//     "property": {
//         "propertyId": "propertyId",
//         "propertyValue": "propertyValue"
//     }
// }
export function setDeviceProperty(obj){
    console.hLog("HONORNATIVE:setDeviceProperty");
    if( window.honorConnect ){
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "setDeviceProperty", //string 执行方法
            body, // 空string
            generateRequestId(), //string，请求Id
            "setDevicePropertyCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.setDevicePropertyCallback = (res)=>{
            console.hLog("HONORNATIVE:setDevicePropertyCallback");
            console.hLog(res);
        }
    }
}

// 下发action指令给设备
export function controlDevice(){
    console.hLog("HONORNATIVE:controlDevice");
    if( window.honorConnect ){
        let obj= {
            "serviceId1":[{"actionId":"id1","actionName":"name1"},{"actionId":"id2","actionName":"name2"}],
            "serviceId2":[{"actionId":"id22","actionName":"name22"}]
        };
        let body=JSON.stringify(obj);
        console.hLog("HONORNATIVE:body="+body);
        window.honorConnect.handler(
            "controlDevice", //string 执行方法
            body, // 空string
            generateRequestId(), //string，请求Id
            "controlDeviceCallback" // resultCallback，成功或失败时，将调用传入resultStr返回结果
        );
        window.controlDeviceCallback = (res)=>{
            console.hLog("HONORNATIVE:controlDeviceCallback");
            console.hLog(res);
        }
    }
}
// 重新连接设备
export function reconnectDevice(){
    console.hLog("HONORNATIVE:reconnectDevice");

    window.BLE_STATE=0;// 为防止设备端蓝牙通信关闭导致无法收到蓝牙连接状态参数，所以发起重新连接指令前，先修改连接状态参数为0，连接中
    window.QUANTITY=101;// 重新初始化电量，防止电量跳动
    //发起重连指令
    getDevInfoAll();
}

// 蓝牙连接状态监听
export function setBleLinkStateCallback(){
    console.hLog("HONORNATIVE:setBleLinkStateCallback");
    //设置10s连接超时
    console.hLog("HONORNATIVE:init g_bleTimeOut=" + g_bleTimeOut);
    g_bleTimeOut = setTimeout( ()=>{
        console.hLog("HONORNATIVE:bleLinkStateTimeoutCallback" + window.BLE_STATE);
        if( window.BLE_STATE === 0 ){
            if( window.QUANTITY > 0 && window.QUANTITY < 101){
                window.BLE_STATE=1;// 连接中：0 连接成功：1  ,连接失败 2
                
                // 查询电量,挡位,旅行锁,工作状态
                let objQuantity={"razor":["quantity","gear","lock","devicestatus"]};
                getDeviceServices(objQuantity);
            }
        }
    }, 10000);// 蓝牙连接状态监听超时

    window.bleLinkStateCallback = (event)=>{
        console.hLog("HONORNATIVE:bleLinkStateCallback=>" + JSON.stringify(event));
        if( g_bleTimeOut !== 0) {//关闭超时线程
            clearTimeout(g_bleTimeOut);
            g_bleTimeOut = 0;
        }
        if(event.linkState&&event.linkState==="LINKING"){
            window.BLE_STATE=0;// 连接中：0 连接成功：1  ,连接失败 2
        }else if(event.linkState&&event.linkState==="NOT_LINK"){
            window.BLE_STATE=2;// 连接中：0 连接成功：1  ,连接失败 2
        }else if(event.linkState&&event.linkState==="LINK_SUCCESS"){
            window.BLE_STATE=1;// 连接中：0 连接成功：1  ,连接失败 2
            
            // 查询电量,挡位,旅行锁,工作状态
            let objQuantity={"razor":["quantity","gear","lock","devicestatus"]};
            getDeviceServices(objQuantity);
        }
    }
}

// 设置蓝牙事件监听回调
export function setDeviceEventCallback(){
    console.hLog("HONORNATIVE:setDeviceEventCallback");
    window.deviceEventCallback = (event)=>{
        console.hLog("HONORNATIVE:deviceEventCallback=>" + JSON.stringify(event));
        if( event && event.status === 0 && event.prdID === window.PRODUCTID){// 确认是有效的事件
            for(var i = 0 ; i < event.serviceList.length ; i++){//遍历服务列表
                if(event.serviceList[i].id==="razor"){//TODO::固件已实现的专用服务，其他服务固件不支持
                    if( event.serviceList[i].propertyList && event.serviceList[i].propertyList.length > 0 ){//服务的特性列表有效
                        for(var j = 0 ; j < event.serviceList[i].propertyList.length ; j++){//遍历服务的特性列表
                            if( event.serviceList[i].propertyList[j].id === "quantity"){// 电量
                                if( event.serviceList[i].propertyList[j].value > 0 && event.serviceList[i].propertyList[j].value < 101){
                                    //电量取值区间为1-100，其他的异常数据需要丢弃
                                    if( window.QUANTITY >= event.serviceList[i].propertyList[j].value){//电量数据只能降不能升
                                        window.QUANTITY = event.serviceList[i].propertyList[j].value;
                                    }
                                }
                            } else if( event.serviceList[i].propertyList[j].id === "gear"){// 档位
                                window.GEAR = event.serviceList[i].propertyList[j].value;// 剃须刀档位，取值范围1-3，步长1
                            } else if( event.serviceList[i].propertyList[j].id === "lock"){// 旅行锁
                                window.LOCK = event.serviceList[i].propertyList[j].value;// 旅行锁开关，0:未开启旅行锁，1:开启旅行锁
                            } else if( event.serviceList[i].propertyList[j].id === "devicestatus"){// 旅行锁
                                window.DEVICESTATE = event.serviceList[i].propertyList[j].value;// 设备工作状态开关，0:暂停，1:工作中
                            } else{
                                console.hLog("not support property!!!");
                            }
                        }
                    }
                }else{
                    console.hLog("not support service!!!");
                }
            }
        }
        else{
            console.hLog("error! ")
        }
    }
}

/******************************生命周期函数***********************************/
// 初始化
export function init(){
    console.hLog("HONORNATIVE:init");
    if(window.honorConnect){
        console.hLog("HONORNATIVE:window.honorConnect exist");

        getAppLanguage();// 获取本地语言状态
        getThemeMode();// 获取本地主题模式
        getScreenSpreaded();// 获取折叠屏当前折叠状态
        getStatusBarHeight();// 获取手机状态栏高度
        getIsPad();//获取当前设备是否为平板判断的判断值
        getDeviceName();// 获取设备名称
        getRoomInfo();// 获取设备所属空间

        setBleLinkStateCallback();// 设置蓝牙连接状态监听
        setDeviceEventCallback();// 设置蓝牙事件监听回调

        getDevInfoAll();// 查询全部设备信息
        console.hLog("HONORNATIVE:init finish"+window.bleLinkStateCallback);
    }
    else{
        console.hLog("HONORNATIVE:window.honorConnect not exist");
    }
}

// 反初始化
export function unInit(){
    console.hLog("HONORNATIVE:unInit");
}

// APP切换到前台触发该方法
window.onResume=()=>{
    console.hLog("HONORNATIVE:onResume");
}

// APP切换到后台触发该方法
window.onPause=()=>{
    console.hLog("HONORNATIVE:onPause");
}

// 本地反初始化
export function uninit(){
    console.hLog("HONORNATIVE:uninit");
}
