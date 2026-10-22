# Reverse Engineer Web Game

網頁 [https://www.wesane.com/game/649/](https://www.wesane.com/game/649/) 是**微傘遊戲（Wesane Game）**平台上的 HTML5 益智小遊戲——**《Order Parking》（順序停車）**。由於該網頁採用遊戲引擎動態渲染畫面，一般爬蟲或檢視原始碼時只會看到標題與 `loading......` 字樣。

以下從**遊戲內容**、**前端技術架構**以及**開發者逆向／資源檢視方式**三個維度解析：

---

## 1. 網頁基本資訊與遊戲內容

| 項目 | 解析結果 |
| --- | --- |
| **網頁標題 (Title)** | `Mini game: Order Parking` |
| **所屬平台** | 微傘遊戲（Wesane.com，即曾推出《合成大西瓜》`game/654` 的 H5 遊戲平台） |
| **遊戲編號** | `649` |
| **遊戲類型** | 休閒益智／路徑規劃解謎（Puzzle / Parking Jam 類） |
| **核心玩法** | **按照正確順序點擊車輛**，讓每台車沿著道路順利駛入對應的停車位；若發車順序錯誤，車輛會在路口或轉角發生碰撞而導致關卡失敗。 |

---

## 2. 網頁前端與技術架構解析

微傘平台的 `/game/[ID]/` 系列網頁皆採用標準的 **Cocos Creator HTML5 單頁結構**，網頁本身的 HTML 幾乎不包含文字內容，所有互動與畫面皆由 JavaScript 在 `<canvas>` 畫布中即時繪製：

### DOM 與載入機制

1. **初始載入層（Loading DOM）**：
網頁載入初期會先顯示純文字或簡易進度條（例如 `loading......32%`），直到引擎核心與首屏圖片、音效載入完畢後，JavaScript 才會將載入層隱藏。
2. **核心畫布（`#GameCanvas`）**：
整個遊戲介面（包含開始按鈕、關卡畫面、車輛動畫、結算畫面）全部渲染在單一 `<canvas id="GameCanvas">` 元素中，並透過 `meta viewport` 鎖定行動端螢幕比例（禁止縮放、自動適配直向螢幕）。

### 典型專案檔案結構

若透過瀏覽器開發者工具（DevTools）檢視該網頁載入的靜態資源，其目錄結構通常包含：

```text
/game/649/
├── index.html            # 網頁入口、Viewport 設定與載入動畫容器
├── main.js               # 遊戲啟動腳本，負責初始化 Cocos 引擎與載入設定檔
├── cocos2d-js-min.js     # Cocos Creator 2D 遊戲引擎核心庫
├── style-mobile.css      # 控制全螢幕 Canvas 與載入畫面的樣式表
├── src/
│   ├── settings.js       # 場景列表、資源 UUID 映射表與專案配置
│   └── project.js        # 編譯打包後的遊戲核心邏輯（車輛移動、碰撞判定、關卡配置）
└── res/
    ├── import/           # 序列化後的場景與預製體（Prefab）JSON 設定檔
    └── raw-assets/       # 遊戲實際使用的圖片素材（PNG/JPG）與音效檔（MP3）

```

---

## 3. 如何進一步擷取素材或分析程式碼？

如果您解析此網頁的目的是為了**研究遊戲邏輯**、**擷取美術素材**或**本地端離線執行**，可以在電腦瀏覽器開啟該網址並按下 `F12`（開發者工具）：

* **提取圖片與音效素材**：切換至 **Network（網路）** 分頁，篩選 `Img` 或 `Media` 並重新整理網頁，即可看到 `res/raw-assets/` 底下所有載入的車輛圖示、道路背景與音效檔案連結。
* **檢視關卡與碰撞邏輯**：切換至 **Sources（來源）** 分頁，展開 `src/project.js`（點擊左下角 `{}` 進行 Pretty-print 格式化），即可搜尋關鍵字來查看車輛路徑演算法與關卡數據。
* **本地端離線部署注意事項**：若直接下載整站檔案至本地端雙擊 `index.html` 開啟，會因瀏覽器 CORS（跨來源資源共用）安全性限制而卡在 `loading......` 畫面；必須使用本地伺服器（如 VS Code 的 `Live Server` 或執行 `python -m http.server`）才能正常載入 `res/` 下的 JSON 與圖片資源。


## Deep Dive

由於微傘遊戲（`[wesane.com/game/649/](https://wesane.com/game/649/)`）是使用 **Cocos Creator** 引擎打包的 HTML5 遊戲，它的圖片、音效與關卡 JSON 並非寫死在 HTML 裡，而是在遊戲啟動時由 JavaScript **動態發送網路請求（XHR / Fetch）** 載入。因此，直接按 `Ctrl + S` 儲存網頁或使用傳統 `wget` 只會抓到空殼，打開會永遠卡在 `loading...`。

要在本地端完整還原並建立可遊玩的網頁，最可靠的流程是：**「攔截動態網路資源並還原目錄結構」→「清理外部廣告腳本」→「啟動本地 HTTP 伺服器」**。以下提供完整操作步驟：

---

## 步驟一：完整爬下所有原始素材（兩種方式擇一）

### 方式 A：使用 Python + Playwright 自動攔截爬蟲（最推薦、結構最完整）

透過自動化瀏覽器開啟遊戲網頁，直接監聽並攔截遊戲引擎發出的每一個底層請求（包含 `src/`、`res/import/`、`res/raw-assets/`），自動按照原始路徑儲存到電腦中。

1. **安裝環境**：在終端機（Terminal 或 CMD）執行以下指令安裝 Playwright：
```bash
pip install playwright
playwright install chromium

```


2. **建立並執行爬蟲腳本**：新增一個 `download_game.py` 檔案，貼上以下程式碼並執行：
```python
import os
import time
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

TARGET_URL = "https://www.wesane.com/game/649/"
BASE_PATH = "/game/649/"
OUTPUT_DIR = "./local_game_649"

def save_response(response):
    url = response.url
    parsed = urlparse(url)

    # 只攔截屬於該遊戲目錄下的資源（或同網域的共用腳本）
    if "wesane.com" in parsed.netloc and response.status == 200:
        # 將網址路徑轉換為本地相對路徑
        rel_path = parsed.path
        if rel_path.startswith(BASE_PATH):
            rel_path = rel_path[len(BASE_PATH):]
        else:
            rel_path = rel_path.lstrip("/")

        if not rel_path or rel_path.endswith("/"):
            rel_path += "index.html"

        local_file_path = os.path.join(OUTPUT_DIR, rel_path)
        os.makedirs(os.path.dirname(local_file_path), exist_ok=True)

        try:
            body = response.body()
            with open(local_file_path, "wb") as f:
                f.write(body)
            print(f"[已下載] {rel_path} ({len(body)} bytes)")
        except Exception as e:
            print(f"[略過] 無法讀取內容: {rel_path} ({e})")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with sync_playwright() as p:
        # 開啟有頭模式瀏覽器，方便觀察載入進度並手動點擊觸發後續關卡資源
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 414, "height": 736},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()

        # 綁定網路回應監聽器
        page.on("response", save_response)

        print(f"正在開啟 {TARGET_URL} 並攔截所有素材...")
        page.goto(TARGET_URL, wait_until="networkidle")

        print("\n=== 請在彈出的瀏覽器視窗中確認遊戲已載入到 100% ===")
        print("=== 建議點擊進入第一關並試玩幾秒，確保音效與關卡素材皆被觸發載入 ===")
        print("等待 20 秒後自動結束並關閉瀏覽器...")
        time.sleep(20)

        browser.close()
        print(f"\n所有素材已完整儲存至: {os.path.abspath(OUTPUT_DIR)}")

if __name__ == "__main__":
    main()

```



---

### 方式 B：免寫程式，使用 Chrome 擴充套件一鍵打包

如果你不想執行 Python 腳本，可以直接使用瀏覽器開發者擴充套件：

1. 在 Chrome 線上應用程式商店安裝 **Save All Resources** 擴充套件。
2. 開啟 [https://www.wesane.com/game/649/](https://www.wesane.com/game/649/)，按下 `F12` 打開開發者工具（DevTools）。
3. 在 DevTools 頂部導覽列找到並切換至 **`ResourcesSaver`** 分頁。
4. 重新整理網頁（`F5`），等待遊戲載入完畢並點擊進入遊戲畫面（讓所有音效與圖片載入）。
5. 勾選 **`Keep folder structure`**（保留資料夾結構），點擊 **`Save All Resources`**，瀏覽器就會將整包遊戲資源壓縮成 `.zip` 下載到電腦中。

---

## 步驟二：檢查本地目錄結構與清理 `index.html`

下載完成並解壓縮後，你的本地資料夾（例如 `local_game_649/`）結構應該長這樣：

```text
local_game_649/
├── index.html               # 遊戲首頁入口
├── style-mobile.css         # 畫面滿版與載入進度條樣式
├── main.js                  # 啟動邏輯與載入流程
├── cocos2d-js-min.js        # Cocos 引擎核心
├── src/
│   ├── settings.js          # 資源 UUID 對照表
│   └── project.js           # 遊戲主程式邏輯
└── res/
    ├── import/              # 場景與關卡設定檔 (*.json)
    └── raw-assets/          # 所有的圖片 (*.png) 與音效 (*.mp3)

```

### 移除外部廣告與統計腳本（避免本地端報錯）

用文字編輯器（如 VS Code 或記事本）打開 `local_game_649/index.html`，將裡面屬於微傘平台的外部廣告與統計追蹤標籤刪除或註解掉，只保留純淨的遊戲載入結構：

* **建議刪除的區塊**：包含 `hm.baidu.com`（百度統計）、`googlesyndication.com`（Google 廣告）或任何指向外部網域的 ``<script>`` 標籤。
* **必須保留的核心區塊**：
* ``<canvas id="GameCanvas">`` 畫布標籤
* 載入 `src/settings.js`、`main.js` 與 `cocos2d-js-min.js` 的本地腳本區塊。


* **路徑檢查**：確認 `index.html` 中的 CSS 與 JS 引用路徑皆為**相對路徑**（例如 `src="src/settings.js"` 而非 `src="/game/649/src/settings.js"`），這樣放在任何資料夾都能正常讀取。

---

## 步驟三：在本地建立網頁伺服器（解決 CORS 限制）

**重要觀念**：直接對著 `index.html` 點兩下（使用 `file://` 協定開啟）**一定會卡在 `loading...**`，因為現代瀏覽器的安全性機制（CORS）禁止本地網頁透過 `XMLHttpRequest` 讀取 `res/import/` 底下的 `.json` 檔案。

你必須透過本地 HTTP 伺服器（`http://localhost`）來開啟它，以下三種方法任選一種即可：

### 方法 1：使用 Python 內建伺服器（最快，免額外安裝）

1. 打開終端機（CMD / PowerShell / Terminal），切換到遊戲資料夾：
```bash
cd local_game_649

```


2. 啟動本地伺服器（連接埠設為 `8080`）：
```bash
python -m http.server 8080

```


3. 打開瀏覽器，在網址列輸入 **`http://localhost:8080`**，即可完整遊玩！

### 方法 2：使用 VS Code 的 Live Server 擴充套件

1. 使用 VS Code 開啟 `local_game_649` 資料夾。
2. 在左側擴充套件市集搜尋並安裝 **Live Server**。
3. 對著 `index.html` 按滑鼠右鍵，選擇 **`Open with Live Server`**，瀏覽器就會自動開啟 [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html) 並正常載入遊戲。

### 方法 3：使用 Node.js `npx serve`

如果電腦有安裝 Node.js，直接在該資料夾下執行：

```bash
npx serve -p 8080

```

接著打開 `http://localhost:8080` 即可。

---

## 補充：如何找到並替換遊戲裡的圖片素材？

如果你想做「換皮（Reskin）」（例如把車子換成自己的圖片，像當年大家把《合成大西瓜》換成各種頭像）：

1. 打開 `local_game_649/res/raw-assets/` 資料夾。
2. 裡面會有許多以兩位十六進位命名的子資料夾（如 `0a/`、`1f/`、`7b/`），點進去即可看到所有的 `.png` 圖片與 `.mp3` 音效。
3. 找到你想替換的車輛或背景圖片，用修圖軟體製作一張**尺寸（長寬像素）完全相同**的 PNG 圖片，並用**一模一樣的檔名**覆蓋原檔。
4. 在瀏覽器按下 `Ctrl + F5`（強制清除快取並重新整理），遊戲畫面就會直接變成你替換後的素材！



## Cleansing

專案中的檔案分為「可直接刪除」**、**「需清理內部程式碼」**與**「必須保留」三類：



### 1. 可直接刪除的檔案（平台廣告與無用殘留）

這些檔案與遊戲核心執行無關，刪除後不會影響遊戲運作：

| 檔案路徑 | 用途說明 | 處理建議 |
| --- | --- | --- |
| **`ads.js`** | 微傘平台用來串接 Google IMA SDK 播放插頁廣告的腳本。| **直接刪除**。清理後的 `index.html` 已移除對它的引用。|
| **`res/share.jpg`** | 社群分享用的預覽縮圖，原本在 `index.html` 中僅放在 `display: none` 的隱藏區塊內。| **直接刪除**。遊戲引擎內部不會讀取此圖片。 |
| **`project_structure.txt`** | 您剛才用來匯出資料夾結構樹的文字紀錄檔。 | **直接刪除**。非遊戲原始檔案。 |
| **`.gitignore`** | Git 版本控制忽略清單。 | **視需求刪除**。若不打算使用 Git 管理專案可直接刪除。 |

您可以在專案根目錄開啟終端機（PowerShell 或 CMD），執行以下指令快速移除無用檔案：

```powershell
del ads.js, project_structure.txt, res\share.jpg

```

---

### 2. 需保留檔案本體、但建議檢查／清理內容的檔案

以下檔案是遊戲啟動所必需的，**不可刪除檔案本身**，但裡面可能殘留微傘平台的外部連結或廣告呼叫：

* **`index.html`（必清）**：
* 需移除 `<base href="/game/649/">` 標籤，否則本地伺服器會找不到相對路徑下的資源。


* 需移除防沉迷腳本（`Anti-addiction.js`）、遠端 jQuery 與 Google 廣告 SDK（`ima3.js`、`adsbygoogle.js`）。直接使用上一則回覆為您整理好的純淨版覆蓋即可。




* **`src/project.js`（選清：移除「更多遊戲」跳轉連結）**：
* 遊戲畫面中通常會有「更多遊戲（More Games）」按鈕，點擊後會強制跳轉回微傘官網。
* 若想徹底斷開外部連線，可用編輯器打開 `src/project.js`，搜尋關鍵字 `wesane.com` 或 `window.location.href`，將跳轉網址替換為空字串 `""` 或將該行註解掉。


* **`main.js`（選清：僅在卡載入時處理）**：
* 負責初始化 Cocos 引擎並讀取 `res/` 素材。若替換純淨版 `index.html` 後能順利進入遊戲，則不需修改 `main.js`。



---

### 3. 絕對不可刪除的核心檔案與資料夾

以下檔案一旦刪除，遊戲將會白屏、破圖或失去聲音：

* **`cocos2d-js-min.js`**：Cocos Creator 2D 遊戲引擎核心庫。


* **`style-mobile.css`** 與 **`singleColor.png`**：控制遊戲畫布滿版置中與基礎背景樣式（`style-mobile.css` 內部通常會引用 `singleColor.png`，保留可避免 Console 出現 404 報錯）。


* **`res/loading.gif`**：網頁開啟第一秒顯示的載入動畫圖示。


* **`src/settings.js`**：記錄 `res/import/` 與 `res/raw-assets/` 所有亂碼檔名（UUID）對應關係的索引表。


* **`res/import/`（全數保留）**：所有場景排版、車輛碰撞框與大圖集切片座標的 `.json` 設定檔。
* **`res/raw-assets/`（全數保留）**：遊戲所有的 `.png` 圖片圖集與 `.mp3` 音效檔。

