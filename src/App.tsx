import  { useState } from 'react';
// import './App.css';
// import { Box, Button, ChakraProvider, HStack, Heading, Input, List, ListIcon, ListItem, Text, VStack, Container } from '@chakra-ui/react';
// import { InputTodo } from './components/InputTodo';
// import { IncompleteArea } from './components/IncompleteArea';
// import { CompleteArea } from './components/CompleteArea';

// export const App = () => {
//   const [incompleteTodos, setIncompleteTodos] = useState<Array<string>>([""]);
//   const [completeTodos, setCompleteTodos] = useState<Array<string>>([""]);
//   const [time, setTime] = useState<Array<string>>([]);
  

//   const onClickAdd = () => {
//     const inputElement = document.querySelector('input') as HTMLInputElement;
//     const inputTimeElement = document.querySelector('#time-input') as HTMLInputElement;
//     let newTodo = inputElement.value;
//     const newTodoTime = inputTimeElement.value;
//     if (newTodo === "") return;
//     newTodoTime === "" ? newTodo = newTodo : newTodo = `${newTodo} (${newTodoTime})`;
//     setIncompleteTodos([...incompleteTodos, newTodo]);
//     inputElement.value = "";
//     inputTimeElement.value = "";
//   }

//   const onClickRemove = (index: number) => {
//     const newTodos = [...incompleteTodos];
//     newTodos.splice(index, 1);
//     setIncompleteTodos(newTodos);
//   }

//   const onClickComplete = (index: number) => {
//     const newIncompleteTodos = [...incompleteTodos];
//     newIncompleteTodos.splice(index, 1);
//     setIncompleteTodos(newIncompleteTodos);

//     const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
//     setCompleteTodos(newCompleteTodos);
//   }

//   const onClickBack = (index: number) => {
//     const newCompleteTodos = [...completeTodos];
//     newCompleteTodos.splice(index, 1);
//     setCompleteTodos(newCompleteTodos);

//     const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
//     setIncompleteTodos(newIncompleteTodos);
//   }

//   return (
//     <ChakraProvider>
//       <Container maxW="container.md" py={10}>
//         <VStack spacing={10} align="stretch">
//           <Box>
//             <Heading textAlign="center" mb={6} size="2xl" color="blue.600">
//               勉強用Todoアプリ
//             </Heading>
//           </Box>
          
//           <InputTodo onClickAdd={onClickAdd} />
          
//           <IncompleteArea incompleteTodos={incompleteTodos} onClickComplete={onClickComplete} onClickRemove={onClickRemove} />

//           <CompleteArea completeTodos={completeTodos} onClickBack={onClickBack} />

//         </VStack>
//       </Container>
//     </ChakraProvider>
//   );
// }