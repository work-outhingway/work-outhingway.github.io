# 3Dモデル(骨・筋)

アプリの4ページ(`atlas.html`・`training.html`・`stretch.html`・`care.html`)が読み込む骨と筋のモデルです。

| ファイル | 中身 |
| --- | --- |
| `bones.glb` | 骨252個(関節ごとの体節に合わせて、そのまま動かす) |
| `muscles.glb` | 筋477個(頂点ごとに体節の重みをつけて変形する) |
| `skin.js` | 筋の頂点ごとの体節の割り当て `SKIN`(`muscles.glb` の頂点の順番に対応。作り直したら必ず作り直す) |

## 作り方

1. [Z-Anatomy](https://www.z-anatomy.com/) の `Startup.blend` から、アプリで使う部位を取り出す
2. 小さな穴をふさぎ、開いた膜には厚み1.5mmをつけて、1mm のボクセルで閉じた立体に作り直す(細い部位は0.5mm、痩せたら0.25mm)。
   中身が詰まっているので、どこで切っても切り口(断面)が見える
3. 本体から離れた小さなかけらを除き、面を減らす(頂点数は以前のモデルの約1.5倍)
4. 作り直しで痩せた小さな部位(歯・指の骨など)は、元の体積になるよう表面を法線の向きに少しふくらませる
5. 量子化と meshopt 圧縮をかける
6. 筋の体節の重みは、以前のモデルの頂点から近い頂点の重みを引き継ぐ

腸恥筋膜弓(Iliopectineal arch)の2個だけは、作り直しで形が崩れるため以前のメッシュのままです。

## ライセンス

Z-Anatomy(Gauthier Kervyn ほか、[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/))を改変したものです。
元データは [BodyParts3D](https://lifesciencedb.jp/bp3d/)(© ライフサイエンス統合データベースセンター、CC BY-SA 2.1 JP)。
このフォルダの3Dデータも CC BY-SA 4.0 で提供します。
