# ベースイメージの指定
FROM node:lts
# 作業ディレクトリの指定
WORKDIR /usr/src/app
# ホストからコンテナにファイルコピー
COPY ./app .
# パッケージインストール
RUN cd react-app && yarn install