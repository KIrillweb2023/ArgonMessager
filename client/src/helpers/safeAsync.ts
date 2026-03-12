export const safeAsync = async (fn: () => Promise<unknown>): Promise<void> => {
    try {
        await fn();
    } catch {
        // ЗАглушка
    }
};


