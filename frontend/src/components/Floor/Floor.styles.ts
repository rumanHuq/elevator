import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { ElevatorApi } from "@/services/elevatorApi";

interface GetBackgroundColor {
  isElevatorInCurrentFloor: boolean;
  state?: ElevatorApi["elevator"]["state"];
}

function getBackgroundProperties(props: GetBackgroundColor) {
  const { isElevatorInCurrentFloor, state } = props;
  if (state === "stopped" && isElevatorInCurrentFloor)
    return css`
      background-image: url(/lift_open.png);
      background-size: cover;
    `;
  if (state !== "stopped" && isElevatorInCurrentFloor)
    return css`
      background-image: url(/lift_closed.png);
      background-size: cover;
    `;
  return css`
    background-color: #4d7298;
  `;
}

export const FloorWrapper = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const ElevatorWrapper = styled.div<GetBackgroundColor>`
  ${getBackgroundProperties}
  height: 98%;
  flex: 1;
`;
