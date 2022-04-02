import styled from "@emotion/styled";
import { ElevatorApi, useBuildingQuery, useElevatorsQuery, useFloorMutation } from "@/services/elevatorApi";

const BuildingWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
  border: 2px solid #eae;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
`;

const FloorWrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  .elevator {
    background-color: #bada55;
    height: 98%;
    flex: 1;
  }
  .elevator-in-floor {
    background-color: #f00;
  }
`;

interface FloorProps extends Omit<ElevatorApi["elevator"], "state" | "id"> {
  elevators: number;
}

const Floor = ({ floor, elevators }: FloorProps) => {
  const { data } = useElevatorsQuery();
  const [setFloor] = useFloorMutation();
  const elevatorInFloor = (elevatorIdx: number) => {
    return data?.some((elevator) => elevator.floor === floor && elevator.id === `elv${elevatorIdx}`)
      ? "elevator-in-floor"
      : "";
  };
  return (
    <FloorWrapper>
      {Array(elevators)
        .fill(null)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((__, elevatorIdx) => (
          <div key={elevatorIdx} className={["elevator", elevatorInFloor(elevatorIdx)].filter(Boolean).join(" ")}>
            {elevatorIdx + 1}
          </div>
        ))}
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={() => setFloor(floor)}>
          call
        </button>
      </div>
    </FloorWrapper>
  );
};

const Building = ({ building }: { building: ElevatorApi["building"] }) => {
  const { elevators, floors } = building;
  return (
    <BuildingWrapper>
      {Array(floors)
        .fill(null)
        .map((_, floor) => (
          <Floor key={floor} floor={floor} elevators={elevators} />
        ))}
    </BuildingWrapper>
  );
};

export const Main = () => {
  const { data, error, isLoading } = useBuildingQuery();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Oh no</div>;
  }
  if (!data) return null;

  return <Building building={data} />;
};
