export function formatDate(dateString: string | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}