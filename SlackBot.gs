const slackAccessToken = properties.getProperty('slackAccessToken');
const slackVerificationToken = properties.getProperty('slackVerificationToken');
//const slackApp = SlackApp.create(slackAccessToken);

function getSlackUser(userId){
  const options = {
    "method" : "get",
    "headers" : {
      Authorization: "Bearer " + slackAccessToken
    }
  }
  const user = JSON.parse(UrlFetchApp.fetch("https://slack.com/api/users.profile.get?user=" + userId + "&pretty=1",options));
  return user;
}

function slackPost(content,attachment) {
  const token = slackAccessToken;
  const channel = "bottest"; //投稿先チャンネル名
  const username = "周知にゃん"; //BOTの名前
  const text = content; //メッセージ
  const attachments = JSON.stringify([
      {
        color: "#9c9", //インデント線の色
        text: attachment  //インデント内に表示されるテスト
      }
    ]);
  const payload = {
    "channel" : channel, //通知先チャンネル名
    "text" : text, //送信テキスト
    "attachments": attachments, //リッチなメッセージを送る用データ
    "token": token
  };
  const option = {
    "method" : "POST", //POST送信
    "payload" : payload //POSTデータ
  };
  let response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + token, option);
  while(response.getResponseCode() != 200){
    response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + token, option);
  }
  console.log(response);
  return  response;
}

function slackPostTest(content,attachment) {
  content = "テスト";
  attachment = "周知内容";
  var token = slackAccessToken;
  var channel = "bottest"; //投稿先チャンネル名
  var username = "周知にゃん"; //BOTの名前
  var text = content; //メッセージ
  var attachments = JSON.stringify([
      {
        color: "#9c9", //インデント線の色
        text: attachment  //インデント内に表示されるテスト
      }
    ]);
  var payload = {
    "channel" : channel, //通知先チャンネル名
    "text" : text, //送信テキスト
    "attachments": attachments, //リッチなメッセージを送る用データ
    "token": token
  };
  var option = {
    "method" : "POST", //POST送信
    "payload" : payload //POSTデータ
  };
  var response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage", option);
  while(response.getResponseCode() != 200){
    response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + token, option);
  }
  console.log(response.getContentText());
  return  response;
}