const bcrypt = require('bcryptjs');

const hashString = async (plain) => {
  const hashedString = await bcrypt.hash(plain, 10);
  return hashedString;
}

const compareHashes = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
}

module.exports = {
  hashString,
  compareHashes,
}
