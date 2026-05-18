export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface HandValidationResult {
  isValid: boolean;
  confidence: number;
  landmarks: HandLandmark[];
  message: string;
}

export async function validateHandImage(_imageUri: string): Promise<HandValidationResult> {
  throw new Error('Not implemented');
}
