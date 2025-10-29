use crate::classes::auth_request::AuthRequest;
use crate::classes::auth_response::AuthResponse;
use crate::classes::request_error::RequestError;

#[tauri::command]
pub async fn authenticate(login: String, password: String) -> Result<AuthResponse, String> {
    let client = reqwest::Client::new();
    let auth_data = AuthRequest {
        login: login.clone(),
        password: password.clone(),
    };

    let response = client
        .post("http://localhost:32784/api/auth/login")
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
        let auth_result: AuthResponse = serde_json::from_str(&response_text).map_err(|e| {
            format!(
                "Ошибка парсинга JSON ответа: {} - Response: {}",
                e, response_text
            )
        })?;
        format!("Ошибка: {}", response_text);
        Ok(auth_result)
    } else {
        if status == 400 || status == 404 {
            if let Ok(error_response) = serde_json::from_str::<RequestError>(&response_text) {
                return Err(error_response.message);
            }
        }

        Err(format!("Ошибка входа ({}): {}", status, response_text))
    }
}
