import * as _ from "lodash";
import { promptOnce } from "../prompt";
import { ParamOption } from "./extensionsApi";
import { RegistryEntry } from "./resolveSource";

// Modified version of the once function from prompt, to return as a joined string.
export async function onceWithJoin(question: any): Promise<string> {
  const response = await promptOnce(question);
  if (Array.isArray(response)) {
    return response.join(",");
  }
  return response;
}

interface ListItem {
  name?: string; // User friendly display name for the option
  value: string; // Value of the option
  checked: boolean; // Whether the option should be checked by default
}

// Convert extension option to Inquirer-friendly list for the prompt, with all items unchecked.
export function convertExtensionOptionToLabeledList(options: ParamOption[]): ListItem[] {
  return options.map(
    (option: ParamOption): ListItem => {
      return {
        checked: false,
        name: option.label,
        value: option.value,
      };
    }
  );
}

// Match a label to a ExtensionValue.
// When a SELECT or MULTISELECT extension is in the prompt and a user is asked to pick
// options, these options are displayed as ParamOption.label if present, otherwise as ParamOption.value.
// export function extensionOptionToValue(label: string, options: ParamOption[]): string {
//   for (const option of options) {
//     if (label === option.label || label === option.value) {
//       return option.value;
//     }
//   }
//   return "";
// }

export function convertOfficialExtensionsToList(officialExts: {
  [key: string]: RegistryEntry;
}): ListItem[] {
  return _.map(officialExts, (entry: RegistryEntry, key: string) => {
    return {
      checked: false,
      value: key,
    };
  });
}
