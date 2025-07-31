# 深夜孤宅 - 點擊事件除錯指南

## 問題描述
用戶回報「點物件沒有反應」，SVG 元素的點擊事件無法正常觸發。

## 解決方案

### 1. 簡化事件處理 (script.js)
- 移除複雜的事件委託邏輯
- 改用直接檢查 `data-item` 屬性的方式
- 添加詳細的調試日誌

### 2. 添加直接 onclick 事件 (index.html)
為所有主要互動物件的 `<g>` 標籤添加：
- `onclick="handleItemClick('物品名稱')"`
- `style="cursor: pointer;"`

已修正的物件：
- 沙發 (`sofa`)
- 電視 (`tv`) 
- 書架 (`bookshelf`)
- 相框 (`picture`)
- 浴缸 (`bathtub`)
- 鏡子 (`mirror`)
- 藥櫃 (`cabinet`)
- 箱子 (`chest`)
- 骷髏 (`skull`)
- 密碼門 (`lockedDoor`)

### 3. 全域函數 (index.html)
添加全域函數來處理點擊和場景切換：
```javascript
function handleItemClick(itemType) // 處理物品點擊
function goToScene(sceneName)      // 處理場景切換
```

### 4. 測試工具 (script.js)
添加調試函數：
```javascript
testGame()        // 測試遊戲基本功能
debugClickables() // 檢查可點擊元素
```

## 測試步驟

### 在瀏覽器中測試：
1. 打開 `index.html`
2. 按 F12 開啟開發者工具
3. 點擊「開始遊戲」
4. 嘗試點擊各個物件
5. 查看控制台是否有調試信息

### 控制台命令：
```javascript
// 檢查遊戲狀態
window.game

// 測試遊戲功能
testGame()

// 檢查可點擊元素
debugClickables()

// 手動測試物品點擊
handleItemClick('sofa')
```

## 預期行為
- 點擊物件後應該：
  1. 在控制台顯示詳細調試信息
  2. 彈出對話框顯示物品描述
  3. 如果是線索物品，更新遊戲狀態

## 故障排除
如果點擊仍無反應：
1. 檢查控制台是否有錯誤
2. 確認遊戲已開始 (`game.gameStarted === true`)
3. 使用 `debugClickables()` 確認元素設置
4. 嘗試使用 `testGame()` 手動測試

## 備用測試頁面
`test.html` - 簡化版本，用於驗證基本點擊功能
