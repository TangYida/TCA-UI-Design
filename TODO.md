# 开发进度与交接清单

更新日期：2026-08-24

## 已完成：结构与共享母版

- [x] 建立并持续维护 `README.md`、`REDESIGN.md`、`MAP.md`、`TODO.md`；21 个源站网址均已有对应静态设计文件和 WordPress 实现建议。
- [x] 按内容职责重整 21 个页面：Video 列表／Premium Talks 进入 `Video Sections`，Trending／Opinion／Premium Intelligence 进入 `Article Sections`，视频文章／Talk 详情／课程详情进入 `Videos`，Courses／HSK 进入 `About`，Premium Member 进入 `Homepage`；旧的 `Sections`、`Premium`、`Courses` 空目录已移除。
- [x] 抽离 `tokens.css`、`site.css`、`masters.css` 和 `site.js`；全局规则进入共享层，单页只保留内容结构。
- [x] 建立出版首页、会员聚合、栏目/列表、文章/详情、服务/账户五类实际母版，并在 `MAP.md` 用 Mermaid 记录继承关系。
- [x] 图片继续使用源站 URL；资产目录只保留字体。EB Garamond、Libre Baskerville 和 Roboto 均已本地加载并记录来源。
- [x] 完成桌面双层导航、移动端全屏覆盖菜单、Video/Premium 二级菜单、演示登录、搜索展开和注册弹窗。
- [x] 观点、科技、视频和 Premium Talk 文章的主题标签可进入标签搜索；观点与科技文章已载入源站正文、作者、正文图片/图注和相关推荐。
- [x] 文章母版中的正文图片与正文栏同宽、`height:auto`；桌面文章封面与标题顶部对齐。

## 已完成：2026-08-21 首页与全局 UI

- [x] **Homepage 已完成当前轮全部修改，现作为 Premium Member 与后续页面优化的视觉基线。** 后续变更必须先更新不可变约束与验收矩阵，不再顺带改动已经确认的首页区域。
- [x] 全站内容最大宽度改为 `1600px`；无衬线字体统一为本地 Roboto 可变字体，移除生产样式中的 Helvetica Neue/Inter 依赖。
- [x] 统一排版禁区：所有渲染文字行高只能在 `1.2–1.5`；取消统一段间距下限。
- [x] 主题标签统一为红色可点击 taxonomy 链接，悬浮时渐变切换为 `MORE >>`；普通文章日期独立使用灰色元数据样式。
- [x] 删除首页所有圆形箭头和说明文字；全局 `.lede-row` 将 `xx min read` 方框内联在导语行末，方框高为一字高、内部字号为 lede 的一半；悬浮整个 lede（包括方框）时交换时长标签的背景色与文字色。
- [x] 阅读时长继续按 `ceil(英文词数 ÷ 220)` 计算，最低 1 分钟，全站时长标签显示为 `xx min read`。
- [x] 首页所有封面图和普通文章图均改为不可点击容器；文章只可通过标题或 lede 进入，标题悬浮显示下划线。
- [x] 首页封面视频与普通视频卡片中的播放按钮已全部删除；视频内容仍通过栏目标签、标题、lede 和 `xx min watch` 识别，实际视频详情页的播放器入口不受影响。
- [x] 桌面主推荐使用左侧 `1:1` 图片、右侧亮米白 `1:1` 标签/标题组件；标签贴顶、标题贴底并动态缩放，最大 `80px`；主推荐 lede 放在双栏下方并固定为 `30px`。
- [x] 桌面非推荐栏目封面使用左侧 `1:1` 文字区、右侧 `1:1` 图片；主题标签、标题和默认 `20px` lede 连续排布并作为整体垂直居中，标题与 lede 之间保留一倍 lede 行距。发生溢出时先缩小 lede、再缩小标题，避免堆叠。
- [x] `930px` 以下封面统一切换为上方 `16:9` 图片、下方左对齐文字；不使用绝对定位或负边距拼接内容
- [x] 栏目普通文章宽度改为旧宽度的 `4/5`（桌面上限约 `328px`），Trending、Opinion、Premium、Video 每个画廊均扩充为 5 篇演示文章。
- [x] 移动端菜单固定覆盖完整视口并锁定背景滚动；品牌与关闭按钮保持在顶部，菜单内容独立滚动。Home、Trending、Opinion、Video、Premium、Not Just Travel 及功能入口一级行统一为 `48px`，支持链接／`Escape`／桌面断点关闭与键盘焦点循环。
- [x] 推荐看板在 `581px` 以上维持 Selected Reading／Most-read 左右并置；`580px` 以下将 Most-read 移为第三张横向画廊页，禁止上下堆叠。推荐栏目移动端高度由封面、一个 lede 行距的间隔和自动播放控制区共同计算，不再使用旧的固定 `12px` 圆点高度。
- [x] Selected Reading 与 Most-read 栏头不使用主题标签；大画廊与小画廊继续按溢出情况显示居中圆点。
- [x] 删除已被推翻的“圆形箭头导航”“阅读时长置于按钮下方”“封面导语按标题字号 60%→50% 贴底”“手机把推荐看板上下堆叠”等旧设计说明。

## 已完成：Premium Member

- [x] 重新抓取 `premium-member/`，以源页的 `PREMIUM MEMBER`、`$10 MONTHLY`、会员权益说明与 `BECOME A MEMBER` 为内容锚点，删除旧版 Free／$12／Team 三档虚构定价。
- [x] 将会员主张放入亮米白色区块，并在桌面与移动端使用不重叠的响应式网格。
- [x] Intelligence、Courses、Talks 均改为首页“非推荐栏目”语言：每栏一篇左文右图封面文章，主题标签、标题和 lede 连续居中排布，后接三张 `16:9` 普通卡片；不使用异色栏目背景。
- [x] 载入源页展示的 4 条 Intelligence、4 门 Courses、4 条 Talks 的真实标题、摘要方向和目标链接；课程封面使用对应源站图片，所有图片继续远程加载且不作为阅读入口。

## 每次 UI 修改后的强制复核

- [ ] 检查所有目标断点，确认图片、标题、标签、lede、时长和分页圆点没有堆叠或相互覆盖。
- [x] 本轮已扫描生产 CSS：显式行高没有超出 `1.2–1.5`，共享母版保留最终护栏。
- [x] 本轮已做结构检查：首页图片没有被 `<a>` 包裹，标题与 lede 使用独立链接。
- [ ] 检查 `MORE >>` 不改变主题标签组件宽度，并确认日期始终保持灰色。
- [ ] 检查有横向溢出的画廊才显示圆点；在 `580px` 两侧确认推荐画廊为两屏/三屏且没有高度突变。
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
- [x] 文字版把标签／日期、标题、作者和 lede 居中；新闻版参考 Chang’e-6 简报，以日期和标题居中的轻标题区进入新闻正文。
- [x] 非新闻正文保留中间阅读栏；左侧目录用红色标出当前章节，右侧拆为 Continue Exploring 与 Related Reading，每条推荐增加一行小导语，两侧均设置视口内独立滚动。正文末尾 Editor 精简为右对齐的一行灰色小字。
- [x] 新闻版保留左侧简报目录和右侧推荐，移动端把新闻目录变为横向可滚动入口。
- [x] 分享入口直接接在文末，不使用分割线；X、Facebook、LinkedIn、Reddit、Email 改为圆形图标。Comments 标题缩小，保留 Latest／Popular、顶、踩和回复。
- [x] 作者悬浮改为头像增加半透明藏青蒙版、姓名出现下划线；Contact the Author 弹窗使用藏青色，Learn more 接在作者简介段末，Email／Message 使用深藏青搜索框式输入。`×`、背景点击和 Escape 均不受必填验证影响；输入草稿自动写入 30 天 cookie，并为本地文件演示保留浏览器存储回退。
- [x] 桌面端只使用正文右栏的 Continue Exploring／Related Reading，删除评论后的旧 Related Reading 与自动追加内容流；`900px` 以下把同一组推荐从评论前移动到评论后，页面中始终只有一组推荐。
- [x] `900px` 以下评论／分享区取消 `.shell` 的二次内边距，宽度与正文统一为“视口减去左右各一个全局 gutter”。
- [x] 本轮文章模板复核：活动目录中的旧模板文件名／引用为 0，三种模板统一命名为 `article-featured-image.html`、`article-news.html`、`article-text.html`；文章 lede 的时长标签取消悬浮换色。`site.js` 语法、三份 CSS 大括号、23 份演示 HTML 的本地引用和重复 ID 均通过静态检查。

## 已完成：Article Section 母版（2026-08-24）

- [x] 新建真实 `.master-section` 共享母版并用于 Trending、Opinion、Premium Intelligence；旧的各自独立 Hero／Feature Grid／Card Grid 结构已被统一替换。
- [x] 栏目标题使用金色斜体，删除标题右侧分割线并把标题上方留白压缩到 `20–38px`（移动端 `18px`）；下方主题条从 `LATEST` 开始排列所有栏目主题，使用单行横向滚动，并以底部分割线结束标题栏。
- [x] 看板栏统一使用卡片：`16:9` 图片、可点击主题标签、灰色日期、标题和共享 `.lede-row`；所有 lede 恢复行末 `xx min read/watch` 标签。桌面三列、平板两列、移动端一列，卡片之间只有简洁分割线；首行卡片顶部不再绘制横线。
- [x] Trending 与 Opinion 在首行三张卡片之后插入完整米白色 `Editor's Picks` 卡片看板；每条推荐均增加 `16:9` 图片，Opinion 的条目与 China–Japan 主题参考源站 Thinkers Forum 当前内容。
- [x] 三个栏目页均加入 `LOAD MORE`，点击后展开第三批卡片并隐藏按钮；Article Section 不再被全局脚本追加旧的 “Continue exploring” 密度区。

## 已完成：Homepage 与全局交互（2026-08-24）

- [x] 首页凡是视频内容，封面文章和普通文章图片均固定为 `16:9`；显式覆盖 `.image-frame`／`.story-cover` 遗留的 `height:100%`，避免封面被重新撑成方形。按最终决定删除首页全部播放三角及其专属定位、尺寸和悬浮样式。
- [x] 视频内容不再在图片中央显示播放控件；改为在红色主题标签前放置一个小型红色播放三角，并以 `18px` 左侧标签空间保持图标与文字间距。首页 Video、Premium Talks、视频列表／详情及 Article Section 中标记为视频的卡片共用该规则。
- [x] 全站非视频语境中的 “Opinion” 已替代旧 “Thinkers Forum” 标签；源网址与现有文件路径继续保持 `thinkersforum`／`thinkers-forum.html`，VIDEO 下拉菜单、Video 列表标签和首页 Video 栏目中的同名节目仍保留 “Thinkers Forum”。
- [x] 视频 lede 时长使用显式视频分钟数并显示为 `xx min watch`；文章仍显示 `xx min read`。
- [x] 功能栏搜索恢复普通浅色，只有 Sign In 使用金色；演示登录同时开启注册状态并停止注册提醒。
- [x] 功能栏滚动状态改为 `72/96/160px` 分离阈值，并累计至少 `18px` 的有效滚动方向后才切换，消除端点附近抽搐；深滚动时标题栏保持紧凑。
- [x] 桌面和移动导航中的 HSK 入口替换为外链 Not Just Travel；HSK 页面文件仍保留在 `About/hsk.html`，供课程落地页和 WordPress 映射使用。
- [x] 未注册会话首次显示蓝底双入口弹窗；Premium Member 与 Free Registration 使用蓝底圆角描边入口，入口标题为金色斜体。关闭后出现无关闭按钮的 36px 高会员横幅，横幅增加轻微底部阴影；页脚进入视口时迁入 The China Academy／Explore／Organization 三栏上方居中。
- [x] 主推荐画廊加入播放／暂停按钮和 10 秒自动轮播；暂停按钮改为与非激活圆点相同的 `10px` 灰色圆点，当前页圆点继续显示扇形计时进度。
- [x] 首页所有可见 “The China Academy” 品牌文字统一使用 Libre Baskerville。
- [x] 移动全屏菜单从带滤镜的粘性 Header 内移到页面根层，使用独立 `100dvh` 滚动容器；打开时固定顶部导航并仅锁定背景页面，修复菜单消失和无法滑动。


## 已完成：Beta Demo

- [x] 新增 `Beta Demo/homepage.html`，隔离展示桌面端非视频封面模块 `4:3` 与普通文章画廊两行排列；视频封面仍强制 `16:9`。普通卡片宽度由 `328px` 缩至 `246px`（缩小四分之一），正式首页不受影响。


## 待和boss确认

- [ ] 是否把 beta 中“普通文章画廊两行”正式合并到生产首页？目前只在 Beta Demo 生效。
- [x] HSK 文件仍在 `About/hsk.html`；主导航入口按最新决定替换为 Not Just Travel。


## 下一阶段：WordPress 与技术老师交接

- [ ] 网站使用指南
- [ ] 获取线上子主题、Elementor Theme Builder 导出、插件清单和内容模型后，确认使用现有子主题还是自建主题；不要直接修改父主题、插件目录或 `wp-content/uploads/`。
- [ ] 将静态页面映射为 WordPress/PHP 模板或 Elementor 模板，并把主题标签映射为 taxonomy archive。
- [ ] 用 CMS 查询替换演示文案、硬编码日期、作者、卡片与 `data-words`；保存文章时统计正文/文字稿词数并缓存阅读时长。
- [ ] 把统一的 “Continue exploring” 演示池替换为按栏目、标签、作者、会员状态和内容类型返回的真实相关推荐。
- [ ] 将演示登录接入 WordPress/WooCommerce 用户状态；将会员权限、购买、课程进度和捐赠分别交给现有 WooCommerce Memberships、Sensei LMS 与 Give 流程。
- [ ] 完善跨文章、视频、课程和作者的站内搜索，并确认 Contributor Profile 与 WordPress Author Archive 是否继续作为两个内容模型。
- [ ] 定义上传图片的最小尺寸、裁切焦点、`srcset`、文件大小和缓存/CDN规则；完成字体子集化、LCP、SEO、键盘与屏幕阅读器审计。
- [ ] 把长导语改成 quote，并增加 AI 一键摘取按钮；头图、文字、新闻三类文章母版已经完成，不再列为下一阶段任务。
- [ ] 文章-视频时长端口

## 建议的设计工作流

- [ ] 每轮先写一页“不可变约束 + 本轮变量 + 明确删除项”，确认后再改代码；同一组件一次只保留一个有效版本。
- [ ] 建立组件验收矩阵：主封面、栏目封面、普通卡片、主题标签、lede、导航、画廊分别记录 desktop/tablet/mobile 的结构、字号范围、比例和交互。
- [ ] 以 `1600×1000`、`949×849`、`581×900`、`580×900`、`390×844` 作为固定验收视口；每轮只比较目标组件，不顺带重排未授权区域。
- [ ] 把“禁止堆叠、行高 1.2–1.5、图片不可点击”等规则做成自动静态检查；视觉确认后再把任务标为完成。
