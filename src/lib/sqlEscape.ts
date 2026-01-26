/**
 * SQL 值转义和构建工具
 */

/**
 * 转义 SQL 字符串值，防止 SQL 注入
 * @param value - 要转义的值
 * @returns 转义后的字符串（不含引号）
 */
export function escapeSqlString(value: string): string {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "''")
        .replace(/\x00/g, '\\0')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\x1a/g, '\\Z');
}

/**
 * 将值格式化为 SQL 字面量
 * @param value - 任意值
 * @returns 可直接用于 SQL 的字面量字符串
 */
export function toSqlValue(value: any): string {
    if (value === null || value === undefined) {
        return 'NULL';
    }

    if (typeof value === 'number') {
        return String(value);
    }

    if (typeof value === 'boolean') {
        return value ? '1' : '0';
    }

    if (typeof value === 'object') {
        return `'${escapeSqlString(JSON.stringify(value))}'`;
    }

    return `'${escapeSqlString(String(value))}'`;
}

/**
 * 转义 SQL 标识符（表名、列名等）
 * @param identifier - 标识符
 * @param quote - 引号字符，MySQL 用 `，SQLite/标准 SQL 用 "
 * @returns 转义后的标识符
 */
export function escapeSqlIdentifier(identifier: string, quote: '`' | '"' = '`'): string {
    const escaped = identifier.replace(new RegExp(quote, 'g'), quote + quote);
    return `${quote}${escaped}${quote}`;
}

/**
 * 构建 WHERE 子句条件
 * @param column - 列名
 * @param value - 值
 * @param quote - 标识符引号
 * @returns WHERE 条件字符串
 */
export function buildWhereCondition(column: string, value: any, quote: '`' | '"' = '`'): string {
    const escapedColumn = escapeSqlIdentifier(column, quote);

    if (value === null || value === undefined) {
        return `${escapedColumn} IS NULL`;
    }

    return `${escapedColumn} = ${toSqlValue(value)}`;
}

/**
 * 构建基于主键的 WHERE 子句
 * @param row - 数据行
 * @param primaryKeys - 主键列名数组
 * @param quote - 标识符引号
 * @returns WHERE 子句（不含 WHERE 关键字）
 */
export function buildPrimaryKeyWhere(
    row: Record<string, any>,
    primaryKeys: string[],
    quote: '`' | '"' = '`'
): string {
    if (primaryKeys.length === 0) {
        throw new Error('No primary key defined');
    }

    return primaryKeys
        .map(key => buildWhereCondition(key, row[key], quote))
        .join(' AND ');
}
