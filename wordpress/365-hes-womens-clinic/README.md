# 365헤스여성의원 — WordPress 테마

Figma `365hes-homepage-1920` (node `614:4`) · Classic WP · HTML / CSS / jQuery

**기준 문서:** Figma 디자인 우선 · `docs/365hes-womens-clinic-project-spec.md`는 참고용 · **서브페이지·스타일 작업 전 → `docs/hes-style-guide.md` 필수**

---

## 로컬 테스트 (Laragon 예시)

1. 테마 폴더를 WordPress에 연결

```text
C:\laragon\www\{사이트}\wp-content\themes\365-hes-womens-clinic
  ← 이 repo의 wordpress/365-hes-womens-clinic/ 복사 또는 junction
```

2. WordPress 관리자 → **외모 → 테마** → `365 Hess Women's Clinic` 활성화

3. **설정 → 일반** → 사이트 제목 확인

4. **설정 → 읽기** → 홈페이지 표시: **정적인 페이지**가 아니라 **최신 글**이면 `front-page.php`가 메인으로 동작함  
   (고정 홈을 쓰는 경우 빈 페이지를 만들고 홈으로 지정해도 됨)

5. **설정 → 고유주소** → 변경 없이 **저장** (공지 permalink flush)

6. **공지 → 새로 추가** → 제목·본문 저장 → 메인 상단 공지 바·`/notice/` 목록 확인

7. 브라우저: `http://{사이트}.test/`

---

## 현재 파일 구조

```text
365-hes-womens-clinic/
├── style.css              # Theme Header + 기본 토큰·헤더/푸터
├── functions.php
├── header.php / footer.php
├── front-page.php         # 메인 (S01~S09)
├── archive-notice.php
├── single-notice.php
├── inc/
│   ├── assets.php         # 이미지 URI · GNB 목록
│   └── notice.php         # notice CPT
├── docs/
│   ├── hes-style-guide.md              # 스타일·패턴·서브페이지 가이드
│   └── 365hes-womens-clinic-project-spec.md
├── assets/
│   ├── icons/             # arrow-right, chevron-*
│   ├── logos/             # header.png, footer.png
│   ├── hero/              # kv.png
│   ├── treatments/        # 대표진료 카드 이미지
│   ├── spaces/            # 진료환경 탭 이미지
│   ├── staff/             # 의료진 섹션 배경
│   └── js/main.js
└── template-parts/
```

---

## CMS (1단계)

| 항목 | slug |
|------|------|
| 공지 | `notice` |
| 목록 | `/notice/` |
| 메인 | 최신 1건 → S02 공지 바 |

---

## 다음 구현 순서

1. ~~공통 `sub-hero` · CTA band~~ ✓
2. ~~파일럿: 여성질환 `/womens-disease`~~ ✓
3. **병원소개** `/about` → 여성검진 → 임신·출산 → … GNB 순

인터랙션 preset은 **사용자 승인 후**만 적용 (`46-interaction-presets.mdc`).
