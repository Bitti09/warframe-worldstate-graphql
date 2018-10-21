let lang;
let region1, factions, lang2;
var tmp_json = {};
const _ = require("lodash");
const axios = require("axios");
const { setupCache } = require("axios-cache-adapter");
const cache = setupCache({
  maxAge: 15 * 60 * 1000
});
const api = axios.create({
  adapter: cache.adapter
});
// World Data (PC)
api({
  url: "http://content.warframe.com/dynamic/worldState.php",
  method: "get"
}).then(async response => {
  tmp_json = response.data;
  json = JSON.parse(
    JSON.stringify(response.data)
      .split('"$id":')
      .join('"id":')
      .split('"_id":')
      .join('"id":')
      .split('"$oid":')
      .join('"oid":')
      .split('"$date":')
      .join('"date":')
      .split('"$numberLong":')
      .join('"numberLong":')
  );
  result = json; // 100500
  //// console.log(result.Alerts)
  // Interacting with the store, see `localForage` API.
  const length = await cache.store.length();
  return result;
});
api({
  url: "http://content.ps4.warframe.com/dynamic/worldState.php",
  method: "get"
}).then(async response => {
  console.log(response.request.fromCache);
  tmp_json = response.data;
  json = JSON.parse(
    JSON.stringify(response.data)
      .split('"$id":')
      .join('"id":')
      .split('"_id":')
      .join('"id":')
      .split('"$oid":')
      .join('"oid":')
      .split('"$date":')
      .join('"date":')
      .split('"$numberLong":')
      .join('"numberLong":')
  );
  resultps4 = json; // 100500
  //// console.log(result.Alerts)
  // Interacting with the store, see `localForage` API.
  const length = await cache.store.length();
  return resultps4;
});
api({
  url: "http://content.ps4.warframe.com/dynamic/worldState.php",
  method: "get"
}).then(async response => {
  tmp_json = response.data;
  console.log(response.request.fromCache);

  json = JSON.parse(
    JSON.stringify(response.data)
      .split('"$id":')
      .join('"id":')
      .split('"_id":')
      .join('"id":')
      .split('"$oid":')
      .join('"oid":')
      .split('"$date":')
      .join('"date":')
      .split('"$numberLong":')
      .join('"numberLong":')
  );
  resultps4 = json; // 100500
  //// console.log(result.Alerts)
  // Interacting with the store, see `localForage` API.
  const length = await cache.store.length();
  return resultps4;
});
// Mission
api({
  url:
    "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/missionTypes.json",
  method: "get"
}).then(async response1 => {
  tmp_json = response1.data;
  lang = response1.data; // 100500
  const length = await cache.store.length();
  return lang;
});
// Language Strings
api({
  url:
    "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/languages.json",
  method: "get"
}).then(async response1 => {
  tmp_json = response1.data;
  lang2 = response1.data; // 100500
  const length = await cache.store.length();
  console.log("Cache store length:", length);
  return lang2;
});
// Factions
api({
  url:
    "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/factionsData.json",
  method: "get"
}).then(async response1 => {
  tmp_json = response1.data;
  factions = response1.data; // 100500
  const length = await cache.store.length();
  return lang;
});
// Region
api({
  url:
    "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/persistentEnemyData.json",
  method: "get"
}).then(async response1 => {
  tmp_json = response1.data;
  region1 = response1.data.regions; // 100500
  const length = await cache.store.length();
  return region1;
});

function SyndicateMissions(args, result) {
  var source = result;
  console.log("key =" + args);
  let newarr = [];
  //newarr.length = 0;
  var l1 = 0;
  for (var i = 0; i < source.length; i++) {
    if (source[i].Jobs) {
      newarr.push(source[i]);
    }
  }
  console.log("newarr =" + JSON.stringify(newarr[0]));
  return newarr;
}
function Events(args, result) {
  var source = result;
  var key1 = [{ LanguageCode: args }];
  let selCountryIds = _.map(key1, "LanguageCode");
  t1 = 0;
  console.log("key =" + args);
  let newarr = [];
  //newarr.length = 0;
  var l1 = 0;
  for (var i = 0; i < source.length; i++) {
    if (
      _.filter(source[i].Messages, country => {
        return _.includes(selCountryIds, country.LanguageCode);
      })
    ) {
      var x = _.filter(source[i].Messages, country => {
        return _.includes(selCountryIds, country.LanguageCode);
      });
      // rebuild array with filtered items
      if (x != "") {
        console.log("check1: " + JSON.stringify(x.length));
        // remove duplicate Messages
        if (x.length > 1) {
          x.splice(1);
        }
        console.log("check2: " + JSON.stringify(x.length));
        var item = {
          id: source[i].id,
          Messages: x,
          Prop: source[i].Prop,
          Date: source[i].Date,
          ImageUrl: source[i].ImageUrl,
          Priority: source[i].Priority,
          MobileOnly: source[i].MobileOnly
        };
        newarr.push(item);
      }
    }
    console.log("newarr =" + JSON.stringify(newarr[0]));
  }
  return newarr;
}
function missionType(key) {
  if (key in lang) {
    return lang[key].value;
  }
  if (key) {
    return toTitleCase(key.replace(/^MT_/, ""));
  }
  return key;
}
function LangString(key) {
  console.log(key.toLowerCase());
  var key = key.toLowerCase();
  if (key && lang2[key.toLowerCase()]) {
    return lang2[key.toLowerCase()].value;
  }
  return key;
}
function faction(key) {
  if (key in factions) {
    return factions[key].value;
  }
  if (key) {
    return toTitleCase(key.replace(/^FC_/, ""));
  }
  return key;
}
function region(key) {
  if (key && region1[key]) {
    return region1[key];
  }
  return key;
}
module.exports = {
  missionType,
  region,
  faction,
  LangString,
  Events,
  SyndicateMissions
};
