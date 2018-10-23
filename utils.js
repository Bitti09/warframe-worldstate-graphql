let lang;
let region1, lang2;
var tmp_json = {};
const _ = require("lodash");
const fetchJson = require("fetch-json");
var fs = require("fs");
const axios = require("axios");
const { setupCache } = require("axios-cache-adapter");
const cache = setupCache({
  maxAge: 15 * 60 * 1000
});
const api = axios.create({
  adapter: cache.adapter
});
var factions = {};
var missionTypes = {};
var solNodes = {};

var langtest = ["de", "es", "fr", "it", "ko", "pl", "pt", "ru", "zh", "en"];
//factions
for (var t = 0; t < langtest.length; t++) {
  //read data
  var url1 = "test/data/" + langtest[t] + "/factionsData.json";
  var content = fs.readFileSync(url1);
  content = JSON.parse(content);
  // build object
  var z = Object.keys(content);
  for (var i = 0; i < z.length; i++) {
    if (!factions[z[i]]) {
      factions[z[i]] = {};
    }
    var l = langtest[t];
    var v = content[[z[i]]].value;
    var tt = { value: [v] };
    factions[z[i]][l] = {};
    factions[z[i]][l] = v;
  }
}

//missionTypes
for (var t = 0; t < langtest.length; t++) {
  //read data
  var url1 = "test/data/" + langtest[t] + "/missionTypes.json";
  var content = fs.readFileSync(url1);
  content = JSON.parse(content);
  // build object
  var z = Object.keys(content);
  /**/ for (var i = 0; i < z.length; i++) {
    if (!missionTypes[z[i]]) {
      missionTypes[z[i]] = {};
    }
    var l = langtest[t];
    var v = content[[z[i]]].value;
    var tt = { value: [v] };
    missionTypes[z[i]][l] = {};
    missionTypes[z[i]][l] = v;
  }
}
//solNodes
for (var t = 0; t < langtest.length; t++) {
  //read data
  var url1 = "test/data/" + langtest[t] + "/solNodes.json";
  var content = fs.readFileSync(url1);
  content = JSON.parse(content);
  // build object
  var z = Object.keys(content);
  /**/ for (var i = 0; i < z.length; i++) {
    if (!solNodes[z[i]]) {
      solNodes[z[i]] = {};
    }
    var l = langtest[t];
    var v = content[[z[i]]].value;
    var tt = { value: [v] };
    solNodes[z[i]][l] = {};
    solNodes[z[i]][l] = v;
  }
}
// Language Strings
api({
  url:
    "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/languages.json",
  method: "get"
}).then(async response1 => {
  tmp_json = response1.data;
  lang2 = response1.data; // 100500
  const length = await cache.store.length();
  return lang2;
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
  let newarr = [];
  //newarr.length = 0;
  var l1 = 0;
  for (var i = 0; i < source.length; i++) {
    if (source[i].Jobs) {
      newarr.push(source[i]);
    }
  }
  return newarr;
}
function Events(args, result) {
  var source = result;
  var key1 = [{ LanguageCode: args }];
  let selCountryIds = _.map(key1, "LanguageCode");
  t1 = 0;
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
        // remove duplicate Messages
        if (x.length > 1) {
          x.splice(1);
        }
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
  }
  return newarr;
}
function missionType(key, lang) {
  if (key in missionTypes) {
    return missionTypes[key][lang];
  }
  if (key) {
    return toTitleCase(key.replace(/^MT_/, ""));
  }
  return key;
}
function LangString(key) {
  var key = key.toLowerCase();
  if (key && lang2[key.toLowerCase()]) {
    return lang2[key.toLowerCase()].value;
  }
  return key;
}
function faction(key) {
  if (key in factions) {
    return factions[key];
  }
  if (key) {
    //return toTitleCase(key.replace(/^FC_/, ""));
  }
  return key;
}
function factionlang(key, lang) {
  console.log("func1 " + key);
  if (key in factions) {
    return factions[key][lang];
  }
  return key;
}
function locationlang(key, lang) {
  console.log("func1 " + key);
  if (key in solNodes) {
    return solNodes[key][lang];
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
  locationlang,
  LangString,
  Events,
  factionlang,
  SyndicateMissions
};
