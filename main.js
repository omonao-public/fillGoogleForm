javascript: (function () {

  var name = "your user name";
  var prof = "your pfofile url";

  function getEntry(xpath) {
    var entryRe = /\[\[([0-9]+)/;
    var headings = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (headings.snapshotLength == 0) {
      return "";
    }
    var value = headings.snapshotItem(0).getAttribute("data-params");
    var entry = value.match(entryRe)[1];
    return entry;
  }
  var queryTexts = [];
  var nameEntry = getEntry("//div[contains(@data-params, 'お名前') and contains(@data-params, 'リベシティ')]");
  if (nameEntry != "") {
    console.log("name");
    console.log(nameEntry);
    queryTexts.push("entry." + nameEntry + "=" + name);
  }
  var profEntry = getEntry("//div[contains(@data-params, 'プロフィール') and contains(@data-params, 'URL')]");
  if (profEntry != "") {
    console.log("prof");
    console.log(profEntry);
    queryTexts.push("entry." + profEntry + "=" + prof);
  }
  var url = location.href.replace(/\?.*$/, "");
  var queryText = queryTexts.join("&");
  if (queryText != "") {
    url = url + "?" + queryText;
    location.href = url;
  }
})()
