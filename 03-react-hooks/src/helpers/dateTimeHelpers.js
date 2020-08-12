function leftPad(value, count = 2, char = '0') {
  const stringValue = String(value);
  let newValue = stringValue;

  if (stringValue.length < count) {
    for(let i = 0; i < count - stringValue.length; i++) {
      newValue = char + stringValue;
    }
  }

  return newValue;
}

function getNewTimestamp() {
  const now = new Date();
  let result = '';

  return result.concat(
    leftPad(now.getDate()), '/',
    leftPad(now.getMonth() + 1), '/',
    leftPad(now.getFullYear()), ' ',
    leftPad(now.getHours()), ':',
    leftPad(now.getMinutes()), ':',
    leftPad(now.getSeconds()), '.',
    leftPad(now.getMilliseconds(), 3, 0)
  );
}

export { getNewTimestamp }; 