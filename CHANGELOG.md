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
