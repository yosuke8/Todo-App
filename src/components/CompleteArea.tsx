import { CheckIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
    completeTodos: Array<{ id: number; text: string; completed: boolean }>
    onClickBack: (index: number) => void
}

export const CompleteArea: FC<Props> = (props) => {
    const { completeTodos, onClickBack } = props;

    return (
        <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md">
            <Heading textAlign='center' size="lg" mb={4} color="green.500">完了したTODO</Heading>
            <List spacing={4}>
                {completeTodos.map((todo) => (
                    <ListItem key={todo.id} bg="white" p={3} borderRadius="md" boxShadow="sm">
                        <HStack justify="space-between">
                            {todo.text !== "" ?
                                <>
                                    <HStack>
                                        <ListIcon as={CheckIcon} color='green.500' />
                                        <Text>{todo.text}</Text>
                                    </HStack>
                                    <Button colorScheme="blue" size="sm" onClick={() => onClickBack(todo.id)}>戻す</Button>
                                </> : <></>}
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}