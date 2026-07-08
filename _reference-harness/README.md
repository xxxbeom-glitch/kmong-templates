# Reference Harness

실험·데모 수집 트랙. 제품 규칙은 `docs/cafe24/CAFE24_RULES_OVERVIEW.md` · `.cursor/rules/80`~`83`.

## 원칙

- original immutable · working-copy만 수정  
- demo ≠ purchased original  
- 납품에 데모 코드/이미지 금지  
- **URL 복제 = 한 번에 사이트 전체** (캡처만·메인만 금지) — `shared/rules/site-clone-fidelity.md`

## 브라우저 복제 (한 연속)

```bash
cd _reference-harness
node scripts/mirror-original.js {slug} {demoUrl} [maxPages]
node scripts/preview-original.js {slug} [port]
# → 로컬에서 페이지 이동 + 슬라이더(/exec proxy) 검수
```

## 문서

| 유지 | 선택 | archive |
|------|------|---------|
| workflow · **site-clone-fidelity** · source-collection · original-immutable · working-copy · license · cafe24-original · browser-capture-qa | analysis-artifacts · page-index | reconstruction · legacy-migration · investigation · 구 original-qa |

## QA

- ZIP: `original-integrity-qa.md`  
- 캡처/복제: `browser-capture-qa.md` · `site-clone-fidelity.md`
