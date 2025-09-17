use serde::Deserialize;

#[derive(Deserialize)]
struct ApiResponse {
    data: String,
}