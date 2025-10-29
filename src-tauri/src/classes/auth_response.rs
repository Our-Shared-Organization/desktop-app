use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    #[serde(rename = "userlogin")]
    pub user_login: Option<serde_json::Value>,
    #[serde(rename = "username")]
    pub user_name: Option<serde_json::Value>,
    #[serde(rename = "usersurname")]
    pub user_surname: Option<serde_json::Value>,
    #[serde(rename = "userphone")]
    pub user_phone: Option<serde_json::Value>,
    #[serde(rename = "usersex")]
    pub user_sex: Option<serde_json::Value>,
    #[serde(rename = "userroleid")]
    pub user_role_id: Option<serde_json::Value>,
    #[serde(rename = "userpassword")]
    pub user_password: Option<serde_json::Value>,
    #[serde(rename = "userstatus")]
    pub user_status: Option<serde_json::Value>,
    #[serde(rename = "useremail")]
    pub user_email: Option<serde_json::Value>,
    #[serde(rename = "userspecialization")]
    pub user_specialization: Option<serde_json::Value>,
    #[serde(rename = "userexperience")]
    pub user_experience: Option<serde_json::Value>,
}
