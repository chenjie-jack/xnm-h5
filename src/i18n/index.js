import { createI18n } from "vue-i18n";

/**
 * TODO
 * 多语言 message 使用插件导入
 * 语言去除 module， 使用单文件
 * 使用命名空间命名，如：'com_confirm'
 */
const Language = {
    zh: "zh",
    en: "en",
};

// 当前文件属于的语言
let localeName=Language.zh;

// 当前文件属于的语言
const getLocal = (path) => {
    return path.includes(`/${Language.en}/`) ? Language.en : Language.zh;
};

function getAppLanguage() {
    const DefualtLanguage = 'zh-CN',
        ZhReg = /^zh-/i;
    let language;
    if (localStorage && localStorage.getItem('AppLanuage')) {
        // ios 平台走localStorage-- 虽然hilink下有getAppLanguageSync,但是返回null
        language = localStorage.getItem('AppLanuage');
    } else if (window.hilink && window.hilink.getAppLanguageSync) {
        // android 平台走hilink.getAppLanguageSync
        language = window.hilink.getAppLanguageSync();
    } else if (navigator && navigator.language) {
        // 都没有的情况下 走window下的navigator
        // 缺陷--不能在app设置里面更改语言后实时刷新
        language = navigator.language;
    } else {
        language = DefualtLanguage;
    }
    language = language.toLowerCase();
    language === ('bo-cn' || 'bo' || 'ug' || 'ug-cn') && (language = 'zh-cn'); // 藏语也显示中文
    language = ZhReg.test(language) ? 'zh' : 'en';
    return language;
}

export let lang = getAppLanguage();

export const i18n = createI18n({
    locale: lang,
    allowComposition: true,
    legacy: false,
    globalInjection: true,
    fallbackWarn: false,
    fallbackLocale: Language.zh,
});

const files = import.meta.glob("./**/*.json", {
    import: "default",
    eager: true,
});

// !这里将模块化的 json 合并为一个
const initMessages = () =>
Object.entries(files).forEach(([key, lang]) => {
  i18n.global.mergeLocaleMessage(getLocal(key), lang);
});

initMessages();

export const t = (key) => i18n.global.t(key);
