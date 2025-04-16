export interface appointment{
  id: string,
      name: string,
      email: string,
      phone: number,
      date: string,
      problem: string,
      otherProblem: string
}
export interface User {
  id: number;
  email: string;
  password: string;
  role?: string;
}
