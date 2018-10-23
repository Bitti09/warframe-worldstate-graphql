var moment = require("moment");
const _ = require("lodash");
const fetchJson = require("fetch-json");

let resultpc, resultps4, resultxb;
function getResource(id) {
  if (!id) {
    id = "pc";
    var url = "http://content.warframe.com/dynamic/worldState.php";
  } else {
    var url = "http://content." + id + ".warframe.com/dynamic/worldState.php";
  }
  var url = "http://content.warframe.com/dynamic/worldState.php";
  fetchJson.get(url).then(data =>
    handleData(
      data.bodyText
        .split('"$id":')
        .join('"id":')
        .split('"_id":')
        .join('"id":')
        .split('"$oid":')
        .join('"oid":')
        .split('"$date":')
        .join('"date":')
        .split('"$numberLong":')
        .join('"numberLong":'),
      id
    )
  );
}
function handleData(data, id) {
  console.log(id);
  switch (id) {
    case "pc":
      resultpc = JSON.parse(data);
      break;
    case "ps4":
      resultps4 = JSON.parse(data);
      break;
    case "xb1":
      resultxb = JSON.parse(data);
      break;
    default:
      resultpc = JSON.parse(data);
  }
}
getResource();
getResource("ps4");
getResource("xb1");
let timerId = setTimeout(function tick() {
  console.log("tick");
  getResource();
  getResource("ps4");
  getResource("xb1");
  timerId = setTimeout(tick, 60000); // (*)
}, 60000);

const {
  missionType,
  region,
  faction,
  LangString,
  Events,
  factionlang,
  SyndicateMissions
} = require("./utils.js");
const resolvers = {
  Query: {
    WorldSeed: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.WorldSeed;
    },
    MobileVersion: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.MobileVersion;
    },
    BuildLabel: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.BuildLabel;
    },
    SyndicateMissions: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      if (args.withjobsonly == true) {
        return SyndicateMissions(args.withjobsonly, res.SyndicateMissions);
      } else {
        return res.SyndicateMissions;
      }
    },
    ActiveMissions: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.ActiveMissions;
    },
    GlobalUpgrades: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.GlobalUpgrades;
    },
    FlashSales: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.FlashSales;
    },
    Invasions: (root, args) => {
      var leng = "";
      if (args.lang) {
        lang = args.lang;
      } else {
        lang = "en";
      }

      console.log(lang);
      var res = [];
      res.length = 0;

      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }

      var filtered = [];
      filtered.length = 0;
      filtered = res.Invasions;
      for (var i = 0; i < filtered.length; i++) {
        filtered[i]["Faction"] = factionlang(filtered[i]["Faction"], lang);
        filtered[i]["AttackerMissionInfo"]["faction"] = factionlang(
          res.Invasions[i]["AttackerMissionInfo"]["faction"],
          lang
        );
        console.log(
          "test1: " + resultpc.Invasions[i]["DefenderMissionInfo"]["faction"]
        );
        var x = filtered[i]["DefenderMissionInfo"]["faction"];
        filtered[i]["DefenderMissionInfo"]["faction"] = factionlang(x, lang);
      }
      console.log(
        "test1: " + resultpc.Invasions[0]["DefenderMissionInfo"]["faction"]
      );
      return filtered;
    },
    HubEvents: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.HubEvents;
    },
    NodeOverrides: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.NodeOverrides;
    },
    BadlandNodes: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.BadlandNodes;
    },
    Version: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.Version;
    },
    Time: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return moment.unix(res.Time).format("HH:mm:ss");
    },
    Date: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return moment.unix(res.Date).format("DD.MM.YYYY");
    },
    Events: (root, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      if (args.lang) {
        return Events(args.lang, res.Events);
      } else {
        return Events("en", res.Events);
      }
    },
    Alerts: (_, args) => {
      let res, lang;
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      if (args.lang) {
        lang = args.lang;
      } else {
        lang = "en";
      }
      var filtered = [];
      if (args.showexpired == false) {
        for (var i = 0; i < res.Alerts.length; i++) {
          var value = res.Alerts[i].Expiry.date.numberLong / 1000;
          if (moment.unix(value).isBefore() == false) {
            filtered.push(res.Alerts[i]);
          }
        }
        for (var i = 0; i < filtered.length; i++) {
          filtered[i].MissionInfo["faction"] = factionlang(
            filtered[i].MissionInfo["faction"],
            lang
          );
          filtered[i].MissionInfo["missionType"] = missionType(
            filtered[i].MissionInfo["missionType"],
            lang
          );
        }
        console.log("filter" + filtered);
        return filtered;
      } else {
        filtered = res.Alerts;
        for (var i = 0; i < filtered.length; i++) {
          filtered[i].MissionInfo["faction"] = factionlang(
            filtered[i].MissionInfo["faction"],
            lang
          );
          filtered[i].MissionInfo["missionType"] = missionType(
            filtered[i].MissionInfo["missionType"],
            lang
          );
        }
        return res.Alerts;
      }
    },
    Goals: (_, args) => {
      let res;
      if (args.lang) {
        lang = args.lang;
      } else {
        lang = "en";
      }
      console.log(args);
      var filtered = [];
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      filtered = res.Goals;
      for (var i = 0; i < filtered.length; i++) {
        filtered[i]["Faction"] = factionlang(filtered[i]["Faction"], lang);
      }
      return filtered;
    },
    VoidTraders: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.VoidTraders;
    },
    PrimeAccessAvailability: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PrimeAccessAvailability;
    },
    PrimeVaultAvailabilities: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PrimeVaultAvailabilities;
    },
    DailyDeals: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.DailyDeals;
    },
    LibraryInfo: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.LibraryInfo;
    },
    PVPChallengeInstances: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PVPChallengeInstances;
    },
    PersistentEnemies: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PersistentEnemies;
    },
    PVPAlternativeModes: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PVPAlternativeModes;
    },
    PVPActiveTournaments: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = JSON.parse(JSON.stringify(resultpc));
          break;
        case "ps4":
          res = JSON.parse(JSON.stringify(resultps4));
          break;
        case "xb1":
          res = JSON.parse(JSON.stringify(resultxb));
          break;
        default:
          res = JSON.parse(JSON.stringify(resultpc));
      }
      return res.PVPActiveTournaments;
    },
    ProjectPct: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = resultpc;
          break;
        case "ps4":
          res = resultps4;
          break;
        case "xb1":
          res = resultxb;
          break;
        default:
          res = resultpc;
      }
      return res.ProjectPct;
    },
    ConstructionProjects: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = resultpc;
          break;
        case "ps4":
          res = resultps4;
          break;
        case "xb1":
          res = resultxb;
          break;
        default:
          res = resultpc;
      }
      return res.ConstructionProjects;
    },
    TwitchPromos: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = resultpc;
          break;
        case "ps4":
          res = resultps4;
          break;
        case "xb1":
          res = resultxb;
          break;
        default:
          res = resultpc;
      }
      return res.TwitchPromos;
    },
    WeeklyChallenges: (_, args) => {
      let res;
      console.log(args);
      switch (args.platform) {
        case "pc":
          res = resultpc;
          break;
        case "ps4":
          res = resultps4;
          break;
        case "xb1":
          res = resultxb;
          break;
        default:
          res = resultpc;
      }
      console.log(res.WeeklyChallenges);
      return res.WeeklyChallenges;
    }
  },
  MissionType: {
    __parseValue(value) {
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
      return missionType(value); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  Region: {
    __parseValue(value) {
      return value; // value from the client
    },
    __serialize(value) {
      return region(value); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  Test: {
    __parseValue(value) {
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
      return value; // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  Faction: {
    __parseValue(value) {
      return value; // value from the client
    },
    __serialize(value) {
      return faction(value); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  LangString: {
    __parseValue(value) {
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
      return LangString(value); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  DateTime: {
    __parseValue(value) {
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      var value = value.date.numberLong / 1000;
      console.log(value);
      var date = moment.unix(value).format("DD.MM.YYYY");
      var time = moment.unix(value).format("HH:mm:ss");
      var combined = date + " - " + time;
      return {
        date,
        time,
        combined
      };
      //return region(value); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  },
  Ids: {
    __parseValue(value) {
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
      return region(value.oid); // value sent to the client
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }
};
module.exports = resolvers;
