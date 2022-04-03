import { useElevatorsQuery, useFloorMutation } from "@/services/elevatorApi";
import { Button } from "../Button/Button";
import { FloorWrapper, ElevatorWrapper } from "./Floor.styles";

interface FloorProps {
  elevators: number;
  floor: number;
}

export const Floor = (props: FloorProps) => {
  const { floor, elevators } = props;
  const { data } = useElevatorsQuery();
  const [setFloor] = useFloorMutation();
  const elevatorInFloor = (elevatorIdx: number) => {
    return data?.find((elevator) => elevator.floor === floor && elevator.id === `elv${elevatorIdx}`);
  };

  return (
    <FloorWrapper data-testId="floor">
      {Array(elevators)
        .fill(null)
        .map((__, elevatorIdx) => {
          const elevatorCurrentFloorState = elevatorInFloor(elevatorIdx);
          return (
            <ElevatorWrapper
              data-testId={elevatorCurrentFloorState ? "elevator-present" : "elevator-absent"}
              key={elevatorIdx}
              isElevatorInCurrentFloor={!!elevatorCurrentFloorState}
              state={elevatorCurrentFloorState?.state}
            />
          );
        })}
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={() => setFloor(floor)} />
      </div>
    </FloorWrapper>
  );
};
