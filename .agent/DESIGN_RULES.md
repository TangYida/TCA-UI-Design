# TCA Design Rules

本文件是 TCA-Design 的设计宪法。它记录已经确认、应跨页面复用的设计语言、页面母版、组件结构与 selector 契约。除非用户在当前任务中明确推翻某条规则，否则实现必须以本文件为准。

## 1. 规则优先级

1. 用户本轮明确指令。
2. 本文件中的现行规则。
3. `.agent/DO_NOT_REGRESS.md` 中的禁区与已废弃方案。
4. 当前页面的局部实现。

用户明确改变全局设计语法时，应更新本文件，并把被替代的旧方案写入 `DO_NOT_REGRESS.md`。局部实现不得私自覆盖全局规则。

## 2. 全局设计语法

### 2.1 设计令牌与字体

- 全站内容最大宽度：`1600px`，由 `css/tokens.css` 的 `--max` 控制。
- Display / 标题字体：Libre Baskerville，使用 `var(--display)`。
- 正文、lede、引文与编辑性衬线文字：EB Garamond，使用 `var(--serif)`。
- UI、导航、日期、按钮、时长标签与状态文字：Roboto，使用 `var(--sans)`。
- 所有字体均从本地 `assets/fonts/` 加载；内容图片优先使用源站 URL。用户明确上传并要求入库的图片除外。
- 所有可见文字的 `line-height` 必须处于 `1.2–1.5`；没有统一的段间距倍数下限。
- 正文阅读宽度以文章母版的约 `80ch` 为基准。

### 2.2 颜色与层级

- `--paper` / `--white`：页面与纸张背景。
- `--blue` / `--ink`：藏青色正文、导航和深色界面。
- `--gold`：栏目标题、Premium 状态和关键操作。
- `--red`：主题 taxonomy 与视频主题播放符号。
- `--muted`：日期、辅助说明和非主导元数据。
- `--line`：普通内容分割线；金色分割线只用于被明确规定的标题／主题栏与 Editor’s Picks 边界。

### 2.3 内容 taxonomy

普通文章的主题标签只能从以下六项中选择：

- China’s Economy & Business
- China’s Politics
- U.S.
- China’s Technology
- China’s Youth Sentiment
- China’s Worldview

Video Archive 的 channel 是独立分类系统，不得被六项文章 taxonomy 重写。视频语境中的节目名 “Thinkers Forum” 保留；其他普通内容语境使用 “Opinion”。

### 2.4 布局护栏

- 正常内容必须参加 Grid、Flex 或文档流；不得用负边距、位移或绝对定位拼接普通内容。
- 图片、标题、标签、lede、按钮、圆点、评论元数据之间不得堆叠。
- 可允许绝对／固定定位的范围仅限：媒体蒙版、图标、弹窗、全屏菜单、粘性导航和明确的覆盖层。
- Grid 子项必须允许收缩：轨道优先使用 `minmax(0, 1fr)`，文字容器使用 `min-width: 0`。
- 所有媒体框必须声明稳定的 `aspect-ratio`；图片使用 `width:100%`、`height:100%`、`object-fit:cover`，正文图片例外使用 `height:auto`。
- 响应式布局以内容是否还能维持既定卡片宽度和不重叠为阈值，不为填满一行而把孤立卡片放大。

## 3. 页面母版

| 母版 | 页面／body class | 固定结构 | 主要共享实现 |
| --- | --- | --- | --- |
| 出版首页 | `.master-home` | 主推荐画廊；Continue Exploring；Most-read；Trending／Opinion／Premium／Video | `css/masters.css`、`js/site.js` |
| Premium Member | `.master-member` | 会员权益主卡；Intelligence／Courses／Talks 非推荐栏目 | `css/masters.css`、`js/site.js` |
| Article Section | `.master-section` | 栏目标题；主题栏；排序；满行卡片看板；可选 Editor’s Picks；Load More | `css/masters.css`、`js/site.js` |
| Video Section | `.master-video-section` | Video channel 栏；Latest／Popular；视频卡片看板；Load More | `css/masters.css`、`js/site.js` |
| Premium Talks 列表 | `.master-premium-talks` | 无 channel 的长条 Premium 视频卡片流 | `css/masters.css`、`js/site.js` |
| 文章 | `.master-article` | 头图版／文字版／新闻版；正文；侧栏；分享；评论 | `css/masters.css`、`js/site.js` |
| 视频详情 | `.video-detail-page` | Meta；标题；视频＋侧栏；播放信息；Instructor；lede；分享；可选评论 | `css/video-details.css`、`js/video-details.js` |
| Account Utility | `.utility-settings-page`、`.utility-saved-page`、`.utility-history-page` | Settings／Saved／History；资料；安全；收藏夹；浏览记录；支持；退出 | `css/utilities.css`、`js/settings.js`、`js/account-library.js` |
| Search Utility | `.utility-search-page` | 查询；Article／Author；排序；结果；Editor’s Picks；Load More | `css/utilities.css`、`js/search.js` |
| 其他服务页面 | 页面自身 class | About、作者、贡献者等服务页面 | `css/masters.css`、`css/site.css` |

页面文件的职责目录固定为：

- `Homepage/`：首页、Premium Member。
- `Article Sections/`：Trending、Opinion、Premium Intelligence。
- `Video Sections/`：Video Archive、Premium Talks。
- `Articles/`：三类文章模板。
- `Videos/`：Video Article、Premium Talk Detail、Lesson / Course Detail。
- `About/`：About、Support、Contributors、Author、HSK、Premium Courses。
- `Utility/`：Search、Setting。
- `Beta Demo/`：隔离实验，不得反向污染正式页面。

## 4. 全站共享组件与 selector 契约

### 4.1 Header、导航与 Footer

- `.site-header`：桌面端双层导航；滚动时功能栏收回、标题栏缩小，统一由单一 `utilityHidden` 状态控制。
- Header 状态机忽略小于 `3px` 的滚动噪声；向下累计 `30px`、向上累计 `36px`，切换后锁定 `560ms` 并继续刷新基准，避免反复抽搐。
- 移动菜单覆盖整个 `100dvh`，位于页面根层；只锁定背景页面，菜单内容本身可滚动。
- 移动一级菜单行固定 `48px`；Video、Premium 和其他一级入口高度一致。
- 桌面 Video／Premium 下拉菜单在点击页面其他区域、按 Escape 或打开另一菜单时关闭。
- `.site-footer`：品牌区加图标，内容分为 About、Follow Us、More 三等距栏。账号入口使用 Roboto 且每项一行；相邻入口只保留字体自身一倍行高。
- Footer 的 Partners 在 hover / focus 时展开；当前合作伙伴为 HSK。

### 4.2 主题标签、Premium 与日期

- `.theme-tag`、`.article-tag`：浅红／红色无框可点击 taxonomy；hover / focus 时原文退出并显示 `MORE >>`，组件宽度不得因此跳动。
- 视频内容只在主题标签前显示一个红色播放符号；同一标签不得重复播放符号。
- 日期使用灰色元数据，并与主题标签同行、紧邻标签；不得伪装成主题标签或推到最右侧。
- `.premium-cover > .premium-badge`、`.premium-cover > .lock`：所有 Premium 内容封面左上角必须显示金底白字 Premium 标签。

### 4.3 Lede 与时长标签

- `.lede-row` 是 lede 的全局组件；`.lede-link` 与行末 `.read-time-pill` 指向同一内容页。
- `.read-time-pill` 必须使用 Roboto，高度与相邻 lede 字高对齐，颜色继承相邻 lede。
- hover / focus 触发范围是整个 `.lede-row`；时长标签用当前组件文字色填充背景并切换为纸色文字。
- 文案格式为 `xx min read` 或 `xx min watch`。文章阅读时长为 `ceil(英文词数 ÷ 220)`，最低 1 分钟；视频使用实际时长。
- 没有 lede 的内容不强行添加时长标签。

### 4.4 收藏组件

- `.collection-bookmark` / `#custom_collection_single` 是全局收藏入口；未收藏与已收藏使用同一 bookmark SVG 结构。
- 收藏后使用金色状态；点击打开可选择现有收藏夹或新建收藏夹的窗口。
- 文章中收藏按钮独占一行；若与 lede 同处一个组件，尺寸必须按 lede 字号计算并上下对齐。没有 lede 时使用默认尺寸。
- 视频详情的收藏按钮位于 `.video-playback-meta` 最左侧。

### 4.5 评论与登录

- `.comment-composer`、`.comment-entry`、`.comment-thread` 为文章、视频文章与 demo 共用评论语言。
- 未登录显示 `sign in to add a comment`；登录后显示默认首字母／用户图标和 `Add a comment…` 输入框。
- Reply 输入框与 Add a comment 使用相同米白背景。
- 提交回复后显示缩进的二级评论，正文前置 `@被评论者`；回复二级评论仍进入二级，不生成三级嵌套。
- 所有登录入口调用统一 `.auth-dialog`。Sign In 是视觉基准；Sign In / Sign Up tab 固定在顶部，表单在 tab 以下的可用区域内居中。
- 桌面弹窗以 Sign Up 的既定高度为统一高度；移动端弹窗组件全屏，表单仍在 tab 以下区域居中且按钮必须留在弹窗内部。
- 登录背景使用半透明藏青并模糊；窗口自身不得出现内部滚动条。

### 4.6 注册提醒

- `.signup-dialog` 与 `.signup-banner` 使用同一藏青色视觉系统并以单一组件的尺寸 morph 完成切换，不采用先消失再弹出的两阶段动画。
- 未注册时首次打开页面即展示贴底窗口；关闭后出现贴底横幅。
- 横幅高与功能栏一致，为 `36px` 加安全区；横幅使用 Roboto，按钮始终金色。
- 注册窗口保留两组完整入口：Premium Member 及其权益说明；Free Registration 及其资讯说明。
- Footer 进入视口时窗口／横幅向下收回；从 Footer 上滑离开后恢复。不得把它们并入 Footer DOM。
- 移动端全屏菜单层级高于注册窗口。

## 5. 页面级现行规则

### 5.1 Homepage 与 Premium Member

- 主推荐封面：桌面左图右文；图片和标签／标题组件均为 `1:1`，下方独立放置 `30px` lede。
- 非推荐栏目封面：桌面左文右图；文字区和图片均为 `1:1`，标签、标题、lede 作为整体垂直居中；标题与 lede 间保留一倍 lede 行距。
- `930px` 以下：封面转为上方 `16:9` 图片、下方左对齐文字。
- 封面标题自然左对齐，不做两端对齐。
- 图片本身不是链接；标题、lede、时长标签才是内容入口。
- 视频内容在首页／会员页使用 `16:9` 封面，不显示图片中央播放按钮。
- Continue Exploring 展示四门课程的等宽、同高 `16:9` 卡片；lede 为 `Presented by {作者}`，无日期和时长。
- `820px` 以下 Most-read 必须成为推荐画廊的独立第三页，不与 Continue Exploring 上下叠放或互相覆盖。
- Most-read 是内容入口，显示主题、日期，并把时长标签放在 lede 行末。
- Premium Member 的 Intelligence、Courses、Talks 复用非推荐栏目结构；视频卡片复用首页视频卡片规则。

### 5.2 Article

- 三种模板文件：`article-featured-image.html`、`article-text.html`、`article-news.html`。
- 正文图片始终彩色、与正文栏等宽、`height:auto`；图片与段落保持普通正文节奏。
- 头图版封面为页面内容宽度、`16:9`；藏青半透明蒙版内放标签、日期、标题和作者。标题最大 `80px`，按实际空间缩小；各组间距为一倍标题行距。
- 头图版 lede 与正文同字号并居中；收藏按钮居中、另起一行。
- 文字版标签和作者复用头图版共享组件；作者组件整体居中，姓名与简介左对齐。
- 正式章节 `h2` 加粗，编号小节 `h3` 使用 `400` 常规字重。
- 左栏首项是完整文章标题并返回 `#article-top`；左右栏相对正文起点下移约 `10px`。
- 正文末尾 Editor 是一行右对齐灰字；分享入口直接接在正文末尾，使用圆形平台图标且不加分割线。
- 桌面只显示正文右栏 Continue Exploring / Related Reading；移动端把同一组内容移到评论后，页面内不得重复。
- Article 右栏 Related Reading 不显示时长标签；Continue Exploring 取首页课程中的两项。
- 所有旧 `.density-feed` 内容已移除。

### 5.3 Article Section

- 栏目标题为金色斜体；标题上方 padding 保持紧凑，不显示标题右侧分割线。
- 主题栏为 `All + 六项主题`，可横向滚动；标题／主题栏下方分割线为金色。
- 选择主题后在本页用左右滑动过渡展示同主题看板，不跳转搜索页；主题子页不显示 Editor’s Picks。
- 卡片统一使用 `16:9` 图片、主题、灰色日期、标题和 lede。普通区单行最多 4 张，按 4／3／2／1 列切换。
- 每行必须由后续内容前移填满；不足满行的最后一行不放大卡片，且每张实际卡片自己绘制完整右／下边界。
- 普通卡片区与 Editor’s Picks 内部各自统一尺寸；Editor’s Picks 图片比例仍为 `16:9`，每条必须有 lede。
- Editor’s Picks 只在 Trending / Opinion 的 All 看板出现，外框金色 `2px`；内部按 1／2／4 列响应式排列，标题可在上方或左侧。
- `Sort by · Latest / Popular` 只在当前看板内排序；Load More 后仍需保持满行。

### 5.4 Video Section 与 Premium Talks

- Video Archive 的分类栏为 `All + 各 Video channel`；每个 channel 内提供 Latest / Popular。
- Video 看板复用 Article Section 卡片尺寸与末行闭合规则，但没有 Editor’s Picks，内容分割线使用普通 `--line`，不得使用金线。
- Premium 视频封面始终带金底白字 Premium 标签。
- Premium Talks 列表没有栏目栏，使用长条卡片：左侧 `16:9` 封面，右侧主题、标题、`作者：lede` 和时长。

### 5.5 Video Detail

- `.video-detail-hero .article-meta-line`：一个视频播放主题符号、主题标签、相邻日期。
- `.video-detail-title`：固定 `50px/1.2`，允许多行；不再强制一行或动态缩至 `30px`。
- `.video-detail-shell`：桌面为左侧视频、右侧同高 sidebar；sidebar 内容过多时内部滚动。Course 顺序是 Course Plan → Related。
- 每条 Related 必须有 `16:9` 封面、主题标签、标题和简短 lede；`.video-side-section` 内不显示 `.read-time-pill`。
- `.video-playback-meta` 左对齐，顺序为收藏 · 播放量 · 集数／上传数（如有）。
- `.video-instructor` 只用于 Course / Talks；`.video-instructor` 与 `.video-lede` 顶部均无 border，且不显示 “Introduction” 标题。
- 播放栏之后的播放信息、Instructor、lede、分享和评论按整个“视频＋sidebar”宽度对齐，而不是只对齐主视频。
- Course Plan 不显示旧金色进度 span 和 lesson-complete 按钮。每个 `li` 通过从左到右的背景填充表示由最长播放位置决定的进度：未完成余量为灰色，完全完成为金色。
- 相邻 `.video-side-section` 之间不得出现金色顶部边框。
- 移动端 Introduction 内容顺序：Instructor（如有）→ Lede → Share → Course Plan（仅 Course）→ Related。只有 Video Article 显示 Introduction / Comments 双标签。

### 5.6 Utility：Settings、Saved、History 与 Search

- Utility 不是单一母版：`.utility-settings-page`、`.utility-saved-page`、`.utility-history-page` 组成 Account Utility；`.utility-search-page` 是内容发现页面。它们只共享 `.utility-shell`、`.utility-mast`、`.account-destinations` 和全站 tokens。
- 四页主标题统一使用金色斜体 `h1.section-title`，不增加 kicker 或解释性副标题。
- Settings 顶层入口固定为 Settings／Saved／History；内部入口固定为 Personal Information／Account Security／Help and support。
- Personal Information 保留真正的 Profile photo 上传、Username、Country / Region、只读 Email 和 Sign Out。顶部冗余身份摘要和 `.settings-panel-heading` 不属于现行结构；Premium 账户在 Profile 面板左上角显示金底白字 Premium 标签，当前演示默认为 Premium。
- Username 与 Country / Region 各自使用字段右上方的小号灰色 `EDIT`；编辑后原位置切换为 `SAVE · CANCEL`，不得改变字段行高或推动相邻内容。
- Settings 与 Search 的文字输入采用无封闭框的底线样式；原背景状态保持不变，focus 时底线变金色。Account Security 保留 Old Password／New Password／Confirm Password、显示隐藏、Edit／Save／Cancel；Show／Hide 位于输入框右上方，字段为空或未进入编辑状态时禁用。
- Settings 桌面为较窄的左侧内部导航＋右侧任务面板；`900px` 以下变为单列并把内部导航转为横向可滚动入口，同时缩小 workbench 顶部留白且不显示底部 border。Sign Out 区域不显示顶部 border。
- Saved 桌面为左侧收藏夹分组与右侧内容列表；收藏夹支持 Create／Rename／Delete，内容支持 Select all／Unfavorite／Move to／Copy to。移动端收藏夹进入内容上方的横向入口，批量工具栏自然换行。
- History 使用 All／Article／Video 二级标签、紧凑记录列表、单条 Delete 与当前筛选范围内的 Delete all；二级回复式层级和大型媒体卡不适用于浏览记录。
- Search 从 `?s=` 或 `?tag=` 读取查询词；保留结果数量、Article／Author tabs 和 Load More。
- Latest／Popular 只排序 Article 主结果；Author 不显示排序器。切换 Author 后再返回 Article 时保留排序状态。
- Search 主结果复用标准 `16:9` section card、六项 taxonomy、灰色日期、标题、lede、行末时长和 Premium 状态。结果图片不可点击。
- Author 使用人物结果行：圆形头像、姓名、职务简介和作者页入口；当前演示样例为 Zhang Weiwei。
- Search 按钮是带可访问名称的搜索 SVG 图标；标题不显示 “The Archive”。
- Editor’s Picks 是不随 tab、排序或 Load More 变化的固定四项右栏，复用 Video Detail Related 的 `16:9` 封面、主题、日期、标题和短 lede，背景与页面一致。桌面 rail 依据实时 Header 高度粘在导航栏下方，占满剩余视口并允许自身纵向滚动。
- `900px` 以下 Editor’s Picks 按 DOM 顺序移动到主结果和 Load More 之后，取消 sticky、固定高度和内部滚动；`601–900px` 为两列，`600px` 以下为单列，并使用 Trending 卡片看板的逐卡完整分割线。

## 6. 不用浏览器模拟的非重叠检查

结构性修改完成后，至少执行下列静态检查。它们用于发现结构性风险，不声称替代真实视觉验收。

1. **断点覆盖表**：列出目标组件在断点两侧的轨道数量、排列顺序、媒体比例和可见状态；至少检查 `930/929`、`900/899`、`821/820`、`601/600` 两侧。
2. **尺寸约束检查**：确认每个 Grid／Flex 子项有可收缩条件，媒体有比例，长标题／metadata 有换行或截断策略，组件总最小宽度不超过父容器可用宽度。
3. **定位扫描**：在本轮文件中扫描负 margin、`transform: translate*`、`position:absolute`、`position:fixed`。逐项确认只属于本文件第 2.4 节的允许范围。
4. **边界绘制检查**：网格末行必须由实际卡片绘制完整边界，不依赖不存在的空轨道或 `:nth-child` 假设。
5. **DOM 顺序检查**：移动端不得依赖视觉位移制造与 DOM 不同的阅读顺序；交互组件的 `id` 唯一，链接目标存在。
6. **语法检查**：验证 JavaScript 语法、CSS 大括号配对、HTML 本地引用和重复 ID。
7. **交付矩阵**：逐条将“不可变约束 + 本轮变量 + 明确删除项”标为已实现、无需实现或未完成；有未完成项不得宣称完成。

## 7. 文件责任与复用原则

- `css/tokens.css`：颜色、字体、间距、最大宽度等 tokens。
- `css/site.css`：Header、导航、Footer、注册提醒、登录弹窗等全站 chrome。
- `css/masters.css`：页面母版和跨页面内容组件。
- `css/video-details.css`：三类 Video Detail 共享结构。
- `css/utilities.css`：Settings 与 Search 两类 Utility 母版及其共享外壳。
- `js/site.js`：导航、taxonomy、登录、注册提醒及通用交互。
- `js/video-details.js`：Video Detail tabs、课纲进度等详情交互。
- `js/settings.js`：资料字段编辑、头像预览、安全切换和演示退出。
- `js/account-library.js`：Saved 收藏夹／批量操作与 History 筛选／删除。
- `js/search.js`：搜索 tabs、Article 排序、Load More、查询状态和结果渲染。
- 页面 HTML 只承载内容与语义结构；已有共享 selector 能表达需求时，不新增同义 selector。
- 全局规则只在共享层修改；页面例外必须以页面根 class 限定作用域，并在本文件记录原因。
