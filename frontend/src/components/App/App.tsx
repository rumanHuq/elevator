import { Floor } from "@/components/Floor/Floor";
import { useBuildingQuery } from "@/services/elevatorApi";
import { BuildingWrapper } from "./App.styles";

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
    <BuildingWrapper data-testId="building">
      {Array(floors)
        .fill(null)
        .map((_, floor) => (
          <Floor key={floor} floor={floor} elevators={elevators} />
        ))}
    </BuildingWrapper>
  );
};
