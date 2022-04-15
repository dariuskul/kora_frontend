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

}
