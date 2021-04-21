/**
 * e.g. 3612 => 01:10:02
 * @param {number} seconds
 * @param {string} format
 * @returns {string}
 */
export const formatTime = function (seconds, format = 'HH:MM:SS') {
  let leftSeconds = seconds;
  const hour = Math.floor(leftSeconds / 3600);
  leftSeconds -= hour * 3600;
  const minute = Math.floor(leftSeconds / 60);
  leftSeconds -= minute * 60;

  return format
    .replace('HH', String(hour).padStart(2, 0))
    .replace('MM', String(minute).padStart(2, 0))
    .replace('SS', String(leftSeconds).padStart(2, 0));
};
