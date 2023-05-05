import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import {
  Box,
  Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, IconButton, Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from "react-hook-form";
import { mock } from '../mock';
import { editObjectTypeSchema } from "./schema";
import { sortDeeply } from "../sortDeeply";
import { camelToTitleCase } from "../camelToTitle";


type FormType = {
  text: string;
};

const PrimitiveField = ({ name, value, register, errors, path }) => {

  const getInputType = (value) => {
    switch (typeof value) {
      case 'number':
        return 'number';
      default:
        return 'text';
    }
  };

  const inputType = getInputType(value);

  return (
  <FormControl  w="full" id={name} isInvalid={!!errors?.[name]}>
    <FormLabel>{camelToTitleCase(name)}</FormLabel>
    <Input size="sm" w="full" type={inputType} defaultValue={value} {...register(path)} />
      <FormErrorMessage>
        {errors?.[path] && errors?.[path]?.message}
    </FormErrorMessage>
  </FormControl>
)};

const TabbedForm = ({ data, register, errors, control }) => {
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
                  path={key}
                  errors={errors}
                  control={control}
                />
              </Box>
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

const ObjectField = ({ name, value, register, path, errors, control }) => {
  const objectKeys = Object.keys(value);

  return (
    <VStack w="full" align="start" spacing={4} border="1px solid white" p={3} rounded="md">
      <Heading size="md">{camelToTitleCase(name)}</Heading>

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
  );
};

const ArrayField = ({ name, value, register, path, errors, control, initialValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  console.log('fields', fields)

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
    console.log('emptyInitialValue', emptyInitialValue)
    console.log('initialValues', initialValues)
    append(emptyInitialValue);
  };
  


  return (
    <VStack border="1px solid white" p={5} borderRadius="md" align="start" spacing={4}>
      <Heading size="md">{camelToTitleCase(name)}</Heading>
      {fields.map((item, index) => (
        <HStack w="full" alignItems="flex-start">
          <Field
            key={index}
            name={`${name} : ${index}`}
            path={`${path}[${index}]`}
            value={item}
            register={register}
            errors={errors}
            control={control}
          />
          <Box pt={3}>

          <IconButton
              aria-label="Remove item"
              icon={<MinusIcon />}
              size="xs"
              onClick={() => remove(index)}
            />
          </Box>
        </HStack>

      ))}
      <IconButton
      size="sm"
        aria-label="Add item"
        icon={<AddIcon size="sm" />}
        
        onClick={handleAppend}
      />
    </VStack>
  );
};

const Field = ({ name, value, register, path ='', errors, control }) => {

  if (name === "id") {
    return null;
  }

  const newPath = path ? `${path}.${name}` : name;

  if (Array.isArray(value)) {
    return <ArrayField initialValues={value[0]||{}} control={control} name={name} value={value} register={register}  path={newPath} errors={errors}/>;
  }

  if (typeof value === 'object' && value !== null) {
    return <ObjectField control={control} name={name} value={value} register={register}  path={newPath} errors={errors}/>;
  }

  return <PrimitiveField name={name} value={value} register={register} path={newPath} errors={errors} />;
};

const EditForm = ({ data, onSubmit }) => {
  
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
        control={control}
      />
        <Button type="submit" colorScheme="blue">
          Save Changes
        </Button>
      </VStack>
    </form>
  );
};


function AppForm() {

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  const sortedData = sortDeeply(mock);


  return (
    <EditForm data={sortedData} onSubmit={onSubmit} />
  );
}

export default AppForm;
