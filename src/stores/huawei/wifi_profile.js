const profile = {
    light: {
        on: {
            type: 'number',
            range: [0, 1]
        },
        mode: {
            range: [0, 1],
            mean: ['阅读模式', '读写模式'],
            type: 'number'
        }
    },

    Pattern: {
        mode: {
            range: [0, 1],
            mean: ['电脑模式', '自定义模式'],
            type: 'number'
        }
    },
    playMode: {
        mode: {
            desc: '玩法推荐模式',
            mean: ['无', '童话', '烛光', '酒吧', '拍照'],
            range: [0, 1, 2, 3, 4],
            type: 'number'
        }
    }
};
export default profile;
