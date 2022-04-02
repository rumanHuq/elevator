import styled from "@emotion/styled";
import { ElevatorApi, useElevatorsQuery, useFloorMutation } from "@/services/elevatorApi";
import { Button } from "../Button/Button";

const FloorWrapper = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

interface GetBackgroundColor {
  inCurrentFloor: boolean;
  state?: ElevatorApi["elevator"]["state"];
}

function getBackgroundProperties({ inCurrentFloor, state }: GetBackgroundColor) {
  if (state === "stopped" && inCurrentFloor) return "background-image: url(/lift_open.png); background-size: cover";
  if (state !== "stopped" && inCurrentFloor) return "background-image: url(/lift_closed.png); background-size: cover";
  return "background-color: #4D7298";
}

const ElevatorWrapper = styled.div<GetBackgroundColor>`
  ${getBackgroundProperties};
  height: 98%;
  flex: 1;
`;

interface FloorProps {
  elevators: number;
  floor: number;
}

export const Floor = ({ floor, elevators }: FloorProps) => {
  const { data } = useElevatorsQuery();
  const [setFloor] = useFloorMutation();
  const elevatorInFloor = (elevatorIdx: number) => {
    return data?.find((elevator) => elevator.floor === floor && elevator.id === `elv${elevatorIdx}`);
  };

  return (
    <FloorWrapper>
      {Array(elevators)
        .fill(null)
        .map((__, elevatorIdx) => {
          const { state } = elevatorInFloor(elevatorIdx) || {};
          return <ElevatorWrapper key={elevatorIdx} inCurrentFloor={!!state} state={state} />;
        })}
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={() => setFloor(floor)} />
      </div>
    </FloorWrapper>
  );
};
