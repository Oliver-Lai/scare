# 深夜孤宅 - 恐怖密室逃脫遊戲

一款使用 HTML、CSS 和 JavaScript 製作的網頁恐怖密室逃脫遊戲。

## 🎮 遊戲特色

- **多場景探索**：客廳、浴室、地下室三個恐怖場景
- **解謎挑戰**：需要收集線索並解開密碼謎題
- **Jump Scare 效果**：驚嚇元素增加遊戲刺激感
- **沉浸式體驗**：恐怖背景音樂和視覺效果
- **響應式設計**：支援桌面和行動裝置

## 🕹️ 遊戲玩法

1. **探索場景**：點擊房間中的物品來探索並收集線索
2. **收集線索**：在不同場景中找到 3 個數字線索
3. **解開謎題**：使用收集到的線索組成 4 位數密碼
4. **避免錯誤**：小心不要犯錯超過 3 次，否則遊戲失敗
5. **成功逃脫**：輸入正確密碼即可逃離恐怖屋

## 🔍 謎題提示

- 📚 檢查客廳的書架
- 🪞 觀察浴室的鏡子
- 📦 搜查地下室的箱子
- 🚪 最後在地下室的密碼門輸入密碼

⚠️ **注意**：某些物品可能會觸發 Jump Scare 效果！

## 🚀 部署到 GitHub Pages

### 方法一：直接上傳檔案

1. 在 GitHub 上創建新的 repository
2. 上傳所有檔案（`index.html`, `styles.css`, `script.js`, `assets/` 資料夾）
3. 在 repository 設定中啟用 GitHub Pages
4. 選擇 `main` 分支作為來源
5. 訪問 `https://yourusername.github.io/repositoryname`

### 方法二：使用 Git 命令

```bash
# 初始化 Git repository
git init

# 添加所有檔案
git add .

# 提交變更
git commit -m "Add horror escape game"

# 添加遠端 repository
git remote add origin https://github.com/yourusername/repositoryname.git

# 推送到 GitHub
git push -u origin main
```

### 方法三：使用 GitHub Desktop

1. 使用 GitHub Desktop 創建新的 repository
2. 將所有檔案複製到 repository 資料夾
3. 提交並推送變更
4. 在 GitHub 網站上啟用 Pages

## 📁 檔案結構

```
scare/
├── index.html          # 主要 HTML 檔案
├── styles.css          # CSS 樣式檔案
├── script.js           # JavaScript 遊戲邏輯
├── assets/             # 資源檔案夾
│   ├── creepy_music.mp3    # 背景音樂（需要添加）
│   └── scream.mp3          # 驚嚇音效（需要添加）
└── README.md           # 說明文件
```

## 🎵 音效檔案

遊戲中使用了以下音效檔案（需要自行添加）：

- `assets/creepy_music.mp3` - 背景音樂
- `assets/scream.mp3` - Jump Scare 音效

建議的音效來源：
- [Freesound](https://freesound.org/) - 免費音效庫
- [Zapsplat](https://www.zapsplat.com/) - 專業音效庫
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - YouTube 音效庫

## 🎨 圖片說明

遊戲使用 SVG 格式的圖片，所有視覺元素都是用 SVG 代碼直接繪製，因此：
- ✅ 不需要額外的圖片檔案
- ✅ 在任何解析度下都保持清晰
- ✅ 載入速度快
- ✅ 適合 GitHub Pages 部署

## 🎯 技術特點

- **純前端技術**：僅使用 HTML/CSS/JavaScript
- **無框架依賴**：不需要 React、Vue 等框架
- **SVG 繪圖**：所有圖形都使用 SVG 代碼
- **響應式設計**：適配不同螢幕尺寸
- **本地存儲**：使用瀏覽器本地存儲保存遊戲狀態

## 🔧 自定義設定

你可以輕鬆修改以下設定：

1. **難度調整**：修改 `script.js` 中的 `maxErrors` 變數
2. **密碼更改**：修改 `correctCode` 變數
3. **場景添加**：在 HTML 中添加新的場景 SVG
4. **物品互動**：在 `itemDescriptions` 物件中添加新物品

## 🎮 鍵盤快捷鍵

- `1` - 前往客廳
- `2` - 前往浴室  
- `3` - 前往地下室
- `Escape` - 關閉對話框
- `Ctrl + R` - 重新開始遊戲

## 🐛 開發者工具

在本地開發時，可使用以下快捷鍵：
- `Ctrl + Shift + D` - 顯示遊戲狀態
- `Ctrl + Shift + W` - 直接勝利
- `Ctrl + Shift + L` - 直接失敗
- `Ctrl + Shift + C` - 獲得所有線索

## 📱 瀏覽器支援

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## 🎭 遊戲體驗建議

- 🎧 建議使用耳機以獲得最佳音效體驗
- 🌙 在暗室中遊玩效果更佳
- ⚠️ 心臟病患者請謹慎遊玩
- 👥 可與朋友一起遊玩增加樂趣

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善遊戲！

## 📜 授權

此專案使用 MIT 授權條款。

---

**祝你遊戲愉快！記住，在深夜孤宅中，任何事情都可能發生... 👻**
