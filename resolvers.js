const axios = require("axios");
var moment = require("moment");

const { setupCache } = require("axios-cache-adapter");
const cache = setupCache({
  maxAge: 15 * 60 * 1000
});
const api = axios.create({
  adapter: cache.adapter
});
const _ = require("lodash");
const {
  missionType,
  region,
  faction,
  LangString,
  filter1,
  Events
} = require("./utils.js");
const resolvers = {
  Query: {
    ActiveMissions: () => {
      return result.ActiveMissions;
    },
    Version: () => {
      return result.Version;
    },
    Time: () => {
      return moment.unix(result.Time).format("HH:mm:ss");
    },
    Date: () => {
      return moment.unix(result.Date).format("DD.MM.YYYY");
    },
    Events: (root, args) => {
      if (args.lang) {
        return Events(args.lang, result.Events);
      } else {
        return Events("en", result.Events);
      }
    },
    Alerts: (_, args) => {
      var filtered = [];
      if (args.showexpired == false) {
        for (var i = 0; i < result.Alerts.length; i++) {
          var value = result.Alerts[i].Expiry.date.numberLong / 1000;
          console.log(moment.unix(value).isBefore());
          if (moment.unix(value).isBefore() == false) {
            filtered.push(result.Alerts[i]);
          }
        }
        console.log("filter" + filtered);
        return filtered;
      } else {
        return result.Alerts;
      }
    },
    Goals: () => {
      return result.Goals;
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
