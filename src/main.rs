#![allow(proc_macro_derive_resolution_fallback)]

pub mod schema;
pub mod models;
use std::io;
extern crate serde;
#[macro_use] extern crate serde_derive;
extern crate serde_json;
#[macro_use] extern crate rouille;
use rouille::{Request, Response};

#[macro_use]
extern crate diesel;
extern crate chrono;

use diesel::prelude::*;
use diesel::pg::PgConnection;
use std::env;
use self::schema::projects;
use self::models::{Project, NewProjectForm, EditProjectForm};

pub fn establish_connection() -> PgConnection {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn fetch_all_projects(conn: &PgConnection) -> std::vec::Vec<models::Project> {
    projects::table
       .load::<Project>(conn)
       .expect("Error loading projects")
}

pub fn create_project(conn: &PgConnection, new_project: &NewProjectForm) -> usize {
    diesel::insert_into(projects::table)
        .values(new_project)
        .execute(conn)
        .expect("Error saving new project")
}

pub fn change_project_status(conn: &PgConnection, id: &i32, body: &EditProjectForm) {
    diesel::update(projects::table.find(id))
        .set(body)
        .get_result::<Project>(conn)
        .expect(&format!("Unable to find project {}", id));
}

fn main() {
    #[derive(Serialize,)]
    pub struct MyStruct {
        message: String,
    }

    println!("Now listening on 0.0.0.0:8000");

    rouille::start_server("0.0.0.0:8000", move |request| {
        let connection = establish_connection();
        // if we have a file in the client/build/ folder by the same name as the url, return that file.
        let response = rouille::match_assets(&request, "./client/build");
        if response.is_success() {
            return response;
        }

        rouille::log(&request, io::stdout(), || {
            router!(request,

                (GET) (/) => {
                    let index = Request::fake_http("GET", "/index.html", Vec::new(), Vec::new());
                    rouille::match_assets(&index, "./client/build")
                },

                (GET) (/projects) => {
                    let results = fetch_all_projects(&connection);
                    println!("Displaying {} projects", results.len());
                    println!("{:?}", results);
                    Response::json(&results)
                },

                (POST) (/update_status/{id: i32}) => {
                    println!("here or there");
                    let body: EditProjectForm = try_or_400!(rouille::input::json_input(request));
                        println!("and another thing");
                    change_project_status(&connection, &id, &body);
                    Response::json(&MyStruct { message: "It might have worked".to_owned()})
                },

                (POST) (/projects) => {
                    println!("called projects first");
                    let data: NewProjectForm = try_or_400!(rouille::input::json_input(request));
                    create_project(&connection, &data);

                    // return anything for now
                    Response::json(&MyStruct { message: "This is the post route, something went to the DB".to_owned()})
                },

                _ => rouille::Response::empty_404()
            )
        })
    });
}
