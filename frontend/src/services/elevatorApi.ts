import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ElevatorApi {
  building: {
    elevators: number;
    floors: number;
  };
  elevator: {
    id: string;
    floor: number;
    targetFloor?: number;
    state: "up" | "down" | "stopped";
  };
}

function updateElevatorInCache(
  elevatorsInCache: Array<ElevatorApi["elevator"]>,
  updatedElevator: ElevatorApi["elevator"]
) {
  const toUpdateIdx = elevatorsInCache.findIndex((elevator) => elevator.id === updatedElevator.id);
  if (toUpdateIdx !== -1) {
    const updatedElevators = [...elevatorsInCache];
    updatedElevators[toUpdateIdx] = updatedElevator;
    Object.assign(elevatorsInCache, updatedElevators);
  }
}
const baseUrl = "http://localhost:8080";
export const elevatorApi = createApi({
  reducerPath: "elevatorApi",
  tagTypes: ["ELEVATOR"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    /* --------- queries --------- */
    ping: builder.query<"pong", void>({ query: () => "/ping" }),
    building: builder.query<ElevatorApi["building"], void>({ query: () => "/building" }),
    elevators: builder.query<Array<ElevatorApi["elevator"]>, void>({
      query: () => "/elevators",
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }) {
        const sse = new EventSource(`${baseUrl}/stream`);
        await cacheDataLoaded;
        sse.onmessage = (e: MessageEvent<string>) => {
          const updatedElevator: ElevatorApi["elevator"] = JSON.parse(e.data);
          updateCachedData((elevatorsInCache) => updateElevatorInCache(elevatorsInCache, updatedElevator));
        };
        await cacheEntryRemoved;
        sse.close();
      },
    }),
    /* --------- mutations --------- */
    floor: builder.mutation<ElevatorApi["elevator"], number>({
      query: (floorNumber) => ({ url: `/floor/${floorNumber}`, method: "PUT" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        /* Pessimistic Updates */
        const { data: updatedElevator } = await queryFulfilled;
        dispatch(
          elevatorApi.util.updateQueryData("elevators", undefined, (elevatorsInCache) => {
            return updateElevatorInCache(elevatorsInCache, updatedElevator);
          })
        );
      },
    }),
  }),
});

export const { usePingQuery, useBuildingQuery, useElevatorsQuery, useFloorMutation } = elevatorApi;
