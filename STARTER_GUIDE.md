# Starter Guide - Calculation Tool

Deze handleiding beschrijft hoe de Calculation Tool vanaf de Git-repository lokaal kan worden geïnstalleerd, geconfigureerd en gestart.

## 1. Benodigde software

Om de Calculation Tool lokaal te kunnen ontwikkelen en uitvoeren is de volgende software nodig:

### Frontend

* Node.js
* npm
* Visual Studio Code of een vergelijkbare editor

### Backend

* Visual Studio 2022
* .NET Framework 4.8 Developer Pack
* NuGet Package Manager

### Versiebeheer

* Git

Controleer eventueel of Node.js, npm en Git beschikbaar zijn:

```bash
node -v
npm -v
git --version
```

## 2. Repository ophalen

Clone de repository naar de lokale computer:

```bash
git clone <URL-VAN-DE-REPOSITORY>
```

Ga vervolgens naar de projectmap:

```bash
cd <PROJECTMAP>
```

De stabiele opleverversie bevindt zich op de `main` branch.

```bash
git checkout main
```

Voor verdere ontwikkeling kan de `develop` branch worden gebruikt:

```bash
git checkout develop
```

## 3. Projectstructuur

De applicatie is opgesplitst in een frontend en backend.

```text
Calculation Tool
│
├── Frontend
│   ├── Components
│   ├── Store
│   ├── DXF verwerking
│   └── Export
│
└── Backend
    ├── Controllers
    ├── DTO's
    ├── Models
    ├── Services
    └── Integraties
```

De frontend bevat de gebruikersinterface en client-side verwerking. De backend bevat onder andere de API, berekeningslogica en integratie met externe systemen.

## 4. Frontend installeren

Open een terminal en navigeer naar de map waarin `package.json` staat.

Installeer vervolgens de benodigde packages:

```bash
npm install
```

Hiermee worden alle dependencies uit `package.json` lokaal geïnstalleerd.

## 5. Frontend starten

Start de Vite development server:

```bash
npm run dev
```

Vite toont vervolgens in de terminal op welk adres de applicatie beschikbaar is.

Standaard is dit:

```text
http://localhost:5173
```

Open dit adres in de browser.

## 6. Backend installeren

Open de solution van de backend in Visual Studio 2022.

Controleer of het juiste project als Startup Project is ingesteld:

1. Klik in Solution Explorer met de rechtermuisknop op het API-project.
2. Kies **Set as Startup Project**.

Visual Studio herstelt normaal gesproken automatisch de benodigde NuGet-packages.

Indien dit niet gebeurt, kunnen de packages via NuGet Package Manager worden hersteld.

## 7. Backend starten

Start de backend vanuit Visual Studio met:

```text
F5
```

of via:

```text
Debug > Start Debugging
```

De ASP.NET Web API wordt vervolgens lokaal gestart.

De exacte URL en poort zijn afhankelijk van de lokale Visual Studio/IIS Express-configuratie.

## 8. Frontend en backend koppelen

Voor een volledig werkende applicatie moeten zowel de frontend als de backend actief zijn.

De globale communicatie verloopt als volgt:

```text
React frontend
      ↓
HTTP request
      ↓
ASP.NET Web API
      ↓
Services / berekeningen
      ↓
Externe integraties
```

Controleer bij verbindingsproblemen:

* of de backend actief is;
* of de frontend actief is;
* of de frontend naar de juiste backend-URL verwijst;
* of de gebruikte poorten overeenkomen met de lokale configuratie;
* of CORS correct is geconfigureerd.

## 9. Ridder-integratie

Een gedeelte van de applicatie maakt gebruik van gegevens uit Ridder. Voor deze functionaliteiten moet de backend toegang hebben tot de benodigde Ridder-omgeving.

Wanneer deze omgeving niet beschikbaar is, kunnen functionaliteiten die afhankelijk zijn van Ridder niet volledig lokaal worden uitgevoerd.

### Bekende beperking

In versie `v1.0.0` wordt de export vanuit de Calculation Tool uitgevoerd, maar worden de geëxporteerde gegevens nog niet correct verwerkt in Ridder.

De export naar Ridder moet daarom verder worden onderzocht voordat deze functionaliteit in een productieomgeving gebruikt kan worden.

## 10. Wicam en stuklijsten

In het oorspronkelijke ontwerp waren ook een Wicam-integratie en functionaliteit voor het opslaan van stuklijsten opgenomen.

Deze onderdelen zijn niet geïmplementeerd in versie `v1.0.0`.

## 11. Frontendtests uitvoeren

Open een terminal in de frontendmap en voer uit:

```bash
npm run test
```

Voor uitgebreidere uitvoer kan, afhankelijk van de configuratie, de verbose reporter worden gebruikt:

```bash
npm run test -- --reporter verbose
```

De uiteindelijke versie bevat 30 automatische frontendtests voor onder andere:

* DXF-verwerking;
* validatie;
* export;
* de CalculatieStore.

Bij oplevering zijn alle 30 frontendtests succesvol uitgevoerd.

## 12. Backendtests uitvoeren

Open de backend in Visual Studio.

Ga vervolgens naar:

```text
Test > Test Explorer
```

Kies:

```text
Run All
```

De backend bevat automatische tests voor onder andere de berekeningslogica en de ExportController.

Bij oplevering zijn 13 backendtests uitgevoerd en succesvol afgerond.

## 13. Git-structuur

Binnen de repository wordt onderscheid gemaakt tussen ontwikkel- en releaseversies.

### `main`

Bevat de stabiele opleverversie van de applicatie.

### `develop`

Wordt gebruikt voor de ontwikkelversie.

### Feature branches

Afzonderlijke functionaliteiten kunnen op een eigen feature branch worden ontwikkeld.

De globale werkwijze is:

```text
Feature branch
      ↓
   develop
      ↓
    testen
      ↓
     main
      ↓
   release
```

## 14. Nieuwe wijzigingen ontwikkelen

Begin nieuwe ontwikkelingen vanaf `develop`:

```bash
git checkout develop
git pull origin develop
```

Maak vervolgens een nieuwe feature branch:

```bash
git checkout -b feature/<naam>
```

Na het uitvoeren van de wijziging:

```bash
git add .
git commit -m "Beschrijving van de wijziging"
git push -u origin feature/<naam>
```

De feature kan daarna worden samengevoegd met `develop`.

## 15. Problemen oplossen

### Frontend start niet

Controleer eerst of de dependencies geïnstalleerd zijn:

```bash
npm install
```

Controleer daarnaast de Node.js-versie:

```bash
node -v
```

### Backend start niet

Controleer:

* of .NET Framework 4.8 beschikbaar is;
* of de NuGet-packages zijn hersteld;
* of het juiste Startup Project is geselecteerd;
* of de lokale configuratie correct staat ingesteld.

### Frontend kan backend niet bereiken

Controleer:

* backend-URL;
* poortnummer;
* CORS-configuratie;
* browserconsole;
* foutmeldingen vanuit de backend.

### Ridder-functionaliteiten werken niet

Controleer eerst of vanuit de gebruikte omgeving verbinding gemaakt kan worden met Ridder. Zonder toegang tot de benodigde Ridder-omgeving kunnen deze functionaliteiten niet volledig lokaal worden gebruikt.

## 16. Release

De eerste opleverversie van de Calculation Tool is:

```text
v1.0.0
```

Deze versie bevat de gerealiseerde Calculation Tool, automatische tests en bijbehorende projectdocumentatie.

Bekende beperkingen van deze versie zijn beschreven in deze Starter Guide en in het bijbehorende projectverslag.
