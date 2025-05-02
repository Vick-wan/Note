以下是使用 MkDocs 构建静态网站并同步到 GitHub 仓库的完整流程，结合了多篇教程的最佳实践：

---

### ​**1. 环境准备**​

- ​**安装 Python 和 pip**​  
    确保系统已安装 Python 3.5+ 和 pip 工具（）。
- ​**安装 MkDocs**​
    
    bash
    
    bash
    
    复制
    
    ```bash
    pip install mkdocs mkdocs-material  # 安装 MkDocs 及 Material 主题
    ```
    

---

### ​**2. 创建 MkDocs 项目**​

bash

bash

复制

```bash
mkdocs new my-blog  # 创建名为 my-blog 的项目
cd my-blog          # 进入项目目录
```

- ​**目录结构**​：
    
    markdown
    
    markdown
    
    复制
    
    ```markdown
    my-blog/
    ├── docs/         # 存放 Markdown 网页
    │   └── index.md  # 默认首页
    └── mkdocs.yml    # 配置文件
    ```
    

---

### ​**3. 配置 MkDocs**​

修改 `mkdocs.yml` 文件：

yaml

yaml

复制

```yaml
site_name: 我的博客
theme:
  name: material    # 使用 Material 主题
nav:
  - 首页: index.md
  - 指南: guides/install.md
  - 关于: about.md

plugins:            # 可选插件
  - search        # 启用搜索功能
  - minify:       # 压缩 HTML/CSS/JS
      minify_html: true
```

---

### ​**4. 本地预览与构建**​

- ​**实时预览**​
    
    bash
    
    bash
    
    复制
    
    ```bash
    mkdocs serve  # 访问 http://localhost:8000 查看效果
    ```
    
- ​**生成静态文件**​
    
    bash
    
    bash
    
    复制
    
    ```bash
    mkdocs build  # 生成 site/ 目录（包含所有 HTML/CSS/JS）
    ```
    

---

### ​**5. 同步到 GitHub 仓库**​

#### ​**方法一：手动部署（适合简单场景）​**​

1. ​**创建 GitHub 仓库**​
    - 在 GitHub 上新建仓库，命名为 `username.github.io`（替换为 GitHub 用户名）。
2. ​**推送网页到 GitHub**​
    
    bash
    
    bash
    
    复制
    
    ```bash
    git clone https://github.com/username/username.github.io.git
    cp -r site/* username.github.io/  # 将生成的静态文件复制到仓库
    cd username.github.io
    git add . && git commit -m "Deploy MkDocs" && git push
    ```
    
    - 访问 `https://username.github.io` 即可查看网站（）。

#### ​**方法二：自动化部署（推荐 GitHub Actions）​**​

1. ​**在 GitHub 仓库中创建 `.github/workflows/deploy.yml`**​
    
    yaml
    
    yaml
    
    复制
    
    ```yaml
    name: Deploy to GitHub Pages
    on:
      push:
        branches: [main]  # 触发分支
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - name: Setup Python
            uses: actions/setup-python@v4
            with:
              python-version: '3.8'
          - name: Install MkDocs
            run: pip install mkdocs-material
          - name: Build Site
            run: mkdocs build
          - name: Deploy to Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./site
    ```
    
2. ​**推送代码到 GitHub**​
    
    bash
    
    bash
    
    复制
    
    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "Add deployment workflow"
    git push
    ```
    
    - 每次推送代码到 `main` 分支，GitHub Actions 会自动构建并部署到 GitHub Pages（）。

---

### ​**6. 高级配置**​

- ​**自定义域名**​  
    在 GitHub 仓库的 `Settings → Pages` 中设置自定义域名，并在 DNS 中添加 CNAME 记录（）。
- ​**版本控制**​  
    将 `docs/` 目录和 `mkdocs.yml` 提交到仓库，便于团队协作：
    
    bash
    
    bash
    
    复制
    
    ```bash
    git add docs/ mkdocs.yml
    git commit -m "Update documentation"
    git push
    ```
    

---

### ​**常见问题**​

1. ​**部署失败**​
    - 检查 GitHub Actions 日志，确认构建步骤是否成功。
    - 确保 `mkdocs.yml` 语法正确（使用 `mkdocs check` 验证）。
2. ​**主题不生效**​
    - 确认主题已正确安装：`pip list | grep mkdocs-material`。
    - 清理缓存后重新构建：`mkdocs build --clean`。

---

通过以上步骤，你可以快速搭建一个基于 MkDocs 的静态网站，并实现与 GitHub 仓库的自动化同步。