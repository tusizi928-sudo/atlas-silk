# 艾德莱斯绸 / ATLAS SILK — GitHub Pages 发布包

这是v42的发布文件，已将大型离线HTML拆分为19个脚本和一个样式文件。文件总数少于100，单文件均小于GitHub网页上传的25MiB限制。字体和图片仍已内嵌，不需要再上传assets目录。

## 上传步骤

1. 解压本包。
2. 在GitHub新建一个独立公开仓库，例如atlas-silk；无需覆盖已有的1fan个人网站仓库。
3. 点击Add file → Upload files，将本文件夹中的文件一起上传。请确保index.html在仓库根目录，不要把整个外层文件夹再套一层。上传的是解压后的文件，不是zip本身。
4. Commit changes提交。
5. 打开Settings → Pages，Source选择Deploy from a branch，选择main和/(root)，保存。
6. GitHub完成发布后，在同一页点击Visit site打开。若稍等仍404，请检查index.html位置及发布状态。

.nojekyll为隐藏文件，也在包内；如Finder没显示，可用Command+Shift+.显示隐藏文件。其余文件名不要更改或删除。

## 当前功能状态

首页、图库、历史、联系方式和个人网站跳转可以发布；Design Studio需要登录。真实Google/Apple登录及访客后台尚未配置，因此工作室保持锁定。GitHub Pages上线不会自动启用这些服务。不要在auth-config.js放入密码、client secret或service-role key。

本包没有自行创建仓库或发布；现有个人网站未改动。已经核对脚本顺序、文件引用、单文件大小及离线版内容一致性，未进行线上发布或浏览器视觉复核。
