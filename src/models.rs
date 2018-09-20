use super::schema::projects;
#[derive(Queryable, Debug)]
pub struct Project {
    pub id: i32,
    pub title: String,
    pub body: String,
}


#[derive(Insertable)]
#[table_name = "projects"]
pub struct NewProject<'a> {
    pub title: &'a str,
    pub body: &'a str,
}