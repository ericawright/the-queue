table! {
    projects (id) {
        id -> Int4,
        title -> Varchar,
        content -> Nullable<Text>,
        status -> Varchar,
        position -> Nullable<Int4>,
        name -> Nullable<Varchar>,
        link -> Varchar,
        email -> Varchar,
        assigned_to -> Nullable<Varchar>,
        date_finished -> Nullable<Timestamp>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
