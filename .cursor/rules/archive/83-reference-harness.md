> **DEPRECATED / ARCHIVE** — 활성 규칙 아님. 대체: `00-project-router.mdc` · `80-cafe24-core` · `81-cafe24-platform-map` · `82-cafe24-qa` · `83-reference-harness`.

# Reference Harness

> **SoT:** `_reference-harness/shared/rules/workflow.md`

## 紐⑹쟻 (?꾨땶 寃?

?덊띁?곗뒪 蹂닿퀬 **鍮꾩듂??HTML???덈줈 留뚮뱾吏 ?딅뒗??**  
mock 쨌 wireframe 쨌 ???붿옄??쨌 reconstruction 湲곕낯 ?ъ슜 **湲덉?**.

## 紐⑹쟻 (留욌뒗 寃?

1. ?먮낯쨌蹂댁쑀 ?ㅽ궓 **?꾩껜 ?섏쭛**
2. `01-original/` **immutable**
3. `02-original-qa` source?봮riginal **PASS | ?뱀씤 partial**
4. `04-working-copy` = ?꾩껜 蹂듭궗蹂몄뿉??**?붿껌留?* ?섏젙

## ?④퀎

```
00-source ??01-original ??02-original-qa ??03-analysis
  ??04-working-copy ??05-working-qa ??06-normalized?
  ??07-final ??08-platform-map? ??09-platform-qa?
```

## 寃뚯씠??

| 李⑤떒 | 議곌굔 |
|------|------|
| working-copy 쨌 ?섏젙 쨌 normalized 쨌 map 쨌 ?ㅽ궓 ?댁떇 쨌 final ?꾨즺 | originalQa ??pass ?닿퀬 ?뱀씤 partial ?꾨떂 |
| platform ?댁떇 | final PASS + map ?뱀씤 ??|

## original 湲덉?

?댁슜쨌寃쎈줈쨌?щ㎎쨌?뺤텞쨌debug ?쎌엯 ????`original-immutable.md`  
?곗텧臾쇱? `_dev/`留?

## working-copy

original **?꾩껜 蹂듭궗** 쨌 change-request留?쨌 ??HTML/CSS ?ъ옉??湲덉? ??`working-copy.md`

## cafe24

ZIP(`skin-zip`) vs ?곕え(`browser-captured`) 援щ텇 ??`cafe24-original.md`  
map = `08-platform-map` 쨌 ?뱀씤 ??`cafe24/{slug}/` 湲덉?

## reconstruction

**fallback only** 쨌 ?ъ슜???뱀씤 쨌 structure mock 湲덉?

## ?대쾲 ?묒뾽 湲덉? (?먯씠?꾪듃)

- original ?섏젙 쨌 寃곌낵臾??ъ닔吏묒쓣 洹쒖튃 ?묒뾽怨??욊린
- originalQa ??working-copy ?앹꽦

愿?? `00-project-tracks` 쨌 `80`~`82` 쨌 `legacy-migration.md`
