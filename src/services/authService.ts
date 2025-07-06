export const authService = {
  login: (username: string, password: string) => {
    // ตัวอย่าง mock
    if (username === 'admin' && password === '1234') return true;
    return false;
  },
};
