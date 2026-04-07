# 🧠 CareTrack — 部署與 Google 雲端設定指南

## 架構說明

```
iPhone Safari → 加入主畫面 → 像 App 一樣打開
     ↕
Google 登入（你的私人帳號）
     ↕
Google Drive（自動建立 caretrack-data.json）
     ↕
分享給家人 → 家人也用 Google 登入 → 同步同一份資料
```

---

## 📋 設定步驟（一次性，約 10 分鐘）

### Step 1：建立 Google Cloud 專案

1. 打開 https://console.cloud.google.com/
2. 用你的私人 Google 帳號登入
3. 點左上「Select a project」→「NEW PROJECT」
4. 名稱填 `CareTrack`，點 Create

### Step 2：啟用 Google Drive API

1. 左側選單 → APIs & Services → Library
2. 搜尋「Google Drive API」→ 點進去 → 點 **ENABLE**

### Step 3：設定 OAuth 同意畫面

1. 左側 → APIs & Services → OAuth consent screen
2. 選 **External** → Create
3. 填寫：
   - App name: `CareTrack`
   - User support email: 你的 email
   - Developer contact: 你的 email
4. 點 Save → 下一步都跳過到最後

### Step 4：建立 OAuth Client ID

1. 左側 → APIs & Services → Credentials
2. 點 「+ CREATE CREDENTIALS」→「OAuth client ID」
3. Application type: **Web application**
4. Name: `CareTrack Web`
5. Authorized JavaScript origins 加入：
   - `https://你的netlify網址.netlify.app`
   - `http://localhost:8080`（測試用）
6. 點 Create
7. 📋 **複製 Client ID**（長得像 `xxxxxx.apps.googleusercontent.com`）

### Step 5：把 Client ID 填入 App

1. 打開 `pwa/index.html`
2. 搜尋 `YOUR_GOOGLE_CLIENT_ID`
3. 替換成你剛才複製的 Client ID

### Step 6：部署到 Netlify

1. 打開 https://app.netlify.com/drop
2. 把 `pwa/` 資料夾拖進去
3. 拿到網址（例如 `https://sparkly-xxx.netlify.app`）
4. 回 Google Cloud Console → Credentials → 編輯 OAuth Client
5. 把 Netlify 網址加到 Authorized JavaScript origins

### Step 7：手機使用

1. iPhone Safari 打開你的 Netlify 網址
2. 點「Google 登入」
3. 點 Safari 分享 ⬆️ →「加入主畫面」
4. 桌面出現 CareTrack 圖標 🎉

---

## 👨‍👩‍👧 家人共同使用

1. 你先登入使用一次（會自動在 Google Drive 建立資料檔）
2. 打開 Google Drive → 找到「CareTrack」資料夾
3. 右鍵 →「Share」→ 輸入家人的 Google email
4. 家人用同一個 Netlify 網址打開 → 用自己的 Google 登入
5. App 會自動找到共享的資料 → 同步！

---

## ❓ FAQ

**Q: 資料安全嗎？**
A: 資料只存在你自己的 Google Drive，Google 加密傳輸，只有你和你分享的人能看到。

**Q: 沒有網路能用嗎？**
A: 可以！App 會先存在手機本地，有網路時自動同步到 Drive。

**Q: 費用？**
A: 完全免費（Google Drive 15GB、Netlify 免費方案）
