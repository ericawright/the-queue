## The Queue

The project requires you to have [rust](https://www.rust-lang.org/en-US/install.html) and cargo installed.

In the base of the project run:
``` sh 
export DATABASE_URL='postgres://postgres:secretpass@localhost:15432/queue'

cd client
npm install
npm run build

cd ..
cargo install diesel_cli --vers=1.3.1 --no-default-features --features "postgres"

docker-compose up -d

diesel setup
diesel migration run

cargo run
```
