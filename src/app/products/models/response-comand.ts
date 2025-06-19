import {FormControl} from "@angular/forms";
import {Category} from "./category";

export interface ResponseCommand {
  success: boolean;
  message: string;
  result: any;
}

export type ResponseCommandForm = {
  [field in keyof ResponseCommand]: FormControl<ResponseCommand[field] | null>;
};
