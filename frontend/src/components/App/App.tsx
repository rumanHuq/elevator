import styled from "@emotion/styled";
import { Floor } from "@/components/Floor/Floor";
import { useBuildingQuery } from "@/services/elevatorApi";

const BuildingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 300px;
  margin: auto;
  background-color: #591f0a;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.25rem;
`;

export const App = () => {
  const { data, error, isLoading } = useBuildingQuery();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Oh no</div>;
  }
  if (!data) return null;
  const { elevators, floors } = data;
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
