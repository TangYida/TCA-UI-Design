# The China Academy 重新设计目录

本目录是 The China Academy 关键页面的静态设计基线。所有页面均直接打开即可预览；它们共享同一套本地字体、CSS 和 JavaScript，并使用源站 `thechinaacademy.org/wp-content/uploads/` 图片链接，不保存编辑照片副本。

## 文件结构

```text
Design/
├── README.md             # 目录与使用说明
├── REDESIGN.md           # 视觉、组件和交互决策
├── MAP.md                # 源网址 → 设计文件的唯一映射
├── TODO.md               # 当前进度与开发交接清单
├── Homepage/             # 首页
├── Sections/             # 一级栏目与 Video 列表
├── Articles/             # 三种文章页与 Premium Talk 详情
├── Premium/              # 会员、Intelligence、Talks
├── Courses/              # 课程列表、课程详情、HSK
├── About/                # About、Support、贡献者与作者
├── Utility/              # 搜索与个人中心
├── css/                  # tokens.css + site.css + 实际页面母版 masters.css
├── js/                   # 双层/移动导航、页脚、弹窗、阅读时长、子页内容密度
├── assets/fonts/         # 可本地部署的 EB Garamond / Libre Baskerville
└── references/           # 早期衬线、导航与文章排版研究
```

## 预览与维护

从 `Homepage/index.html` 开始预览。每次新增或重做关键页面时，必须同步：

1. 在 `MAP.md` 中登记源网址、对应文件、改动摘要、WordPress 请求类型、模板建议、数据/插件依赖及实现状态。
2. 在 `TODO.md` 中更新进度及尚未完成的产品/技术工作。
3. 按 `tokens.css` → `site.css` → `masters.css` 的顺序复用样式；全局页面家族规则写入 `masters.css`，不要在单页重新内联或复制。
4. 新图片使用源站的完整 URL，并填写准确 `alt`；生产上线前仍需确认图片版权与长期可用性。

这些文件是设计原型，不包含真实登录、支付、搜索、播放器、课程进度或 WordPress 数据接入。

## 母版如何工作

`css/masters.css` 是真实文件，也是页面家族的继承入口。首页通过 `<body class="master-home">` 继承封面、栏目封面、画廊和悬浮导语；观点与科技文章通过 `<body class="master-article">` 继承正文宽度、作者区、图片显示模式和相关阅读。以后若文章图片需要全局调整，只改这一文件中的文章媒体规则即可同步两篇及后续同类页面。
