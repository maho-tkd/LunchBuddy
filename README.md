# Developer Document
## セットアップ
```bash
# aws-amplify/cliをインストール
$ npm i -g @aws-amplify/cli

# package.json をインストール
$ npm i

# /src/* のフロントエンドを静的ファイル（/build）に出力
$ npm run build

# バックエンドとフロントエンドをデプロイ
$ amplify  publish
```

## ディレクトリ構成
```bash
project-root/
├── amplify/                       # Amplify CLIによるバックエンド管理ディレクトリ
│   ├── backend/                   # バックエンドリソースの定義
│   │   ├── api/                   # REST API の設定
│   │   │   └── backendApi/        # API Gateway + Lambda
│   │   │       ├── parameters.json
│   │   │       └── template.json  # APIのCFNテンプレート
│   │   └── function/              # Lambda関数
│   │   　   └── /lunchBuddyBackednApi
│   │           └── src/           # Lambda関数のコード（ロジック）
│   ├── #current-cloud-backend/    # 現在のクラウド状態
│   └── team-provider-info.json    # チーム環境ごとの設定情報
├── src/                           # フロントエンドのコード（React）
├── build/                         # Reactの静的ファイル
├── package.json                   # フロントエンドの依存関係
└── README.md                      # プロジェクト概要
```