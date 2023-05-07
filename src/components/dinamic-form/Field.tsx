import { ArrayField } from "./ArrayField";
import { ObjectField } from "./ObjectField";
import { PrimitiveField } from "./PrimitiveField";

export function Field({ name, value, register, path = '', errors, control, isFromArray, arrayIndex }: {
    name: string,
    value: unknown,
    register: any,
    path?: string,
    errors: any,
    control: any,
    isFromArray?: boolean
    arrayIndex?: number
}): JSX.Element | null {

    if (name === "id") {
        return null;
    }


    let newPath = path ? `${path}.${name}` : name;

    newPath = isFromArray ? path : newPath;

    if (Array.isArray(value)) {
        // console.log('error in array field ', errors)
        return <ArrayField initialValues={value[0] || {}} control={control} name={name} value={value} register={register} path={newPath} errors={errors} />;
    }


    if (typeof value === 'object' && value !== null) {

        return <ObjectField

            control={control} name={name} value={value} register={register} path={newPath} errors={errors?.[name]} />;
    }


    return <PrimitiveField name={name} value={value} register={register} path={newPath} errors={isFromArray ? errors[0] : errors} isFromArray={isFromArray} />;
}
