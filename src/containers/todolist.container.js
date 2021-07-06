


import React, { useState  } from 'react';
import LayoutComponent  from '../components/layout.component';
import uuid from 'react-uuid'

const TodoListComponent = () =>  {

  const [record, setRecord] = useState({});

  const [todolists, setTodolists] = useState([
      { id: 1, title: "First Task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
      { id: 2, title: "Second Task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
      { id: 3, title: "Third Task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
      { id: 4, title: "Fourth Task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
      { id: 5, title: "Fifth Task", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
  ]);

  const addHandler = (data) => {
    console.log('addHandler called');
    console.log({
      data
    });

    let newItem = {
      id: uuid(), title:data.title, description: data.description
    }

    let xyz = [...todolists];
    xyz.push(newItem);

    setTodolists(xyz);
  }

  const updateHandler = (data) => {
      console.log('update handler called');
      console.log({
        data
      });

      setTodolists( lists => {
        let xyz = lists.filter( item => {
          if(item.id == data.id)
          {
             item.title = data.title;
             item.description = data.description
          }

          return item;
        });
        return xyz;

    });
  } 

  const deleteHandler = (e) => {

    setTodolists( data => {
        let xyz = data.filter( x => x.id !== e );
        return xyz;

    });

  } 
  return (
   <div>
       <LayoutComponent 
          data = {todolists} 
          deleteList = {deleteHandler}
          updateHandler = {updateHandler}
          setRecord = {setRecord}
          addHandler={addHandler}
       > </LayoutComponent>

   </div>
  );
}

export default TodoListComponent;
