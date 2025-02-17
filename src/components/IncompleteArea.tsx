import { TimeIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
    incompleteTodos: Array<{ id: number; text: string; completed: boolean }>
    onClickComplete: (index: number) => void
    onClickRemove: (index: number) => void
}

export const IncompleteArea: FC<Props> = (props) => {
    const { incompleteTodos, onClickComplete, onClickRemove } = props;

    return (
        <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md">
            <Heading textAlign='center' size="lg" mb={4} color="red.500">未完了のTODO</Heading>
            <List spacing={4}>
                {incompleteTodos.map((todo) => (
                    <ListItem key={todo.id} bg="white" p={3} borderRadius="md" boxShadow="sm">
                        <HStack justify="space-between">
                            {todo.text != "" ?
                                <>
                                    <HStack>
                                        <ListIcon as={TimeIcon} color='green.500' />
                                        <Text>{todo.text}</Text>
                                    </HStack>
                                    <HStack>
                                        <Button colorScheme="blue" size="sm" onClick={() => onClickComplete(todo.id)}>完了</Button>
                                        <Button colorScheme="red" size="sm" onClick={() => onClickRemove(todo.id)}>削除</Button>
                                    </HStack>
                                </> : <></>}

                        </HStack>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}