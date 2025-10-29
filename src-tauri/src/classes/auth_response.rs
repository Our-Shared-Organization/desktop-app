use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    pub token: String,
    #[serde(rename = "userLogin")]
    pub user_login: String,
    #[serde(rename = "userName")]
    pub user_name: String,
    pub role: String,
    #[serde(rename = "expiresIn")]
    pub expires_in: i32,
}
