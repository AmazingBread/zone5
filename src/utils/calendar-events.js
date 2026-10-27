export const CALENDAR_PATH = 'zone5_calendar';

export function defaultCalendarEvents() {
    return {
        '2026-11-1': ['카멜리아 7시 이건희'],
        '2026-11-8': ['김해대회'],
        '2026-11-14': ['카멜리아 7시 황광하'],
        '2026-11-22': ['카멜리아 7시 박진범'],
        '2026-11-29': ['사직대회 우승목표'],
    };
}

export function calendarEventsFrom(value) {
    if (!value || !value.initialized) return defaultCalendarEvents();
    return Object.entries(value.events || {}).reduce((events, [key, titles]) => {
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(key) && Array.isArray(titles)) {
            events[key] = titles.filter(title => typeof title === 'string' && title.trim());
        }
        return events;
    }, {});
}

export function calendarDateKey(input) {
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
    if (!parts) return '';
    const [, year, month, day] = parts.map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return '';
    return `${year}-${month}-${day}`;
}
