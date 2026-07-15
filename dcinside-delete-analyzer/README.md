# DCInside 게시글 삭제 도구

갤로그 **게시글(posting)** 페이지에서 본인 글을 선택·테스트·전체 순차 삭제하는 Chrome Manifest V3 확장프로그램입니다.

> 다른 사용자 갤로그를 대상으로 하는 기능이 없습니다.  
> 현재 열린 `https://gallog.dcinside.com/{본인ID}/posting` 페이지만 처리합니다.  
> **테스트 5개 삭제**로 먼저 확인한 뒤 전체 삭제를 사용하세요.

---

## 설치

1. `chrome://extensions` → 개발자 모드 ON
2. **압축해제된 확장 프로그램을 로드합니다**
3. 이 폴더(`dcinside-delete-analyzer`) 선택
4. `https://gallog.dcinside.com/{내아이디}/posting` 접속
5. 확장프로그램 아이콘 클릭

파일을 수정했다면 확장프로그램 **새로고침** 후 갤로그 탭도 **새로고침**하세요.

---

## 테스트 5개 삭제 (반드시 먼저)

1. 갤로그 게시글 페이지를 연다
2. 팝업 → **테스트 5개 삭제**
3. 확인 창에서 승인
4. 현재 페이지 최신 글 5개가 순차 삭제되는지 확인
5. 성공/실패·진행률이 정상인지 확인

요청 간격 기본값은 **안전(2초)** 입니다.

---

## 선택 삭제

1. 페이지 상단 확장 UI 또는 각 글 왼쪽 체크박스로 선택
2. **선택한 글 삭제** (페이지) 또는 팝업 **선택 글 삭제**
3. 확인 후 순차 삭제

---

## 전체 삭제

1. 팝업 **전체 삭제 시작**
2. 1차 확인: “현재 계정의 게시글 전체를 삭제하려고 합니다.”
3. 2차 확인: 입력창에 `전체삭제` 정확히 입력
4. 첫 페이지 글을 순차 삭제 → 목록 갱신 → 남은 글이 없을 때까지 반복
5. 작업 중 **일시정지 / 중지** 가능 (요청과 요청 사이)

---

## 삭제 방식 (네이티브 X 버튼)

직접 `c_k_v` / `ci_t` / `service_code` POST를 **하지 않습니다.**

1. `li[data-no]` 안의 `button.btn_delete.btn_listdel` 을 `click()`
2. `page-hook.js`가 **자동화 중일 때만** 삭제 confirm을 `true`로 승인
3. 디시 원래 JS가 인증·삭제를 처리
4. 페이지 새로고침
5. `chrome.storage.local`의 `pendingNos` / 진행 상태로 다음 글 계속

모드:
- **선택 / 테스트 5개** — `pendingNos`를 storage에 저장 후 순서대로 클릭
- **전체** — 항상 첫 번째 글의 X를 클릭 → 새로고침 반복 → 목록 0개면 완료

---

## 자동 중지 조건

- 삭제 후 10초 내 새로고침 없음
- 연속 3회 실패
- 사용자가 **중지**

---

## 권한

- `storage` — 진행 상태 (팝업을 닫아도 content script에서 작업 유지)
- `activeTab` — 팝업 → 현재 탭 제어
- host: `https://gallog.dcinside.com/*` 만

분석용 `webRequest` / 대형 JSON 로그 기능은 제거했습니다.

---

## 파일

```
dcinside-delete-analyzer/
├─ manifest.json
├─ background.js      # 상태 저장 · 메시지 중계
├─ content.js         # 체크박스 UI · 삭제 루프
├─ content.css
├─ page-hook.js       # 인증값 동적 확보 · 네트워크 관찰
├─ popup.html/js/css
└─ README.md
```
