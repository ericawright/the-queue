pub mod schema;
pub mod models;
use std::io;
extern crate serde;
#[macro_use] extern crate rouille;
#[macro_use] extern crate serde_derive;
use rouille::Response;

#[macro_use]
extern crate diesel;
extern crate dotenv;

use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;

use self::models::{Project};

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

pub fn fetch_all_projects() -> std::vec::Vec<models::Project> {
    use self::schema::projects::dsl::*;
    let connection = establish_connection();
    let results = projects.limit(5)
       .load::<Project>(&connection)
       .expect("Error loading projects");
   results
}


// pub fn create_project(conn: &PgConnection, title: &str, body: &str) -> Post {
//     use schema::projects;
// 
//     let new_project = NewProject {
//         title: title,
//         body: body,
//     };
// 
//     diesel::insert_into(projects::table)
//         .values(&new_project)
//         .get_result(conn)
//         .expect("Error saving new project")
// }

fn main() {
    #[derive(Serialize)]
    struct MyStruct {
        message: String,
    }

    println!("Now listening on localhost:8000");

    rouille::start_server("localhost:8000", move |request| {
        rouille::log(&request, io::stdout(), || {
            router!(request,
                (GET) (/) => {
                    Response::json(&MyStruct { message: "Hello! Welcome to the root route".to_owned()})
                },
                (GET) (/api/projects) => {
                    let results = fetch_all_projects();
                    println!("Displaying {} posts", results.len());
                    for project in results {
                        println!("{}", project.title);
                        println!("-----------\n");
                        println!("{}", project.body);
                    }
                    // rouille::Response::json({message: "Hello! Unfortunately there is nothing to see here."})
                    Response::json(&MyStruct { message: "Hello! Unfortunately there is nothing to see here.".to_owned()})
                },

                (POST) (/submit) => {

                    // We query the data with the `post_input!` macro. Each field of the macro
                    // corresponds to an element of the form.
                    // If the macro returns an error (for example if a field is missing, which
                    // can happen if you screw up the form or if the user made a manual request)
                    // we return a 400 response. 
                    let data = try_or_400!(post_input!(request, {
                        txt: String,
                        files: Vec<rouille::input::post::BufferedFile>,
                    }));

                    // We just print what was received on stdout. Of course in a real application
                    // you probably want to process the data, eg. store it in a database. 
                    println!("Received data: {:?}", data);

                    Response::json(&MyStruct { message: "This is the post route, something went to the DB".to_owned()})
                },

                _ => rouille::Response::empty_404()
            )
        })
    });
}
