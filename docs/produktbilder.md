# Produktbilder pflegen

Aktuell hat jede Produktkarte einen Bildplatzhalter. Alkoholische Getränke und Tabakprodukte tragen zusätzlich ein rotes 18+-Zeichen (keine FSK-Filmkennzeichnung).

## Sofort im Website-Projekt

1. Produktfoto quadratisch zuschneiden (etwa 800 × 800 Pixel), möglichst WebP, ideal unter 150 KB. Nur Bilder verwenden, für die ihr Nutzungsrechte habt.
2. Datei in `public/images/products/` ablegen, zum Beispiel `BEA-123.webp`. Transparente Hintergründe sind möglich.
3. In `src/data/product-images.json` die stabile `beaId` des Produkts mit dem Dateipfad verbinden:

```json
{
  "BEA-123": "/images/products/BEA-123.webp",
  "BEA-456": "/images/products/BEA-456.webp"
}
```

Die Beispiel-IDs durch echte beaId-Werte aus Beanto ersetzen. Keine Produktnamen als Schlüssel verwenden: Namen können sich ändern. Bilder ohne Zuordnung oder mit Ladefehler zeigen weiterhin den Platzhalter.
4. Lokal prüfen, anschließend gesammelt committen und pushen. Netlify veröffentlicht Bilder und Zuordnung mit dem nächsten Build.

## Empfohlen für regelmäßige Pflege: Beanto

Langfristig Bilder direkt am Produkt in Beanto hochladen und in einem öffentlichen Produktbilder-Bucket (beispielsweise Supabase Storage) speichern. Der Upload muss über den geschützten Verwaltungsbereich erfolgen. Nur freigegebene Produktbilder gehören in diesen öffentlichen Bucket.

Die Website unterstützt inzwischen das optionale Katalogfeld `imageUrl`. Die strikte Projektion akzeptiert öffentliche HTTPS-WebP-Bilder aus Supabase Storage im Bucket `product-images` mit UUID-Ordner und UUID-Dateiname. Ein Katalogbild hat Vorrang vor der lokalen Zuordnung. Keine Storage-Schlüssel im Browser hinterlegen.

Katalog-Bildänderungen werden mit dem nächsten Katalogabruf (Cache zwölf Stunden) automatisch übernommen. Nur die lokale Bildzuordnung benötigt einen Website-Build. An der Beanto-Anwendung wurde für diese Vorbereitung nichts geändert.
