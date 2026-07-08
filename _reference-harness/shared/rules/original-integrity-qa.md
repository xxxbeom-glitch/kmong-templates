# Original Integrity QA (ZIP / owned skin)

> Track A · harness skin-zip. **브라우저 캡처 전수 fidelity와 분리.**

## 목적

정식 원본(ZIP·고객 스킨)과 로컬 `project original` / `01-original` 일치·무결성.

## 검사

- 파일 수 · 주요 경로 · 대략 용량
- checksum(가능 시)
- 진입 HTML · 핵심 CSS/JS 존재
- module / form / 주요 페이지 목록
- missing · broken 기록

## PASS

원본과 실질 동일 · 누락 목록 · 로컬에서 주요 페이지 열림(또는 테스트몰 기준 명시)

## 비적용

구매/고객 ZIP이 아닌 **browser-captured** 전용 절차 → `browser-capture-qa.md`
