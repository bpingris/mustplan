import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withDefautLayout } from "../layouts/Default";

function Home() {
  const [d, setD] = useState(["abc", "def", "xyz", "123"]);

  const onDragEnd = (e) => {
    if (!e.destination) return;
    const items = [...d];
    const [reorderedItem] = items.splice(e.source.index, 1);
    items.splice(e.source.destination, 0, reorderedItem);
    setD(items);
  };
  return (
    <div>
      <p>Organiser vos projets simplement et rapidement</p>
      {typeof window !== "undefined" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="idk">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 bg-gray-500"
              >
                {d.map((o, index) => (
                  <Draggable key={o} draggableId={o} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 my-2 bg-white"
                      >
                        {o}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default withDefautLayout(Home);
