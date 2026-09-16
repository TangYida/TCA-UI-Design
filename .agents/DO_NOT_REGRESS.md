# TCA Do Not Regress

本文件记录用户已经明确指定为禁区的设计。它不是灵感清单，而是实现禁区。除非用户在当前任务中明确重新启用某项，否则不得恢复。

**收录门槛：当且仅当用户明确说出“作为禁区”时，才允许新增、改写或扩展本文件中的禁区条目。用户仅仅否决、替换、修改或不喜欢某个方案，不构成写入授权。**

## 1. 全局禁区

- 不要擅自添加除了源网站之外的文字信息，除非用户特别指定。
- 不得使用 Helvetica Neue、Inter 或其他临时无衬线字体替代 Roboto。
- 不得让任何文字行高低于 `1.2` 或高于 `1.5`。
- 不得恢复“段间距必须大于等于两倍”的全局规则。
- 不得用负 margin、absolute positioning 或 translate 拼接普通正文和卡片。
- 不得让图片、标题、lede、按钮、导航圆点、metadata 或 Footer 互相覆盖。
- 不得复制全局组件并在页面内维护第二套同义样式；已有共享 selector 必须复用。
- 不得让卡片图片成为文章入口；内容只从标题、lede 或其时长标签进入。
- 不得把普通内容主题扩展到六项 taxonomy 之外；Video channel 除外。
- 不得恢复任何 `.density-feed`、自动附加的 “More context. In less space.” 或重复 Continue Exploring 内容流。
- 不得把 Premium 内容的金底白字标识移除或改成普通主题标签。
- 不得让文字型 `input` 或 `textarea` 在 focus、active 等交互状态切换背景颜色。浅色父组件中的文本框必须始终为 `#EBE4D7`，深色父组件中的文本框必须始终为 `#0D192B`；交互状态只能改变底部线条。

## 2. Header 与导航禁区

- 不得恢复标题栏中央的 “CHINA in FULL”。
- 不得把移动导航改回只覆盖局部页面的下拉层；必须是根层全屏菜单。
- 不得让一级菜单行出现不同高度；Video、Premium、Home、HSK / Not Just Travel 等必须一致。
- 不得在打开移动菜单时锁死菜单自身滚动，或使菜单因 Header filter / transform 消失。
- 不得通过多个独立滚动判断器控制功能栏和标题栏；这会恢复反复跳出／收回的抽搐。
- 不得删除已经确认的“功能栏收回 + 标题栏缩小”动效。
- 不得让桌面下拉菜单在点击页面其他区域后继续停留。

## 3. Homepage 与 Premium Member 禁区

- 不得混淆封面方向：主推荐是左图右文；非推荐栏目是左文右图。移动端统一上图下文。
- 不得让标题、lede 或 `.cover-heading` 覆盖图片。
- 不得给非推荐栏目封面套异色整块背景。
- 不得恢复封面标题两端对齐；现行规则是自然左对齐。
- 不得恢复圆形箭头导航、旋转箭头或按钮下方的阅读时长说明。
- 不得恢复首页图片中央的播放按钮、圆片或 hover 播放控件。视频只由标签前的单一红色播放符号识别。
- 不得让普通文章标题与封面标题左边界错位。
- 不得恢复每个板块内部的装饰分割线或 gallery-card 顶线；仅保留已定义的标题／看板边界。
- 不得显示 “Main recommendations” 或 “Swipe to…” 等画廊说明。
- 不得在一次可完整显示的画廊下强行显示圆点。
- 不得让 gallery dots 与 lede 之间出现由固定高度、空轨道或绝对定位造成的大块空白。
- 不得在 `820px` 以下把 Continue Exploring 和 Most-read 上下堆在同一画廊页；Most-read 必须成为独立第三页。
- 不得让四门 Continue Exploring 课程出现不同封面尺寸；尤其不得给 China 101 保留独立旧宽度。
- 不得给课程卡添加日期或时长标签，也不得删掉 `Presented by {作者}`。
- 不得恢复 Premium Member 的 Free／$12／Team 虚构定价或重复的底部会员 CTA。

## 4. 注册提醒与登录禁区

- 注册提醒不得恢复桌面左侧蓝色边栏、email 输入框或内部滚动条。
- 注册提醒窗口与横幅不得并入 Footer DOM；遇到 Footer 应向下收回。
- 窗口／横幅不得使用“A 完全收回后 B 再弹出”的断裂切换；应由同一容器平滑 morph。
- 横幅不得使用 EB 或 Libre；现行字体是 Roboto。
- 横幅按钮不得变成蓝色或白色；始终是金色。
- 不得缩写 Premium Member 与 Free Registration 两组已确认说明文案。
- 不得让移动全屏菜单落在注册窗口下方。
- 登录／注册不得各自创建视觉不同的弹窗；Sign In 是统一基准。
- 不得把整个登录表单向弹窗顶部顶格；tab 固定顶部，表单在 tab 以下区域居中。
- 不得只按整个弹窗居中而忽略 tab 占用空间。
- 不得让 Sign Up submit 跑出弹窗，或用增加弹窗高度掩盖错误的居中算法。
- 不得让关闭登录弹窗依赖必填字段通过验证。

## 5. Article 禁区

- 不得给正文图片加灰度／单色滤镜；不得恢复小图 `50%` 的旧规则。正文图片现为正文等宽、`height:auto`。
- 不得让图片与段落之间出现远大于普通段落节奏的留白。
- 不得把编号小节 `h3` 加粗；只有正式大章节 `h2` 加粗。
- 不得恢复章节之间的巨大垂直空白。
- 不得把 Editor 做成大型卡片；只保留文末一行右对齐灰字。
- 不得给 Share 单独画分割线或使用封闭矩形平台按钮；使用文末圆形图标。
- 不得在桌面评论区后再次追加 Related Reading / Exploring More；移动端只移动同一组内容，不复制。
- 不得把右栏 Related Reading 的时长标签恢复。
- 不得把主题标签画成方框；头图与文字版均使用共享红字标签及 `MORE >>`。
- 不得把作者头像变成单色；hover 是半透明藏青蒙版，姓名下划线。
- 不得让作者弹窗因空字段无法关闭。
- 不得让头图 lede 或收藏按钮偏离居中对齐。
- 不得产生三级评论；回复任意二级评论仍归入二级。
- Discussions Across Platforms 不得使用卡片背景、阴影、圆角封闭框、tabs、第三方 embed 或多余 CTA。

## 6. Article Section 禁区

- 不得恢复栏目标题右侧分割线。
- 不得把主题点击行为改回搜索页跳转；应在本页横向过渡看板。
- 不得在主题子页显示 Editor’s Picks。
- 不得把 `All` 改回 `Latest`；Latest / Popular 属于 Sort by。
- 不得让普通卡片区同一行出现两种卡片尺寸。
- 不得让 Editor’s Picks 内出现与同区其他条目不同的图片尺寸或比例。
- 不得删除 Editor’s Picks 的 lede，也不得恢复 “Selected by the desk”。
- 不得让不足一行的卡片自动变大；后续内容应前移填满，最终不足项仍保持标准尺寸。
- 不得依赖空 Grid track、伪元素或特定 `nth-child` 给末行补边框；每张实际卡片必须自行闭合边界。

## 7. Video Section 与 Premium Talks 禁区

- Video Archive 不得使用文章六项 taxonomy 取代 Video channel。
- Video Archive 不得添加 Editor’s Picks。
- Video 内容看板分割线不得变成金色；只有标题／channel 轨道可使用规定的金色线。
- 不得让 Video 下拉的各 channel 指向不同静态页面；统一指向 `video.html?channel=...`。
- Premium Talks 不得恢复 `$10 monthly · Member access`、页面说明段、会员 CTA 或自动 Continue Exploring。
- Premium Talks 不得把作者名放回灰色 metadata；作者名应在 lede 前用 EB Garamond 加粗并加冒号。

## 8. Video Detail 禁区

- 不得把 `.video-detail-title` 恢复为强制单行、动态缩放或最小 `30px`；现行值固定 `50px` 并允许多行。
- 不得让日期右对齐；必须紧邻主题标签。
- 不得在同一视频主题标签前重复播放符号。
- 不得让 sidebar 高度脱离主视频，或让内容溢出页面而不是在 sidebar 内滚动。
- Course sidebar 不得先 Related 后 Course Plan；现行顺序是 Course Plan → Related。
- Related 不得省略 `16:9` 封面、主题、标题或 lede。
- `.video-side-section` 内不得恢复 `.read-time-pill`。
- `.video-side-section + .video-side-section` 不得恢复金色顶部边框。
- `.video-instructor` 与 `.video-lede` 不得恢复顶部 border。
- Video lede 不得显示 “Introduction” 标题。
- `.video-playback-meta` 不得右对齐；顺序固定为收藏 · 播放量 · 集数／上传数。
- 播放栏后的组件不得只按左侧主视频宽度对齐；必须跨越整个播放栏宽度。
- Course Plan 不得恢复旧金色 span、lesson-complete 按钮或手动完成状态。进度由最长播放位置决定，并通过 `li` 背景从左向右填充。
- 移动端不得把 Course Plan / Related 留在 Introduction 之外；顺序必须为 Instructor → Lede → Share → Course Plan → Related。

## 9. Utility 禁区

- 不得把 Settings 和 Search 强行恢复为同一种通用 `.page-hero + panel` 页面；它们是两种不同的 Utility 母版。
- Settings 不得恢复顶部 `.avatar_img1 + .avatar_img1_info` 冗余身份摘要或内部导航左侧装饰图标。
- Settings 不得恢复 “Personal center”、“Manage your profile, account security and access.”、原生 “No file selected” 或 `.settings-panel-heading`。
- Settings 不得恢复当前旧原型虚构的 Membership、Course Progress、Newsletters、Language Preference。
- Premium 账户的 Profile 面板不得遗漏金底白字 Premium 标签；当前演示不得改回普通会员状态。
- Username 与 Country / Region 不得恢复大型全表单 `Edit details`；必须由字段右上方的小号 `EDIT → SAVE · CANCEL` 独立控制。
- Email 不得在当前 Settings 原型中变成可编辑字段。
- Utility 文字输入不得恢复四周封闭边框；使用保留原背景状态的底线输入，focus 底线为金色。密码 Show／Hide 不得移回输入框外或在空值时可点击。
- Settings 的 `#account-country` 不得在选择、focus、保存或 disabled 状态切换为白色；背景始终保持 `#EBE4D7`，交互状态只允许改变底部线条。
- 不得恢复 Settings 移动 workbench 的大顶部留白或底部 border，也不得恢复 Sign Out 区域顶部 border。
- Saved 不得移除收藏夹 Create／Rename／Delete 或批量 Select all／Unfavorite／Move／Copy；History 不得把 All／Article／Video 改成页面跳转，也不得移除单条 Delete／Delete all。
- Search 不得恢复 All／Videos／Courses／Contributors 五项虚构 tabs；源站交互是 Article／Author。
- Search 不得把 `All` 或 `Latest` 作为结果类型；Latest／Popular 只属于 Article 排序器。
- Author tab 不得显示无有效数据含义的 Latest／Popular。
- 不得恢复 “TOP PICKS” 命名；统一为 “Editor’s Picks”。
- Search 的 Editor’s Picks 不得回到主结果流、改成横跨整页的大卡或跟随 tab／排序／Load More 改变。桌面必须允许受剩余视口高度约束的内部滚动；移动端必须取消该内部滚动并恢复正常文档流。
- Search 不得恢复 “The Archive”、文字 Search 按钮或米白色 Editor’s Picks 背景。
- 不得让 Search 最后一张卡片拉伸填满空余行；卡片保持标准轨道宽度并自行绘制完整边界。

## 10. 实验与维护禁区

- Beta Demo 的实验比例、密度或组件不得未经明确授权合并到正式页面。
- 不得只凭 HTTP 200、语法通过或静态检查宣称视觉已正确；静态检查只能证明结构风险受到控制。
- 不得在 Surgical Edit 中顺手清理、重构、格式化或更新无关文档。
- 不得在未获得 Structural Change 的设计意图确认前开始改代码。
