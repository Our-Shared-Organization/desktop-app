use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    #[serde(rename = "userLogin")]
    pub user_login: Option<serde_json::Value>,
    #[serde(rename = "userName")]
    pub user_name: Option<serde_json::Value>,
    #[serde(rename = "userSurname")]
    pub user_surname: Option<serde_json::Value>,
    #[serde(rename = "userPhone")]
    pub user_phone: Option<serde_json::Value>,
    #[serde(rename = "userSex")]
    pub user_sex: Option<serde_json::Value>,
    #[serde(rename = "userRoleId")]
    pub user_role_id: Option<serde_json::Value>,
    #[serde(rename = "userPassword")]
    pub user_password: Option<serde_json::Value>,
    #[serde(rename = "userStatus")]
    pub user_status: Option<serde_json::Value>,
}
