let furiwake = document.getElementById("furiwake");
let decide = document.getElementById("decide");
let number = document.getElementById("number");
let stringdata = document.getElementById("stringdata");
let city = document.getElementById("city");
let companyname = document.getElementById("company_name");

// ローカルstorageからデータとってみる
chrome.storage.sync.get("logined", function (data) {
  console.log("check logined");
  console.log("Value currently is " + data.logined);

  // ログインしてなければページを切り替える
  if (data.logined != "isLogined") {
    console.log("not logined");

    window.location.href = "login.html";
  }
});

furiwake.onclick = function (element) {
  console.log("furiwake");
  console.log(stringdata.value);

  var strText = stringdata.value;
  var strNumber = strText.match(/[0-9]+/);

  console.log(strNumber);
};

decide.onclick = function (element) {
  console.log("furiwake");
};
