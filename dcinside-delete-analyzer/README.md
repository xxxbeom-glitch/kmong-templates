# 디시인사이드 삭제 동작 분석기

Chrome Manifest V3 확장프로그램입니다.  
디시인사이드 마이페이지에서 **사용자가 직접** 게시글 1개를 삭제할 때, 그 과정을 관찰·기록해 JSON으로 저장합니다.

> **자동 삭제는 하지 않습니다.**  
> X 버튼 클릭과 confirm 확인은 사용자가 직접 수행합니다. 확장프로그램은 기록만 합니다.

---

## 설치 방법

1. Chrome에서 `chrome://extensions` 접속
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. 이 폴더(`dcinside-delete-analyzer`) 선택
5. 디시인사이드 마이페이지 접속
6. 확장프로그램 아이콘 클릭
7. **기록 시작**
8. 게시글 **X** 버튼 클릭
9. confirm에서 직접 **확인**
10. 삭제 및 새로고침 완료까지 기다림
11. **기록 중지**
12. **JSON 로그 다운로드**

---

## 사용 시 주의

- 기록은 **「기록 시작」 이후**에만 수집됩니다.
- 기존 페이지 동작을 바꾸지 않도록 설계했습니다 (`window.confirm` 결과를 가로채 자동 확인하지 않음).
- 이 JSON 파일에는 로그인 비밀번호나 쿠키를 저장하지 않도록 설계되어 있지만, **공유하기 전에 사용자가 직접 내용을 확인**할 것을 권장합니다.

---

## 기록되는 정보 (요약)

| 구분 | eventType 예시 | 내용 |
|------|----------------|------|
| 페이지 스냅샷 | `page_snapshot` | 목록/페이지네이션 후보 HTML, 삭제 버튼 후보 수 |
| 삭제 후보 클릭 | `delete_candidate_click` | DOM, selector/XPath, 게시글 행 메타 |
| confirm | `confirm_shown`, `confirm_result` | 메시지, true/false |
| 네트워크 | `network_request`, `network_response`, `network_error` | URL, method, formData(마스킹), status |
| 이동/새로고침 | `content_script_loaded`, `page_ready`, `before_unload`, `visibility_change`, `pageshow`, `pagehide` | URL, readyState, navigation type |
| 오류 | `extension_error` | 확장프로그램 내부 오류 (페이지는 깨지지 않도록 처리) |

삭제 후보 클릭 후 약 15초 동안의 네트워크 이벤트에는 `relatedDeleteInteraction: true`와 동일한 `interactionId`가 붙습니다.

---

## 파일 구조

```
dcinside-delete-analyzer/
├─ manifest.json    # MV3 설정
├─ background.js    # service worker (storage, webRequest, export)
├─ content.js       # DOM·lifecycle 관찰, page-hook 주입
├─ page-hook.js     # 페이지 컨텍스트에서 confirm 래핑
├─ popup.html
├─ popup.js
├─ popup.css
└─ README.md
```

---

## 권한

- `storage` — 로그 임시 저장
- `downloads` — JSON 저장
- `webRequest` — dcinside 요청 관찰 (수정/차단 없음)
- host: `https://gall.dcinside.com/*`, `https://*.dcinside.com/*`

---

## Manifest V3 참고 (제한)

- Background는 **service worker**라서 DOM API를 쓰지 않습니다.
- `webRequest`는 **관찰**용이며, 응답 body 전체를 읽지는 않습니다.
- `page-hook.js`는 `web_accessible_resources`로 페이지에 주입해 isolated world의 `window.confirm`과 페이지 쪽 confirm을 맞춥니다.
- 새로고침 후에도 `chrome.storage.local`의 `recording` / `sessionId`로 같은 세션을 유지합니다.
