export default function getDate(str: string) {
  const date = new Date(str);
  if (!date) return "n/a";
  const diffTime = Math.abs(date.getTime() - new Date().getTime());
  if (diffTime > 1000 * 60 * 60 * 24) {
    const ops: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, ops);
  }
  // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours >= 1) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
  if (diffMinutes >= 2) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  // const diffSeconds = Math.floor((diffTime / 1000) % 60);
  return `few moments ago`;
  // console.log(diffDays + " days");
  // console.log(diffHours + " hours");
  // console.log(diffMinutes + " minutes");
  // console.log(diffSeconds + " secs");
}
