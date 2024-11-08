import Character from "./Character";
import Info from "./Info";

export default interface Response {
  info: Info;
  results: Character[];
}

