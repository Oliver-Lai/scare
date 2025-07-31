# 部署指南

## 快速部署到 GitHub Pages

### 步驟 1: 準備 Repository
1. 在 GitHub 上創建新的 repository
2. Repository 名稱建議使用 `horror-escape-game` 或類似名稱
3. 確保 repository 是 public（GitHub Pages 免費版需要）

### 步驟 2: 上傳檔案
將以下檔案上傳到 repository：
- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `_config.yml`（Jekyll 配置）
- `assets/` 資料夾（包含音效檔案）

### 步驟 3: 啟用 GitHub Pages
1. 前往 repository 的 Settings 頁面
2. 滾動到 "Pages" 部分
3. 在 "Source" 下選擇 "Deploy from a branch"
4. 選擇 "main" 分支
5. 選擇 "/ (root)" 資料夾
6. 點擊 "Save"

### 步驟 4: 訪問網站
- GitHub Pages 會生成一個 URL：`https://yourusername.github.io/repositoryname`
- 首次部署可能需要幾分鐘時間

## 本地測試

### 使用 Python（如果已安裝）
```bash
cd 專案資料夾
python -m http.server 8000
```
然後訪問 `http://localhost:8000`

### 使用 Node.js（如果已安裝）
```bash
cd 專案資料夾
npx serve -p 8000
```
然後訪問 `http://localhost:8000`

### 使用 Live Server（VS Code 擴充功能）
1. 安裝 "Live Server" 擴充功能
2. 右鍵點擊 `index.html`
3. 選擇 "Open with Live Server"

## 音效檔案設置

由於版權限制，你需要自行添加音效檔案：

1. 下載合適的音效檔案
2. 重新命名為：
   - `creepy_music.mp3` - 背景音樂
   - `scream.mp3` - 驚嚇音效
3. 放置在 `assets/` 資料夾中

## 自定義設定

### 修改難度
在 `script.js` 中修改：
```javascript
this.maxErrors = 3; // 改為你想要的錯誤次數上限
```

### 修改密碼
在 `script.js` 中修改：
```javascript
this.correctCode = "2581"; // 改為你想要的密碼
```

### 添加新場景
1. 在 `index.html` 中添加新的 SVG 場景
2. 在 `script.js` 中添加場景切換邏輯
3. 在 `styles.css` 中添加相應樣式

## 問題排解

### 音效無法播放
- 確保音效檔案格式為 MP3
- 檢查檔案路徑是否正確
- 現代瀏覽器需要用戶互動才能播放音效

### 圖片顯示問題
- 所有圖形都使用 SVG 代碼，不依賴外部圖片檔案
- 如果 SVG 顯示異常，檢查瀏覽器兼容性

### 在手機上顯示問題
- 遊戲已針對響應式設計優化
- 確保在手機瀏覽器中啟用 JavaScript

## 技術規格

- **HTML5**: 結構和內容
- **CSS3**: 樣式和動畫
- **JavaScript ES6+**: 遊戲邏輯
- **SVG**: 所有圖形元素
- **Web Audio API**: 音效處理

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 效能優化建議

1. 音效檔案大小控制在 1MB 以下
2. 使用 SVG 而非 PNG/JPG 圖片
3. 避免同時播放多個音效
4. 在低效能設備上可關閉部分動畫效果
