// src/auth.ts
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

// Vérifier un mot de passe
export async function comparePassword(password: string, hash: string): Promise<boolean> {  
  return bcrypt.compare(password, hash);
}
