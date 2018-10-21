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
  fetchJson.get(url).then(data => handleData(data, id));
}
function handleData(data, id) {
  console.log(id);
  switch (id) {
    case "pc":
      resultpc = JSON.parse(data.bodyText);
      break;
    case "ps4":
      resultps4 = JSON.parse(data.bodyText);
      break;
    case "xb1":
      resultxb = JSON.parse(data.bodyText);
      break;
    default:
      resultpc = JSON.parse(data.bodyText);
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
  SyndicateMissions
} = require("./utils.js");
const resolvers = {
  Query: {
    WorldSeed: (_, args) => {
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
      return res.WorldSeed;
    },
    MobileVersion: (_, args) => {
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
      return res.MobileVersion;
    },
    BuildLabel: (_, args) => {
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
      return res.BuildLabel;
    },
    SyndicateMissions: (root, args) => {
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
      return res.ActiveMissions;
    },
    GlobalUpgrades: (root, args) => {
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
      return res.GlobalUpgrades;
    },
    FlashSales: (root, args) => {
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
      return res.FlashSales;
    },
    Invasions: (root, args) => {
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
      return res.Invasions;
    },
    HubEvents: (root, args) => {
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
      return res.HubEvents;
    },
    NodeOverrides: (root, args) => {
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
      return res.NodeOverrides;
    },
    BadlandNodes: (root, args) => {
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
      return res.BadlandNodes;
    },
    Version: (root, args) => {
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
      return res.Version;
    },
    Time: (root, args) => {
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
      return moment.unix(res.Time).format("HH:mm:ss");
    },
    Date: (root, args) => {
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
      return moment.unix(res.Date).format("DD.MM.YYYY");
    },
    Events: (root, args) => {
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
      if (args.lang) {
        return Events(args.lang, res.Events);
      } else {
        return Events("en", res.Events);
      }
    },
    Alerts: (_, args) => {
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
      var filtered = [];
      if (args.showexpired == false) {
        for (var i = 0; i < res.Alerts.length; i++) {
          var value = res.Alerts[i].Expiry.date.numberLong / 1000;
          console.log(moment.unix(value).isBefore());
          if (moment.unix(value).isBefore() == false) {
            filtered.push(res.Alerts[i]);
          }
        }
        console.log("filter" + filtered);
        return filtered;
      } else {
        return res.Alerts;
      }
    },
    Goals: (_, args) => {
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
      return res.Goals;
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
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
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
      console.log(value);
      return value; // value from the client
    },
    __serialize(value) {
      console.log(value);
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
      console.log(LangString(value));
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
