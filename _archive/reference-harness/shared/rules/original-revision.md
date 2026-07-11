# Original Revision 관리 — 적용안

> **이번 턴: 규칙만 정의. 기존 sample03 `01-original/` 바로 rename하지 않음.**

## 권장 구조 (신규 case · 재수집부터)

```
01-original/
├── rev-001/
│   ├── index.html | pages | assets | …
│   ├── manifest-original.json
│   └── README.md
├── rev-002/
└── current.json
```

`current.json` 예:

```json
{
  "currentRev": "rev-001",
  "updatedAt": "2026-07-08",
  "reason": "initial capture"
}
```

## revision 기록 항목

- source URL
- 수집 시각
- 변경 이유 (재수집 사유)
- 파일 수 · 총 용량
- checksum (트리 또는 manifest 해시)
- 누락 항목
- 수집 환경 (도구·viewport·UA·auth)

## 기존 case (sample03 등)와의 충돌

| 현재 | 영향 |
|------|------|
| `01-original/index.html` + `_mirror/` 평면 구조 | rev 폴더로 옮기면 preview 스크립트·상대경로·README 링크 깨짐 |
| `manifest.stages.original` | `originalCapture` + currentRev 필드 필요 |
| `_dev` 미생성 | revision과 무관 · 별도 추가 |

## 적용 정책

1. **즉시:** 평탄 `01-original/` 유지 · 재수집 시 **덮어쓰기 금지** (임시로 `01-original.bak-YYYYMMDD/` 또는 사용자 승인 후 `rev-00N` 이전)
2. **신규 case / 명시 rename 승인 후:** `rev-001` + `current.json` 적용
3. Agent는 사용자 승인 없이 기존 original을 rev 하위로 **이동하지 않음**

## 금지

- 재수집으로 기존 original 파일 덮어쓰기
- revision 없이 “최신만 남기기”
