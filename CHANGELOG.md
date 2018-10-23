# Changelog

- 23-10-2018

  - Added better Multilang Response to Factions & MissionTypes<br>
    Response is now an Array of current translations from @WFCD in form of

  ```
  "lang": "lang_value",
  ```

  Example:

  ```
      "missionType": {
      "de": "Gefangennahme",
      "en": "Capture",
      "es": "Captura",
      "fr": "Capture",
      "it": "Cattura",
      "ko": "생포",
      "pl": "Pojmanie",
      "pt": "Captura",
      "ru": "Захват",
      "zh": "捕獲"
      }

      "faction": {
      "de": "Befallene",
      "en": "Infested",
      "es": "Infestados",
      "fr": "Infesté",
      "it": "Infested",
      "ko": "인페스티드",
      "pl": "Plaga",
      "pt": "Infestado",
      "ru": "Заражённые",
      "zh": "Infested"
      }
  ```

  - Multilang for Events
    Event Messages can be filtered by lang id
    Example:

  ```
    pcevents: Events(platform: "pc", lang: "de") {
    Messages {
      Message
    }
  }
    ps4events: Events(platform: "ps4", lang: "en") {
    Messages {
      Message
    }
  }
  xbevents: Events(platform: "xb", lang: "es") {
    Messages {
      Message
    }
  }
  ```

  Result:

  ```
    "pcevents": [
      {
        "Messages": [
          {
            "Message": "Chroma Prime Access jetzt erhältlich!"
          }
        ]
      },.....
    "ps4events": [
      {
        "Messages": [
          {
            "Message": "Chroma Prime Access Available Now!"
          }
        ]
      },....
    "xbevents": [
      {
        "Messages": [
          {
            "Message": "La Máscara de Revenant: Actualización 23.7.0"
          }
        ]
      },....
  ```

  - Fixed Alert Reward Schema
  - Added language Selector to Alert, Goals
    default is "en". Currently active for Faction String & MissionType String
  - Fixed a the dumb variable copy, now lang/platform switch works as it should.
