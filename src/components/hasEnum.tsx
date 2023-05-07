// import { enums } from "./enums";
import { checkboxes } from "./metadata/checkboxes";
import { dates } from "./metadata/dates";
import { enums } from "./metadata/enums";


export const normalize = (path) => {
    return path.replace(/\[\d+\]/g, '[0]');
};

export const hasEnum = (path) => {
    const normalizedPath = path.replace(/\[\d+\]/g, '[0]');
    return !!enums?.[normalizedPath];
};


export const isDate = (path) => {
    const normalizedPath = path.replace(/\[\d+\]/g, '[0]');
    return !!dates?.includes(normalizedPath);
};


export const isCheckbox = (path) => {
    for (const key in checkboxes) {
        if (key.includes(normalize(path))) {
            return true;
        }
    }
    return false;
}

