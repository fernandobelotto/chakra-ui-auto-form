import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Button, Flex, HStack, Heading, IconButton,
    VStack
} from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";

import { Field } from "./Field";
import { camelToTitleCase } from "../../camelToTitle";

export const ArrayField = ({ name, value, register, path, errors, control, initialValues }: any) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const getEmptyValues = (obj) => {
        const emptyObject = {};

        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                emptyObject[key] = [];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                emptyObject[key] = getEmptyValues(obj[key]);
            } else {
                emptyObject[key] = '';
            }
        }

        return emptyObject;
    };

    const handleAppend = () => {
        const emptyInitialValue = getEmptyValues(initialValues);
        append(emptyInitialValue);
    };

    return (
        <VStack borderLeft="1px solid" borderColor="gray.500" p={1} align="start" spacing={4} w="full">
            <Heading ml={1} size="md">{camelToTitleCase(name)}</Heading>
            <Box pl={1}>
                <Button
                    size="xs"
                    aria-label="Add item"
                    rightIcon={<AddIcon />}
                    colorScheme="green"
                    onClick={handleAppend}
                >
                    Add
                </Button>
            </Box>
            {fields.map((item, index) => (
                <Flex w="full" justifyContent="center" alignItems="flex-start" key={item.id}>
                    <Field
                        key={index}
                        name={`${name}`}
                        path={`${path}[${index}]`}
                        value={item}
                        register={register}
                        errors={errors}
                        control={control}
                        isFromArray
                        arrayIndex={index}
                    />
                    <Box>
                        <IconButton
                            aria-label="Remove item"
                            icon={<DeleteIcon />}
                            size="xs"
                            mt={2}
                            onClick={() => remove(index)}
                            colorScheme="red" />
                    </Box>
                </Flex>
            ))}


        </VStack>
    );
};
