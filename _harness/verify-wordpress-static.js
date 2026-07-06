/**
 * WordPress 테마 정적 검사 (WP 설치 불필요)
 * 사용: node _harness/verify-wordpress-static.js {slug}
 */
var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");

var REQUIRED_FILES = ["style.css", "functions.php", "index.php"];

var FORBIDDEN_FILE_NAMES = {
  ".env": true,
  "wp-config.php": true,
  "wp-config.local.php": true,
  "config.local.php": true,
  ".DS_Store": true,
};

var FORBIDDEN_DIR_NAMES = {
  node_modules: true,
};

var FORBIDDEN_CODE_PATTERNS = [
  { id: "var_dump", label: "디버그 출력 var_dump(", pattern: "var_dump(" },
  { id: "print_r", label: "디버그 출력 print_r(", pattern: "print_r(" },
  { id: "phpinfo", label: "서버 정보 노출 phpinfo(", pattern: "phpinfo(" },
  { id: "wp_debug", label: "디버그 상수 WP_DEBUG", pattern: "WP_DEBUG" },
  { id: "rest_route", label: "커스텀 REST API register_rest_route", pattern: "register_rest_route" },
  { id: "wp_ajax", label: "커스텀 AJAX wp_ajax_", pattern: "wp_ajax_" },
  { id: "wp_ajax_nopriv", label: "비로그인 AJAX wp_ajax_nopriv_", pattern: "wp_ajax_nopriv_" },
  { id: "wpdb", label: "직접 SQL $wpdb->", pattern: "$wpdb->" },
];

var SECRET_WARNING_PATTERNS = [
  { id: "api_key", label: "API 키로 보이는 문자열", pattern: /api[_-]?key\s*[=:]/i },
  { id: "password", label: "비밀번호로 보이는 문자열", pattern: /password\s*[=:]/i },
  { id: "secret", label: "secret 문자열", pattern: /secret\s*[=:]/i },
  { id: "token", label: "token 문자열", pattern: /token\s*[=:]/i },
];

var CONTENT_SKIP_DIRS = {
  node_modules: true,
  vendor: true,
};

var CONTENT_SKIP_EXTENSIONS = {
  ".jpg": true,
  ".jpeg": true,
  ".png": true,
  ".gif": true,
  ".webp": true,
  ".svg": true,
  ".ico": true,
  ".zip": true,
  ".sql": true,
};

var THEME_NAME_PATTERN = /Theme\s*Name\s*:/i;

function createResult() {
  return {
    ok: false,
    slug: "",
    themeDir: "",
    checks: [],
    passCount: 0,
    failCount: 0,
    warnCount: 0,
    failItems: [],
    warnItems: [],
  };
}

function addCheck(result, level, message, detail) {
  result.checks.push({ level: level, message: message, detail: detail || "" });

  if (level === "PASS") {
    result.passCount += 1;
    console.log("[PASS] " + message + (detail ? " — " + detail : ""));
  } else if (level === "FAIL") {
    result.failCount += 1;
    result.failItems.push(message + (detail ? " — " + detail : ""));
    console.log("[FAIL] " + message + (detail ? " — " + detail : ""));
  } else if (level === "WARN") {
    result.warnCount += 1;
    result.warnItems.push(message + (detail ? " — " + detail : ""));
    console.log("[WARN] " + message + (detail ? " — " + detail : ""));
  }
}

// 테마 폴더 존재 여부
function checkThemeDir(result, themeDir) {
  if (!fs.existsSync(themeDir)) {
    addCheck(result, "FAIL", "테마 폴더가 없습니다", themeDir);
    return false;
  }

  if (!fs.statSync(themeDir).isDirectory()) {
    addCheck(result, "FAIL", "테마 경로가 폴더가 아닙니다", themeDir);
    return false;
  }

  addCheck(result, "PASS", "테마 폴더 확인", themeDir);
  return true;
}

// 필수 파일 존재
function checkRequiredFiles(result, themeDir) {
  var allFound = true;

  REQUIRED_FILES.forEach(function (fileName) {
    var filePath = path.join(themeDir, fileName);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      addCheck(result, "PASS", "필수 파일 있음", fileName);
    } else {
      addCheck(result, "FAIL", "필수 파일 없음", fileName);
      allFound = false;
    }
  });

  return allFound;
}

// style.css Theme Name 헤더
function checkThemeHeader(result, themeDir) {
  var stylePath = path.join(themeDir, "style.css");

  if (!fs.existsSync(stylePath)) {
    return;
  }

  var content = fs.readFileSync(stylePath, "utf8");

  if (THEME_NAME_PATTERN.test(content)) {
    addCheck(result, "PASS", "style.css에 Theme Name 헤더 있음");
  } else {
    addCheck(result, "FAIL", "style.css에 Theme Name 헤더 없음", stylePath);
  }
}

function walkFiles(dir, onFile) {
  if (!fs.existsSync(dir)) {
    return;
  }

  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    var fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, onFile);
      return;
    }

    if (entry.isFile()) {
      onFile(fullPath);
    }
  });
}

// 금지 파일·폴더 탐색
function checkForbiddenFiles(result, themeDir) {
  var foundForbidden = false;

  walkFiles(themeDir, function (filePath) {
    var baseName = path.basename(filePath);
    var parentDir = path.basename(path.dirname(filePath));

    if (FORBIDDEN_FILE_NAMES[baseName]) {
      foundForbidden = true;
      addCheck(result, "FAIL", "금지된 파일 포함", relativePath(themeDir, filePath));
    }

    if (path.extname(baseName).toLowerCase() === ".sql") {
      foundForbidden = true;
      addCheck(result, "FAIL", "SQL 백업 파일 포함", relativePath(themeDir, filePath));
    }

    if (FORBIDDEN_DIR_NAMES[baseName] && fs.statSync(filePath).isDirectory()) {
      foundForbidden = true;
      addCheck(result, "FAIL", "금지된 폴더 포함", relativePath(themeDir, filePath));
    }

    if (FORBIDDEN_DIR_NAMES[parentDir]) {
      return;
    }
  });

  if (!foundForbidden) {
    addCheck(result, "PASS", "금지된 설정·백업 파일 없음");
  }
}

function relativePath(baseDir, filePath) {
  return filePath.replace(baseDir + path.sep, "").replace(/\\/g, "/");
}

function shouldSkipContentScan(filePath) {
  var parts = filePath.split(path.sep);
  var i;

  for (i = 0; i < parts.length; i += 1) {
    if (CONTENT_SKIP_DIRS[parts[i]]) {
      return true;
    }
  }

  return !!CONTENT_SKIP_EXTENSIONS[path.extname(filePath).toLowerCase()];
}

function findLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

// 금지 코드 패턴·비밀 문자열 검사
function checkFileContents(result, themeDir) {
  var forbiddenFound = false;
  var secretFound = false;

  walkFiles(themeDir, function (filePath) {
    if (shouldSkipContentScan(filePath)) {
      return;
    }

    var content;

    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch (error) {
      addCheck(result, "FAIL", "파일을 읽을 수 없습니다", relativePath(themeDir, filePath));
      forbiddenFound = true;
      return;
    }

    FORBIDDEN_CODE_PATTERNS.forEach(function (rule) {
      var index = content.indexOf(rule.pattern);

      if (index !== -1) {
        forbiddenFound = true;
        addCheck(
          result,
          "FAIL",
          "금지된 코드 패턴: " + rule.label,
          relativePath(themeDir, filePath) + ":" + findLineNumber(content, index)
        );
      }
    });

    SECRET_WARNING_PATTERNS.forEach(function (rule) {
      var match = rule.pattern.exec(content);

      if (match) {
        secretFound = true;
        addCheck(
          result,
          "WARN",
          "의심 문자열: " + rule.label,
          relativePath(themeDir, filePath) + ":" + findLineNumber(content, match.index)
        );
      }
    });
  });

  if (!forbiddenFound) {
    addCheck(result, "PASS", "금지된 코드 패턴 없음");
  }

  if (!secretFound) {
    addCheck(result, "PASS", "의심 비밀 문자열 없음");
  }
}

function collectPhpFiles(themeDir) {
  var phpFiles = [];

  walkFiles(themeDir, function (filePath) {
    if (path.extname(filePath).toLowerCase() === ".php") {
      phpFiles.push(filePath);
    }
  });

  return phpFiles;
}

// PHP CLI 설치 여부
function isPhpCliAvailable() {
  try {
    childProcess.execSync("php -v", { stdio: "pipe" });
    return true;
  } catch (error) {
    return false;
  }
}

// PHP 문법 검사
function checkPhpSyntax(result, themeDir) {
  var phpFiles = collectPhpFiles(themeDir);

  if (phpFiles.length === 0) {
    addCheck(result, "WARN", "검사할 PHP 파일이 없습니다");
    return;
  }

  if (!isPhpCliAvailable()) {
    addCheck(
      result,
      "FAIL",
      "PHP 명령줄(CLI)이 설치되어 있지 않습니다",
      "php -l 문법 검사를 실행할 수 없습니다"
    );
    return;
  }

  var hasSyntaxError = false;

  phpFiles.forEach(function (filePath) {
    try {
      childProcess.execSync('php -l "' + filePath.replace(/"/g, '\\"') + '"', {
        stdio: "pipe",
        encoding: "utf8",
      });
      addCheck(result, "PASS", "PHP 문법 정상", relativePath(themeDir, filePath));
    } catch (error) {
      hasSyntaxError = true;
      var output = (error.stdout || "") + (error.stderr || "");
      addCheck(
        result,
        "FAIL",
        "PHP 문법 오류",
        relativePath(themeDir, filePath) + " — " + output.trim().replace(/\s+/g, " ")
      );
    }
  });

  if (!hasSyntaxError && phpFiles.length > 0) {
    addCheck(result, "PASS", "PHP 문법 검사 완료", "총 " + phpFiles.length + "개 파일");
  }
}

function appendVerifyLog(root, result) {
  var logPath = path.join(root, "_logs", "wordpress-verify-log.md");
  var now = new Date();
  var iso = now.toISOString();
  var finalLabel = result.ok ? "PASS" : "FAIL";
  var lines = [];

  if (!fs.existsSync(logPath)) {
    lines.push("# WordPress 정적 검사 로그\n");
    lines.push("자동 검사 결과 기록 (`verify-wordpress-static.js`)\n");
  }

  lines.push("## " + iso);
  lines.push("");
  lines.push("- slug: `" + result.slug + "`");
  lines.push("- 최종 결과: **" + finalLabel + "**");
  lines.push("- PASS: " + result.passCount + " · FAIL: " + result.failCount + " · WARN: " + result.warnCount);
  lines.push("");

  if (result.failItems.length > 0) {
    lines.push("### 실패 항목");
    result.failItems.forEach(function (item) {
      lines.push("- " + item);
    });
    lines.push("");
  }

  if (result.warnItems.length > 0) {
    lines.push("### 경고 항목");
    result.warnItems.forEach(function (item) {
      lines.push("- " + item);
    });
    lines.push("");
  }

  fs.appendFileSync(logPath, lines.join("\n") + "\n");
}

function printSummary(result) {
  var total = result.passCount + result.failCount + result.warnCount;

  console.log("");
  console.log("—— 검사 요약 ——");
  console.log("총 검사: " + total);
  console.log("PASS: " + result.passCount);
  console.log("FAIL: " + result.failCount);
  console.log("WARN: " + result.warnCount);
  console.log("최종 결과: " + (result.ok ? "PASS (납품 가능)" : "FAIL (납품 중단)"));
}

function runVerify(slug, options) {
  var root = path.resolve(__dirname, "..");
  var themeDir = path.join(root, "wordpress", slug);
  var result = createResult();
  var shouldWriteLog = !options || options.writeLog !== false;

  result.slug = slug;
  result.themeDir = themeDir;

  console.log("[verify-wp] 정적 검사 시작 — slug: " + slug);
  console.log("[verify-wp] 대상: " + themeDir);
  console.log("");

  if (!checkThemeDir(result, themeDir)) {
    result.ok = false;
    printSummary(result);
    if (shouldWriteLog) {
      appendVerifyLog(root, result);
    }
    return result;
  }

  checkRequiredFiles(result, themeDir);
  checkThemeHeader(result, themeDir);
  checkForbiddenFiles(result, themeDir);
  checkFileContents(result, themeDir);
  checkPhpSyntax(result, themeDir);

  result.ok = result.failCount === 0;
  printSummary(result);

  if (shouldWriteLog) {
    appendVerifyLog(root, result);
  }

  return result;
}

if (require.main === module) {
  var cliSlug = process.argv[2];

  if (!cliSlug) {
    console.error("Usage: node _harness/verify-wordpress-static.js {slug}");
    process.exit(1);
  }

  var cliResult = runVerify(cliSlug);
  process.exit(cliResult.ok ? 0 : 1);
}

module.exports = {
  runVerify: runVerify,
};
