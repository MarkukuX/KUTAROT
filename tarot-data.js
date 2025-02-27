const tarotData = {
    majorArcana: [
        {
            id: 0,
            name: "愚者",
            image: "./images/cards/0.jpg",
            description: {
                upright: "新的开始、冒险、自发性、纯真",
                reversed: "鲁莽、冒险、不负责任"
            }
        },
        {
            id: 1,
            name: "魔术师",
            image: "./images/cards/1.jpg",
            description: {
                upright: "创造力、技能、意志力、主动性",
                reversed: "技能不足、能力浪费、目标不明"
            }
        },
        // ... 添加更多大阿卡纳牌 ...
    ],
    
    minorArcana: [
        {
            id: 22,
            name: "权杖王牌",
            suit: "权杖",
            image: "./images/cards/22.jpg",
            description: {
                upright: "创造力的开始、灵感、潜力",
                reversed: "虚假的开始、延迟、阻碍"
            }
        },
        // ... 添加更多小阿卡纳牌 ...
    ]
};

// 确保导出完整的牌组数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tarotData;
} 