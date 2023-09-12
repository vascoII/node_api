# Node API - Car CRUD Operations

This repository contains a simple Node.js API for managing car models. The architecture has been designed following the SOLID principles to ensure maintainability and scalability.

## Features

- Built with **Express.js**.
- Uses **MongoDB** as a data store.
- Designed around the **SOLID Principles** for improved maintainability and scalability.
- Support for **Docker Compose** to quickly start up necessary services.

## Getting Started

### Installation

1. Clone the repository:

   git clone https://github.com/vascoII/node_api.git

2. Install the required dependencies:

   npm install

3. Start the server:

   npm start

### Usage

You can interact with the API using the following endpoints:

- **GET** `/cars`: Retrieves all cars.
- **GET** `/cars/:name`: Retrieves a specific car by its name.
- **POST** `/cars`: Creates a new car.
- **PUT** `/cars/:name`: Updates a car by its name.
- **PATCH** `/cars/:name`: Partially updates a car by its name.

## Contributing

If you wish to contribute, kindly follow these steps:

1. Fork this repository.
2. Clone your fork to your local environment.
3. Make and commit your changes.
4. Push your commits back to your fork on GitHub.
5. Submit a pull request from your forked repo to this repo.

## License

This software is released under the MIT License. For more details, please refer to the [LICENSE](LICENSE.md) file.
