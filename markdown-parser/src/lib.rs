use markdown::{Constructs, Options, ParseOptions};
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

// #[wasm_bindgen]
// pub fn md_to_mdast(source: &str) -> JsValue {
//     let html = markdown::to_html_with_options(source, &markdown::Options::gfm());
//
//     JsValue::from_str(&html.unwrap())
// }
