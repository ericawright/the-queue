use super::schema::projects;
use chrono::NaiveDateTime;

#[derive(Queryable, Debug, Serialize)]
pub struct Project {
    pub id: i32,
    pub title: String,
    pub content: Option<String>,
    pub status: String,
    pub position: Option<i32>,
    pub name: Option<String>,
    pub link: String,
    pub email: String,
    pub assigned_to: Option<String>,
    pub date_finished: Option<NaiveDateTime>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[table_name = "projects"]
pub struct NewProject {
    pub title: String,
    pub content: Option<String>,
    pub name: Option<String>,
    pub link: String,
    pub email: String,
}