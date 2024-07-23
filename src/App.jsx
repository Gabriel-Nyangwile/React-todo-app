import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos:
      newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }
  useEffect(() => {
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if(!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  } ,[])

  return (
    <>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
        <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos} />
    </>
  )
}

export default App

{/* Pour pouvoir implémenter la page Todo, on a besoin de 3 fonctions:
  1. handleAddTodos pour ajouter les rubriques à publier;
  2. handleDeleteTodo pour effacer les publications;
  3. handleEditTodo pour modifier les rubriques déjà publiées.
  
  - l'Ajoût passe par l'écoute des événéments matérialisée par les arrow functions 'onClick' et 'onChange' qui seront utilisées dans le fichier TodoInput.jsx. Pour se faire, 
  Au niveau du fichier parent App.jsx:
  a- aménager ce fichier pour qu'il reçoive des props du fichier parent. 
  b- déstructurer la props par la constante 'handleAddTodo' résultant de la fonction 'handleAddTodo' du fichier parent de la manière suivante: "const { handleAddTodo } = props";
  c- insèrer la fonction 'onClick(() => {handleAddTodos(todoValue)} dans la balise 'button' concernée. Cela signifie que lorsqu'il y a click, la valeur de la variable est récupérée. A ce stade, Comme cette variable 'todoValue' n'est pas encore définie, il y'a lieu de rentrer dans la partie logique pour définir cette variable en respectant le principe d'utilisation d'états dans React;
  d- définir donc une variable d'état vide pour récupérer la valeur:
  'const [todoValue, setTodoValue] = useState('')'
  e- définir la valeur au niveau de la balise 'input' en récupérant 'todoValue' et appeller la fonction d'écoute d'événément 'onChange' pour récupérer la valeur ainsi on aura <input value={todoValue} onChange={(e) => {setTodoValue(e.target.value)}}
  f- faire un reset de la variable 'setTodoValue' à la fin de la fonction arrow 'onClick'. La balise 'button' est redéfinie comme suit: <button onClick={() => {handleAddTodos(todoValue) setTodoValue('')}}> 
  */}
