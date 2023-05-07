import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Collapse, Flex, Heading, IconButton,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { camelToTitleCase } from "../../camelToTitle";
import { Field } from "./Field";

export const ObjectField = ({ name, value, register, path, errors, control }: {
    name: string,
    value: Record<string, unknown>,
    register: any,
    path: string,
    errors: any,
    control: any
    arrayIndex?: number
}) => {
    const objectKeys = Object.keys(value);

    const { isOpen, onToggle } = useDisclosure();

    return (
        <VStack w="full" align="start" spacing={4} borderLeft="1px solid" borderColor="gray.500" p={2} ml={2}>
            <Flex flexDir="row" w="full" justifyContent="space-between" >

                <Heading size="md" onClick={onToggle}>
                    {camelToTitleCase(name)}
                </Heading>
                <IconButton
                    aria-label="Expand"
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    size="xs"

                    onClick={onToggle}
                    colorScheme="gray" />
            </Flex>

            <Collapse in={isOpen} style={{
                width: '100%',
            }}>
                <VStack w="full" >
                    {objectKeys.map((key) => (
                        <Field
                            control={control}
                            key={key}
                            name={`${key}`}
                            value={value[key]}
                            register={register}
                            path={path}
                            errors={errors}
                        />
                    ))}
                </VStack>

            </Collapse>
        </VStack>
    );
};
