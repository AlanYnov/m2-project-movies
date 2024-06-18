# Application d'authentification utilisateur

Cette application permet de créer et d'authentifier des utilisateurs ainsi que les autoriser via un JWT pour leur permettre d'accéder à des ressources utilisateurs.

*NB : Je suis en voyage en Corée du Sud, je n'ai pas eu le temps de faire la documentation avec swagger cette fois-ci, il faudra se contenter de la documentation écrite sur ce README. Je reste néanmoins disponible pour toute question.*

## Configuration

### Prérequis

- [Node.js](https://nodejs.org/en/download/): Version 20.x recommended.
- [MongoDB Communauty Edition](https://www.mongodb.com/try/download/community/): Version 7.0.9 recommended.

### Installation

1. Clonez ce dépôt sur votre machine locale.
2. Accédez au répertoire de l'application dans votre terminal.
3. Exécutez la commande `npm install` pour installer toutes les dépendances.

### Configuration des variables d'environnement

Créez un fichier .env à la racine à partir du fichier .env.example. Puis, configurez vos variables d'environnement.

### Configuration de la base de données

- Assurez-vous que MongoDB est en cours d'exécution sur votre machine.
- Créer une base de donnée MongoDB, vous pouvez l'appeler comme vous le souhaitez (recommandation : userdb).

## Utilisation

1. Démarrez le serveur en exécutant la commande `npm start`.
2. L'application sera accessible à l'adresse `http://localhost:4000` (par défaut).

## Endpoints API

### Authentification

- `POST /api/account`: Permet à un utilisateur de s'inscrire en fournissant un nom, login équivalent à une adresse mail, un mot de passe, un rôle entre `ROLE_ADMIN` et `ROLE_USER` et un status (facultatif) entre `open` et `closed` par défaut : `open`.
- `POST /api/token`: Permet à un utilisateur de se connecter en fournissant son login et son mot de passe. Renvoie un access token et un refresh token avec leur date respective d'expiration.
- `POST /api/token`: Permet à un utilisateur de se connecter en fournissant son login et son mot de passe. Renvoie un access token et un refresh token avec leur date respective d'expiration.
- `POST /api/refresh-token/{refreshToken}/token`: Permet à un utilisateur de mettre à jour son access token grâce à son refresh token.
- `GET /api/validate/{accessToken}`: Permet à un utilisateur de vérifier la validité de son access token.

### Utilisateurs

- `GET /api/account/{uid}`: Permet à un administrateur de récupérer les informations d'un utilisateur en utilisant son UID.
- `GET /api/account/me`: Permet à n'importe quel utilisateur de récupérer les informations de son compte.
- `PUT /api/account/{uid}`: Permet à un administrateur de modifier les informations d'un utilisateur en utilisant son UID.

## Middleware

- `authJWT`: Middleware pour vérifier la validité du token JWT fourni dans le header d'autorisation. En cas de succès, il ajoute l'objet utilisateur à la demande (`req.user`).
- `isAdmin`: Middleware pour vérifier si un utilisateur possède le rôle administrateur (ROLE_ADMIN).
- `rateLimit`: Middleware pour tester le nombre de tentative sur l'authentification d'un utilisateur. Renvoie un 429 en cas d'excès de tentative.

## Structure du projet

- Le répertoire `controllers` contient les fonctions de contrôle des routes.
- Le répertoire `middlewares` contient les middlewares utilisés par l'application.
- Le répertoire `models` contient les modèles de données Mongoose.
- Le répertoire `routes` contient les définitions des routes de l'API.
- Le fichier `server.js` est le point d'entrée de l'application.

## Contact

Si vous avez des questions ou que vous recontrez des problèmes en utilisant l'API, merci de contacter le développeur sur Teams.