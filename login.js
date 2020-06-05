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

  var strEmail = formData.get("m");
  var strPassword = formData.get("p");

  var strReqUrl = strBaseUrl + "?m=" + strEmail + "&p=" + strPassword;

  xhr.open("GET", strReqUrl);
  xhr.responseType = "json";
  xhr.send();
};

// 4. レスポンスを受け取った後に呼び出されます
xhr.onload = function () {
  if (xhr.status != 200) {
    // レスポンスの HTTP ステータスを解析
    console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found

    let responseObj = xhr.response;
    console.log(responseObj); // Hello, world!
    console.log(responseObj.check); // Hello, world!
  } else {
    // show the result
    console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
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
