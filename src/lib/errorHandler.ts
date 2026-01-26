/**
 * 统一的错误处理工具
 */

/**
 * 格式化错误信息为字符串
 * @param err - 任意类型的错误
 * @returns 格式化后的错误字符串
 */
export function formatError(err: unknown): string {
    if (err === null || err === undefined) {
        return 'Unknown error';
    }

    if (typeof err === 'string') {
        return err;
    }

    if (err instanceof Error) {
        return err.message;
    }

    // 尝试获取 message 属性
    if (typeof err === 'object' && 'message' in err) {
        return String((err as { message: unknown }).message);
    }

    // 最后尝试 JSON 序列化
    try {
        return JSON.stringify(err);
    } catch {
        return String(err);
    }
}

/**
 * 创建带上下文的错误消息
 * @param context - 错误上下文（如 "Failed to load data"）
 * @param err - 原始错误
 * @returns 格式化的错误消息
 */
export function formatErrorWithContext(context: string, err: unknown): string {
    const errorMessage = formatError(err);
    return `${context}: ${errorMessage}`;
}

/**
 * 安全地记录错误到控制台
 * @param context - 错误上下文
 * @param err - 错误对象
 */
export function logError(context: string, err: unknown): void {
    console.error(context, err);
}
