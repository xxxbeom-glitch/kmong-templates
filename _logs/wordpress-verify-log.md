# WordPress 정적 검사 로그

자동 검사 결과 기록 (`verify-wordpress-static.js`)

## 2026-07-06T08:15:45.539Z

- slug: `_does-not-exist`
- 최종 결과: **FAIL**
- PASS: 0 · FAIL: 1 · WARN: 0

### 실패 항목
- 테마 폴더가 없습니다 — D:\project\kmong-templates\wordpress\_does-not-exist

## 2026-07-06T08:15:45.624Z

- slug: `_test-missing-files`
- 최종 결과: **FAIL**
- PASS: 6 · FAIL: 2 · WARN: 1

### 실패 항목
- 필수 파일 없음 — functions.php
- 필수 파일 없음 — index.php

### 경고 항목
- 검사할 PHP 파일이 없습니다

## 2026-07-06T08:15:45.737Z

- slug: `_test-vardump`
- 최종 결과: **FAIL**
- PASS: 7 · FAIL: 2 · WARN: 0

### 실패 항목
- 금지된 코드 패턴: 디버그 출력 var_dump( — functions.php:2
- PHP 명령줄(CLI)이 설치되어 있지 않습니다 — php -l 문법 검사를 실행할 수 없습니다

## 2026-07-06T08:15:45.850Z

- slug: `_test-env`
- 최종 결과: **FAIL**
- PASS: 6 · FAIL: 2 · WARN: 1

### 실패 항목
- 금지된 파일 포함 — .env
- PHP 명령줄(CLI)이 설치되어 있지 않습니다 — php -l 문법 검사를 실행할 수 없습니다

### 경고 항목
- 의심 문자열: secret 문자열 — .env:1

## 2026-07-06T08:15:45.958Z

- slug: `_test-pass`
- 최종 결과: **FAIL**
- PASS: 8 · FAIL: 1 · WARN: 0

### 실패 항목
- PHP 명령줄(CLI)이 설치되어 있지 않습니다 — php -l 문법 검사를 실행할 수 없습니다

## 2026-07-06T08:15:46.079Z

- slug: `_test-vardump`
- 최종 결과: **FAIL**
- PASS: 7 · FAIL: 2 · WARN: 0

### 실패 항목
- 금지된 코드 패턴: 디버그 출력 var_dump( — functions.php:2
- PHP 명령줄(CLI)이 설치되어 있지 않습니다 — php -l 문법 검사를 실행할 수 없습니다

## 2026-07-06T08:15:46.201Z

- slug: `_test-pass`
- 최종 결과: **FAIL**
- PASS: 8 · FAIL: 1 · WARN: 0

### 실패 항목
- PHP 명령줄(CLI)이 설치되어 있지 않습니다 — php -l 문법 검사를 실행할 수 없습니다

