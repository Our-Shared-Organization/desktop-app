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
        .post("http://localhost:32769/api/auth/login")
        .header("Content-Type", "application/json")
        .json(&auth_data)
        .send()
        .await
        .map_err(|e| format!("Error sending request: {}", e))?;

    let status = response.status();
    let response_text = response
        .text()
        .await
        .map_err(|e| format!("Error reading response: {}", e))?;

    if status.is_success() {
        let auth_result: AuthResponse = serde_json::from_str(&response_text).map_err(|e| {
            format!(
                "Error parsing JSON response: {} - Response: {}",
                e, response_text
            )
        })?;

        Ok(auth_result)
    } else {
        if status == 400 || status == 404 {
            if let Ok(error_response) = serde_json::from_str::<RequestError>(&response_text) {
                return Err(error_response.message);
            }
        }

        Err(format!("Login error ({}): {}", status, response_text))
    }
}
