import { SensorContext, UniqueIdentifier } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const customKeyCoords = (
  event: KeyboardEvent,
  args: {
    active: UniqueIdentifier;
    currentCoordinates: Coordinates;
    context: SensorContext;
  }
) => {
  // get the current drag item
  const active = args.active;
  console.log(args.context.droppableRects);
  // get the direction of the drag;
  const direction = event.key;

  // get the next item in the direction of the drag
  // get the coordinates of the next item
  // return the coordinates of the next item

  const overshootAmt = 15;
  const initialY = args.currentCoordinates.y;
  const val = sortableKeyboardCoordinates(event, args);
  // check if val is undefined (ie trying to move past end)
  if (!val) {
    return undefined;
  }
  const finalY = val.y;
  // add the overshoot amount to the y coordinate
  if (finalY > initialY) {
    val.y += overshootAmt;
  }
  if (finalY < initialY) {
    val.y -= overshootAmt;
  }
  return val;
};
