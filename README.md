# Abdukeram Dolkun — personal website

全英文静态学术主页。无需安装依赖，无需数据库，无需构建。网站数据在 `content.js`。

## 首次发布到 GitHub Pages

1. 登录 https://github.com ，新建 **Public** 仓库，名称必须是 `Keeeram.github.io`。如已有同名仓库，先检查内容，不要覆盖已有网站。
2. 将本文件夹里的文件上传至仓库根目录。必须直接看到 `index.html`，不要把整个外层文件夹作为一层目录上传。包括 `.nojekyll`。
3. 在仓库 **Settings → Pages → Build and deployment** 中，Source 选 **Deploy from a branch**，Branch 选 **main**，目录选 **/(root)**，点击 **Save**。
4. 在 Actions 查看部署结果。完成后访问 https://Keeeram.github.io/ 。首次部署需要等待片刻，最终地址以 Pages 显示为准。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 平时怎样维护（直接在 GitHub 操作即可）

打开仓库 → 点击 `content.js` → 点击铅笔编辑 → 修改文字 → **Commit changes**。提交后 GitHub Pages 自动更新；Actions 显示成功后刷新网站。注意引号、逗号、方括号，不要删掉它们。

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、学位、学校、简介 | `content.js` 中的 name、role、school、biography |
| 教育经历 | education 数组，每个对象是一条记录 |
| 论文 | publications 数组，按希望展示的顺序添加 |
| 动态 | updates 数组，建议最新放最前 |
| 照片 | 上传 `assets/profile.jpg`，photo 填 `assets/profile.jpg` |
| 简历 | 上传 `assets/cv.pdf`，cv 填 `assets/cv.pdf` |
| 邮箱、GitHub、主页大标题、浏览器标题、页脚 | `index.html` 中查找对应文字并替换 |
| 配色和布局 | `style.css` |

姓名、邮箱等在 HTML 中有静态展示位置，因此改姓名时也搜索并更新 `index.html` 中对应文字。学校目前使用提供的英文表达，发布前建议核对正式英文校名；学位状态和教育时间也请按实际情况更新。

### 添加论文

将 `publications: []` 改成如下结构（请填写真实内容）：

```js
publications: [
  {
    title: "Your actual paper title",
    authors: "Abdukeram Dolkun, Coauthor",
    venue: "Journal name, year",
    url: "https://doi.org/your-actual-doi"
  }
],
```

多条论文就在方括号内继续添加对象，用逗号分隔。不填链接时使用 `url: ""`。动态的格式是 `{ date: "2026-10", text: "Your update." }`。无需论文时保留空数组，网站会显示真实的空状态。

### 本地预览

可以直接双击 `index.html`。如果电脑有 Python，也可以在本目录运行 `python -m http.server 8000`，浏览器访问 http://localhost:8000 。按 Ctrl+C 停止服务器。

### 出问题如何恢复

- 页面未更新：先看 Actions 是否成功，再用 Ctrl+F5 强制刷新。
- 404：检查仓库名称、Pages 的 main / (root) 设置，以及根目录是否有 `index.html`。
- 简介/论文不显示：检查 `content.js` 最近改动是否漏了引号或逗号；通过文件 History 找到之前版本，复制恢复并提交。
- 图片不显示：核对路径及大小写。上传照片和 PDF 前检查是否含不希望公开的信息。

发布后分享网址即可，访客无需 GitHub 账号。GitHub Pages 适合简历、论文、项目和联系方式；这里没有后台登录或留言数据库。

## 文件

- `index.html`：页面结构与固定链接
- `content.js`：个人资料与内容
- `site.js`：内容显示逻辑
- `style.css`：桌面/手机样式
- `.nojekyll`：使用静态文件直接发布

参考站点只用于信息结构参考；未使用其作者照片、论文图片或个人学术成果。
