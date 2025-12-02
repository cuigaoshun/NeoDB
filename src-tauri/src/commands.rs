use crate::db::DbState;
use crate::models::{Connection, CreateConnectionArgs, UpdateConnectionArgs};
use tauri::{State, command};

#[command]
pub async fn create_connection(
    state: State<'_, DbState>,
    args: CreateConnectionArgs,
) -> Result<i64, String> {
    let result = sqlx::query(
        r#"
        INSERT INTO connections (name, db_type, host, port, username, password, database)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(args.name)
    .bind(args.db_type)
    .bind(args.host)
    .bind(args.port)
    .bind(args.username)
    .bind(args.password)
    .bind(args.database)
    .execute(&state.pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(result.last_insert_rowid())
}

#[command]
pub async fn get_all_connections(state: State<'_, DbState>) -> Result<Vec<Connection>, String> {
    let connections = sqlx::query_as::<_, Connection>(
        r#"
        SELECT id, name, db_type, host, port, username, password, database, created_at
        FROM connections
        ORDER BY created_at DESC
        "#
    )
    .fetch_all(&state.pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(connections)
}

#[command]
pub async fn get_connection_by_id(state: State<'_, DbState>, id: i64) -> Result<Option<Connection>, String> {
    let connection = sqlx::query_as::<_, Connection>(
        r#"
        SELECT id, name, db_type, host, port, username, password, database, created_at
        FROM connections
        WHERE id = ?
        "#,
    )
    .bind(id)
    .fetch_optional(&state.pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(connection)
}

#[command]
pub async fn update_connection(
    state: State<'_, DbState>,
    args: UpdateConnectionArgs,
) -> Result<(), String> {
    sqlx::query(
        r#"
        UPDATE connections
        SET name = COALESCE(?, name),
            db_type = COALESCE(?, db_type),
            host = COALESCE(?, host),
            port = COALESCE(?, port),
            username = COALESCE(?, username),
            password = COALESCE(?, password),
            database = COALESCE(?, database)
        WHERE id = ?
        "#,
    )
    .bind(args.name)
    .bind(args.db_type)
    .bind(args.host)
    .bind(args.port)
    .bind(args.username)
    .bind(args.password)
    .bind(args.database)
    .bind(args.id)
    .execute(&state.pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[command]
pub async fn delete_connection(state: State<'_, DbState>, id: i64) -> Result<(), String> {
    sqlx::query(
        "DELETE FROM connections WHERE id = ?",
    )
    .bind(id)
    .execute(&state.pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}
