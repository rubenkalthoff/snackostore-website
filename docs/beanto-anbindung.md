# Snackostore mit Beanto verbinden

Die Anbindung ist implementiert, aber noch nicht veröffentlicht. Es wurden keine echten Schlüssel erzeugt und keine Zugangsdaten geändert.

## 1. Supabase vorbereiten

Das SQL `Beanto-Website-Produktausgabe.sql` aus diesem Ausgabeordner in Supabase ausführen. Es setzt die vorhandenen Verbindungsentwürfe und die standortgetrennten Produktfreigaben voraus (`Beanto-Website-Schnittstellen-Entwuerfe.sql` und `Beanto-Website-Standortauswahl.sql`). Bereits gespeicherte Produktauswahlen bleiben erhalten.

## 2. Beanto in Netlify konfigurieren

Im Netlify-Projekt von **Beanto**, nicht im Projekt der öffentlichen Website:

| Variable | Wert |
|---|---|
| `BEANTO_APP_URL` | `https://beanto.netlify.app` bzw. die tatsächliche Beanto-Adresse |
| `BEANTO_WEBSITE_EXPORT_ENABLED` | `true` |
| `BEANTO_WEBSITE_LOCATION_CODE` | Der genaue Stockheimer Standort-Code aus Beanto, z. B. `STOCKHEIM` |
| `SUPABASE_SECRET_KEY` | Bestehender serverseitiger Supabase-Secret-Key; falls noch nicht vorhanden, in Supabase abrufen und ausschließlich serverseitig hinterlegen |

Die vorhandenen `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` bleiben bestehen. Der Secret-Key darf niemals `NEXT_PUBLIC_` oder `PUBLIC_` heißen oder in der Snackostore-Website landen. Keine Schlüssel im Chat teilen.

Die Standortbegrenzung kommt ausschließlich aus der Beanto-Serverkonfiguration. Besucher und Website-Aufrufe können sie nicht per URL oder Anfrageparameter ändern. Die Anwendung ist weiterhin eine Snackostore-Installation, noch keine gemeinsame Plattform für unabhängige Kunden.

## 3. Änderungen veröffentlichen

Beanto und die Snackostore-Website müssen beide mit den Änderungen veröffentlicht werden. Ein erneuter Netlify-Deploy ist nach dem Setzen oder Ändern der Umgebungsvariablen nötig. Push/Deploy erfolgt erst auf ausdrücklichen Wunsch.

Lokale Repository-Pfade:

- Beanto: `C:/Users/ruben/Desktop/Snackostore/Beanto/Website/beanto`
- Snackostore: `C:/Users/ruben/Documents/ChatGPT/Wesbeite Snackostore`

## 4. Website-Schlüssel in Beanto erstellen

1. In Beanto `Einstellungen → Website & Schnittstellen` öffnen.
2. Die Verbindung zur Snackostore-Website auswählen.
3. Stockheim und die gewünschten Artikel auswählen; Änderungen speichern.
4. Unter `04 · Website-Zugang` zunächst `Datenfreigabe prüfen` verwenden. Ausgegeben werden nur gespeicherte, aktive Standortartikel mit einem VK größer als null Euro.
5. `Schlüssel erstellen & Zugang aktivieren` klicken. Der vollständige Schlüssel wird nur jetzt angezeigt. Er wird in der Datenbank ausschließlich als SHA-256-Hash gespeichert.
6. Die angezeigte `BEANTO_CATALOG_URL` und den Schlüssel direkt in den Netlify-Einstellungen der **Snackostore-Website** hinterlegen.

## 5. Snackostore in Netlify konfigurieren

Im Netlify-Projekt der öffentlichen Website (`snackostore-website` / Snackostore):

| Variable | Wert |
|---|---|
| `BEANTO_CATALOG_URL` | Die in Beanto angezeigte URL mit der Verbindungs-ID |
| `BEANTO_CATALOG_KEY` | Der gerade erstellte vollständige Website-Schlüssel |
| `BEANTO_LOCATION_CODE` | Derselbe genaue Stockheimer Standort-Code wie in Beanto |

Alle drei Variablen müssen für **Functions** verfügbar sein. Den Schlüssel als geheimen Wert behandeln, nicht in `netlify.toml`, Git oder öffentliche Astro-Variablen schreiben. Anschließend erneut deployen.

Die Website-Funktion unter `/api/products` ruft Beanto serverseitig auf, prüft Standort und Datenformat und gibt nur die öffentliche Produktauswahl weiter. Die Browser sehen weder den Website-Schlüssel noch den Supabase-Secret-Key. Es ist keine direkte Supabase-Anbindung im Website-Browser nötig.

## 6. Prüfen

- `https://snackostore.de/api/products` zeigt ausschließlich freigegebene Produkte mit Kategorie, Unterkategorie, VK brutto und Status.
- Im Abschnitt Sortiment erscheinen Suche, Kategorien und Produktkarten.
- `Verfügbar` entspricht Gesamtbestand > 0; null/negativ ergibt `Ausverkauft`; unbekannter Bestand ergibt `Bestand unbekannt`.
- Fehlender Preis und null Euro werden nicht veröffentlicht, selbst wenn ein Artikel versehentlich ausgewählt blieb.
- Ein nicht ausgewählter Artikel und Produkte anderer Standorte dürfen nicht im Ergebnis sein.
- Nach dem Website-Abruf zeigt Beanto den letzten erfolgreichen Datenabruf und die Artikelzahl. `Datenfreigabe prüfen` selbst zählt nicht als externer Website-Abruf.
- Die öffentliche Website speichert erfolgreiche Antworten für maximal fünf Minuten zwischen. Danach werden Preis-, Freigabe- und Bestandsänderungen neu geladen. Fehler werden nicht zwischengespeichert oder als verfügbar dargestellt.

## Zugang sperren oder erneuern

`Zugang sperren` macht den Schlüssel bei Beanto sofort ungültig. Bereits öffentlich zwischengespeicherte Antworten können noch bis zu fünf Minuten sichtbar sein. `Schlüssel erneuern` ersetzt den bisherigen Schlüssel; den neuen Wert anschließend in der Snackostore-Netlify-Website eintragen und erneut deployen.

Ein deaktiviertes oder nicht mehr als Admin berechtigtes Verbindungskonto kann keine Daten mehr über seinen Schlüssel ausgeben. Die Produktausgabe ist serverseitig auf 60 authentifizierte Abrufe je Minute und Verbindung begrenzt. Die öffentliche Website nutzt den CDN-Cache zur Entlastung.

## Kategorien

Website-Kategorien können in Beanto separat vom Artikelstamm gepflegt werden. Eine Vorlage, Grundregeln je interner Kategorie und gezielte Einzel-/Sammelzuordnungen ermöglichen z. B. `Alkoholische Getränke → Bier`, während intern `Getränke` erhalten bleibt. Ohne abweichende Zuordnung wird die interne Kategorie übernommen. Die Website verwendet die gleichen Kategorie-Datenfelder; zusätzliche Website-Änderungen sind dafür nicht nötig.

## Lokale Entwicklung

`astro dev` bzw. `astro preview` allein führt Netlify Functions nicht aus. Für einen vollständigen lokalen Test entweder Netlify Dev mit lokalen serverseitigen Umgebungsvariablen nutzen oder auf einem Netlify-Testdeploy prüfen. Ohne konfigurierte Schnittstelle bleibt die Produktliste bei einer verständlichen Meldung, statt Verfügbarkeit zu erfinden.

## Geprüft

- Beanto: Produktionsbuild, TypeScript und Lint.
- Datenbanktests: Eigentümer-/Adminprüfung, feste Standortbegrenzung, gespeicherte Freigaben, öffentliche Feldprojektion, Preis- und Bestandsfälle, Schlüsselerneuerung, Sperrung, deaktivierter Eigentümer, Abrufbegrenzung, Wiederholbarkeit der Migration.
- HTTP-Tests: Bearer-Format, Hash-Übertragung, Same-Origin-Adminaktionen, einmalige Schlüsselausgabe, keine Sitzungsfreigabe für andere APIs, deaktivierte Ausgabe bleibt geschlossen.
- Website: Astro-Check und Produktionsbuild; Netlify-Funktion auf Datenprojektion, Fehler, HTTPS, Redirect-Verbot, Standortbegrenzung und Fünf-Minuten-Cache geprüft.
- Lokale Browserprüfung mit drei synthetischen Produkten: Datenanzeige, Karten-Styles, Suche und Verfügbarkeitsfilter funktionieren. Browser-Screenshotaufnahme war in der Testumgebung nicht verfügbar.
- Keine echten Produktfreigaben verändert, keine echten Zugangsschlüssel erstellt, noch kein Live-Abruf und kein Push/Deploy.
