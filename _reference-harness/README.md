# Reference Harness

> **상태 (2026-07-10):** **동결** — `_docs/active-track.md` · 신규 mirror·케이스 추가 **중단**. 기존 case·스크립트는 **보관**.

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
```

### 로컬 미리보기 허브 (추천)

미러된 테마를 **한 페이지 목록**에서 새 창으로 연다.  
`04-working-copy`가 있으면 **수정본 열기** 링크도 표시.

```bash
cd _reference-harness
node scripts/preview-hub.js          # → http://127.0.0.1:4173/
node scripts/preview-hub.js --force  # 포트 정리 후 재기동
node scripts/init-working-copy.js {slug}   # 원본 복사 → 04-working-copy
```

- 허브: `http://127.0.0.1:4173/`
- 원본: `4201`~ · 수정본: `4301`~

단일 테마:

```bash
node scripts/preview-original.js {slug} 4201
node scripts/preview-original.js {slug} 4301 --working
```

## 문서

| 유지 | 선택 | archive |
|------|------|---------|
| workflow · **site-clone-fidelity** · source-collection · original-immutable · working-copy · license · cafe24-original · browser-capture-qa | analysis-artifacts · page-index | reconstruction · legacy-migration · investigation · 구 original-qa |

## QA

- ZIP: `original-integrity-qa.md`  
- 캡처/복제: `browser-capture-qa.md` · `site-clone-fidelity.md`
