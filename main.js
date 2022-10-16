const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

//loop through each "draggables", allowing them to be dragged//
draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  //remove "dragging" class//
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

//move element around the containers & drop in others//
containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);

    // e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

//order of elements based on where the mouse is//
function getDragAfterElement(container, y) {
  //only get elements that aren't being dragged//
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
