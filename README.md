# 项目简介

RSS订阅小程序基于小程序云开发，因成本原因，暂未上线，仅提供源代码。

# 开发初衷

市面上RSS订阅器较多，其实开发难度并不大，但体验各种RSS订阅器之后觉得只有`inoreader`比较好用，奈何最近`inoreader`已经无法在国内直接访问其服务器了，所以打算自己写一个。

这个小程序本来是参加2020年腾讯小程序云开发大赛的，那段时间正值9月开学，我一直在准备开学的缓考，所以一直没有动工。初赛的提交截止时间是9月20日，我本以为提交代码就算完成了，于是赶工让这个项目于2020年9月19日完成，奈何云开发比赛还需要提交介绍文章及视频资料，所以果断放弃提交作品。最终还是让他开源吧，这个项目我会维护下去，现在仍有需要优化的细节。

# 开发者预览版

![小程序预览.png](https://i.loli.net/2020/11/04/TlqURcwCJSBdtAr.png)

# 小程序架构图

第一次画架构图，其实是相当于数据流的形式，后续可能会进行改进：

![AtomRSS.png](https://i.loli.net/2020/11/04/6slVxY1aACMK8jp.png)

# 目录结构

## 数据库
- databse.md
云开发数据库字段解释

## 云函数

- cloudfunctions/add-source
添加订阅
- cloudfunctions/article
单篇文章获取接口
- cloudfunctions/clear-db
测试用，清除云开发数据库
- cloudfunctions/clear-file
测试用，清除上传的图片
- cloudfunctions/login
登录接口，首次使用相当于注册
- cloudfunctions/readlist
阅读列表接口，返回用户未订阅的未读文章
- cloudfunctions/rss-resolver
rss爬虫，定期爬取订阅源链接、处理、转存

## 小程序

- pages/index
模拟tab，其他页面作为子组件进行切换
- pages/article
文章阅读组件
- pages/profile
个人主页组件
- pages/readlist
订阅列表组件
- pages/subscribe
订阅广场组件，预置订阅链接（未完成）

# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

