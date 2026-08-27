# The China Academy 重新设计目录

本目录是 The China Academy 关键页面的静态设计基线。所有页面均直接打开即可预览；它们共享同一套本地字体、CSS 和 JavaScript，并使用源站 `thechinaacademy.org/wp-content/uploads/` 图片链接，不保存编辑照片副本。


## 预览与维护

从 `Homepage/index.html` 开始预览。点击这个[链接](https://tangyida.github.io/TCA-UI-Design/Homepage/index.html)。

每次新增或重做关键页面时，必须同步：

1. 在 `MAP.md` 中登记源网址、对应文件、改动摘要、WordPress 请求类型、模板建议、数据/插件依赖及实现状态。

2. 在 `TODO.md` 中更新进度及尚未完成的产品/技术工作。

3. 按 `tokens.css` → `site.css` → `masters.css` 的顺序复用样式；全局页面家族规则写入 `masters.css`，不要在单页重新内联或复制。

4. 新图片使用源站的完整 URL，并填写准确 `alt`；生产上线前仍需确认图片版权与长期可用性。

这些文件是设计原型，不包含真实登录、支付、搜索、播放器、课程进度或 WordPress 数据接入。

## 母版如何工作

`css/masters.css` 是真实文件，也是页面家族的继承入口。首页通过 `<body class="master-home">` 继承封面、栏目封面、画廊和悬浮导语；Trending、Opinion、Premium Intelligence 通过 `<body class="master-section">` 继承栏目标题、横向主题条、分割线卡片看板和 Load More；Video Archive 叠加 `.master-video-section`，复用卡片几何但改用独立视频栏目和排序；Premium Talks 使用 `.master-premium-talks` 的逐行长卡；文章通过 `<body class="master-article">` 继承正文宽度、作者区、图片显示模式、推荐和社区层，再由 `.article-featured-image`、`.article-text`、`.article-news` 选择头图、文字或新闻标题区。以后若某个页面家族需要全局调整，只改这一文件中的对应母版即可同步全部同类页面。

## 文件结构

```text
Design/
├── README.md             # 目录与使用说明
├── REDESIGN.md           # 视觉、组件和交互决策
├── MAP.md                # 源网址 → 设计文件的唯一映射
├── TODO.md               # 当前进度与开发交接清单
├── Homepage/             # 首页 + Premium Member
├── Article Sections/     # Trending、Opinion、Premium Intelligence
├── Articles/             # 观点/头图文章 + 科技/文字文章 + 新闻模板演示
├── Beta Demo/            # 不影响正式版的首页比例实验与跨平台讨论模块 demo
├── Video Sections/       # Video 列表 + Premium Talks 列表
├── Videos/               # 视频文章、Premium Talk 详情、课程详情
├── About/                # Courses、HSK、About、Support、贡献者与作者
├── Utility/              # 搜索与个人中心
├── css/                  # tokens.css + site.css + masters.css；独立 demo 样式另存同目录
├── js/                   # 导航/栏目字段、文章交互与独立 demo 的轻量交互
├── assets/fonts/         # 可本地部署的 EB Garamond / Libre Baskerville / Roboto
└── references/           # 早期衬线、导航与文章排版研究
```

当前仍有 **21 个关键网址对应的 HTML 页面**。此外有 `Articles/article-news.html` 新闻模板、`Beta Demo/homepage.html` 首页实验和 `Beta Demo/discussions-across-platforms-demo.html` 跨平台讨论实验，均不计入关键网址数量。原需求清单虽然编号至 18，但第 2 项包含 2 个一级菜单页、第 4 项包含 3 种关键文章网址，因此是 18 个编号组、21 个实际网址。
