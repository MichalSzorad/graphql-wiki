import bcrypt from 'bcrypt'

export function hashPassword(
  password: string,
  difficuly: number = 10,
): Promise<string> {
  return bcrypt.hash(password, difficuly)
}

export function compatePasswords(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash)
}
