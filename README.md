# 葫芦单词 - 微信小程序

一个帮助学习英语单词的微信小程序。

## 功能特性

- 随机展示英语单词
- 腾讯云翻译API支持
- 生词本功能
- 音频播放支持

## 安装和配置

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置腾讯云API

在使用翻译功能之前，需要配置腾讯云API密钥：

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 创建或使用现有的API密钥
3. 编辑 `utils/config.js` 文件，填入你的密钥信息：

```javascript
module.exports = {
  tencentcloud: {
    secretId: '你的SecretId',
    secretKey: '你的SecretKey',
    endpoint: 'tmt.tencentcloudapi.com',
    service: 'tmt',
    version: '2018-03-21',
    region: 'ap-chongqing'
  }
};
```

### 3. 开通腾讯云机器翻译服务

确保你的腾讯云账号已开通机器翻译服务，并配置了相应的权限。

## 项目结构

```
miemie/
├── app.js                 # 小程序入口文件
├── app.json              # 小程序配置文件
├── app.wxss              # 全局样式文件
├── assets/               # 资源文件
│   ├── translate.js      # 翻译API封装
│   └── font/            # 字体文件
├── data/                 # 数据文件
│   ├── vocabulary.js     # 词汇数据
│   └── word-list.js     # 单词列表
├── images/               # 图片资源
├── pages/                # 页面文件
│   ├── index/           # 首页
│   ├── search/          # 搜索页面
│   ├── word/            # 单词学习页面
│   ├── wordbook/        # 生词本页面
│   └── settings/        # 设置页面
├── utils/                # 工具文件
│   └── config.js        # 配置文件
└── package.json          # 项目依赖
```

## 使用说明

1. 在微信开发者工具中导入项目
2. 配置腾讯云API密钥
3. 编译运行项目

## 注意事项

- 请妥善保管你的腾讯云API密钥，不要提交到公开代码仓库
- 建议在生产环境中使用环境变量或更安全的密钥管理方式
- 腾讯云API有调用频率限制，请注意合理使用

## 技术栈

- 微信小程序原生开发
- 腾讯云机器翻译API
- CryptoJS 加密库

## 许可证

ISC
