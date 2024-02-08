export type User = {
  login: { uuid: string };
  gender: "male" | "female";
  name: { title: string; first: string; last: string };
  location: { city: string; country: string };
  phone: string;
  email: string;
  picture: { large: string; medium: string; thumbnail: string };
};

export type UsersListDataResponse = {
  info: { seed: string; results: number; page: number };
  results: User[];
};
