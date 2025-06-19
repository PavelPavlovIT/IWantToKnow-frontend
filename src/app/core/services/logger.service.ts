import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {}

  Inforamtion(message: string) {
    console.log(`%c ${message}`, 'background: #0000FF; color: white;')
  }

  Warning(message: string) {
    console.log(`%c ${message}`, "background: #FFFF00; color: black;");
  }

  Error(message: string) {
    console.log(`%c ${message}`, "background: #FF0000; color: white;");
  }

  Success(message: string) {
    console.log(`%c ${message}`, "background: #008000; color: white;");
  }
}
