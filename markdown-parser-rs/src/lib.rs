use markdown::{hast, mdast, Constructs, Options, ParseOptions};
use serde::{Deserialize, Serialize};
use serde_json::to_string;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn md_to_html(source: &str) -> JsValue {
    let markdown_options = Options {
        parse: ParseOptions {
            constructs: Constructs {
                frontmatter: true,
                ..Constructs::gfm()
            },
            ..ParseOptions::gfm()
        },
        ..Options::gfm()
    };

    let html = markdown::to_html_with_options(source, &markdown_options);

    JsValue::from_str(&html.unwrap())
}

#[derive(Serialize, Deserialize)]
pub struct HastWithFrontmatter {
    pub hast: hast::Node,
    pub frontmatter: Option<String>,
}

#[wasm_bindgen]
pub fn md_to_hast(source: &str) -> JsValue {
    let markdown_options = ParseOptions {
        constructs: Constructs {
            frontmatter: true,
            ..Constructs::gfm()
        },
        ..ParseOptions::gfm()
    };

    let mdast = markdown::to_mdast(source, &markdown_options).unwrap();

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

    JsValue::from_str(&hast_serialized.unwrap())
}
