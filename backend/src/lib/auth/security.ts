import bcrypt from "bcryptjs";

const SALT_ROUNDS = 17; // Number of rounds to use for hashing

/**
 * Hashes a plain text password.
 * @param password The plain password to hash.
 * @returns A Promise that resolves to the hashed password.
 */
export async function encryptPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

/**
 * Verifies if the provided password matches the hashed one.
 * @param plainPassword The password to verify.
 * @param hashedPassword The hashed password to compare with.
 * @returns A Promise that resolves to true if it matches, false otherwise.
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
