use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AuthRequest {
    pub login: String,
    pub password: String,
}
