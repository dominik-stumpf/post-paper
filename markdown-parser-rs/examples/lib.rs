use markdown::{mdast, to_mdast, Constructs, ParseOptions};
use markdown_parser_rs::HastWithFrontmatter;
use serde_json::to_string;

fn serialization() {
    let markdown = "markdown *test*";
    let tree = to_mdast(&markdown, &markdown::ParseOptions::default()).unwrap();
    let json = serde_json::to_string_pretty(&tree).unwrap();

    println!("{:?}", json);
}

fn frontmatter() {
    let markdown = "frontmatter *test*".trim();

    let markdown_options = ParseOptions {
        constructs: Constructs {
            frontmatter: true,
            ..Constructs::gfm()
        },
        ..ParseOptions::gfm()
    };

    let mdast = markdown::to_mdast(markdown, &markdown_options).unwrap();

    let child = &mdast.children().unwrap()[0];
    let frontmatter: Option<&String>;

    match child {
        mdast::Node::Yaml(yaml) => frontmatter = Some(&yaml.value),
        _ => frontmatter = None,
    }

    let hast = markdown::mdast_to_hast(mdast.clone()).unwrap();
    let hast_with_frontmatter = HastWithFrontmatter {
        hast,
        frontmatter: frontmatter.cloned(),
    };

    let hast_serialized = to_string(&hast_with_frontmatter);
    println!("{:?}", hast_serialized);
}

fn main() -> Result<(), String> {
    frontmatter();

    Ok(())
}
