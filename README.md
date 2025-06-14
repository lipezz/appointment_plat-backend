# Appointment Platform Backend

This is a Node.js backend for an appointment scheduling platform, built with Express, Prisma ORM, and PostgreSQL.
The project includes integration tests and is ready for deployment using environments like Railway and Docker.

---

## Technologies Used

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Jest + ts-jest (integration testing)
- Docker
- Zod (data validation)

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/lipezz/appointment_plat-backend.git
cd platagendamento-backend
```

### Install Dependencies

```bash
yarn
```

---

## Environment Configuration

Create two files in the root directory:

### `.env` (for development/production)

```env
DATABASE_URL="your_production_database_url"
JWT_SECRET="your_secure_jwt_secret"
```

### `.env.test` (for testing)

```env
DATABASE_URL="your_test_database_url"
JWT_SECRET="your_test_jwt_secret"
```

---

## Running Tests

Run all integration tests using:

```bash
yarn test
```

---

## Database Migrations

**Create a new migration:**

```bash
yarn prisma migrate dev --name your-migration-name
```

**Apply migrations to test database:**

```bash
yarn migrate:test
```

---

## Docker Support (Optional)

To build and run the application in a Docker container:

```bash
docker build -t platagendamento-backend .
docker run -p 3000:3000 platagendamento-backend
```

---

## Project Structure

```
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── __tests__/        # Integration tests
├── prisma/
│   └── schema.prisma
```

---

## REST API Endpoints

Main routes:

- `POST /register` – Register a new user
- `POST /login` – User login and token generation
- `GET /appointments` – List user appointments
- `POST /appointments` – Create new appointment
- `PUT /appointments/:id` – Update appointment
- `DELETE /appointments/:id` – Delete appointment

---

## License

MIT

---

## Author

Developed by [Luiz Menezes](https://github.com/lipezz)
