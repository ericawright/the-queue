pub mod schema;
pub mod models;
use std::io;
extern crate serde;
#[macro_use] extern crate serde_derive;
extern crate serde_json;
#[macro_use] extern crate rouille;
use rouille::{Response};

#[macro_use]
extern crate diesel;
extern crate dotenv;

use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;
use self::schema::projects;
use self::models::{Project, NewProject};

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

pub fn fetch_all_projects(conn: &PgConnection) -> std::vec::Vec<models::Project> {
    let results = projects::table
       .load::<Project>(conn)
       .expect("Error loading projects");
   results
}

pub fn create_project(conn: &PgConnection, new_project: &NewProject) -> usize {
    diesel::insert_into(projects::table)
        .values(new_project)
        .execute(conn)
        .expect("Error saving new project")
}

fn main() {
    #[derive(Serialize)]
    struct MyStruct {
        message: String,
    }

    println!("Now listening on localhost:8000");

    rouille::start_server("localhost:8000", move |request| {
        let connection = establish_connection();
        // if we have a file in the client/build/ folder by the same name as the url, return that file.
        let response = rouille::match_assets(&request, "./client/build/");
        if response.is_success() {
            return response;
        }

        rouille::log(&request, io::stdout(), || {
            router!(request,

                (GET) (/) => {
                    return rouille::match_assets(&request, "./client/build/index.html");
                },

                (GET) (/projects) => {
                    let results = fetch_all_projects(&connection);
                    println!("Displaying {} projects", results.len());
                    for project in results {
                        println!("-----------\n");
                        println!("{}", project.title);
                        println!("{}", project.body);
                    }

                    Response::json(&MyStruct { message: "Hello! Unfortunately there is nothing to see here.".to_owned()})
                },

                (POST) (/projects) => {
                    let data: NewProject = try_or_400!(rouille::input::json_input(request));
                    
                    create_project(&connection, &data);

                    // return anything for now
                    Response::json(&MyStruct { message: "This is the post route, something went to the DB".to_owned()})
                },

                _ => rouille::Response::empty_404()
            )
        })
    });
}
