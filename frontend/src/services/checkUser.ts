const LOCAL_STORAGE = "user";

export type User = {
  name: string;
  location?: string;
  about?: string;
  job?: string;
  email: string;
  password: string;
  isLogin?: boolean;
};

type CheckUserResponse = {
  error: {
    emailError?: string;
    passError?: string;
  };
  user: User | object;
};

function getUsersStorage(): User[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE) || "[]");
}

function setUsersStorage(users: User[]): void {
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(users));
}

export function checkLogin(): User | null {
  const users = getUsersStorage();
  return users.find((item) => item.isLogin === true) || null;
}

export function checkLogout(user: User): void {
  const users = getUsersStorage();
  const newUsers = users.map((item) =>
    item.email === user.email ? { ...item, isLogin: false } : item
  );
  setUsersStorage(newUsers);
}

function newUser(user: User): CheckUserResponse {
  const users = getUsersStorage();
  const isFound = users.find((item) => item.email === user.email);
  if (isFound) {
    return { error: { emailError: "this email is already logged" }, user: {} };
  }
  const newUser = { ...user, isLogin: false };
  setUsersStorage(users ? [...users, newUser] : [newUser]);
  return { error: {}, user: newUser };
}

function validKey(
  searchKey: keyof User,
  userValue: string,
  users: User[]
): User | false {
  const isFound = users?.find((item) => item[searchKey] === userValue);
  return isFound || false;
}

export function checkUser(user: User, method: boolean): CheckUserResponse {
  if (method) {
    return newUser(user);
  }
  const users = getUsersStorage();
  const validEmail = validKey("email", user.email, users);
  const validPassword = validKey("password", user.password, users);

  const res: CheckUserResponse = { error: {}, user: {} };
  if (!validEmail) res.error.emailError = "Email isn't correct";
  if (!validPassword) res.error.passError = "Password isn't correct";
  if (validEmail && validPassword) res.user = validEmail;
  setUsersStorage(
    users.map((item) =>
      item.email === (res.user as User).email
        ? { ...item, isLogin: true }
        : item
    )
  );
  return res;
}
