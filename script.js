// 遊戲狀態管理
class HorrorEscapeGame {
    constructor() {
        // 遊戲狀態
        this.currentScene = 'titleScreen';
        this.cluesFound = 0;
        this.totalClues = 3;
        this.gameStarted = false;
        this.jumpScareTriggered = false;
        
        // 謎題狀態
        this.puzzleStates = {
            bookshelfExamined: false,
            mirrorCodeFound: false,
            chestOpened: false,
            finalCodeEntered: false
        };
        
        // 物品描述
        this.itemDescriptions = {
            sofa: {
                title: "舊沙發",
                description: "一張破舊的沙發，坐墊下似乎藏著什麼東西..."
            },
            tv: {
                title: "老舊電視",
                description: "螢幕上只有雪花雜訊，但隱約可見數字：2..."
            },
            bookshelf: {
                title: "神秘書架",
                description: "書架上有一本特別的書，封面寫著：「鏡中真相」。你獲得了第一個線索！"
            },
            door: {
                title: "客廳門",
                description: "門被鎖住了，需要找到鑰匙或密碼才能打開。"
            },
            picture: {
                title: "詭異相框",
                description: "相框中的照片很模糊，但似乎有人在看著你..."
            },
            bathtub: {
                title: "古老浴缸",
                description: "浴缸底部有划痕，像是有人想要逃脫..."
            },
            mirror: {
                title: "破碎鏡子",
                description: "鏡子有裂痕，但反射中出現了數字：5。你獲得了第二個線索！"
            },
            cabinet: {
                title: "藥櫃",
                description: "裡面有各種藥瓶，其中一瓶標籤寫著：「最後的希望」"
            },
            chest: {
                title: "神秘箱子",
                description: "沉重的木箱，上面刻著數字：8。你獲得了第三個線索！"
            },
            skull: {
                title: "骷髏頭",
                description: "一個古老的骷髏，眼眶中似乎有紅光閃爍..."
            },
            lockedDoor: {
                title: "密碼門",
                description: "這是通往自由的最後一道門，需要4位數密碼..."
            }
        };
        
        // 正確密碼 (從線索中獲得：2, 5, 8 + 最後一位數字1)
        this.correctCode = "2581";
        
        this.init();
    }
    
    // 初始化遊戲
    init() {
        this.setupEventListeners();
        this.updateGameStatus();
        this.addAmbientHorrorEffects();
        
        // 嘗試播放背景音樂（需要用戶互動）
        document.addEventListener('click', this.playBackgroundMusic.bind(this), { once: true });
    }
    
    // 設置事件監聽器
    setupEventListeners() {
        // 開始遊戲按鈕
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        // 物品點擊事件 - 簡化版本
        document.addEventListener('click', (e) => {
            console.log('點擊事件:', e.target.tagName, e.target.getAttribute('data-item'));
            
            // 直接檢查點擊的元素
            const itemType = e.target.getAttribute('data-item');
            if (itemType && this.gameStarted) {
                console.log('處理物品點擊:', itemType);
                e.preventDefault();
                e.stopPropagation();
                this.handleItemClick(itemType);
            }
        });
        
        // 鍵盤事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDialog();
            }
        });
    }
    
    // 播放背景音樂
    playBackgroundMusic() {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => {
            console.log('無法播放背景音樂:', e);
        });
    }
    
    // 開始遊戲
    startGame() {
        this.gameStarted = true;
        this.goToScene('livingRoom');
        this.playBackgroundMusic();
        
        // 為所有可點擊的 SVG 元素添加直接的點擊事件
        this.setupSVGClickHandlers();
    }
    
    // 為 SVG 元素設置點擊處理器
    setupSVGClickHandlers() {
        // 等待 DOM 更新後設置事件
        setTimeout(() => {
            const clickableElements = document.querySelectorAll('.clickable[data-item]');
            clickableElements.forEach(element => {
                // 移除之前的事件監聽器（如果有的話）
                element.removeEventListener('click', this.handleSVGClick);
                // 添加新的事件監聽器
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const itemType = element.getAttribute('data-item');
                    console.log('SVG 元素被點擊:', itemType); // 調試信息
                    this.handleItemClick(itemType);
                });
                
                // 添加視覺反饋
                element.style.cursor = 'pointer';
            });
        }, 100);
    }
    
    // 切換場景
    goToScene(sceneName) {
        console.log('=== 場景切換開始 ===');
        console.log('目標場景:', sceneName);
        console.log('遊戲已開始:', this.gameStarted);
        
        // 隱藏所有場景和畫面
        const allElements = document.querySelectorAll('.scene, .screen');
        console.log('找到的場景元素數量:', allElements.length);
        allElements.forEach(element => {
            element.classList.remove('active');
            element.style.display = 'none';
        });
        
        // 顯示目標場景
        const targetScene = document.getElementById(sceneName);
        if (targetScene) {
            targetScene.style.display = 'block';
            targetScene.classList.add('active');
            this.currentScene = sceneName;
            console.log('✅ 成功切換到場景:', sceneName);
            console.log('場景元素:', targetScene);
        } else {
            console.error('❌ 找不到場景:', sceneName);
            // 列出所有可用場景
            const availableScenes = document.querySelectorAll('[id]');
            console.log('可用的元素ID:', Array.from(availableScenes).map(el => el.id));
        }
        console.log('=== 場景切換結束 ===');
    }
    
    // 處理物品點擊
    handleItemClick(itemType) {
        console.log('=== 處理物品點擊開始 ===');
        console.log('物品類型:', itemType);
        console.log('遊戲已開始:', this.gameStarted);
        console.log('當前場景:', this.currentScene);
        console.log('已找到線索數:', this.cluesFound);
        
        if (!this.gameStarted) {
            console.log('遊戲尚未開始，忽略點擊');
            this.showDialog('遊戲提示', '請先點擊「開始遊戲」按鈕！');
            return;
        }
        
        const item = this.itemDescriptions[itemType];
        if (!item) {
            console.log('找不到物品描述:', itemType);
            return;
        }
        
        console.log('找到物品:', item.title);
        console.log('物品描述:', item.description);
        
        // 添加點擊動畫效果
        const clickedElement = document.querySelector(`[data-item="${itemType}"]`);
        if (clickedElement) {
            clickedElement.style.animation = 'none';
            setTimeout(() => {
                clickedElement.style.animation = 'subtle-float 3s ease-in-out infinite, pulse 0.5s ease-out';
            }, 10);
            
            // 重置動畫
            setTimeout(() => {
                clickedElement.style.animation = 'subtle-float 3s ease-in-out infinite';
            }, 500);
        }
        
        // 特殊物品的特殊處理
        switch (itemType) {
            case 'bookshelf':
                if (!this.puzzleStates.bookshelfExamined) {
                    this.puzzleStates.bookshelfExamined = true;
                    this.cluesFound++;
                    this.updateGameStatus();
                    this.addSparkleEffect(clickedElement);
                }
                break;
                
            case 'mirror':
                if (!this.puzzleStates.mirrorCodeFound) {
                    this.puzzleStates.mirrorCodeFound = true;
                    this.cluesFound++;
                    this.updateGameStatus();
                    this.addSparkleEffect(clickedElement);
                }
                break;
                
            case 'chest':
                if (!this.puzzleStates.chestOpened) {
                    this.puzzleStates.chestOpened = true;
                    this.cluesFound++;
                    this.updateGameStatus();
                    this.addSparkleEffect(clickedElement);
                }
                break;
                
            case 'skull':
                // 觸發 Jump Scare
                this.triggerJumpScare();
                return;
                
            case 'lockedDoor':
                if (this.cluesFound >= 3) {
                    this.showCodeDialog();
                } else {
                    this.showItemDialog('密碼門', '你需要先找到所有線索才能輸入密碼！');
                }
                return;
                
            case 'picture':
                // 第一次點擊相框觸發 Jump Scare
                if (!this.jumpScareTriggered) {
                    this.jumpScareTriggered = true;
                    this.triggerJumpScare();
                    return;
                } else {
                    // 已經觸發過的話，顯示不同的描述
                    this.showItemDialog('空蕩相框', '相框中的詭異人影已經消失了...');
                    return;
                }
                break;
                
            case 'tv':
                // 添加電視雜訊效果
                this.addTVStaticEffect();
                break;
        }
        
        // 顯示物品描述
        this.showItemDialog(item.title, item.description);
    }
    
    // 添加閃爍特效
    addSparkleEffect(element) {
        if (!element) return;
        
        element.classList.add('glow');
        setTimeout(() => {
            element.classList.remove('glow');
        }, 2000);
    }
    
    // 添加電視雜訊效果
    addTVStaticEffect() {
        const tv = document.querySelector('[data-item="tv"]');
        if (tv) {
            tv.classList.add('horror-flicker');
            setTimeout(() => {
                tv.classList.remove('horror-flicker');
            }, 1000);
        }
    }
    
    // 添加環境恐怖效果
    addAmbientHorrorEffects() {
        // 隨機閃爍燈光
        setInterval(() => {
            if (Math.random() < 0.05 && this.gameStarted) { // 5% 機率
                const gameContainer = document.getElementById('gameContainer');
                gameContainer.style.filter = 'brightness(0.3) contrast(2)';
                setTimeout(() => {
                    gameContainer.style.filter = '';
                }, 100);
            }
        }, 2000);
        
        // 隨機添加恐怖音效
        setInterval(() => {
            if (Math.random() < 0.02 && this.gameStarted) { // 2% 機率
                this.playRandomHorrorSound();
            }
        }, 5000);
    }
    
    // 播放隨機恐怖音效（可以是腳步聲、門吱聲等）
    playRandomHorrorSound() {
        // 這裡可以播放各種環境音效
        // 目前使用現有的驚嚇音效，但音量較小
        const scareSound = document.getElementById('scareSound');
        scareSound.volume = 0.1;
        scareSound.play().catch(e => {
            console.log('無法播放環境音效:', e);
        });
        
        // 恢復正常音量
        setTimeout(() => {
            scareSound.volume = 0.7;
        }, 100);
    }
    
    // 顯示物品對話框
    showItemDialog(title, description) {
        document.getElementById('itemTitle').textContent = title;
        document.getElementById('itemDescription').textContent = description;
        document.getElementById('itemDialog').classList.add('active');
    }
    
    // 顯示密碼輸入對話框
    showCodeDialog() {
        document.getElementById('codeDialog').classList.add('active');
        document.getElementById('codeInput').focus();
    }
    
    // 關閉對話框
    closeDialog() {
        document.querySelectorAll('.dialog').forEach(dialog => {
            dialog.classList.remove('active');
        });
        document.getElementById('codeInput').value = '';
    }
    
    // 檢查密碼
    checkCode() {
        const inputCode = document.getElementById('codeInput').value;
        
        if (inputCode === this.correctCode) {
            // 密碼正確，遊戲勝利
            this.closeDialog();
            this.gameWin();
        } else {
            // 密碼錯誤，給予提示但不懲罰
            this.showItemDialog('密碼錯誤', '密碼不正確！提示：仔細觀察房間裡的數字線索，按照發現順序排列。');
            document.getElementById('codeInput').value = '';
        }
    }
    
    // 觸發 Jump Scare
    triggerJumpScare() {
        console.log('=== Jump Scare 觸發 ===');
        const jumpScare = document.getElementById('jumpScare');
        const scareSound = document.getElementById('scareSound');
        const gameContainer = document.getElementById('gameContainer');
        
        if (!jumpScare) {
            console.error('找不到 jumpScare 元素');
            return;
        }
        
        console.log('Jump Scare 元素找到，開始顯示...');
        
        // 添加震動效果到整個遊戲容器
        if (gameContainer) {
            gameContainer.style.animation = 'jumpScareShake 0.5s ease-in-out';
        }
        
        // 播放驚嚇音效
        if (scareSound) {
            scareSound.volume = 0.7;
            scareSound.play().catch(e => {
                console.log('無法播放驚嚇音效:', e);
            });
        }
        
        // 顯示驚嚇畫面
        jumpScare.style.display = 'flex';
        jumpScare.classList.add('active');
        
        console.log('Jump Scare 畫面已顯示');
        
        // 添加恐怖效果到身體
        document.body.style.filter = 'contrast(2) brightness(0.3)';
        
        // 隨機閃爍效果
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
            document.body.style.filter = flickerCount % 2 === 0 ? 
                'contrast(3) brightness(2) hue-rotate(180deg)' : 
                'contrast(1) brightness(0.1)';
            flickerCount++;
            
            if (flickerCount > 10) {
                clearInterval(flickerInterval);
                document.body.style.filter = '';
            }
        }, 50);
        
        // 3 秒後隱藏 Jump Scare
        setTimeout(() => {
            jumpScare.style.display = 'none';
            jumpScare.classList.remove('active');
            document.body.style.filter = '';
            if (gameContainer) {
                gameContainer.style.animation = '';
            }
            console.log('Jump Scare 已隱藏');
        }, 3000);
    }
    
    // 更新遊戲狀態顯示
    updateGameStatus() {
        document.getElementById('clueCount').textContent = this.cluesFound;
        
        // 如果找到所有線索，提示玩家
        if (this.cluesFound === this.totalClues && !this.puzzleStates.finalCodeEntered) {
            setTimeout(() => {
                this.showItemDialog('所有線索已收集', '你已經找到了所有線索！現在可以去地下室輸入密碼了。提示：按照你發現線索的順序排列數字。');
            }, 1000);
        }
    }
    
    // 遊戲勝利
    gameWin() {
        this.puzzleStates.finalCodeEntered = true;
        
        // 停止背景音樂
        document.getElementById('bgMusic').pause();
        
        // 顯示勝利畫面
        setTimeout(() => {
            this.goToScene('winScreen');
        }, 500);
    }
    
    // 遊戲失敗
    gameOver() {
        // 停止背景音樂
        document.getElementById('bgMusic').pause();
        
        // 顯示失敗畫面
        this.goToScene('gameOverScreen');
    }
    
    // 重新開始遊戲
    restartGame() {
        // 重置遊戲狀態
        this.currentScene = 'titleScreen';
        this.errorCount = 0;
        this.cluesFound = 0;
        this.gameStarted = false;
        
        // 重置謎題狀態
        Object.keys(this.puzzleStates).forEach(key => {
            this.puzzleStates[key] = false;
        });
        
        // 關閉所有對話框
        this.closeDialog();
        
        // 隱藏Jump Scare
        document.getElementById('jumpScare').classList.remove('active');
        
        // 更新狀態顯示
        this.updateGameStatus();
        
        // 回到標題畫面
        this.goToScene('titleScreen');
        
        // 重新開始背景音樂
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.currentTime = 0;
    }
}

// 全域函數（供 HTML 調用）
let game;

// 等待 DOM 載入完成後初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 載入完成，初始化遊戲'); // 調試信息
    game = new HorrorEscapeGame();
    
    // 添加全域測試函數
    window.testItemClick = function(itemType) {
        console.log('測試點擊:', itemType);
        if (game) {
            game.handleItemClick(itemType);
        } else {
            console.log('遊戲物件不存在');
        }
    };
    
    // 檢查 SVG 元素是否存在
    setTimeout(() => {
        const clickableElements = document.querySelectorAll('.clickable[data-item]');
        console.log('找到可點擊元素數量:', clickableElements.length);
        clickableElements.forEach(el => {
            console.log('元素:', el.getAttribute('data-item'), el.tagName);
        });
    }, 1000);
});

// 場景切換函數（供 HTML 調用）
function goToScene(sceneName) {
    console.log('=== 全域 goToScene 被調用 ===');
    console.log('目標場景:', sceneName);
    console.log('game 物件存在:', !!game);
    
    if (game && game.goToScene) {
        game.goToScene(sceneName);
    } else {
        console.error('game 物件或 goToScene 方法不存在');
        
        // 緊急備用場景切換邏輯
        console.log('使用備用場景切換邏輯');
        const allScenes = document.querySelectorAll('.scene, .screen');
        allScenes.forEach(scene => {
            scene.classList.remove('active');
            scene.style.display = 'none';
        });
        
        const targetScene = document.getElementById(sceneName);
        if (targetScene) {
            targetScene.style.display = 'block';
            targetScene.classList.add('active');
            console.log('✅ 備用邏輯成功切換到:', sceneName);
        } else {
            console.error('❌ 找不到場景:', sceneName);
        }
    }
}

// 密碼檢查函數（供 HTML 調用）
function checkCode() {
    console.log('=== checkCode 被調用 ===');
    if (game && game.checkCode) {
        game.checkCode();
    } else {
        console.error('game 物件或 checkCode 方法不存在');
    }
}

// 關閉對話框函數（供 HTML 調用）
function closeDialog() {
    console.log('=== closeDialog 被調用 ===');
    if (game && game.closeDialog) {
        game.closeDialog();
    } else {
        console.error('game 物件或 closeDialog 方法不存在');
        // 緊急備用關閉邏輯
        const dialog = document.getElementById('itemDialog');
        if (dialog) {
            dialog.style.display = 'none';
        }
    }
}

// 重新開始遊戲函數（供 HTML 調用）
function restartGame() {
    console.log('=== restartGame 被調用 ===');
    if (game && game.restartGame) {
        game.restartGame();
    } else {
        console.error('game 物件或 restartGame 方法不存在');
        // 重新載入頁面
        window.location.reload();
    }
}

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    if (!game || !game.gameStarted) return;
    
    switch (e.key) {
        case '1':
            if (game.currentScene !== 'livingRoom') {
                goToScene('livingRoom');
            }
            break;
        case '2':
            if (game.currentScene !== 'bathroom') {
                goToScene('bathroom');
            }
            break;
        case '3':
            if (game.currentScene !== 'basement') {
                goToScene('basement');
            }
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey) {
                e.preventDefault();
                restartGame();
            }
            break;
    }
});

// 添加滑鼠懸停效果
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('clickable')) {
        e.target.classList.add('glow');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('clickable')) {
        e.target.classList.remove('glow');
    }
});

// 預載入音效（提高體驗）
window.addEventListener('load', () => {
    const bgMusic = document.getElementById('bgMusic');
    const scareSound = document.getElementById('scareSound');
    
    // 預載入音效
    bgMusic.load();
    scareSound.load();
});

// 防止右鍵選單（增加沉浸感）
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 防止選取文字（增加沉浸感）
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
});

// 視窗失焦時暫停音樂
window.addEventListener('blur', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic.paused) {
        bgMusic.pause();
        window.musicWasPaused = false;
    } else {
        window.musicWasPaused = true;
    }
});

// 視窗重新獲得焦點時恢復音樂
window.addEventListener('focus', () => {
    if (!window.musicWasPaused && game && game.gameStarted) {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().catch(e => {
            console.log('無法恢復背景音樂:', e);
        });
    }
});

// 輸入框 Enter 鍵支援
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'codeInput') {
        checkCode();
    }
});

// 調試模式（開發時使用）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugGame = () => {
        console.log('Game State:', game);
        console.log('Current Scene:', game.currentScene);
        console.log('Clues Found:', game.cluesFound);
        console.log('Error Count:', game.errorCount);
        console.log('Puzzle States:', game.puzzleStates);
    };
    
    // 開發者快捷鍵
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.key) {
                case 'D':
                    e.preventDefault();
                    window.debugGame();
                    break;
                case 'W':
                    e.preventDefault();
                    if (game) game.gameWin();
                    break;
                case 'L':
                    e.preventDefault();
                    if (game) game.gameOver();
                    break;
                case 'C':
                    e.preventDefault();
                    if (game) {
                        game.cluesFound = 3;
                        game.updateGameStatus();
                    }
                    break;
            }
        }
    });
}

// 測試和調試函數
function testGame() {
    console.log('=== 遊戲測試 ===');
    console.log('Game 物件:', window.game);
    console.log('遊戲狀態:', window.game ? window.game.gameStarted : '未初始化');
    
    if (window.game) {
        console.log('當前場景:', window.game.currentScene);
        console.log('線索數:', window.game.cluesFound);
        
        // 測試各個物品
        console.log('測試沙發點擊...');
        window.game.handleItemClick('sofa');
        
        console.log('測試電視點擊...');
        window.game.handleItemClick('tv');
    }
}

function debugClickables() {
    console.log('=== 檢查可點擊元素 ===');
    const clickables = document.querySelectorAll('.clickable[data-item]');
    console.log('找到', clickables.length, '個可點擊元素:');
    
    clickables.forEach((element, index) => {
        const itemType = element.getAttribute('data-item');
        console.log(`${index + 1}. ${element.tagName} - ${itemType}`);
    });
}

// 將測試函數設為全域
window.testGame = testGame;
window.debugClickables = debugClickables;
