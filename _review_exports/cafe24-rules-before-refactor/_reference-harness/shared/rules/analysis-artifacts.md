# Analysis Artifacts (`03-analysis`)

originalQa PASS | approved partial 이후에만 확정 작성.  
캡처·추정만으로 working-copy 착수 **금지**.

## 필수 파일

| 파일 | 내용 |
|------|------|
| `analysis.md` | 섹션 IA · 페이지 요약 · 플랫폼 의존 · 제한 |
| `style-guide.md` | 아래 필수 항목 |
| `component-map.md` | 컴포넌트 표 |
| `interaction-map.md` | 인터랙션 표 |
| `asset-inventory.json` | 이미지·SVG·아이콘·배지·폰트·영상 |
| `dependency-inventory.json` | CDN·라이브러리·iframe |
| `page-inventory.json` | 공통 스키마 (`page-inventory.md`) |
| `change-risk.md` | 수정 위험도 |

## style-guide.md 필수

font family · font source · font weight · type scale · line-height · letter-spacing · color palette · backgrounds · border · radius · shadow · container width · spacing scale · grid · breakpoint · image ratio · badge styles · icon system · button · form

## component-map.md row

componentId · source selector · source file · variants · data slots · dependencies · responsive behavior · modification risk

## interaction-map.md row

trigger · target · interaction type · JS file · library · timing · easing · desktop/mobile difference · fallback

## 금지

- original 미열람 · 캡처만으로 분석 “완료”
- analysis를 핑계로 새 HTML/CSS 설계 시작
