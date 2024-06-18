## Installation

### Prérequis
Avant de commercer, assurez-vous que vous avez les composants suivants installés :

- [Node.js](https://nodejs.org/en/download/): Version 20.x recommandée.
- [MySQL](https://dev.mysql.com/downloads/): Version 8.x recommandée.

### Installation des dépendances

Clonez le dépôt et installez les dépendances pour chaque service et l'API Gateway :

```bash
git clone https://github.com/your-repo/my-project.git
cd my-project

# Installation des dépendances pour l'API Gateway
cd api-gateway
npm install

# Installation des dépendances pour reservation-service
cd ../api-service-1
npm install

# Installation des dépendances pour user-service
cd ../api-service-2
npm install

# Installation des dépendances pour movies-service
cd ../api-service-3
npm install

# Démarrer l'API Gateway
cd api-gateway
npm start

# Démarrer reservation-service
cd ../api-service-1
npm start

# Démarrer user-service
cd ../api-service-2
npm start

# Démarrer movies-service
cd ../api-service-3
npm start