# Lab Automation Explorer

Transformationを、

1. 現在の手作業
2. Biofoundry型
3. ロボットアーム型

の3行で比較するWebアプリです。Vanilla JavaScript + Viteで構成しています。

## ローカル起動

```bash
npm install
npm run dev
```

表示された `http://localhost:5173` をブラウザで開きます。

## 写真の入れ方

```text
public/
└─ images/
   ├─ manual/
   ├─ biofoundry/
   ├─ robot-arm/
   └─ papers/
```

例: `public/images/biofoundry/heat-shock.png` を追加した場合、`src/data.js` の該当stepを次のように変更します。

```js
bioImage: '/images/biofoundry/heat-shock.png'
```

同様に、

```js
manualImage: '/images/manual/...'
bioImage: '/images/biofoundry/...'
robotImage: '/images/robot-arm/...'
```

を使います。空文字 `''` の場合は現在の模式図が表示されます。

## GitHubへpush

新しいリポジトリとして始める場合:

```bash
git init
git add .
git commit -m "Initial lab automation explorer"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/lab-automation-explorer.git
git push -u origin main
```

すでにGitHub側で空のrepoを作ってから、`YOUR_NAME` を自分のGitHubユーザー名へ置き換えてください。

## Vercelへデプロイ

### GitHub連携（推奨）

1. Vercelで **Add New → Project**
2. GitHubの `lab-automation-explorer` をImport
3. Framework Presetが **Vite** になっていることを確認
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

以後は `main` にpushするたびにVercelが自動再デプロイします。

### Vercel CLIを使う場合

```bash
npm install -g vercel
vercel
```

本番反映:

```bash
vercel --prod
```

## 主な編集場所

- `src/data.js`: 工程、説明、画像パス、装置名
- `src/styles.css`: デザイン、カードサイズ、色
- `src/main.js`: 表示ロジック
- `public/images/`: 写真・論文図

## 現状

- Transformationを実装済み
- Manual / Biofoundry / Robot arm の3行比較
- Manual写真6枚を格納済み
- Biofoundry / Robot arm画像は今後追加
