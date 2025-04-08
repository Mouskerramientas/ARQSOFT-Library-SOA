# Variables requeridas en archivo .env

```env
PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=libreria
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5431/${POSTGRES_DB}"

JWT_SECRET=mysuperhypersecretpassword
JWT_EXPIRATION=1h
```
