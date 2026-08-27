# 开发进度与交接清单

更新日期：2026-08-27

## 已完成：结构与共享母版

- [x] 建立并持续维护 `README.md`、`REDESIGN.md`、`MAP.md`、`TODO.md`；21 个源站网址均已有对应静态设计文件和 WordPress 实现建议。
- [x] 按内容职责重整 21 个页面：Video 列表／Premium Talks 进入 `Video Sections`，Trending／Opinion／Premium Intelligence 进入 `Article Sections`，视频文章／Talk 详情／课程详情进入 `Videos`，Courses／HSK 进入 `About`，Premium Member 进入 `Homepage`；旧的 `Sections`、`Premium`、`Courses` 空目录已移除。
- [x] 抽离 `tokens.css`、`site.css`、`masters.css` 和 `site.js`；全局规则进入共享层，单页只保留内容结构。
- [x] 建立出版首页、会员聚合、栏目/列表、文章/详情、服务/账户五类实际母版，并在 `MAP.md` 用 Mermaid 记录继承关系。
- [x] 图片继续使用源站 URL；资产目录只保留字体。EB Garamond、Libre Baskerville 和 Roboto 均已本地加载并记录来源。
- [x] 完成桌面双层导航、移动端全屏覆盖菜单、Video/Premium 二级菜单、演示登录、搜索展开和注册弹窗。
- [x] 观点、科技、视频和 Premium Talk 文章的主题标签可进入标签搜索；观点与科技文章已载入源站正文、作者、正文图片/图注和相关推荐。
- [x] 文章母版中的正文图片按固有宽度渲染：不足正文栏一半时提升到 `50%`，介于一半与整栏之间时保留固有宽度，超出正文栏时限制到 `100%`，并始终使用 `height:auto`；桌面文章封面与标题顶部对齐。

## 已完成：2026-08-21 首页与全局 UI

- [x] **Homepage 已完成当前轮全部修改，现作为 Premium Member 与后续页面优化的视觉基线。** 后续变更必须先更新不可变约束与验收矩阵，不再顺带改动已经确认的首页区域。
- [x] 全站内容最大宽度改为 `1600px`；无衬线字体统一为本地 Roboto 可变字体，移除生产样式中的 Helvetica Neue/Inter 依赖。
- [x] 统一排版禁区：所有渲染文字行高只能在 `1.2–1.5`；取消统一段间距下限。
- [x] 主题标签统一为红色可点击 taxonomy 链接，悬浮时渐变切换为 `MORE >>`；普通文章日期独立使用灰色元数据样式。
- [x] 删除首页所有圆形箭头和说明文字；全局 `.lede-row` 将可点击的 `xx min read/watch` 方框内联在导语行末，方框与 lede 指向同一内容页，高为一字高、内部字号为 lede 的一半；悬浮整个 lede（包括方框）时，以该 lede／标签当前文字色填充方框背景并切换为纸色文字。
- [x] 阅读时长继续按 `ceil(英文词数 ÷ 220)` 计算，最低 1 分钟，全站时长标签显示为 `xx min read`。
- [x] 首页所有封面图和普通文章图均改为不可点击容器；文章只可通过标题或 lede 进入，标题悬浮显示下划线。
- [x] 首页封面视频与普通视频卡片中的播放按钮已全部删除；视频内容仍通过栏目标签、标题、lede 和 `xx min watch` 识别，实际视频详情页的播放器入口不受影响。
- [x] 桌面主推荐使用左侧 `1:1` 图片、右侧亮米白 `1:1` 标签/标题组件；标签贴顶、标题贴底并动态缩放，最大 `80px`；主推荐 lede 放在双栏下方并固定为 `30px`。
- [x] 桌面非推荐栏目封面使用左侧 `1:1` 文字区、右侧 `1:1` 图片；主题标签、标题和默认 `20px` lede 连续排布并作为整体垂直居中，标题与 lede 之间保留一倍 lede 行距。发生溢出时先缩小 lede、再缩小标题，避免堆叠。
- [x] `930px` 以下封面统一切换为上方 `16:9` 图片、下方左对齐文字；不使用绝对定位或负边距拼接内容
- [x] 按最终反馈撤销首页与 Premium Member 封面标题的两端对齐，恢复自然左对齐。
- [x] 栏目普通文章宽度改为旧宽度的 `4/5`（桌面上限约 `328px`），Trending、Opinion、Premium、Video 每个画廊均扩充为 5 篇演示文章。
- [x] 移动端菜单固定覆盖完整视口并锁定背景滚动；品牌与关闭按钮保持在顶部，菜单内容独立滚动。Home、Trending、Opinion、Video、Premium、Not Just Travel 及功能入口一级行统一为 `48px`，支持链接／`Escape`／桌面断点关闭与键盘焦点循环。
- [x] 推荐看板拆页阈值最终提升到 `820px`：`821px` 以上 Continue Exploring／Most-read 左右并置，`820px` 以下把 Most-read 移为第三张横向画廊页，覆盖 `690–778px` 的 iPad／宽移动窗口，禁止两栏互相覆盖。四张课程卡使用 `minmax(0,1fr)` 等宽网格和硬性 `16:9` 媒体框，标题最多两行、导语最多一行。
- [x] Selected Reading 已改为 Continue Exploring，并从源站课程页载入 Yin Zhiguang、Fan Yongpeng、Zhang Weiwei、Christopher Kutarna 四门课程的 `16:9` 远程封面、标题和 lede；课程卡不显示日期或阅读时长，但会按内容自动选择主题。主推荐补回日期；Most-read 每条自动选择主题并显示日期，时长从顶部移到 lede 行末且可点击。
- [x] Continue Exploring 与 Most-read 栏头不使用主题标签；大画廊与小画廊继续按溢出情况显示居中圆点。
- [x] 全站主题 taxonomy 收束为六项：`China’s Economy & Business`、`China’s Politics`、`U.S.`、`China’s Technology`、`China’s Youth Sentiment`、`China’s Worldview`。共享 `site.js` 统一归并旧标签、重写搜索参数，并把 Article Section 主题栏重构为 `ALL + 六项主题`。
- [x] 删除已被推翻的“圆形箭头导航”“阅读时长置于按钮下方”“封面导语按标题字号 60%→50% 贴底”“手机把推荐看板上下堆叠”等旧设计说明。

## 已完成：Premium Member

- [x] 重新抓取 `premium-member/`，以源页的 `PREMIUM MEMBER`、`$10 MONTHLY`、会员权益说明与 `BECOME A MEMBER` 为内容锚点，删除旧版 Free／$12／Team 三档虚构定价。
- [x] 将会员主张放入亮米白色区块，并在桌面与移动端使用不重叠的响应式网格。
- [x] Intelligence、Courses、Talks 均改为首页“非推荐栏目”语言：每栏一篇左文右图封面文章，主题标签、标题和 lede 连续居中排布，后接三张 `16:9` 普通卡片；不使用异色栏目背景。
- [x] 载入源页展示的 4 条 Intelligence、4 门 Courses、4 条 Talks 的真实标题、摘要方向和目标链接；课程封面使用对应源站图片，所有图片继续远程加载且不作为阅读入口。

## 每次 UI 修改后的强制复核

- [ ] 检查所有目标断点，确认图片、标题、标签、lede、时长和分页圆点没有堆叠或相互覆盖。
- [x] 本轮按快速静态方式复核 `1600／900／690／390px` 的断点条件：Homepage 在 `690px` 已进入三屏结构；Video 为四／二／二／一列；Premium Talks 在窄屏回落为单列。新增布局均使用正常 Grid 流，不以负边距或绝对定位拼接正文。
- [x] 本轮已扫描生产 CSS：显式行高没有超出 `1.2–1.5`，共享母版保留最终护栏。
- [x] 本轮已做结构检查：首页图片没有被 `<a>` 包裹，标题与 lede 使用独立链接。
- [ ] 检查 `MORE >>` 不改变主题标签组件宽度，并确认日期始终保持灰色。
- [ ] 检查有横向溢出的画廊才显示圆点；在 `820px` 两侧确认推荐画廊为两屏/三屏且没有高度突变。
- [x] 本轮已同步更新 `MAP.md`、`REDESIGN.md` 和本文件，并删除被新决定推翻的规则。
- [x] 本轮结构复核：有效 HTML 为 21 个，`MAP.md` 页面行也是 21 条；本地链接缺失为 0，旧目录路径引用为 0，`site.js` 语法及三份 CSS 大括号均通过检查。
- [x] 本轮 Premium Member 禁区复核：会员主张与卡片只用正常 Grid 流和明确断点，不使用负边距或绝对定位拼接正文；新增文字行高均处于 `1.2–1.5`，10 个远程图片 URL 均返回 HTTP 200。
- [x] 本轮封面文字组复核：共享 `.home-feature` 在桌面使用正常 Flex 流垂直居中，标题下边距和 lede 上边距均为 `0`；移动端恢复顶部顺序流，不使用负边距或定位叠放。
- [x] 本轮 Premium Member 结构复核：3 个栏目各包含 1 篇非推荐封面文章和 3 张普通卡片，共保留 12 条源内容；3 个封面 lede 均接入 `xx min read` 标签。
- [x] 推荐栏 Most-read 整栏高度改为跟随第一张封面文章／推荐画廊高度，栏头保持可见，文章列表填充剩余高度并独立纵向滚动。
- [x] 首页及 Premium Member 的非推荐封面统一把标题—lede 间距改为一倍 lede 行距；删除 Premium Member 底部的 “Intelligence for the present…” 总结和重复 `Become a member` CTA 及其废弃样式。
- [x] Premium Member 主会员按钮改为蓝底白字；悬浮与键盘聚焦状态统一切换为金底白字，并同步边框颜色。
- [x] Premium Member 权益说明移除 `25ch` 宽度上限，改为拉伸占满右侧文字列，使文字排版延伸到卡片右内边距。

## 已完成：文章母版与文章内交互（2026-08-24）

- [x] 文章桌面／移动断点统一为 `900px`。两个关键文章文件分别展示头图版（`Articles/article-featured-image.html`）和文字版（`Articles/article-text.html`）；另增 `Articles/article-news.html` 作为新闻模板演示，因此不改变原 21 个关键网址的映射口径。
- [x] 头图版固定为页面内容宽度和 `16:9`；藏青半透明蒙版始终覆盖浅红色无框主题标签、日期、同宽标题和作者区。标题从最大 `80px` 开始按实际换行与剩余高度逐级缩小，标签—标题、标题—作者的间距同步固定为一倍标题行距。作者可排一至两行，头像、姓名和最多两行简介始终呈现；图下 lede 与正文同字号、同宽。
- [x] 文字版把标签／日期、标题、作者和 lede 居中，并以文字基线对齐主题标签与日期；新闻版参考 Chang’e-6 简报，以日期和标题居中的轻标题区进入新闻正文。
- [x] 非新闻正文保留中间阅读栏；左侧目录用红色标出当前章节，右侧拆为 Continue Exploring 与 Related Reading，每条推荐增加一行小导语，两侧均设置视口内独立滚动。正文末尾 Editor 精简为右对齐的一行灰色小字。
- [x] 新闻版保留左侧简报目录和右侧推荐，移动端把新闻目录变为横向可滚动入口。
- [x] 分享入口直接接在文末，不使用分割线；X、Facebook、LinkedIn、Reddit、Email 改为圆形图标。Comments 标题缩小，保留 Latest／Popular、顶、踩和回复。
- [x] 作者悬浮改为头像增加半透明藏青蒙版、姓名出现下划线；Contact the Author 弹窗使用藏青色，Learn more 接在作者简介段末，Email／Message 使用深藏青搜索框式输入。`×`、背景点击和 Escape 均不受必填验证影响；输入草稿自动写入 30 天 cookie，并为本地文件演示保留浏览器存储回退。
- [x] 桌面端只使用正文右栏的 Continue Exploring／Related Reading，删除评论后的旧 Related Reading 与自动追加内容流；`900px` 以下把同一组推荐从评论前移动到评论后，页面中始终只有一组推荐。
- [x] `900px` 以下评论／分享区取消 `.shell` 的二次内边距，宽度与正文统一为“视口减去左右各一个全局 gutter”。
- [x] 文章正文图片统一保留原始彩色，不再使用灰度滤镜；图片与普通段落维持正文的 `1.15em` 节奏。正式大章节 `h2` 使用粗体，标题最大文本宽度由 `19ch` 提升一半至 `28.5ch`，并在原段落间距之外增加一倍章节标题行距；“1. Purchased…”／“2. Replaced…”一类编号小节 `h3` 使用 `400` 常规字重。Newsletter 条目标题使用高优先级例外，避免被章节间距撑开。
- [x] 三种文章模板共用同一个首字下沉规则：优先使用 `initial-letter: 3 3` 让首字占三行并与右侧首段自动对齐，回退字号为 `3.65em`，行高仍遵守 `1.2` 禁区；分享区与正文之间的布局留白由 `110px` 减半为 `55px`。
- [x] 三种文章左栏第一项统一为当前文章完整标题，并链接至 `#article-top` 返回标题区；新闻版日期改为灰色，三则新闻标题上下节奏统一，第一则 Chang’e-6 新闻补回完整标题。
- [x] 主题标签和作者均回收到共享母版：文字版 `.article-tag` 与首页 `.theme-tag` 共用无框红字及 `MORE >>` 动效；文字版作者卡整体保持居中，但头像、姓名和简介复用头图版交互，姓名与简介在卡内左对齐。
- [x] 本轮文章模板复核：活动目录中的旧模板文件名／引用为 0，三种模板统一命名为 `article-featured-image.html`、`article-news.html`、`article-text.html`；文章 lede 的时长标签重新服从全局悬浮填充规则。`site.js` 语法、三份 CSS 大括号、25 份当前演示 HTML 的本地引用和重复 ID 均通过静态检查。

## 已完成：Article Section 母版（2026-08-24）

- [x] 新建真实 `.master-section` 共享母版并用于 Trending、Opinion、Premium Intelligence；旧的各自独立 Hero／Feature Grid／Card Grid 结构已被统一替换。
- [x] 栏目标题使用金色斜体，删除标题右侧分割线并把标题上方留白压缩到 `20–38px`（移动端 `18px`）；下方主题条从 `LATEST` 开始排列所有栏目主题，使用单行横向滚动，并以底部分割线结束标题栏。
- [x] 看板栏统一使用卡片：`16:9` 图片、可点击主题标签、灰色日期、标题和共享 `.lede-row`；所有 lede 恢复行末 `xx min read/watch` 标签。桌面最多四列，并按四／三／二／一列断点动态填满每行；卡片之间只有简洁分割线，首行顶部保留看板边界。
- [x] Trending 与 Opinion 在 All 的首个满行之后插入完整米白色 `Editor's Picks` 卡片看板；每条推荐均增加 `16:9` 图片，Opinion 的条目与 China–Japan 主题参考源站 Thinkers Forum 当前内容。
- [x] 三个栏目页均加入 `LOAD MORE`，点击后展开第三批卡片并隐藏按钮；Article Section 不再被全局脚本追加旧的 “Continue exploring” 密度区。
- [x] 三个 Article Section 的首项由 `Latest` 改为 `All`，并复用 Video Section 的 `Sort by · Latest／Popular` 控件；排序在当前主题看板内生效，All 状态继续保留 Editor's Picks 和满行加载规则。

## 已完成：Video Section 与 Premium Talks（2026-08-27）

- [x] 重新读取源站 Video Archive，使用 `All`、China Currents、China Now、Global Arena、Speak Softly、Thinkers Forum、Threshold、Overlap、TOP PICKS、Roughly Chinese、China On the Ground、The Unfiltered 作为独立视频栏目；不再复用文章的六项主题栏。
- [x] `Video Sections/video.html` 继承 Article Section 的四／三／二／一列分割线看板、`16:9` 卡片、共享主题标签、lede 与 `xx min watch`，但明确移除 Editor's Picks；默认两行且 `LOAD MORE` 后继续保持满行。只有标题栏主题轨道保留金色线，内容看板分割线恢复为全局 `--line`。
- [x] 每个 Video 栏目状态均显示 `Latest`／`Popular` 排序控件；导航和栏目链接统一写入 `?channel=栏目名`，页面读取该字段后激活对应栏目，并在本页以横向过渡更新看板。
- [x] `Video Sections/premium-talks.html` 删除栏目条和旧主视频／三卡片混排，改为逐行长条卡片：左侧 `16:9` Premium 封面，右侧主题、标题、lede 与观看时长；嘉宾改为 lede 开头的 EB Garamond 粗体姓名加冒号。删除价格／Member access、介绍段、会员 CTA，以及该页自动追加的 Continue Exploring 密度区；全部封面继续使用金底白字 Premium 标记。
- [x] `600px` 以下 Footer 增加包含安全区的末端滚动余量，并解除窄屏根页面的固定高度约束，避免约 `440×956` 时注册横幅截住 Footer 最后一行。
- [x] 桌面导航的 Video／Premium 标题本身分别链接 Video Archive／Premium Member；Video 下拉每项连接到同一个 Video 页面及对应 `channel` 字段。移动全屏菜单把标题链接和展开按钮拆开，仍保持一级行高 `48px`。
- [x] 共享逻辑已隔离文章 taxonomy 和 Video channel：文章 Section 继续使用六项内容主题，Video 不会被全局脚本重写为文章主题栏；两类页面继续共用卡片和 lede 组件。

## 已完成：Homepage 与全局交互（2026-08-24）

- [x] 首页凡是视频内容，封面文章和普通文章图片均固定为 `16:9`；显式覆盖 `.image-frame`／`.story-cover` 遗留的 `height:100%`，避免封面被重新撑成方形。按最终决定删除首页全部播放三角及其专属定位、尺寸和悬浮样式。
- [x] 视频内容不再在图片中央显示播放控件；改为在红色主题标签前放置一个小型红色播放三角，并以 `18px` 左侧标签空间保持图标与文字间距。首页 Video、Premium Talks、视频列表／详情及 Article Section 中标记为视频的卡片共用该规则。
- [x] 全站非视频语境中的 “Opinion” 已替代旧 “Thinkers Forum” 标签；源网址与现有文件路径继续保持 `thinkersforum`／`thinkers-forum.html`，VIDEO 下拉菜单、Video 列表标签和首页 Video 栏目中的同名节目仍保留 “Thinkers Forum”。
- [x] 视频 lede 时长使用显式视频分钟数并显示为 `xx min watch`；文章仍显示 `xx min read`。
- [x] 功能栏搜索恢复普通浅色，只有 Sign In 使用金色；演示登录同时开启注册状态并停止注册提醒。
- [x] 保留功能栏收回与标题栏／品牌缩小动效，并让两者只受同一个 `utilityHidden` 状态控制；状态机继续忽略小于 `3px` 的噪声、向下累计 `30px`／向上累计 `36px`、切换后锁定 `560ms`。Header 增加 `overflow-anchor:none`，锁定期仍持续刷新滚动基准，避免动画造成的高度变化被误判成用户反向滚动，消除功能栏反复跳出／收回。
- [x] 桌面和移动导航中的 HSK 入口替换为外链 Not Just Travel；HSK 页面文件仍保留在 `About/hsk.html`，供课程落地页和 WordPress 映射使用。
- [x] 首页未注册状态不再等待或读取“已看过提醒”标记：页面打开即弹出贴底窗口；关闭后才以向上滑入和淡入动效显示与功能栏同为 `36px` 的贴底横幅。窗口、横幅、功能栏和 Footer 均使用 `--ink`，横幅 `Follow along` 为 `20px`，其中 “The China Academy” 明确继承同一字号。
- [x] 注册窗口保留以下不可缩写的两组按钮内容：`Premium Member` — “Gain access to exclusive courses, interviews, and reports on the pivotal driving forces behind China’s evolution.”；`Free Registration` — “Stay Updated with On-the-Ground Information, Discussions, and Expert Analysis on All Things China and China-Related.”。链接分别固定到 `Homepage/premium-member.html` 与 `Utility/setting.html?mode=register`。
- [x] 注册窗口桌面端两个按钮共享同一 Grid 行并拉伸到等高，移动端使用两个等分 `1fr` 行；说明正文改为正体。三列布局的理论最小临界点约为 `847px`，因此在 `601–860px` 保护区内隐藏 “Follow along…” 文本、只保留两个等宽入口，并在右侧预留 `42px` 给关闭按钮，防止按钮覆盖与窗口内容截断。窗口标题中的 “The China Academy” 禁止内部换行；贴底横幅的说明、品牌和按钮统一使用本地 Roboto，品牌与周围文字同字号。
- [x] 推翻“并入 Footer”：贴底窗口和横幅不再迁移 DOM。Footer 进入视口时，两者以 `translateY(100%+)` 向下收回并禁用交互；从 Footer 上滑离开后，当前显示状态沿同一路径重新弹出。
- [x] 主推荐画廊保持 10 秒自动轮播；控制器删除字符字形与圆形背景，使用 `::before` 绘制居中的 CSS 双竖线／三角形，并在与导航圆点相同的 `10px × 10px` 行盒中以绝对定位对齐；四周 margin 明确归零，当前页圆点继续显示扇形计时进度。
- [x] 桌面 Video／Premium 下拉菜单支持点击页面其他区域关闭；打开一个下拉菜单时同步关闭另一个，并更新 `aria-expanded`。
- [x] 所有当前页面的 viewport 启用 `viewport-fit=cover`；iPhone 刘海／安全区默认跟随白色 Header，打开移动全屏菜单时由共享脚本同步切换为藏青色。
- [x] 全站 Footer 删除 “A fuller view…” 宣传句，品牌区加入源站官方图标；内容重组为 About、Follow Us、More 三栏。Contact Us 使用 `mailto:hello@thechinaacademy.org`；YouTube／Twitter／TikTok 平台名与 About Us 共用 `1rem` 衬线字体，各账号使用 Roboto、严格一行一个，首个账号与平台名按基线对齐；所有入口列表取消额外行间 `gap`，相邻入口只保留字体自身的一倍行高。More 下收纳 Terms of Use、Privacy Policy、Cookie Policy。
- [x] 首页所有可见 “The China Academy” 品牌文字统一使用 Libre Baskerville。
- [x] 移动全屏菜单从带滤镜的粘性 Header 内移到页面根层，使用独立 `100dvh` 滚动容器；打开时固定顶部导航并仅锁定背景页面，修复菜单消失和无法滑动。

## 其他视觉微调

- 推荐栏元素统一化

- [x] 全站 lede 时长标签保持在行末，并可作为同一篇内容的入口。

- 文章标题排版
- 视频lede调整
- 设计要怎么风格化？（像newyoker那样）

## 已完成：Beta Demo

- [x] 新增 `Beta Demo/homepage.html`，隔离展示桌面端非视频封面模块 `4:3` 与普通文章画廊两行排列；视频封面仍强制 `16:9`。普通卡片宽度由 `328px` 缩至 `246px`（缩小四分之一），正式首页不受影响。
- [x] 新增 `Beta Demo/discussions-across-platforms-demo.html`：在完整文章 mock 后依次放置 Version B 的 Discussions Across Platforms 与本站 Comments。两区共用标题、说明、头像／平台图标、身份／状态和 divider comment stream；外部区含 X、Wave Media、TF、Guan Video 四条精选讨论及 LinkedIn／Reddit／Facebook 紧凑入口，不使用卡片、第三方 embed 或额外 CTA。
- [x] Homepage 的 `820px` 以下课程看板使用两条完全相同的固定轨道，并由共享脚本按容器实测宽度向下取整，同步写入所有卡片的像素宽度和 `16:9` 像素高度；针对 `440×956` 消除内容最小宽度、Grid 余数或单卡旧尺寸使 China 101 与前三张不同步的问题。

## 工作交接

- [ ] 出一个“给编导的**网站使用指南**”，介绍不同文章格式，上传文章的注意事项，网站结构等等。
- [ ] 完善视频、课程和作者的**站内搜索**，并确认 Contributor Profile 与 WordPress Author Archive 是否继续作为两个内容模型。

## 注意事项

- 每轮先写一页“不可变约束 + 本轮变量 + 明确删除项”，确认后再改代码；同一组件一次只保留一个有效版本。
- 建立组件验收矩阵：主封面、栏目封面、普通卡片、主题标签、lede、导航、画廊分别记录 desktop/tablet/mobile 的结构、字号范围、比例和交互。
- 以 `1600×1000`、`949×849`、`581×900`、`580×900`、`390×844` 作为固定验收视口；每轮只比较目标组件，不顺带重排未授权区域。
- 把“禁止堆叠、行高 1.2–1.5、图片不可点击”等规则做成自动静态检查；视觉确认后再把任务标为完成。

## 后续工作计划

Workflow: 排版   $$\rightarrow   $$ 美编   $$\rightarrow$$ 动态化   $$\rightarrow $$ 最终敲定

静态网站排版

- [ ] Video Sections(premium-talks.html、video.html) : 本周四
- [ ] Videos(lesson.html、premium-talk-detail.html、video-article.html): 周五
- [ ] About(about.html、author.html、contributor-detail.html、contributors.html、hsk.html、premium-courses.html、support.html) : 下周一、周二、周三
- [ ] Utility(search.html、setting.html): 下周四

网站测试：

- [ ] Video Sections: 下周一
- [ ] Videos: 下周二
- [ ] About: 下周三、下周四
- [ ] Utility: 下周五
