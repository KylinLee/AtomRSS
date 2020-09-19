# 云开发数据库

## USER

用户个人信息

|    字段    |   类型   |           说明           |
| :--------: | :------: | :----------------------: |
|    _id     |  string  |       OPENID作为id       |
|  nickName  |  string  | 该用户的昵称，和微信一致 |
| avatarUrl  |  string  |     该用户的头像链接     |
|   links    | [string] |   该用户订阅所有的链接   |
| lastUpdate |   Date   |   上次用户抓取列表时间   |

## SOURCE_LINK

所有需要订阅的链接

| 字段 |  类型  |     说明     |
| :--: | :----: | :----------: |
| _id  | string |      ID      |
| url  | string | 订阅链接地址 |
|      |        |              |

## RSS_SOURCE

rss拉取的文章相关信息

|     字段     |   类型   |                   说明                   |
| :----------: | :------: | :--------------------------------------: |
|     _id      |  string  | 该篇文章的源地址，防止重复插入同一篇文章 |
| post_channel |  string  |                 发布频道                 |
| channel_link |  string  |                 订阅链接                 |
|  post_title  |  string  |                 文章标题                 |
|   pub_data   |  string  |                 发布时间                 |
| description  |  string  |                 文章摘要                 |
|   content    |   json   |              经过解析的内容              |
|  img_links   | [string] |         该篇文章下所有的图片链接         |
| insert_date  |   Date   |              数据的插入时间              |

