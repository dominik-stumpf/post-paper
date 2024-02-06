fn main() -> Result<(), String> {
    let markdown = "markdown *test*";
    let tree = markdown::to_mdast(&markdown, &markdown::ParseOptions::default()).unwrap();
    let json = serde_json::to_string_pretty(&tree).unwrap();

    println!("{:?}", json)

    Ok(())
}
