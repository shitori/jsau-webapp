# Jsau-webapp
[![pipeline status](https://gitlab.sorbonne-paris-nord.fr/11600788/jsau-webapp2/badges/master/pipeline.svg)](https://gitlab.sorbonne-paris-nord.fr/11600788/jsau-webapp2/-/commits/master)

Jsau-webapp est un site web faisant partie de l'architecture ci-dessous :
![Arch](https://gitlab.com/aful/developpement_javascript_avance_ubiquitaire-tp/-/raw/master/communication_entre_projets.png)

## Installation
Utilisez le gestionnaire de paquets [npm](https://www.npmjs.com/) pour installer jsau-webapp

```bash
npm install 
```

## Utilisation de la web application (en mode developpeur)

```bash
npm run serve
```

Puis aller sur l'adresse indiqué

## Utilisation de la web application (en mode production)

Contruire l'application

```bash
npm run build
```

lancer le build

```bash
serve -g dist
```

Puis aller sur l'adresse indiqué

## Utilisation de l'application bureau (en mode developpeur)

```bash
npm run electron:serve
```

Puis aller sur l'adresse indiqué

## Utilisation de l'application bureau (en mode production)

Contruire l'application

```bash
npm run electron:build
```

lancer le build dans le répertoire /dist_electron

## Licence
[MIT](https://choosealicense.com/licenses/mit/)
