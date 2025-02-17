import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Box, ChakraProvider, Container, Heading, VStack } from "@chakra-ui/react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteArea } from "./components/IncompleteArea";
import { CompleteArea } from "./components/CompleteArea";

export const App_JsonServer = () => {
    //   const [incompleteTodos, setIncompleteTodos] = useState<Array<{ id: number; text: string; completed:boolean }>>([]);
    //   const [completeTodos, setCompleteTodos] = useState<Array<{ id: number; text: string; completed:boolean }>>([]);
    const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([]);

    // 初回レンダリング時にAPIからデータを取得
    useEffect(() => {
        axios.get("http://localhost:3001/todos").then((res) => {
            const todos = res.data;
            setTodos(todos);
        });
    }, []);

    // タスクを追加
    const onClickAdd = async () => {
        const inputElement = document.querySelector('input') as HTMLInputElement;
        const inputTimeElement = document.querySelector('#time-input') as HTMLInputElement;
        let newTodo = inputElement.value;
        const newTodoTime = inputTimeElement.value;
        if (newTodo === "") return;

        // 期限未指定の場合はタスク名のみ、そうでない場合はタスク名と時間をセット
        newTodoTime === "" ? newTodo = newTodo : newTodo = `${newTodo} (${newTodoTime})`;
        const newTodoObj = { text: newTodo, completed: false };

        const response = await axios.post("http://localhost:3001/todos", newTodoObj);
        setTodos([...todos, response.data]);

        inputElement.value = "";
    };

    // タスクを削除
    const onClickRemove = async (id: number) => {
        await axios.delete(`http://localhost:3001/todos/${id}`);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // タスクを完了にする
    const onClickComplete = async (id: number) => {
        await axios.patch(`http://localhost:3001/todos/${id}`, { completed: true });

        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: true } : todo
        ));
    };

    // タスクを未完了に戻す
    const onClickBack = async (id: number) => {
        await axios.patch(`http://localhost:3001/todos/${id}`, { completed: false });
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: false } : todo
        ));
    };

    // 未完了のタスクと完了のタスクを分ける
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
        <ChakraProvider>
            <Container maxW="container.md" py={10}>
                <VStack spacing={10} align="stretch">
                    <Box>
                        <Heading textAlign="center" mb={6} size="2xl" color="blue.600">
                            勉強用Todoアプリ (JSON Server)
                        </Heading>
                    </Box>

                    <InputTodo onClickAdd={onClickAdd} />
                    <IncompleteArea incompleteTodos={incompleteTodos} onClickComplete={onClickComplete} onClickRemove={onClickRemove} />
                    <CompleteArea completeTodos={completeTodos} onClickBack={onClickBack} />
                </VStack>
            </Container>
        </ChakraProvider>
    );
};
