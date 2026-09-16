---
name: tca-design-workflow
description: Govern every TCA-Design website change by classifying it as a structural change, surgical edit, or mere asking; enforce the project's design constitution, non-regression rules, scoped editing, responsive coverage, and static overlap checks.
---

# TCA Design Workflow

本技能适用于本项目内所有会修改网站 HTML、CSS、JavaScript、assets、页面模板、导航、交互、内容结构或响应式规则的任务。只要任务涉及网站修改，就必须先执行本流程。

## 0. 分类与写入授权

- 每个新的网站修改请求都必须先完整读取本文件并分类；完成分类前只允许只读检查。
- Structural Change 实行两步确认：第一步由执行者说明分类、范围与拟执行动作并停止；第二步必须收到用户在该说明之后单独发出的“确认”“开始做”或同等明确答复，才允许写入。原始修改请求本身不等于第二步确认。
- Surgical Edit 采用 action-biased 流程：用户的原始修改指令即为写入授权。执行者在 commentary 中明确给出 `分类` 和 `Change Radius` 后立即实施，不得要求用户再次确认；只有用户明确要求先提案、先预览或先等待批准时才暂停。
- 用户追加或改变 Structural Change 的需求后，旧确认立即失效，必须按最新完整范围重新复述并再次等待确认。Surgical Edit 的需求发生变化时，在不越过最新 Change Radius 的前提下直接按新指令继续执行。
- Structural Change 写入前必须标记 `当前状态：等待确认`；Surgical Edit 写入前标记 `当前状态：开始执行`。
- `TODO.md` 不再属于本工作流：除非用户在当前请求中明确点名要求读取或修改它，否则任何任务都不得读取、写入或维护 `TODO.md`，也不得把它作为完成条件。

## 1. 先分类，不先改代码

先把请求归入以下一种类型。用户明确指定的类型优先；未指定时按影响范围判断。

### Structural Change

符合任一条件即为结构性修改：

- 新建页面、母版或组件；
- 改变 DOM 结构、交互逻辑、页面职责或数据流；
- 改变跨页面 selector、design token、断点或全局设计语法；
- 同一改动必须跨多个页面或模板落地；
- 会让现有 `DESIGN_RULES.md` 需要增删规则。

### Surgical Edit

只改变已知 selector、组件或页面中的一个明确属性／行为，且不要求重构或改变设计语法。用户给出的 `Radius` 是硬边界。

### Mere Asking

用户只询问原因、状态、结构、文件、设计建议或评审意见，没有授权写文件。

无法可靠判断时，先说明你的分类与依据；不要以“顺便优化”为理由扩大范围。

## 2. Structural Change 流程

### 阶段 A：意图确认

在任何代码修改前，用以下三个部分复述设计动作：

1. **不可变约束**：本轮必须保持的既有规则、内容与交互。
2. **本轮变量**：允许改变的页面、组件、selector、断点和状态。
3. **明确删除项**：用户要求移除且不得残留的结构、样式或文案。

同时给出简短布局／状态说明。必须停止在这一阶段，等用户明确确认理解无误之后，才进入阶段 B；不得把原始需求本身视为确认。

### 阶段 B：读取规则与建立计划

1. 完整阅读 `.agent/DESIGN_RULES.md`。
2. 完整阅读 `.agent/DO_NOT_REGRESS.md`。
3. 只读取完成任务必需的页面与共享 CSS / JS；先用 `rg --files` 和 `rg` 定位。
4. 复核当前磁盘实现，不用旧对话记忆替代文件事实。
5. 形成需求矩阵：每一项要求对应目标文件、selector、桌面行为、移动行为和验收方式。

已有组件或 selector 能表达需求时必须复用。没有现行规则时，可以提出新方案。除非用户明确说出“作为禁区”，不得向 `DO_NOT_REGRESS.md` 新增、改写或扩展条目。

### 阶段 C：实施

- 使用共享层承载全局规则；页面 HTML 只承载语义结构和内容。
- 一次只保留一个有效组件版本；删除用户明确废弃的 DOM、CSS 和 JS，不留隐藏的并行实现。
- 保留未在本轮变量中的既有行为。
- 不修改无关文件，不做机会性重构。
- 编辑本地文件使用 `apply_patch`；机械格式化工具只用于已授权范围。

### 阶段 D：复核

完成后必须逐项检查：

1. **交付完整性**：需求矩阵中的每项是否已经实现。
2. **移动端完整性**：移动端不是桌面缩小版；检查 DOM 顺序、换行、触控尺寸、滚动和安全区。
3. **静态非重叠检查**：执行 `DESIGN_RULES.md` 第 6 节，包括断点两侧、最小宽度、定位扫描、末行边界、DOM 顺序与语法检查。
4. **非回归检查**：本轮改动是否触碰任何禁区；用户明确推翻禁区时，以最新决定执行，但除非用户同时说出“作为禁区”，不得改写 `DO_NOT_REGRESS.md`。
5. **作用域检查**：用 diff 确认没有未授权 selector、页面或文案变化。

静态检查不能证明最终视觉效果。除非用户要求，不进行大规模浏览器尺寸模拟；报告中要准确区分“静态通过”和“视觉已确认”。

### 阶段 E：归档

1. 本轮产生新的全局设计语法时，更新 `.agent/DESIGN_RULES.md`。
2. 仅当用户明确说出“作为禁区”时，才把对应方案写入 `.agent/DO_NOT_REGRESS.md`；其他舍弃、替代或否决不得触发该文件更新。
3. 页面 URL、文件路径或继承关系变化时，更新 `MAP.md`。
4. 文件结构变化时，更新 `README.md`。
5. 最终报告修改文件、关键结果、静态检查与尚未做的视觉验证。

## 3. Surgical Edit 流程

### 3.1 确定 Change Radius

把范围明确为以下一级：

- `selector`：只改用户指定 selector 的声明。
- `component`：只改该组件必需的 HTML / CSS / JS；允许跨页面同步同一个共享组件。
- `page`：只改指定页面及其页面级作用域。
- `template`：只改继承该母版的页面。
- `global`：只在用户明确要求全局变更时使用。

用户给出 Radius 时不得扩大；用户未给出时，选择能完成要求的最小范围并在 commentary 中说明。

确定 Radius 后，用一句话复述将修改的文件／selector／component 及明确不触碰的范围，标记 `当前状态：开始执行`，随后直接实施。用户原始 Surgical Edit 指令即为授权，不再索取第二次确认。

### 3.2 执行约束

- Do not modify anything else.
- Do not refactor.
- Do not inspect unrelated files.(尤其是TODO.md MAP.md等markdown文件)
- 不顺手整理 CSS、重命名、格式化、补文档或修复邻近问题。
- 只读取目标文件、目标 selector，以及必要时 `DESIGN_RULES.md` / `DO_NOT_REGRESS.md` 中与它直接相关的小节。
- 如果请求与禁区冲突，但用户没有明确推翻旧规则，停止并指出冲突；不要猜测。
- 只做与 change radius 等宽的验证，例如 selector 命中、CSS 语法或直接 DOM 引用。

### 3.3 Surgical Edit 报告格式

完成后只报告：

- changed file
- changed selector / component

不得附加未要求的设计建议、TODO 更新或无关检查结果。

## 4. Mere Asking 流程

- 不写入文件，不改变网站状态。
- 只做回答所需的只读检查。
- 如果用户问“为什么”，给出当前文件和 selector 证据；不要自动实施修复。
- 如果用户随后要求修改，从头重新分类。

## 5. 冲突处理

- 最新、明确的用户决定可以推翻旧规则。
- 推翻发生在 Structural Change 中：更新现行规则；只有用户明确说出“作为禁区”时才更新禁区。
- Surgical Edit 若明确覆盖旧 selector，可执行该局部替代；不得据此推断其他页面也应变化。
- 当前实现与文档冲突时，不静默选择。以用户最新确认和当前磁盘证据判断；可更新现行设计规则，但没有“作为禁区”口令时不得借机修改 `DO_NOT_REGRESS.md`。

## 6. 完成标准

只有同时满足以下条件才能声称完成：

- 用户要求全部有对应实现；
- 没有明确删除项残留；
- 桌面和移动结构均有定义；
- 静态非重叠与语法检查通过，或明确报告未通过项；
- diff 没有越过 change radius；
- Structural Change 的设计规则及必要的 MAP / README 已同步；`DO_NOT_REGRESS.md` 只在用户明确说出“作为禁区”时同步；
- 最终报告没有把未执行的浏览器视觉检查说成已验证。
