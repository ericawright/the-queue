use std::io;
extern crate serde;
#[macro_use] extern crate rouille;
#[macro_use] extern crate serde_derive;
use rouille::Response;

fn main() {
    #[derive(Serialize)]
    struct MyStruct {
        message: String,
    }
    // This example demonstrates how to handle HTML forms.

    // Note that like all examples we only listen on `localhost`, so you can't access this server
    // from another machine than your own.
    println!("Now listening on localhost:8000");

    rouille::start_server("localhost:8000", move |request| {
        rouille::log(&request, io::stdout(), || {
            router!(request,
                (GET) (/) => {
                    // When viewing the home page, we return an HTML document described below.
                    Response::json(&MyStruct { message: "Hello! Welcome to the root route".to_owned()})
                },
                (GET) (/api/hello) => {
                    // rouille::Response::json({message: "Hello! Unfortunately there is nothing to see here."})
                    Response::json(&MyStruct { message: "Hello! Unfortunately there is nothing to see here.".to_owned()})
                },

                (POST) (/submit) => {
                    // This is the route that is called when the user submits the form of the
                    // home page.

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
