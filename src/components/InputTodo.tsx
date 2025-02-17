import { Box, Button, HStack, Input } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
    onClickAdd: () => void
}
export const InputTodo:FC<Props> = (props) => {
    const {onClickAdd} = props;
    return (
        <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md">
            <HStack>
              <Input placeholder="タスクを入力" size="lg" />
              <Input placeholder="日時を入力" size="lg" type="datetime-local" id="time-input"/>
              <Button colorScheme="blue" size="lg" onClick={onClickAdd}>追加</Button>
            </HStack>
          </Box>
    )
}