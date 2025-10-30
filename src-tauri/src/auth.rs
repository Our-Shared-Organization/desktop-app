use tauri::{AppHandle, Manager};
use tauri_plugin_stronghold::StrongholdExt;

const STORE_NAME: &str = "auth_store";
const TOKEN_KEY: &str = "auth_token";
const USER_INFO_KEY: &str = "user_info";

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone)]
pub struct StoredUserInfo {
    pub user_login: String,
    pub user_name: String,
    pub role: String,
}

/// Save authentication token to Stronghold
#[tauri::command]
pub async fn save_auth_token(
    app: AppHandle,
    token: String,
    user_info: StoredUserInfo,
) -> Result<(), String> {
    let stronghold = app.stronghold();

    // Save token
    stronghold
        .save_secret(STORE_NAME, TOKEN_KEY, token.as_bytes().to_vec())
        .await
        .map_err(|e| format!("Failed to save token: {}", e))?;

    // Save user info (not sensitive, but encrypted)
    let user_info_json = serde_json::to_string(&user_info)
        .map_err(|e| format!("Failed to serialize user info: {}", e))?;

    stronghold
        .save_secret(
            STORE_NAME,
            USER_INFO_KEY,
            user_info_json.as_bytes().to_vec(),
        )
        .await
        .map_err(|e| format!("Failed to save user info: {}", e))?;

    Ok(())
}

/// Get authentication token from Stronghold
#[tauri::command]
pub async fn get_auth_token(app: AppHandle) -> Result<String, String> {
    let stronghold = app.stronghold();

    let token_bytes = stronghold
        .get_secret(STORE_NAME, TOKEN_KEY)
        .await
        .map_err(|e| format!("Failed to get token: {}", e))?;

    String::from_utf8(token_bytes).map_err(|e| format!("Failed to decode token: {}", e))
}

/// Get stored user info from Stronghold
#[tauri::command]
pub async fn get_user_info(app: AppHandle) -> Result<StoredUserInfo, String> {
    let stronghold = app.stronghold();

    let user_info_bytes = stronghold
        .get_secret(STORE_NAME, USER_INFO_KEY)
        .await
        .map_err(|e| format!("Failed to get user info: {}", e))?;

    let user_info_json = String::from_utf8(user_info_bytes)
        .map_err(|e| format!("Failed to decode user info: {}", e))?;

    serde_json::from_str(&user_info_json)
        .map_err(|e| format!("Failed to deserialize user info: {}", e))
}

/// Check if user is authenticated
#[tauri::command]
pub async fn is_authenticated(app: AppHandle) -> bool {
    match get_auth_token(app).await {
        Ok(token) => !token.is_empty(),
        Err(_) => false,
    }
}

/// Clear authentication (logout)
#[tauri::command]
pub async fn logout(app: AppHandle) -> Result<(), String> {
    let stronghold = app.stronghold();

    // Remove token
    stronghold
        .remove_secret(STORE_NAME, TOKEN_KEY)
        .await
        .map_err(|e| format!("Failed to remove token: {}", e))?;

    // Remove user info
    stronghold
        .remove_secret(STORE_NAME, USER_INFO_KEY)
        .await
        .map_err(|e| format!("Failed to remove user info: {}", e))?;

    Ok(())
}
