# Snackostore

Lokale Astro-/TypeScript-Website für den Automatenstore in Stockheim. Statischer Build für Netlify mit serverseitiger Beanto-Produktanzeige über eine Netlify Function. Alle Originalbilder bleiben im Ordner `material` erhalten. Veröffentlichte, verkleinerte Bilder liegen in `public/images`.

## In VS Code öffnen und starten

1. **Datei → Ordner öffnen** und `C:\Users\ruben\Documents\ChatGPT\Wesbeite Snackostore` auswählen. Nicht `src` oder `dist` öffnen.
2. **Terminal → Neues Terminal** öffnen.
3. Bei einer frischen Installation zunächst `npm.cmd ci` ausführen. Node.js 22.12 oder neuer verwenden (Node 24 ebenfalls möglich).
4. `npm.cmd run dev` ausführen.
5. Die im Terminal ausgegebene URL öffnen, normalerweise `http://localhost:4321`. Falls der Port belegt ist, wird ein anderer Port angegeben.
6. Änderungen speichern: Die Vorschau aktualisiert sich automatisch. Mit `Strg+C` den Server beenden.

Unter macOS/Linux genügt `npm` statt `npm.cmd`.

## Inhalte ändern

- `src/data/site.ts`: Adresse, E-Mail, WhatsApp, Routenlink, Kategorien, Kontakt-Themen.
- `src/pages/index.astro`: Startseite und Texte.
- `src/styles/global.css`, `brand.css`, `hero-stage.css`, `dark.css`: Grundlayout, Markenstil, Einstieg und dunkles Thema.
- `src/components`: Navigation, Footer, Icons, Kontaktformular.
- `src/pages/impressum.astro`, `src/pages/datenschutz.astro`: Anbieter- und Datenschutzhinweise. Offene betriebliche Prüfungen stehen in `docs/datenschutz-betrieb.md`.
- `public/images`: Optimierte Fotos und Logo. Originale nicht ungeprüft durch große Dateien ersetzen.
- `public/fonts`: Lokal gespeicherte Manrope-Schrift samt OFL-Lizenz.

Die Produktanzeige lädt freigegebene Beanto-Daten über `/api/products`. Einrichtung und serverseitige Umgebungsvariablen: [Beanto-Anbindung](docs/beanto-anbindung.md). Keine Datenbank-Zugangsdaten oder Website-Schlüssel im Browser oder Git speichern. `astro dev` allein führt die Netlify Function nicht aus.

## Prüfen und Produktionsdateien erzeugen

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

Der Build erzeugt `dist`. Diesen Ordner nicht manuell bearbeiten. Astro generiert ihn bei jedem Build neu. Auf restriktiven Entwicklungsumgebungen kann vor diesen Befehlen `$env:ASTRO_TELEMETRY_DISABLED='1'` gesetzt werden.

## Über GitHub auf Netlify veröffentlichen

1. Ein **privates Repository** auf GitHub anlegen, beispielsweise `snackostore-website`. Zunächst keine README oder weitere Dateien auf GitHub erzeugen, wenn der lokale Ordner als bestehendes Repository hochgeladen wird.
2. In VS Code die Quellcodeverwaltung öffnen, Projektänderungen prüfen und einen Commit erstellen. `node_modules`, `.astro`, `dist` und `.env` werden ignoriert. `material` enthält die Originalbilder: Nur hochladen, wenn sie ins private Repository sollen; alternativ `material/` in `.gitignore` aufnehmen. Für die Website werden nur die vorbereiteten Dateien aus `public` benötigt.
3. Über **Branch veröffentlichen** das private GitHub-Repository wählen. Alternativ das bestehende Repository über die GitHub-Oberfläche von VS Code verbinden. Vorher vorhandene Remotes mit `git remote -v` prüfen.
4. Bei Netlify ein Projekt aus einem bestehenden Git-Repository importieren und das GitHub-Repository auswählen.
5. Produktionsbranch auswählen (üblicherweise `main`). Build-Befehl **`npm run build`**, Veröffentlichungsordner **`dist`**. Die Datei `netlify.toml` enthält diese Einstellungen bereits.
6. Zunächst die temporäre Netlify-URL verwenden. Dort Inhalte, mobile Darstellung, Links und Formular prüfen. Die bestehende Wix-Website bleibt währenddessen erreichbar.
7. Unter Netlify **Forms** die Formularerkennung aktivieren und anschließend erneut deployen. Das Formular heißt **kontakt**.
8. In den Formularbenachrichtigungen eine E-Mail-Benachrichtigung für **info@snackostore.de** einrichten. Das Empfängerpostfach wird im Netlify-Konto eingestellt, nicht durch HTML-Code. Die Formularübermittlung wird zunächst bei Netlify gespeichert; die Benachrichtigung geht an eure E-Mail. Falls ausschließlich direkte E-Mail-Verarbeitung gewünscht ist, benötigt es stattdessen einen Maildienst mit serverseitiger Integration.
9. Einen echten Test auf der Netlify-URL senden, Eingang sowohl unter Forms als auch im Postfach/Spamordner prüfen. Netlify-Tarif und Formularlimits vor Aktivierung kontrollieren: https://docs.netlify.com/manage/forms/usage-and-billing/
10. Vor dem Domainwechsel die betrieblichen Datenschutzpunkte in `docs/datenschutz-betrieb.md` prüfen. Anbieterangaben sind vom Betreiber bestätigt. Die Datenschutzerklärung enthält noch `noindex`; vor dem öffentlichen Start prüfen.
11. In Netlify `snackostore.de` als Hauptdomain und `www.snackostore.de` als weiterleitende Variante verwenden. Nur die von Netlify angezeigten Website-DNS-Einträge beim Domainanbieter ändern. Bestehende MX-, SPF-, DKIM- und DMARC-Einträge für E-Mail erhalten. HTTPS abwarten und beide Domainvarianten prüfen.
12. Die alte Wix-Veröffentlichung erst nach erfolgreichem Domain- und Mailtest abschalten. Änderungen auf dem Produktionsbranch lösen danach automatisch einen neuen Netlify-Build aus. Andere Branches/Pull Requests können zunächst als Deploy Preview geprüft werden.

Netlify Forms funktioniert lokal nicht. Die lokale Vorschau zeigt deshalb einen Hinweis und verhindert einen vorgetäuschten Versand. Auf Netlify wird nur nach erfolgreicher HTTP-Antwort zur Dankeseite navigiert. Bei deaktivierter Formularerkennung funktioniert die Zustellung nicht; deshalb ist der echte Deployment-Test erforderlich.

## Technische Entscheidungen

Astro erzeugt kleine statische HTML-Seiten. Es gibt kein React-Laufzeitpaket, keinen eigenen Server und keine Datenbank. JavaScript wird nur für das mobile Menü und die Formularbehandlung eingesetzt. Die Navigation und FAQ funktionieren grundsätzlich auch ohne JavaScript; das Formular besitzt einen regulären HTML-POST als Fallback. Manrope, Logo und Fotos werden lokal ausgeliefert. Google Maps und WhatsApp werden ausschließlich verlinkt. Kein Tracking und keine eingebetteten Karten.

Grundlegende SEO: Seitentitel, Beschreibungen, Canonical-Links, Open Graph, Sitemap, robots.txt und Weiterleitungen früherer Hauptseiten. Für einen zusätzlichen Standort müsste die Datenstruktur erweitert werden. Ein alter Produktkatalog wurde bewusst nicht übernommen.

Offizielle Dokumentation: https://docs.astro.build/ · https://docs.netlify.com/manage/forms/setup/

## Änderungen gesammelt veröffentlichen

Nach Wunsch des Betreibers alle Änderungen zunächst lokal sammeln. Kein automatischer Push durch den Agenten. Erst nach ausdrücklicher Anweisung committen und pushen; ein Push auf main löst ein Netlify-Deployment aus.
