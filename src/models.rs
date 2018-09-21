use super::schema::projects;
#[derive(Queryable, Debug)]
pub struct Project {
    pub id: i32,
    pub title: String,
    pub body: String,
}


#[derive(Insertable, Deserialize)]
#[table_name = "projects"]
pub struct NewProject {
    pub title: String,
    pub body: String,
}