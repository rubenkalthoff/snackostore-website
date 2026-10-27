# DNS-Bestand und Umstellung snackostore.de

Stand: 26.10.2026. Werte aus Screenshots und Angaben des Betreibers. Keine DNS-Änderung durch den Agenten durchgeführt. Kein Push.

## Bisherige Wix-Zone

| Name | Typ | Wert | Priorität | TTL |
| --- | --- | --- | --- | --- |
| @ | A | 185.230.63.107 | | 1 Stunde |
| @ | A | 185.230.63.186 | | 1 Stunde |
| @ | A | 185.230.63.171 | | 1 Stunde |
| www | CNAME | cdn3.wixdns.net | | 1 Stunde |
| @ | MX | smtpin.rzone.de | 5 | 1 Stunde |
| _dmarc | CNAME | _dmarc.wixemails.com | | 1 Stunde |
| s1._domainkey | CNAME | s1._domainkey.snackostore.de.s012.ascendbywix.com | | 1 Stunde |
| s2._domainkey | CNAME | s2._domainkey.snackostore.de.s012.ascendbywix.com | | 1 Stunde |
| sel1._domainkey | CNAME | sel1._domainkey.snackostore.de.s012.ascendbywix.com | | 1 Stunde |
| sg | CNAME | sg.snackostore.de.s012.ascendbywix.com | | 1 Stunde |

Nameserver: ns2.wixdns.net und ns3.wixdns.net. Der gezeigte TXT-Bereich ist leer. Weitere MX-Einträge sind laut Screenshot nicht vorhanden. Nicht gezeigte Recordtypen sind nicht als ausgeschlossen zu betrachten.

Die Ascend-/wixemails-Einträge gehören zu Wix-Mail-/Marketingfunktionen und belegen nicht den Anbieter des eigentlichen Postfachs. Der MX-Eintrag verweist auf STRATO. Nach Abschaltung der Wix-Mailfunktionen sollten deren CNAMEs geprüft und nicht dauerhaft unbesehen weitergeführt werden.

## Ziel

Registrar und DNS: STRATO. Postfach: STRATO. Website: Netlify.

- @ A 75.2.60.5 (vom Netlify-Domain-Dialog vorgegeben)
- www CNAME snackostore.netlify.app
- MX smtpin.rzone.de, Priorität 5 erhalten beziehungsweise STRATO-Standard-Mailserver prüfen
- Mailauthentifizierung nach Wechsel gesondert kontrollieren. Wix-CNAMEs zunächst als Bestandsaufnahme gesichert; nicht als notwendige STRATO-Konfiguration ausgeben.
- Keine alten Wix-A-Records parallel mit Netlify betreiben. Etwaige alte AAAA-Records auf Konflikte prüfen.
- www.snackostore.de in Netlify als Hauptdomain verwenden.

Vor Wix-Kündigung: autoritative DNS-Zone bei STRATO, Website mit/ohne www, HTTPS, eingehende/ausgehende E-Mails und Formularzustellung prüfen. Auch snackostore.com und snackostore.eu waren laut Wix-Übersicht verbunden; deren Abhängigkeiten separat prüfen, falls sie erhalten werden sollen.

## Verifizierter Stand 27.10.2026

- DENIC meldet STRATO-Nameserver docks20.rzone.de und shades04.rzone.de.
- Hauptdomain A 75.2.60.5; www CNAME snackostore.netlify.app; kein AAAA in der geprüften Antwort.
- MX smtpin.rzone.de, Priorität 5.
- Beide HTTPS-Adressen liefern die neue Netlify-Website. www leitet auf https://snackostore.de/ weiter. Deshalb wird diese Adresse als Canonical, Open-Graph-URL und Sitemap-Basis verwendet.
- .com und .eu verwenden weiterhin Wix-Nameserver; beide zeigen MX smtpin.rzone.de, Priorität 5. TXT-Abfrage ohne Einträge. Vor deren Nameserverwechsel weitere CNAMEs und tatsächlich genutzte Mailkonten prüfen.
- Explizite permanente Weiterleitungen für .com/.eu und deren www-Varianten sind im Code vorbereitet. Voraussetzung: alle vier Hostnamen als Netlify-Domain-Aliase hinzufügen, DNS umstellen und HTTPS-Zertifikat dafür ausstellen lassen.
