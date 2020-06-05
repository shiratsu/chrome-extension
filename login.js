let loginBtn = document.getElementById("login");

// こちらは正しいURLに置き換えてください。
let strBaseUrl =
  "https://shiratsu.github.io/sample-answer-json/sample-answer.json";

// 1. new XMLHttpRequest オブジェクトを作成
let xhr = new XMLHttpRequest();

loginBtn.onclick = function (element) {
  console.log("loginBtn");
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.loginForm);
  console.log(formData);

  let strEmail = formData.get("m");
  let strPassword = formData.get("p");

  let strReqUrl = strBaseUrl + "?m=" + strEmail + "&p=" + strPassword;

  console.log(strReqUrl);
  xhr.open("GET", strReqUrl);
  xhr.responseType = "json";
  xhr.send();
};

// 4. レスポンスを受け取った後に呼び出されます
xhr.onload = function () {
  if (xhr.status != 200) {
    // レスポンスの HTTP ステータスを解析
    console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    alert("ログインに失敗しました");
  } else {
    let responseObj = xhr.response;
    console.log(responseObj); // Hello, world!
    console.log(responseObj.check); // Hello, world!
    let resultLogin = responseObj.check;

    // ログインOKなら
    if (resultLogin == "OK") {
      // 期限と一緒にログイン済みをセット
      const date = new Date();
      const inc = 1000 * 60 * 60 * 1; // 1時間といったん仮定する
      const expire = new Date(date.getTime() + inc);

      // dashboardに遷移
      chrome.storage.sync.set(
        { islogined: "yes", expire: expire },
        function () {
          window.location.href = "dashboard.html";
        }
      );
    }
  }
};

xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.loaded} bytes`); // no Content-Length
  }
};

xhr.onerror = function () {
  console.log("Request failed");
};
