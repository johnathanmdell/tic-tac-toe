<!-- INTRODUCTION -->
## Tic Tac Toe (Laravel + Vite + Tailwind + Vue3)

This tic tac toe was created to implement a minimax algorithm against which a human player can play.

<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to start playing the game.

### Prerequisites

The following prerequisites are required to run the game on your environment.

- PHP 8.1 or later
- Node
- MySQL, MariaDB or other relational database compatible with Eloquent

### Installation

1. Clone the project to your local environment

```
git clone git@github.com:johnathanmdell/tic-tac-toe.git
```

2. Install the composer dependencies

```
composer install
```

3. Install the npm dependencies

```
npm install
```

4. Build the local assets

```
npm run build
```

5. Copy the example env file and modify the database variables

```
cp .env.example .env
```

6. Generate a key for your laravel application

```
php artisan key:generate
```

7. Run the migrations for your database

```
php artisan migrate
```

7. Start your local development server

```
php artisan serve
```

Once your application is running, you can use the link provided by the serve command to access the application.
