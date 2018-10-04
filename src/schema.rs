table! {
    projects (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        status -> Varchar,
        position -> Nullable<Int4>,
        requester -> Varchar,
        url -> Nullable<Varchar>,
        assigned_to -> Nullable<Varchar>,
        date_finished -> Nullable<Timestamp>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
