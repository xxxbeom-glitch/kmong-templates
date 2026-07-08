# Cafe24 Rules — Unresolved References

리팩터 시점 점검. 임의 파일 미생성.

| 참조 | 상태 | 조치 |
|------|------|------|
| `_docs/context-guide.md` cafe24 절 | 파일 있으나 cafe24 문구 없음 | 라우터가 4순위로 인용 · 내용 보강은 별도 요청 |
| `cafe24/{slug}/` | 제품 폴더 미생성 | Track A/B 착수 시 생성 · 정상 |
| `_delivery/cafe24/` | 금지 경로 · 없음 | 유지 |
| 구 `00-project-tracks.mdc` | `.cursor/rules/archive/*.md` | 활성 아님 |
| 구 `80/81/82` 파일명 | archive | 활성은 `80-cafe24-core` 등 |
| `module-occurrences.json` | 없음 | 미생성 |
| AGENTS.md / CLAUDE.md | 없음 | 미생성 |
| harness `track.md` | archive | `workflow.md`로 대체 |

활성 `.mdc`에서 archive 경로를 **실행 필수로 가리키지 않음**.
