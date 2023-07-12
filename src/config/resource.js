// 静态资源信息配置
import {PRO_PLATFORM} from './project'

const resources_light={
    // system
    "system_back":"/light/Publicic_back.png",
    "system_info":"/light/Publicic_more.png",
    "system_search":"/light/Publicic_more.png",
    "system_more":"/light/Publicic_more.png",

    // home
    "product_img":"/light/product.png",
    "logo_img":"/light/logo.png",

    // realtime
    "loading_img":"/light/loading.png",
    "switch_img":"/light/switch.png",

    "battery1":"/light/battery_1.png",
    "battery2":"/light/battery_2.png",
    "battery3":"/light/battery_3.png",
    "battery4":"/light/battery_4.png",
    "battery5":"/light/battery_5.png",

    "unlock_img":"/light/unlock.png",
    "lock_img":"/light/lock.png",

    //knife clean
    "clean_green":"/light/clean_green.png",
    "clean_yellow":"/light/clean_yellow.png",

    //mode
    "high_speed_off":"/light/high_speed_off.png",
    "high_speed_on":"/light/high_speed_on.png",
    "low_speed_off":"/light/low_speed_off.png",
    "low_speed_on":"/light/low_speed_on.png",
    "low_speed_select":"/light/low_speed_select.png",

    "notice1":"/light/alert1.png",
    "notice2":"/light/alert2.png",
    "notice3":"/light/alert3.png",

    "wiki":"/light/wiki.png",
    "aftersale":"/light/aftersale.png",

    // setup
    "arrow_icon":"/light/list_arrow.png",

    // volume
    "volumereduce_img":"/light/volumereduce.png",
    "volumeincrease_img":"/light/volumeincrease.png",

    "ota_img":"/light/ota.png",
};

const resources_dark={
    // system
    "system_back":"/dark/Publicic_back.png",
    "system_info":"/dark/Publicic_more.png",
    "system_search":"/dark/Publicic_more.png",
    "system_more":"/dark/Publicic_more.png",

    // home
    "product_img":"/dark/product.png",
    "logo_img":"/dark/logo.png",

    // realtime
    "loading_img":"/dark/loading.png",
    "switch_img":"/dark/switch.png",

    "battery1":"/dark/battery_1.png",
    "battery2":"/dark/battery_2.png",
    "battery3":"/dark/battery_3.png",
    "battery4":"/dark/battery_4.png",
    "battery5":"/dark/battery_5.png",

    "unlock_img":"/dark/unlock.png",
    "lock_img":"/dark/lock.png",

    //knife clean
    "clean_green":"/dark/clean_green.png",
    "clean_yellow":"/dark/clean_yellow.png",

    //mode
    "high_speed_off":"/dark/high_speed_off.png",
    "high_speed_on":"/dark/high_speed_on.png",
    "low_speed_off":"/dark/low_speed_off.png",
    "low_speed_on":"/dark/low_speed_on.png",
    "low_speed_select":"/dark/low_speed_select.png",

    "notice1":"/dark/alert1.png",
    "notice2":"/dark/alert2.png",
    "notice3":"/dark/alert3.png",

    "wiki":"/dark/wiki.png",
    "aftersale":"/dark/aftersale.png",

    // setup
    "arrow_icon":"/dark/list_arrow.png",

    // volume
    "volumereduce_img":"/dark/volumereduce.png",
    "volumeincrease_img":"/dark/volumeincrease.png",

    "ota_img":"/dark/ota.png",
};

export default function ResourcesForTheme(key, isDark=false) {
    let resources = resources_light;

    //适配主题模式
    if ( isDark ){// dark 模式
        resources = resources_dark;
    }
    else {// 默认为light 模式
        resources = resources_light;
    }

    return ("./" + PRO_PLATFORM  + resources[key]);
}
