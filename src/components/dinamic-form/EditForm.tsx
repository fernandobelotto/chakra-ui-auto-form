import {
    Button,
    VStack
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import { TabbedForm } from "./TabbedForm";
import { editObjectTypeSchema } from "../schema";

export const EditForm = ({ data, onSubmit, }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: data,
        resolver: yupResolver(editObjectTypeSchema),
    });



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>

                <TabbedForm
                    data={data}
                    register={register}
                    errors={errors}
                    control={control} />
                <Button type="submit" colorScheme="blue">
                    Save Changes
                </Button>
            </VStack>
        </form>
    );
};
