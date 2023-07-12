export default {
    // 锁定状态
    status: {
        name: 'status',
        default: 0,
        type: 'enum',
        enumList: [
            0, // 已解锁
            1 // 已锁定
        ]
    },

    // 模式
    mode: {
        name: 'mode',
        default: 2,
        type: 'enum',
        enumList: [
            0, // 敏感
            1, // 舒适
            2//高速
        ]
    },
    
    // 电量
    battery:{
        name: 'capacity', // 电池容量
        type: 'int',
        default: 100,
        min: 0,
        max: 100,
        step: 1
    },

    //开关机状态
    motor:{
        name:'motor',
        type: 'enum',
        default: 0,
        enumList: [
            0,//关机状态
            1,//开机状态
        ]
    },

    //异常提醒
    unusual:{
        name:'unusual',
        type: 'enum',
        default: 0,
        enumList: [
            0,//-正常
            1,//-刀头清洗
            2,//-刀头损坏
            3//-充电温度异常
        ]
    },

    //刀头复位
    knifereset:{
        name:'reset',
        type: 'enum',
        default: 0,
        enumList: [
            0,//-不复位
            1//-复位
        ]
    },

    // 刀头状态
    knife:{
        name: 'life', // 刀头寿命
        type: 'int',
        default: 0,
        min: 0,
        max: 9999,
        step: 1
    },
    //刀头状态
    // knife:[
    //     {
    //         name: 'unusual', // 异常
    //         type: 'enum',
    //         default: 0,
    //         enumList: [
    //             0,//正常
    //             1,//待清洗
    //             2,//损坏
    //         ]
    //     },
    //     {
    //         name: 'reset', // 复位
    //         type: 'enum',
    //         default: 0,
    //         enumList: [
    //             0,//关闭复位
    //             1,//触发复位
    //         ]
    //     },
    //     {
    //         name: 'life', // 刀头寿命
    //         type: 'int',
    //         default: 1200,
    //         min: 0,
    //         max: 9999,
    //         step: 1
    //     }
    // ],
};
