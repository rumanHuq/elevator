import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ElevatorApi, useElevatorsQuery, useFloorMutation } from "@/services/elevatorApi";
import { Button } from "../Button/Button";

interface FloorProps {
  elevators: number;
  floor: number;
}

interface GetBackgroundColor {
  inCurrentFloor: boolean;
  state?: ElevatorApi["elevator"]["state"];
}

function getBackgroundProperties({ inCurrentFloor, state }: GetBackgroundColor) {
  if (state === "stopped" && inCurrentFloor)
    return css`
      background-image: url(/lift_open.png);
      background-size: cover;
    `;
  if (state !== "stopped" && inCurrentFloor)
    return css`
      background-image: url(/lift_closed.png);
      background-size: cover;
    `;
  return css`
    background-color: #4d7298;
  `;
}

const FloorWrapper = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const ElevatorWrapper = styled.div<GetBackgroundColor>`
  ${getBackgroundProperties}
  height: 98%;
  flex: 1;
`;

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
