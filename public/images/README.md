# Image folders

- `manual/`: 現在の手作業の実験写真
- `biofoundry/`: Biofoundry型の装置・工程画像
- `robot-arm/`: ロボットアーム型の装置・工程画像
- `papers/`: ライセンス確認済みの論文図（必要な場合のみ）

Viteでは `public/images/manual/example.png` はコードから `/images/manual/example.png` と参照します。

画像を追加したら `src/data.js` の各 step にある `manualImage`, `bioImage`, `robotImage` を更新してください。
