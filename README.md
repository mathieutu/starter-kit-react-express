This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It's a simple example of what you can do with the [serve-my-app](https://github.com/mathieutu/serve-my-app) package 

You can use this project as a start for new react / express projects with typescript.

## Usage
### For development:

Firstly launch the server typescript transpilation in watch mode:
```bash
yarn watch:srv
```

Then launch it:
```bash
yarn express
```

Finally, launch the app:
```bash
yarn start
```

This will ask you 3 independent processes/terminals.

### For build:

Firstly, build the app and the server:
```bash
yarn build
```

Then launch the server:
```bash
yarn express:run
```

## Contributing
Issues and PRs are obviously welcomed and encouraged, as well for new features than documentation.
