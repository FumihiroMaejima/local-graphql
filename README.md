# Local GraphQL Server

ローカルで`node.js`+`express`のGraphQLサーバーを構築する為の手順書

# 構成

| 名前 | バージョン |
| :--- | :---: |
| npm | 6.14.15 |
| node | 12.22.7 |
| yarn | 1.22.17 |
| TypeScript | 4.4.4 |

---
# ローカル環境の構築(Mac)


## パッケージのインストール

```shell-session
$ yarn add graphql express express-graphql apollo-server-express
$ yarn add --dev @types/express ts-node
```

## ソースのビルドとサーバーの起動

```shell-session
$ yarn build
$ yarn dev
```

## devサーバーの実行はts-nodeで

```shell-session
$ yarn dev
```

2021/11/08 現在、下記のコマンド指定では下記の様なエラーが発生する。

`Unknown file extension ".ts"`

```json
"scripts": {
  "dev": "ts-node src/index.ts",
}
```

理由は`type`の設定が`module`になっている為、`ESModules`が有効になっている為。

`ts-node/esm`を指定する事で実行する事が出来る。

```json
"scripts": {
  "dev": "node --loader ts-node/esm src/index.ts",
}
```

## クエリの実行
```graphql
{
  message
}
```

---

## Apollo Server(apollo-server-express)の実行

下記のscriptを実行する事でapolloのサーバーを起動する。

```shell-session
$ yarn dev
```

サーバーを起動すると、　`https://studio.apollographql.com/sandbox/explorer`にリダイレクトする。

外部サイトのサンドボックス上からローカルのサーバーにGUIでリクエストを送る事になる。

---

## GraphiQL(express-graphql)の実行

下記のscriptを実行する事でGraphiqlのサーバーを起動する。

```shell-session
$ yarn graphi
```

GUI上で`query`と`query variables`を記載してレスポンスを取得出来る。

---

## GraphQLについて

### クエリ言語

GraphQLサーバーに対してリクエストを送る為の言語

| クエリの種類 | 意味 | アクション |
| :--- | :---: | :--- |
| query | データ取得 | GET |
| mutation | データ更新 | POST/PUT/DELETE...etc |
| subscription | イベントの通知 | Websocket |


### スキーマ言語

GraphQL APIの仕様を記述するための言語

スキーマ言語で記述したスキーマに従ってリクエストはGraphQL処理系により実行されてレスポンスを作成する。


### リゾルバ
実際のデータ操作処理を行い特定のフィールドのデータを返す。


---


## データの永続化の為にローカルに`volume`を作成する

```shell-session
$ docker volume create local-db-store
```


----


