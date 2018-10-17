use super::schema::projects;
use chrono::NaiveDateTime;

#[derive(Queryable, Debug, Serialize, Insertable, Deserialize, AsChangeset)]
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
pub struct NewProjectForm {
    pub title: String,
    pub content: Option<String>,
    pub name: Option<String>,
    pub link: String,
    pub email: String,
}

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[table_name = "projects"]
pub struct EditProjectForm {
    pub title: Option<String>,
    pub content: Option<Option<String>>,
    pub status: Option<String>,
    pub position: Option<Option<i32>>,
    pub name: Option<Option<String>>,
    pub link: Option<String>,
    pub email: Option<String>,
    pub assigned_to: Option<Option<String>>,
    pub date_finished: Option<Option<NaiveDateTime>>,
}
