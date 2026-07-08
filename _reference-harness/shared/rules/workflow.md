# Reference Harness — Workflow

> Track C / 실험. **제품 Track A·B 전 구간을 강제하지 않음.**  
> Cafe24 제품: `00-project-router` · `80`~`82` · `docs/cafe24/CAFE24_RULES_OVERVIEW.md`

## 목적

원본(또는 브라우저 수집) **보관 → 필요 시 복사본 수정·분석**.  
데모는 design reference. skin-zip과 등급을 섞지 않음 (`cafe24-original.md`).

## 파이프라인 (harness case)

```
00-source → 01-original (immutable)
  → integrity 또는 browser-capture QA
  → analysis (규모에 따라 선택)
  → working-copy (요청 시)
  → working QA → final?
  → (Track B 승격 시) platform-map → cafe24/{slug}
```

## 선택 산출물

| 문서 | 언제 |
|------|------|
| `analysis-artifacts.md` | 대규모·패턴 카탈로그만 |
| `page-index.md` / `_dev/` | 비교 허브 **필요 시** |
| full originalQa DOM hash | browser-capture 경로 · ZIP은 integrity로 충분 |

## 게이트 (harness)

- original 수정 금지
- demo → 납품 working 금지
- Track A 기존 스킨에 harness map/normalized **강제 금지**

## 관련

`original-immutable.md` · `working-copy.md` · `license.md` · `cafe24-original.md` · `original-integrity-qa.md` · `browser-capture-qa.md` · `83-reference-harness.mdc`
