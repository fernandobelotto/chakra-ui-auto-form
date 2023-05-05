import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { editObjectTypeSchema } from './schema';

// ...define Yup schemas here...



export const AppForm2 = ({ data, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(editObjectTypeSchema),
  });


console.log(errors);
  
  const renderFields = ({ data, path = '', errors }) => {
    return Object.entries(data).map(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;

      console.log('typeof value', typeof value);
      console.log('Array.isArray(value)', Array.isArray(value));

      if (Array.isArray(value)) {
        return (
          <VStack key={newPath} align="start" spacing={4}>
            <FormLabel>{newPath}</FormLabel>
            {value.map((item, index) => (
              <Field
                key={index}
                name={`${newPath}[${index}]`}
                value={item}
                register={register}
                errors={errors}
              />
            ))}
          </VStack>
        );
      } else if (typeof value === 'object' && value !== null) {
        return (
          <Box key={newPath}>
            {renderFields({ data: value, path: newPath, errors })}
          </Box>
        );
      } else {
        return (
          <FormControl key={newPath} isInvalid={errors[newPath]}>
            <FormLabel htmlFor={newPath}>{newPath}</FormLabel>
            <Input
              id={newPath}
              {...register(newPath)}
              defaultValue={value}
            />
            <FormErrorMessage>
              {errors[newPath] && errors[newPath].message}
            </FormErrorMessage>
          </FormControl>
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderFields({data, errors})}
      <Button type="submit">Submit</Button>
    </form>
  );
};


const Field = ({ name, value, register, errors }) => (
  <FormControl isInvalid={!!errors[name]}>
    <Input
      id={name}
      {...register(name)}
      defaultValue={value}
    />
    <FormErrorMessage>
      {errors[name] && errors[name].message}
    </FormErrorMessage>
  </FormControl>
);