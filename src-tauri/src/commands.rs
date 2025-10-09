use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct AuthRequest {
    phone: String,
    password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthResponse {
    #[serde(rename = "userId")]
    pub user_id: Option<serde_json::Value>,
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

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthErrorResponse {
    pub message: String,
}



#[tauri::command]
pub async fn authenticate(phone: String, password: String) -> Result<AuthResponse, String> {
    let client = reqwest::Client::new();
    let auth_data = AuthRequest { 
        phone: phone.clone(), 
        password: password.clone() 
    };
    
    let response = client
        .post("http://localhost:5053/user/auth")
        .header("Content-Type", "application/json")
        .json(&auth_data)
        .send()
        .await
        .map_err(|e| format!("Ошибка отправки запроса: {}", e))?;
    
    let status = response.status();
    let response_text = response
        .text()
        .await
        .map_err(|e| format!("Ошибка чтения ответа: {}", e))?;

    if status.is_success() {
        let auth_result: AuthResponse = serde_json::from_str(&response_text)
            .map_err(|e| format!("Ошибка парсинга JSON ответа: {} - Response: {}", e, response_text))?;
        Ok(auth_result)
    } else {
        if status == 400 || status == 404 {
            if let Ok(error_response) = serde_json::from_str::<AuthErrorResponse>(&response_text) {
                return Err(error_response.message);
            }
        }

        Err(format!("Ошибка входа ({}): {}", status, response_text))
    }
}

