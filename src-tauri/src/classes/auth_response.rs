use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    #[serde(rename = "userLogin")]
    pub user_login: Option<serde_json::Value>,
    #[serde(rename = "userName")]
    pub user_name: Option<serde_json::Value>,
    #[serde(rename = "role")]
    pub user_surname: Option<serde_json::Value>,
}
