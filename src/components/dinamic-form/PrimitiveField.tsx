import {
    Checkbox,
    FormControl, FormErrorMessage, FormLabel, Input,
    Select
} from "@chakra-ui/react";
import { camelToTitleCase } from "../../camelToTitle";
import { hasEnum, isCheckbox, isDate, normalize } from "../hasEnum";
import { checkboxes } from "../metadata/checkboxes";
import { enums } from "../metadata/enums";


export const PrimitiveField = ({ name, value, register, errors, path, isFromArray }: {
    name: string,
    value: unknown,
    register: any,
    errors: any,
    path: string,
    isFromArray?: boolean
}) => {

    // console.log('path at the primitive', path)
    const getInputType = (value) => {
        switch (typeof value) {
            case 'number':
                return 'number';
            default:
                return 'text';
        }
    };


    const inputType = getInputType(value);

    const renderInput = () => {

        if (hasEnum(path)) {
            return (
                <Select size="sm" w="full" defaultValue={value} {...register(path)}>
                    {enums?.[normalize(path)]?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            );
        }

        if (isDate(normalize(path))) {
            return (
                <Input
                    size="sm"
                    w="full"
                    type={"datetime-local"}
                    defaultValue={value}
                    {...register(path)}
                />
            );
        }
        if (isCheckbox(path)) {
            return (
                <Checkbox
                    size="sm"
                    w="full"
                    defaultValue={value}
                    {...register(path)}
                >
                    {checkboxes?.[path]?.label}
                </Checkbox>
            );
        }

        return (
            <Input
                size="sm"
                w="full"
                type={inputType}
                defaultValue={value}
                {...register(path)}
            />
        );
    };

    const errorMessage = errors?.[0]?.[name]?.message || errors?.[name]?.message;

    return (
        <FormControl w="full" id={name} isInvalid={!!errorMessage}>
            <FormLabel>{camelToTitleCase(name)}</FormLabel>
            {renderInput()}
            <FormErrorMessage>
                {errorMessage}
            </FormErrorMessage>
        </FormControl>
    );

};
