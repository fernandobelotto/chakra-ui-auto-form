import {
    Box, Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack
} from "@chakra-ui/react";
import { camelToTitleCase } from "../../camelToTitle";
import { Field } from "./Field";

export const TabbedForm = ({ data, register, errors, control }:
    {
        data: Record<string, unknown>,
        register: any,
        errors: any,
        control: any
    }) => {
    return (
        <Tabs>
            <TabList>
                {Object.keys(data).map((key, index) => (
                    <Tab key={index}>{camelToTitleCase(key)}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {Object.entries(data).map(([key, value], index) => (
                    <TabPanel key={index}>
                        <VStack align="start" spacing={2} w="full">
                            <Box w="full">
                                <Field
                                    name={key}
                                    value={value}
                                    register={register}
                                    path={""}
                                    errors={errors}
                                    control={control} />
                            </Box>
                        </VStack>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
