export function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, '"');
  htmlStr = htmlStr.replace(/&#039;/g, "'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  return htmlStr;
}
