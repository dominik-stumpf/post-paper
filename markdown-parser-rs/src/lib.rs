use markdown::{Constructs, Options, ParseOptions};
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

#[wasm_bindgen]
pub fn md_to_hast(source: &str) -> JsValue {
    let markdown_options = ParseOptions {
        constructs: Constructs {
            frontmatter: true,
            ..Constructs::gfm()
        },
        ..ParseOptions::gfm()
    };

    let hast = markdown::md_to_hast(source, &markdown_options).unwrap();
    let hast_serialized = to_string(&hast);

    JsValue::from_str(&hast_serialized.unwrap())
}
