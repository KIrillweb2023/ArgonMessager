// Статусы для визуального отображения шагов
const AuthGraficStatus = [
    {
        id: 0,
        status_text: "Your e-mail",
        status_active: false // будет меняться динамически
    },
    {
        id: 1,
        status_text: "PIN-code",
        status_active: false
    },
    {
        id: 2,
        status_text: "Your name",
        status_active: false
    },
];

// Маппинг наших шагов (1,2,3) на индексы массива (0,1,2)
const STEP_MAPPING = {
    1: 0, // шаг 1 (email) -> индекс 0
    2: 1, // шаг 2 (pin)   -> индекс 1
    3: 2, // шаг 3 (name)  -> индекс 2
    4: 2  // шаг 4 (chat)  -> тоже индекс 2 (имя уже введено)
};


export {
    AuthGraficStatus, STEP_MAPPING
}