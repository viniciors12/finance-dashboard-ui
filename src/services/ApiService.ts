export default class ApiService {
  public static async get<T>(url: string, token?: string): Promise<T> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });
    return ApiService.handleResponse<T>(response);
  }

  public static async post<T>(
    url: string,
    data: any,
    token?: string
  ): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return ApiService.handleResponse<T>(response);
  }

  public static async patch<T>(
    url: string,
    data: any,
    token?: string
  ): Promise<T> {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return ApiService.handleResponse<T>(response);
  }

  public static async delete<T>(url: string, token?: string): Promise<T> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });
    return ApiService.handleResponse<T>(response);
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }
    return response.json() as Promise<T>;
  }
}
