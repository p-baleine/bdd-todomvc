
# backbone-component

  backbone-component

* ブラウザに近いテスト環境がほしい
* でもコンソールベースで行いたい
    * 自動化
=> Buster.js

* モジュール化したい
=> component

* Mockは極力使わないほうが良い？
    * Mockしたモジュールが期待したとおり利用されていること => 実装の詳細に立ち入ることになるから
    * 実行環境をブラウザと想定すると、Mockした通りに動く保証がないから

とはいえ、

* BackboneのMとVとCの単位でモジュールとする
* 依存するBackboneのモジュールをMockしてMVCの連携をspecに記述する