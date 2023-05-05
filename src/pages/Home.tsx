import { Center, VStack } from "@chakra-ui/react";
import AppForm from "../components/AppForm";
import AppButton from "../components/Button";
import { AppForm2 } from "../components/AppForm2";
import { mock } from "../mock";

type Props = {};

export const Home = () => {
  return (
    <Center>
      <VStack>
        <AppForm />
        {/* <AppForm2 data={mock} onSubmit={(data) => console.log(data)}/> */}
      </VStack>
    </Center>
  );
};
