import { checkUser, checkLogin, checkLogout } from "./checkUser"; // Adjust the path as needed

const LOCAL_STORAGE_KEY = "user";

beforeEach(() => {
  localStorage.clear();
});

describe("User Authentication", () => {
  const testUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
  };

  it("should register a new user", () => {
    const res = checkUser(testUser, true);
    expect(res.error).toEqual({});
    expect((res.user as any).email).toBe(testUser.email);
  });

  it("should not register a user with existing email", () => {
    checkUser(testUser, true);
    const res = checkUser(testUser, true);
    expect(res.error.emailError).toBe("this email is already logged");
  });

  it("should login with correct credentials", () => {
    checkUser(testUser, true);
    const res = checkUser(testUser, false);
    expect(res.error).toEqual({});
    expect((res.user as any).isLogin).toBe(true);
  });

  it("should fail login with incorrect email", () => {
    checkUser(testUser, true);
    const res = checkUser({ ...testUser, email: "wrong@example.com" }, false);
    expect(res.error.emailError).toBe("Email isn't correct");
  });

  it("should fail login with incorrect password", () => {
    checkUser(testUser, true);
    const res = checkUser({ ...testUser, password: "wrongpass" }, false);
    expect(res.error.passError).toBe("Password isn't correct");
  });

  it("should return the currently logged-in user", () => {
    checkUser(testUser, true);
    checkUser(testUser, false);
    const loggedInUser = checkLogin();
    expect(loggedInUser?.email).toBe(testUser.email);
  });

  it("should logout the user", () => {
    checkUser(testUser, true);
    checkUser(testUser, false);
    const user = checkLogin();
    checkLogout(user!);
    const loggedOutUser = checkLogin();
    expect(loggedOutUser).toBeNull();
  });
});
