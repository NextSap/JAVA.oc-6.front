export const formatLocalDate = (timestamp: number) => {
    const date = new Date(timestamp);
    // return date with format full day name, day number month year
    const dayName = date.toLocaleDateString("en-EN", { weekday: 'short' });
    const dayNumber = date.toLocaleDateString("en-EN", { day: 'numeric' });
    const monthName = date.toLocaleDateString("en-EN", { month: 'long' });
    return dayName + " " + dayNumber + " " + monthName;
   // return date.toLocaleDateString("fr-FR") + " - "+ date.toLocaleTimeString().split(" ")[0];
}