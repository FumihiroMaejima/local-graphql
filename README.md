# Local GraphQL Server

ローカルで`node.js`+`express`のGraphQLサーバーを構築する為の手順書

# 構成

| 名前 | バージョン |
| :--- | :---: |
| npm | 6.14.15 |
| node | 6.14.15 |
| yarn | 1.22.7 |
| TypeScript | 4.4.4 |
| MySQL | 8.0 |

---
# ローカル環境の構築(Mac)


## パッケージのインストール

```shell-session
$ yarn add graphql express express-graphql
$ yarn add --dev  @types/express
```


## データの永続化の為にローカルに`volume`を作成する

```shell-session
$ docker volume create local-db-store
```

## `volume`の確認

```shell-session
$ docker volume ls
DRIVER    VOLUME NAME
local     local-db-store
```

## `volume`を削除する場合

```shell-session
$ docker volume rm local-db-store
```

## v5.7やv8.0など、複数のバージョンを用意する必要がある場合はvolumeも分けておく。

```shell-session
$ docker volume create local-db-v57-store
$ docker volume create local-db-v80-store
```


---

# CLIでDB操作

## mysqlコンテナ内でCLIでmysqlを操作する

```shell-session
$ docker exec -it local-db-mysql bash
```

```shell-session
$ mysql -u root -p
```

```shell-session
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

```shell-session
mysql> CREATE DATABASE IF NOT EXISTS local_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.02 sec)
mysql> GRANT ALL PRIVILEGES ON local_db.* TO 'root'@'%';
Query OK, 0 rows affected (0.02 sec)
```

```shell-session
mysql> use local_db
```


## characterの設定の確認

```shell-session
mysql> show character set;
mysql> show variables like 'char%';
```

## データのダンプとリストア

```shell-session
$ mysqldump -u root -p ${PASSWORD} local_db > test_db2108.sql
$ mysql -u root -p ${PASSWORD} -D local_db < test_db2108.sql
```

# テストデータ

```SQL
CREATE TABLE testers (
    id int(11) not null AUTO_INCREMENT,
    name varchar(255) default null,
    tel varchar(255) default null,
    email varcshar(255) default null,
    message varchar(255) default null,
    updated_at datetime not null,
    created_at datetime not null,
    deleted_at datetime not null,
    primary key (`id`)
)ENGINE=InnoDB default charset=utf8mb4;
```

----


