# Interaction Catalog

템플릿(`templates/{slug}/`) 적용 **전** 참고할 **외부 사이트 인터랙션** 목록.  
로컬 프리뷰 HTML **없음** — `samples.manifest.json` + 허브 UI만 유지.

| 용도 | 경로 |
|------|------|
| **허브 (목록·검토)** | [`index.html`](./index.html) |
| **목록 정본** | [`samples.manifest.json`](./samples.manifest.json) |

---

## 사용법

1. `npx --yes serve _harness/interaction-samples -p 5173` (또는 허브 `index.html`을 로컬 서버로 열기)
2. 카드 클릭 또는 **「참고 사이트」** → 외부 URL 새 창
3. **PASS / HOLD / REJECT** → 브라우저 `localStorage` 저장
4. 필터로 검토 상태별 목록 확인

각 카드에는 **한 줄 요약(`summary`)** + **상세 묘사(`description`)** + **확인 방법(`howToTest`)** 이 표시됩니다.

---

## 항목 추가 절차

1. **`samples.manifest.json`** 의 `interactions` 배열에 항목 추가
2. 허브에서 참고 URL·검토 상태 확인
3. 템플릿 이식 시 `decision-log` 기록

```json
{
  "id": "my-interaction-id",
  "title": "한글 제목",
  "reference": { "label": "사이트 · 섹션", "url": "https://..." },
  "stack": ["GSAP ScrollTrigger"],
  "summary": "동작 한 줄 요약 (카드 상단)",
  "description": "스크롤하면 무엇이 어떻게 보이는지 2~4문장. 비개발자도 이해할 수 있게.",
  "howToTest": "어느 섹션에서 무엇을 확인할지",
  "status": "reference",
  "tags": ["scroll"],
  "added": "2026-06-08"
}
```

보류 아이디어만 있으면 `backlog` 배열에 추가.

---

## 현재 목록

### `intro-pin-scrub-hero` · 인트로 pin + scrub 히어로

| | |
|--|--|
| **참고** | [yesoni.kr/main](https://yesoni.kr/main) 최상단 히어로 |
| **한 줄** | 첫 화면을 스크롤에 고정(pin)한 뒤, 스크롤 양에 비례(scrub)해 인트로→메인 비디오로 이어지는 연출 |
| **묘사** | 페이지 맨 위에서 스크롤하면 화면이 잠깐 멈춘 것처럼 고정되고, 스크롤을 내릴수록 (1) 회색 원형 마스크 축소 (2) YESON 로고 확대·소멸 (3) PC에서 전체 화면 비디오가 작은 둥근 프레임으로 축소 (4) 하단 CTA 등장. 역스크롤 시 역재생 |
| **확인** | 메인 최상단 · 천천히 스크롤하며 로고·비디오·CTA 변화 확인 |

---

### `scroll-pin-multi-step` · 스크롤 고정 다단 전환

| | |
|--|--|
| **참고** | [yesoni.kr/main](https://yesoni.kr/main) 서비스 소개(섹션01) |
| **한 줄** | 한 섹션을 pin한 채 스크롤 scrub으로 콘텐츠 3단(01→02→03) 순차 전환 |
| **묘사** | 서비스 소개 구간에서 섹션이 고정된 상태로 스크롤량에 따라 01·02·03 카드/문구가 차례로 바뀜. 배경색 전환 + SVG 타원 패럴랙스·clip reveal 동시 진행. 모바일(≤767px)은 pin 미적용 |
| **확인** | 히어로 직후 첫 서비스 섹션 · 01→02→03 전환 확인 |

---

### `scroll-enter-act-reveal` · 스크롤 진입 시퀀스 reveal

| | |
|--|--|
| **참고** | [yesoni.kr/main](https://yesoni.kr/main) OUR TEAM · Notice |
| **한 줄** | 섹션 진입 시 `.act` 클래스로 배경·카드·말풍선 순차 등장 (pin 없음) |
| **묘사** | OUR TEAM: 어두운 원 확장 + 양쪽 카드 슬라이드인. Notice: 배경 밝아짐 + 말풍선 3개 순차 등장·이모지·타이핑. pin보다 가벼운 '섹션 오프닝' 패턴 |
| **확인** | OUR TEAM·Notice 섹션 첫 진입 시 애니메이션 확인 |

---

### `3d-carousel-ring` · 3D 링 캐러셀

| | |
|--|--|
| **참고** | [yesoni.kr/main](https://yesoni.kr/main) PROJECTS |
| **한 줄** | 10장 카드 원둘레 3D 배치 · 링 회전 · prev/next · 드래그 · 36° 스냅 |
| **묘사** | 포트폴리오 10장이 3D 원통처럼 배치. 화살표·드래그로 링이 Y축 회전하고 정면 카드가 활성화되어 제목·미디어 교체. 스크롤 진입 시 카드 펼침 연출 포함 |
| **확인** | PROJECTS · 화살표·드래그·가운데 카드 정보 변경 |

---

### `css-3d-flip-card` · CSS 3D 플립 카드

| | |
|--|--|
| **참고** | [yesoni.kr/main](https://yesoni.kr/main) OUR TEAM |
| **한 줄** | 카드 hover 시 앞면·뒷면 Y축 180° 뒤집힘 |
| **묘사** | 앞면=팀명·일러스트, hover 시 뒷면=인사말. JS 없이 CSS transform만 사용. 앞=요약 / 뒤=상세 카드에 적합 |
| **확인** | OUR TEAM · 각 카드 hover 시 앞뒤 전환 |

---

### `scroll-pin-scale-card` · 스크롤 고정 카드 확대

| | |
|--|--|
| **참고** | [hd-hmns.co.kr/kr/main](https://hd-hmns.co.kr/kr/main) 회사소개(2번째 섹션) |
| **한 줄** | 섹션 pin + scrub · 작은 카드→풀사이즈 · 딤 · 텍스트 2단 등장 |
| **묘사** | 스크롤 시 섹션 고정, 작은 이미지 카드가 커져 화면을 채움. 딤 오버레이 + 첫 문구→두 번째 문구 전환 + 하단 그라데이션 라인 reveal |
| **확인** | HD 메인 히어로 직후 회사소개 · 카드 확대·텍스트 전환 |

---

> 정본·필드 정의: `samples.manifest.json`

---

## 템플릿 이식 시

1. 허브에서 PASS
2. Figma + 참고 사이트로 `templates/{slug}/` 구현
3. `46-interaction-presets` 미등록 시 승인 + `decision-log`

---

## preset 카탈로그와의 관계

- 이 허브 = **외부 참고 사이트** 인터랙션 (고급·특수 패턴)
- `_docs/interaction-presets-guide.md` = **템플릿 표준 preset 10종** (scroll-reveal, drag-scroll 등)
- 허브 ID와 preset ID는 별개. 이식 시 decision-log에 기록
