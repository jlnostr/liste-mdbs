// Usage: node fetch.js > mdbs.csv

const fetch = require('node-fetch');
const parser = require('node-html-parser');

const sourceURL = "https://de.wikipedia.org/wiki/Liste_der_Mitglieder_des_Deutschen_Bundestages_(19._Wahlperiode)";
fetch(sourceURL)
    .then(result => result.text())
    .then(text => {
        const root = parser.parse(text);
        const tables = root.querySelectorAll("table");

        const tableToParse = tables[3];
        const rows = tableToParse.querySelectorAll("tr")

        console.log("Name,Geburtsjahr,Partei,Land,Wahlkreis,Erststimmen,Bemerkungen,E-Mail")
        for (const row of rows) {
            let line = "";

            const cells = row.querySelectorAll("td");
            let name = "";

            // Skip first cell (image)
            for (let i = 1; i < cells.length; i++) {
                const cell = cells[i];

                const text = cell.text.trim();

                if (i == 1) name = text;

                line += "\"" + text + "\","
            }

            if (name == "") continue;

            let prefix = name.toLowerCase()
                .replace(" ", ".") // Replace first space with dot (usally separates first and last name)
                .replace(/ä/g, "ae")
                .replace(/ö/g, "oe")
                .replace(/ü/g, "ue")
                .replace(/é/g, "e")
                .replace(/ğ/g, "g")
                .replace(/ /g, "") // Replace all other spaces with empty string

            line += "\"" + prefix + "@bundestag.de" + "\""

            console.log(line);
        }
    });



