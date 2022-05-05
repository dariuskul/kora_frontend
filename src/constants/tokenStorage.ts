export class TokenStorage {
  private static readonly TOKEN = 'token';

  public static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public static storeToken(token: string): void {
    localStorage.setItem(TokenStorage.TOKEN, token);
  }

  public static getToken(): string | null {
    return localStorage.getItem(TokenStorage.TOKEN);
  }

  public static setLanguage(language: string): void {
    localStorage.setItem('language', language);
  }

  public static getLanguage(): string {
    return localStorage.getItem('language') || 'EN';
  }

  public static setWarning(warning: string): void {
    localStorage.setItem('warning', warning);
  }
  public static getWarning(): string {
    return localStorage.getItem('warning') || '';
  }
  public static clearWarning(): void {
    localStorage.removeItem('warning');
  }

}
