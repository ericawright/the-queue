FROM rustlang/rust:nightly

WORKDIR /usr/src/api

RUN cargo install diesel_cli --no-default-features --features postgres

RUN cargo install cargo-watch

EXPOSE 8000

VOLUME ["/cargo"]