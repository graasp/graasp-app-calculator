// source: http://bit.ly/2ZwRI5k
export default function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
