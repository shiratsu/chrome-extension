let furiwake = document.getElementById("furiwake");
let decide = document.getElementById("decide");
let number = document.getElementById("number");
let content = document.getElementById("content");
let notnumber = document.getElementById("notnumber");
let city = document.getElementById("city");
let rname = document.getElementById("r_name");

let xhr = new XMLHttpRequest();

var isPostStoreInfo = false;

var strText = "";
var strCity = "";
var strName = "";

// ローカルstorageからデータとってみる
chrome.storage.sync.get("islogined", function (data) {
  console.log("check logined");
  console.log("Value currently is " + data.islogined);

  const expire = data.expire;
  const date = new Date();

  // ログインしてなければページを切り替える
  if (expire > date || data.islogined != "yes") {
    console.log("login is expired");
    window.location.href = "login.html";
  }
});

furiwake.onclick = function (element) {
  console.log("furiwake");
  console.log(content.value);

  strText = content.value;
  const aryNumber = strText.match(
    /([0-9]{10,11}|[0-9]{2,4}-[0-9]{2,4}-[0-9]{4})/g
  );
  const aryNotNumber = strText.match(/[^\d-]{1,}/g);

  const strNumber = aryNumber.join(",");
  const strNotNumber = aryNotNumber.join(",");

  number.innerHTML = strNumber;
  notnumber.innerHTML = strNotNumber;

  requestLocate();
};

decide.onclick = function (element) {
  console.log("decide");
  postStoreInfo();
};

function requestLocate() {
  isPostStoreInfo = false;
  let strReqUrl = "https://jsonplaceholder.typicode.com/users/1";

  console.log(strReqUrl);
  xhr.open("GET", strReqUrl);
  xhr.responseType = "json";
  xhr.send();
}

function postStoreInfo() {
  //TODO: 以下を置き換える
  isPostStoreInfo = true;
  const strBaseUrl = "https://xxxx/storeinfo.php";

  // URLを作成
  let strReqUrl =
    strBaseUrl + "?i=" + strText + "&c=" + strCity + "&n=" + strName;

  console.log(strReqUrl);
  xhr.open("GET", strReqUrl);
  xhr.responseType = "json";
  xhr.send();
}

// 4. レスポンスを受け取った後に呼び出されます
xhr.onload = function () {
  if (xhr.status != 200) {
    // レスポンスの HTTP ステータスを解析
    console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    alert("通信に失敗しました");
  } else {
    //DBに保存リクエストじゃなければ
    if (isPostStoreInfo == false) {
      let responseObj = xhr.response;
      console.log(responseObj);
      strCity = responseObj.address.city;
      strName = responseObj.name;
      city.innerHTML = strCity;
      rname.innerHTML = strName;
    }
  }

  isPostStoreInfo = false;
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
