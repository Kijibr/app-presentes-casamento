
interface Dictionary<T> {
  [Key: string]: T;
}

export const Themes: Dictionary<string> = {
  green: "#828e51",
  gold: "#e0ae42",
  white: "#fff",
  off_white: "#f3f3f3"
};